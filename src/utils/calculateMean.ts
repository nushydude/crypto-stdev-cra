export const calculateMean = (values: Array<number>) => {
  return values.reduce((accum, value) => accum + value, 0) / values.length;
};
