import { deepMergeSerializableObjects } from './deepMergeSerializableObjects';

describe('utils -> deepMergeSerializableObjects', () => {
  it('should deep merge two objects', () => {
    const left = {
      a: 1,
      b: 2,
      c: {
        d: 3,
        e: 4,
      },
      f: 5,
    };

    const right = {
      a: 100,
      b: {
        f: 200,
      },
      c: {
        d: 300,
        f: 400,
      },
    };

    const result = deepMergeSerializableObjects(left, right);

    expect(result).toStrictEqual({
      a: 100,
      b: {
        f: 200,
      },
      c: {
        d: 300,
        e: 4,
        f: 400,
      },
      f: 5,
    });
  });

  it('should return right, if left is nullable', () => {
    const left = null;

    const right = {
      a: 100,
      b: {
        f: 200,
      },
      c: {
        d: 300,
        f: 400,
      },
    };

    const result = deepMergeSerializableObjects(left, right);

    expect(result).toStrictEqual(right);
  });

  it('should return left, if right is nullable', () => {
    const left = {
      a: 100,
      b: {
        f: 200,
      },
      c: {
        d: 300,
        f: 400,
      },
    };

    const right = null;

    const result = deepMergeSerializableObjects(left, right);

    expect(result).toStrictEqual(left);
  });
});
