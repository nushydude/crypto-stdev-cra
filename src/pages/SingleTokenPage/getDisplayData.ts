import memoizeOne from 'memoize-one';
import isEqual from 'fast-deep-equal';
import { calculateMean } from '../../utils/calculateMean';
import { calculateStandardDeviation } from '../../utils/calculateStandardDeviation';

type KLineData = {
  openTime: string;
  openPrice: number;
  volume: number;
};

type InputDataItem = {
  klineData: Array<KLineData>;
  avgPrice: number;
};

const getDisplayData = (inputData: Array<InputDataItem>) => {
  const klineData: Array<KLineData> =
    inputData.length > 0 ? inputData[0].klineData : [];
  const prices = klineData.map((d) => d.openPrice);
  const standardDeviation = calculateStandardDeviation(prices);
  const mean = calculateMean(prices);
  const targetPrice = mean - standardDeviation;
  const avgPrice = inputData.length > 0 ? inputData[0].avgPrice : 0;
  const shouldDCA = avgPrice < targetPrice;

  return {
    klineData,
    avgPrice,
    shouldDCA,
    targetPrice,
  };
};

export default memoizeOne(getDisplayData, isEqual);
