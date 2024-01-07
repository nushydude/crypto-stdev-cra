import { Interval } from '../../types/interval';

const DEFAULT_INTERVAL: Interval = '4h';
const DEFAULT_LIMIT = 200;

type Options = {
  interval?: Interval;
  limit?: number;
};

export const getKLineConfigs = (
  symbols: Array<string>,
  options: Options = {},
): Array<{ symbol: string; interval: Interval; limit: number }> => {
  return symbols.map((symbol) => ({
    symbol,
    interval: options.interval || DEFAULT_INTERVAL,
    limit: options.limit || DEFAULT_LIMIT,
  }));
};
