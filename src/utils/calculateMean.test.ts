import { describe, it, expect } from 'vitest';
import { calculateMean } from './calculateMean';

describe('calculateMean', () => {
  it('calculates mean correctly', () => {
    const values = [1, 2, 3, 4, 5];
    expect(calculateMean(values)).toBe(3);
  });
});
