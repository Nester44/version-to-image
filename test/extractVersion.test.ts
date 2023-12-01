import path from 'path';
import { ApplicationSide } from '../src/types';
import { extractVersion } from '../src/utils/extractVersion';
import { readFileSync } from 'fs';

const fixturePath = path.join(__dirname, 'fixtures/');

describe('extractVersion', () => {
  it('should extract version from raw file for frontend', () => {
    const input = `{
        "name": "@vwgroup/pati-frontend",
        "version": "1.0.0"
    }`;

    const input2 = readFileSync(fixturePath + 'frontend/package.json', 'utf8');

    const expected = '1.0.0';
    const exected2 = '0.0.1';
    expect(extractVersion(input, ApplicationSide.frontend)).toEqual(expected);
    expect(extractVersion(input2, ApplicationSide.frontend)).toEqual(exected2);
  });

  it('should extract version from raw file for backend', () => {
    const input = readFileSync(fixturePath + 'backend/build.gradle', 'utf8');

    const expected = '6.0.2';
    expect(extractVersion(input, ApplicationSide.backend)).toEqual(expected);
  });

  it('should throw error when version cannot be extracted', () => {
    const input = 'some invalid input';

    expect(() => extractVersion(input, ApplicationSide.frontend)).toThrow();
    expect(() => extractVersion(input, ApplicationSide.backend)).toThrow();
  });
});
