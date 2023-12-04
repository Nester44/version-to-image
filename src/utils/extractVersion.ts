import { ApplicationSide } from '../types';
import Version from './version';

const platformVersionRegex = /platformVersion\s*=\s*'([\w.-]+)'/i;

export const extractVersion = (rawFileContent: string, side: ApplicationSide): Version => {
  if (side === ApplicationSide.frontend) {
    const packageJson = JSON.parse(rawFileContent);
    return new Version(packageJson.version);
  }

  if (side === ApplicationSide.backend) {
    const platformVersionMatch = rawFileContent.match(platformVersionRegex);

    if (!platformVersionMatch) throw new Error('Could not extract version from raw file');

    return new Version(platformVersionMatch[1]);
  }

  throw new Error('Could not extract version from raw file');
};
