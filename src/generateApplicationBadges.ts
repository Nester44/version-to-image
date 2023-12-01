import { existsSync, mkdirSync } from 'fs';
import { writeFile } from 'fs/promises';
import { env } from './env';
import { ApplicationSide, Color, Stage } from './types';
import { extractVersion } from './utils/extractVersion';
import { generateImage } from './utils/generateImage';
import { getUrl } from './utils/getUrl';

const BASE_URL = env.BITBUCKET_REPOS_URL;

const IMAGES_FOLDER = 'versionImages/';

export const generateApplicationBadges = async (appNames: string[]) => {
  let requestCounter = 0;
  let successCounter = 0;

  if (!existsSync(IMAGES_FOLDER)) {
    mkdirSync(IMAGES_FOLDER);
  }

  for (const appName of appNames) {
    for (const side of Object.values(ApplicationSide)) {
      for (const stage of Object.values(Stage)) {
        requestCounter++;
        const url = getUrl(BASE_URL, appName, side, stage);

        try {
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

          const image = generateImage(version, Color.green);

          writeFile(`${IMAGES_FOLDER}${appName}-${side}-${stage}.svg`, image);

          console.log(
            `${appName.toUpperCase()}-${side}-${stage}-${version}: ✅`,
          );

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
  console.log(
    `Number of failed requests: ${requestCounter - successCounter} ❌`,
  );
  console.log(`Generated images: ${successCounter} ✅`);
};
