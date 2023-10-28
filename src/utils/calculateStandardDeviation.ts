import { calculateMean } from './calculateMean';

export const calculateStandardDeviation = (values: Array<number>) => {
  const mean = calculateMean(values);

  const variance =
    values.reduce((accum, value) => accum + Math.pow(value - mean, 2), 0) /
    values.length;

  return Math.sqrt(variance);
};
