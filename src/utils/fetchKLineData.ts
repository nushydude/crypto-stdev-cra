import { appConfig } from '../config';
import { Interval } from '../types/interval';

export const fetchKLineData = async (
  symbol: string,
  interval: Interval,
  limit: number,
) => {
  const response = await fetch(
    `${
      appConfig.API_URI
    }/api/binance_kline?symbol=${symbol.trim()}&interval=${interval}&limit=${limit}`,
  );
  const { klineData, avgPrice } = await response.json();

  return { klineData, avgPrice };
};
