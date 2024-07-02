import { nonNullable } from './nonNullable';

describe('nonNullable', () => {
  it('should return false for null', () => {
    expect(nonNullable(null)).toBe(false);
  });

  it('should return false for undefined', () => {
    expect(nonNullable(undefined)).toBe(false);
  });

  it('should return true for a non-null value', () => {
    expect(nonNullable(0)).toBe(true);
    expect(nonNullable('')).toBe(true);
    expect(nonNullable(false)).toBe(true);
    expect(nonNullable([])).toBe(true);
    expect(nonNullable({})).toBe(true);
    expect(nonNullable('string')).toBe(true);
    expect(nonNullable(123)).toBe(true);
  });

  it('should filter out null and undefined values from an array', () => {
    const array = [1, null, 2, undefined, 3];
    const filteredArray = array.filter(nonNullable);
    expect(filteredArray).toEqual([1, 2, 3]);
  });
});
