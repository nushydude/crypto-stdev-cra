// filter(Boolean) did not work with typescript, so had to use filter(nonNullable) to remove nulls from an array
export function nonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}
