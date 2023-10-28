import { DEFAULT_SETTINGS } from '../../consts/DefaultSettings';
import { Interval } from '../../types/interval';

const DEFAULT_INTERVAL: Interval = '4h';
const DEFAULT_LIMIT = 100;

export const getKLineConfigs = (
  settings: string | undefined,
): Array<{ symbol: string; interval: Interval; limit: number }> => {
  let symbols = DEFAULT_SETTINGS.bestBuySymbols;

  // Read symbols from stored settings
  if (settings) {
    try {
      const storedSymbols = JSON.parse(settings)?.bestBuySymbols;

      if (Array.isArray(storedSymbols) && storedSymbols.length > 0) {
        symbols = storedSymbols;
      }
    } catch (error) {
      // do nothing
    }
  }

  return symbols.map((symbol) => ({
    symbol,
    interval: DEFAULT_INTERVAL,
    limit: DEFAULT_LIMIT,
  }));
};
