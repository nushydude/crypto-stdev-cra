import { calculateMean } from './calculateMean';

test('calculates mean correctly', () => {
  const values = [1, 2, 3, 4, 5];
  expect(calculateMean(values)).toBe(3);
});
