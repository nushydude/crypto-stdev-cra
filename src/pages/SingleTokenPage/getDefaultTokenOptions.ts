import qs from 'query-string';
import { Interval } from '../../types/interval';
import { FieldValues } from './types';

export const getDefaultTokenOptions = (
  parsed: qs.ParsedQuery<string>,
): FieldValues => {
  let symbol = 'BTCUSDT';
  let interval: Interval = '4h';
  let limit = 100;

  if (typeof parsed.symbol === 'string') {
    symbol = parsed.symbol;
  }

  if (typeof parsed.interval === 'string') {
    interval = parsed.interval as Interval;
  }

  if (typeof parsed.limit === 'string') {
    limit = parseInt(parsed.limit);
  }

  return { symbol, interval, limit };
};
