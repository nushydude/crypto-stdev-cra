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
import {
  Container,
  DataContainer,
  FormContainer,
  Heading,
} from './SingleTokenPage.styles';

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
    <Container>
      <FormContainer>
        <TokenOptionsForm
          defaultValues={getDefaultTokenOptions(qs.parse(location.search))}
          allowSubmission={fetchStatus !== FETCH_STATUS.fetching}
          onSubmit={onSubmit}
          onValueChange={onFormValueChange}
        />
      </FormContainer>

      {/* Display the results and graph */}
      <DataContainer data-testid="data-container">
        <Heading>Result:</Heading>
        <TokenContent status={fetchStatus} {...getDisplayData(data)} />
      </DataContainer>
    </Container>
  );
};
