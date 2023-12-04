import { existsSync, mkdirSync } from 'fs';
import { writeFile } from 'fs/promises';
import { ApplicationSide, Stage } from './types';
import { BaseError } from './utils/errors';
import { fetchAndExtractVersion } from './utils/fetchAndExtractVersion';
import { generateImage } from './utils/generateImage';
import { getCurrentTemplateVersions } from './utils/getCurrentTemplateVersions';
import { VersionStatus, colorsByStatus, getVersionStatus } from './utils/getVersionStatus';

const IMAGES_FOLDER = 'versionImages/';

const emojiByStatus: Record<VersionStatus, string> = {
  [VersionStatus.upToDate]: '🟢',
  [VersionStatus.minorUpdate]: '🟡',
  [VersionStatus.majorUpdate]: '🔴',
};

export const generateApplicationBadges = async (appNames: string[]) => {
  console.log('Generating badges...\n');

  const templateVersions = await getCurrentTemplateVersions();

  console.log('Template versions:\n');
  console.log('frontend: ', templateVersions.frontend.toString());
  console.log('backend: ', templateVersions.backend.toString());
  console.log('\n');

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

          const versionStatus = getVersionStatus(templateVersions[side], version);
          const color = colorsByStatus[versionStatus];

          const image = generateImage(version.toString(), color);

          writeFile(`${IMAGES_FOLDER}${appName}-${side}-${stage}.svg`, image);

          console.log(
            `${emojiByStatus[versionStatus]} ${appName.toUpperCase()}-${side}-${stage}-${version}`,
          );

          successCounter++;
        } catch (error) {
          if (error instanceof BaseError) {
            console.log(error.message);
          } else {
            throw error;
          }
        }
      }
    }
  }
  console.log('\n');
  console.log(`Total number of requests: ${requestCounter}`);
  console.log(`Number of failed requests: ${requestCounter - successCounter} ❌`);
  console.log(`Generated images: ${successCounter} ✅`);
};
