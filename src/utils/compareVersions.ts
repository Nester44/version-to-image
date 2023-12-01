import { ComparisonResult } from '../types';

export const compareVersions = (
  compareAble: string,
  compareTo: string,
): ComparisonResult => {
  compareAble = compareAble.replaceAll('.', '');
  compareTo = compareTo.replaceAll('.', '');

  if (compareAble.length !== compareTo.length) {
    throw new Error('Versions are not comparable');
  }

  for (let i = 0; i < compareAble.length; i++) {
    if (compareAble[i] > compareTo[i]) {
      return ComparisonResult.Greater;
    } else if (compareAble[i] < compareTo[i]) {
      return ComparisonResult.Less;
    }
  }
  return ComparisonResult.Equal;
};
