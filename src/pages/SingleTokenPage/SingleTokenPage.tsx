import { useCallback, useEffect, useState } from 'react';
import qs from 'query-string';
import { useLocation, useHistory } from 'react-router-dom';
import { Interval } from '../../types/interval';
import { FETCH_STATUS } from '../../consts/FetchStatus';
import { useBinanceKLine } from '../../hooks/useBinanceKline';
import { TokenOptionsForm } from './TokenOptionsForm';
import getDisplayData from './getDisplayData';
import { getDefaultTokenOptions } from './getDefaultTokenOptions';
import { TokenContent } from './TokenContent';

const LOCAL_STORAGE_KEY = 'SINGLE_TOKEN_PAGE-HISTORICAL_PAIRS';

type FieldValues = {
  symbol: string;
  interval: Interval;
  limit: number;
};

const SingleTokenPage = () => {
  const history = useHistory();
  const location = useLocation();

  const { data, fetchStatus, refetch } = useBinanceKLine([
    // Get the initial token options from the URL params while falling back to the default values.
    // So that you can bookmark a particular URL for quick access.
    getDefaultTokenOptions(qs.parse(location.search)),
  ]);

  // Get the historicalPairs from LocalStorage or initialize it to an empty array.
  const [historicalPairs, setHistoricalPairs] = useState<string[]>(() => {
    const pairs = localStorage.getItem(LOCAL_STORAGE_KEY);
    return pairs ? JSON.parse(pairs) : [];
  });

  // Remove the pair from the historicalPairs
  const removePair = (pair: string) => {
    setHistoricalPairs((prev) => prev.filter((item) => item !== pair));
  };

  // Save the historicalPairs to LocalStorage whenever it changes.
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(historicalPairs));
  }, [historicalPairs]);

  // If successful i.e. fetchStatus is FETCH_STATUS.success, add the symbol to the end of the historicalPairs
  // and only store the last 4 pairs and then save it to LocalStorage.
  useEffect(() => {
    if (fetchStatus === FETCH_STATUS.success) {
      setHistoricalPairs((prev) => {
        const uniquePairs = [
          ...new Set(
            [
              data[0]?.symbol,
              ...prev.filter((item) => item !== data[0]?.symbol),
            ]
              // store only the last 6 pairs
              .slice(-6),
          ),
        ];
        return uniquePairs;
      });
    }
  }, [data, fetchStatus]);

  const onSubmit = (fieldValues: FieldValues) => {
    refetch([fieldValues]);
  };

  // Update the URL params when the form values change
  const onFormValueChange = useCallback(
    (value: Partial<FieldValues>) => {
      // TODO: perhaps we should merge the new ones with the old ones.
      const newValues = { ...value } as Record<string, string>;
      const params = new URLSearchParams(newValues);
      history.replace({
        pathname: location.pathname,
        search: params.toString(),
      });
    },
    [history, location.pathname],
  );

  return (
    <div className="flex flex-col px-2 md:flex-row md:px-0 md:pt-4">
      <div className="w-full mr-0 md:w-60 md:flex-shrink-0 md:mr-4">
        <TokenOptionsForm
          defaultValues={getDefaultTokenOptions(qs.parse(location.search))}
          historicalPairs={historicalPairs}
          removePair={removePair}
          allowSubmission={fetchStatus !== FETCH_STATUS.fetching}
          onSubmit={onSubmit}
          onValueChange={onFormValueChange}
        />
      </div>

      {/* Display the results and graph */}
      <div
        data-testid="data-container"
        className="min-w-0 flex-1 p-2 bg-sky-100 border-solid border-1 border-sky-200 rounded-lg"
      >
        <TokenContent status={fetchStatus} {...getDisplayData(data)} />
      </div>
    </div>
  );
};

export default SingleTokenPage;
