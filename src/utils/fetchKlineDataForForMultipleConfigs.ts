import { Interval } from '../types/interval';
import { fetchKLineData } from './fetchKLineData';

type Config = {
  symbol: string;
  interval: Interval;
  limit: number;
};

export const fetchKlineDataForForMultipleConfigs = async (
  configs: Array<Config>,
) => {
  return Promise.all(
    configs.map(async ({ symbol, interval, limit }) => {
      const { klineData, avgPrice } = await fetchKLineData(
        symbol,
        interval,
        limit,
      );

      return {
        symbol,
        interval,
        limit,
        klineData,
        avgPrice: parseFloat(avgPrice.price),
      };
    }),
  );
};
