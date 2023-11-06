import { Interval } from '../../types/interval';

const DEFAULT_INTERVAL: Interval = '4h';
const DEFAULT_LIMIT = 100;

export const getKLineConfigs = (
  symbols: Array<string>,
): Array<{ symbol: string; interval: Interval; limit: number }> => {
  return symbols.map((symbol) => ({
    symbol,
    interval: DEFAULT_INTERVAL,
    limit: DEFAULT_LIMIT,
  }));
};
