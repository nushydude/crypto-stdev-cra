import memoizeOne from 'memoize-one';
import isEqual from 'fast-deep-equal';
import { calculateStandardDeviation } from '../../utils/calculateStandardDeviation';
import { calculateMean } from '../../utils/calculateMean';
import { Data } from '../../hooks/useBinanceKline';

const getTransformedKLineDataSortedByDip = (
  klineData: Array<Data>,
  sdMultiplier = 1,
) => {
  return (
    klineData
      .map(({ symbol, klineData, avgPrice }) => {
        const prices = klineData.map((d) => d.openPrice);
        const standardDeviation = calculateStandardDeviation(prices);
        const mean = calculateMean(prices);
        const targetPrice = mean - sdMultiplier * standardDeviation;
        const shouldDCA: boolean = avgPrice < targetPrice;
        const dip = ((avgPrice - targetPrice) / targetPrice) * 100;

        return { symbol, shouldDCA, targetPrice, avgPrice, dip, klineData };
      })
      // sort by highest to lowest (i.e. highest *negative* value first)
      .sort((a, b) => a.dip - b.dip)
  );
};

export const getTransformedKLineDataSortedByDipMemoized = memoizeOne(
  getTransformedKLineDataSortedByDip,
  isEqual,
);
