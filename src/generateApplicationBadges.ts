import { existsSync, mkdirSync } from 'fs';
import { writeFile } from 'fs/promises';
import { env } from './env';
import { ApplicationSide, Color, ComparisonResult, Stage } from './types';
import { fetchAndExtractVersion } from './utils/fetchAndExtractVersion';
import { generateImage } from './utils/generateImage';
import { getCurrentTemplateVersions } from './utils/getCurrentTemplateVersions';
import { compareVersions } from './utils/compareVersions';

const BASE_URL = env.BITBUCKET_REPOS_URL;

const IMAGES_FOLDER = 'versionImages/';

export const generateApplicationBadges = async (appNames: string[]) => {
  console.log('Generating badges...\n');

  const templateVersions = await getCurrentTemplateVersions();

  let requestCounter = 0;
  let successCounter = 0;

  if (!existsSync(IMAGES_FOLDER)) {
    mkdirSync(IMAGES_FOLDER);
  }

  for (const appName of appNames) {
    for (const side of Object.values(ApplicationSide)) {
      for (const stage of Object.values(Stage)) {
        requestCounter++;
        try {
          const version = await fetchAndExtractVersion(appName, side, stage);

          let color: Color;

          switch (compareVersions(version, templateVersions[side])) {
            case ComparisonResult.Equal:
              color = Color.green;
              break;
            case ComparisonResult.Less:
              color = Color.red;
              break;
            default:
              color = Color.red;
          }

          const image = generateImage(version, color);

          writeFile(`${IMAGES_FOLDER}${appName}-${side}-${stage}.svg`, image);

          console.log(`${appName.toUpperCase()}-${side}-${stage}-${version}: ✅`);

          successCounter++;
        } catch (error: any) {
          console.log(error.message);
          console.log(`${appName.toUpperCase()}-${side}-${stage}: ❌`);
        }
      }
    }
  }
  console.log('\n');
  console.log(`Total number of requests: ${requestCounter}`);
  console.log(`Number of failed requests: ${requestCounter - successCounter} ❌`);
  console.log(`Generated images: ${successCounter} ✅`);
};
