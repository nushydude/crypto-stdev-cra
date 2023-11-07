export const deepMergeSerializableObjects = (left: any, right: any): Object => {
  const isObject = (item: any): item is Record<string, any> =>
    item &&
    typeof item === 'object' &&
    !Array.isArray(item) &&
    !(item instanceof Date) &&
    !(item instanceof RegExp);

  if (!left) {
    return right;
  }

  if (!right) {
    return left;
  }

  const merged: any = { ...left };

  Object.keys(right).forEach((key) => {
    const leftValue = merged[key];
    const rightValue = right[key];

    if (isObject(leftValue) && isObject(rightValue)) {
      merged[key] = deepMergeSerializableObjects(leftValue, rightValue);
    } else {
      merged[key] = rightValue;
    }
  });

  return merged;
};
