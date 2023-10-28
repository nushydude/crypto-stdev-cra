import qs from 'query-string';
import { Interval } from '../../types/interval';
import { FieldValues } from './types';

const LOCAL_STORAGE_KEY = 'default_token_options';

export const getDefaultTokenOptions = (
  parsed: qs.ParsedQuery<string>,
): FieldValues => {
  // Load from local storage
  let storedOptions: Partial<FieldValues> = {};
  try {
    const stringifiedStoredOptions = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (typeof stringifiedStoredOptions === 'string') {
      storedOptions = JSON.parse(stringifiedStoredOptions);
    }
  } catch (e) {
    // ignore
  }

  let symbol = storedOptions.symbol || 'BTCUSDT';
  let interval: Interval = storedOptions.interval || '4h';
  let limit = storedOptions.limit || 100;

  // Prioritize query string over local storage and default values
  if (typeof parsed.symbol === 'string') {
    symbol = parsed.symbol;
  }

  if (typeof parsed.interval === 'string') {
    interval = parsed.interval as Interval;
  }

  if (typeof parsed.limit === 'string') {
    limit = parseInt(parsed.limit);
  }

  // Save to local storage
  try {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({ symbol, interval, limit }),
    );
  } catch (e) {
    // ignore
  }

  return { symbol, interval, limit };
};
