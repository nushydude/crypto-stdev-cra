import { calculateStandardDeviation } from './calculateStandardDeviation';

test('calculates standard deviation correctly', () => {
  const values = [
    9, 2, 5, 4, 12, 7, 8, 11, 9, 3, 7, 4, 12, 5, 4, 10, 9, 6, 9, 4,
  ];
  expect(calculateStandardDeviation(values)).toBe(Math.sqrt(8.9));
});
