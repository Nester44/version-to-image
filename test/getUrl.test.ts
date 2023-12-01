import { ApplicationSide, Stage } from '../src/types';
import { getUrl } from './../src/utils/getUrl';

describe('getUrl', () => {
  it('should return url', () => {
    const baseUrl = 'https://devstack.vwgroup.com/bitbucket/projects/AP/repos/';
    const appName = 'pati';
    const expected = `https://devstack.vwgroup.com/bitbucket/projects/AP/repos/pati-frontend/raw/package.json?at=refs%2Fheads%2Fdevelop`;
    expect(
      getUrl(baseUrl, appName, ApplicationSide.frontend, Stage.develop),
    ).toEqual(expected);
  });
});
