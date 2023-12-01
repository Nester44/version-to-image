import { env } from '../env';
import { ApplicationSide, Stage } from '../types';
import { extractVersion } from './extractVersion';
import { getUrl } from './getUrl';

export const fetchAndExtractVersion = async (
  appName: string,
  side: ApplicationSide,
  stage: Stage,
) => {
  try {
    const url = getUrl(env.BITBUCKET_REPOS_URL, appName, side, stage);

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${env.BITBUCKET_API_TOKEN}` },
    });

    if (!response.ok) {
      throw new Error('Response is not ok');
    }

    const rawFile = await response.text();

    if (!rawFile) {
      throw new Error('Raw file is empty');
    }

    const version = extractVersion(rawFile, side);

    return version;
    // eslint-disable-next-line
  } catch (error: any) {
    throw new Error(`Error while fetching version: ${error.message}`);
  }
};
