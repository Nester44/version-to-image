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
    expect(extractVersion(input, ApplicationSide.frontend).toString()).toEqual(expected);
    expect(extractVersion(input2, ApplicationSide.frontend).toString()).toEqual(exected2);
  });

  it('should extract version from raw file for backend', () => {
    const input = readFileSync(fixturePath + 'backend/build.gradle', 'utf8');

    const expected = '6.0.2';
    expect(extractVersion(input, ApplicationSide.backend).toString()).toEqual(expected);
  });

  it('should extract version with postfix from raw file for backend', () => {
    const input = readFileSync(fixturePath + 'backend/1', 'utf8');

    const expected = '6.2.0-SNAPSHOT';
    expect(extractVersion(input, ApplicationSide.backend).toString()).toEqual(expected);
  });

  it('should throw error when version cannot be extracted', () => {
    const input = 'some invalid input';

    expect(() => extractVersion(input, ApplicationSide.frontend).toString()).toThrow();
    expect(() => extractVersion(input, ApplicationSide.backend).toString()).toThrow();
  });
});
