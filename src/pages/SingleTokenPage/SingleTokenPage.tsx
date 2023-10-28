import { useCallback } from 'react';
import qs from 'query-string';
import { useLocation, useHistory } from 'react-router-dom';
import { Interval } from '../../types/interval';
import { FETCH_STATUS } from '../../consts/FetchStatus';
import { useBinanceKLine } from '../../hooks/useBinanceKline';
import { TokenOptionsForm } from './TokenOptionsForm';
import getDisplayData from './getDisplayData';
import { getDefaultTokenOptions } from './getDefaultTokenOptions';
import { TokenContent } from './TokenContent';

type FieldValues = {
  symbol: string;
  interval: Interval;
  limit: number;
};

export const SingleTokenPage = () => {
  const history = useHistory();
  const location = useLocation();

  const { data, fetchStatus, refetch } = useBinanceKLine([
    // Get the initial token options from the URL params while falling back to the default values.
    // So that you can bookmark a particular URL for quick access.
    getDefaultTokenOptions(qs.parse(location.search)),
  ]);

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
