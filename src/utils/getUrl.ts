import { ApplicationSide, Stage } from '../types';

const versionFilePath: Record<ApplicationSide, string> = {
  frontend: 'frontend/raw/package.json',
  backend: 'backend/raw/build.gradle',
};

const branches: Record<Stage, string> = {
  develop: 'develop',
  production: 'master',
};

/**
 * @returns {string} URL of the raw file which contains the version of application
 * Example: https://devstack.vwgroup.com/bitbucket/projects/AP/repos/pati-backend/raw/build.gradle?at=refs%2Fheads%2Fdevelop
 */
export const getUrl = (
  baseUrl: string,
  appName: string,
  side: ApplicationSide,
  stage: Stage,
): string =>
  `${baseUrl}${appName}-${versionFilePath[side]}?at=refs%2Fheads%2F${branches[stage]}`;
