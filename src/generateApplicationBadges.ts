import { existsSync, mkdirSync } from 'fs';
import { writeFile } from 'fs/promises';
import { ApplicationSide, Stage } from './types';
import { BaseError } from './utils/errors';
import { fetchAndExtractVersion } from './utils/fetchAndExtractVersion';
import { generateImage } from './utils/generateImage';
import { getCurrentTemplateVersions } from './utils/getCurrentTemplateVersions';
import { colorsByStatus, emojiByStatus, getVersionStatus } from './utils/getVersionStatus';

const IMAGES_FOLDER = 'versionImages/';

export const generateApplicationBadges = async (appNames: string[]) => {
  console.log('Generating badges...\n');

  const templateVersions = await getCurrentTemplateVersions();

  console.log('Template versions:\n');
  console.log('frontend: ' + templateVersions.frontend);
  console.log('backend: ' + templateVersions.backend);
  console.log();

  let requestCounter = 0;
  let successCounter = 0;
  const failedRequests: string[] = [];

  if (!existsSync(IMAGES_FOLDER)) {
    mkdirSync(IMAGES_FOLDER);
  }

  for (const appName of appNames) {
    for (const side of Object.values(ApplicationSide)) {
      for (const stage of Object.values(Stage)) {
        requestCounter++;
        try {
          const version = await fetchAndExtractVersion(appName, side, stage);

          const versionStatus = getVersionStatus(templateVersions[side], version);
          const color = colorsByStatus[versionStatus];

          const image = generateImage(version.toString(), color);

          writeFile(`${IMAGES_FOLDER}${appName}-${side}-${stage}.svg`, image);

          console.log(`${emojiByStatus[versionStatus]} ${appName}-${side}-${stage} ${version}`);

          successCounter++;
        } catch (error) {
          failedRequests.push(`${appName}-${side}-${stage}`);

          if (error instanceof BaseError) {
            console.log(error.message + ` ${appName}-${side}-${stage}`);
          } else {
            throw error;
          }
        }
      }
    }
  }
  console.log();
  console.log(`Number of failed requests: ${requestCounter - successCounter} ❌`);
  console.log(failedRequests);
  console.log();

  console.log(`Total number of requests: ${requestCounter}`);
  console.log(`Generated images: ${successCounter} ✅`);
};
