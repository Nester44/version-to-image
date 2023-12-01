import { ComparisonResult } from '../src/types';
import { compareVersions } from './../src/utils/compareVersions';

describe('compareVersions', () => {
  it('should return ComparisonResult.Equal', () => {
    expect(compareVersions('1.0.0', '1.0.0')).toEqual(ComparisonResult.Equal);
    expect(compareVersions('1.0.0', '1.0.0')).toEqual(ComparisonResult.Equal);
  });

  it('should return ComparisonResult.Greater', () => {
    expect(compareVersions('1.1.0', '1.0.0')).toEqual(ComparisonResult.Greater);
    expect(compareVersions('1.1.0', '1.0.0')).toEqual(ComparisonResult.Greater);
    expect(compareVersions('1.1.0', '1.0.0')).toEqual(ComparisonResult.Greater);
  });

  it('should return ComparisonResult.Less', () => {
    expect(compareVersions('1.0.0', '1.1.0')).toEqual(ComparisonResult.Less);
    expect(compareVersions('1.0.0', '1.1.0')).toEqual(ComparisonResult.Less);
    expect(compareVersions('1.0.0', '1.1.0')).toEqual(ComparisonResult.Less);
  });

  it("should throw an error if versions aren't comparable", () => {
    expect(() => compareVersions('1.0.0', '1.0.0.0')).toThrowError(
      'Versions are not comparable',
    );
  });
});
