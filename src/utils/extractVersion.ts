import { ApplicationSide } from '../types';

const platformVersionRegex = /platformVersion\s*=\s*'([\d.]+)'/;

export const extractVersion = (rawFileContent: string, side: ApplicationSide): string => {
  if (side === ApplicationSide.frontend) {
    const packageJson = JSON.parse(rawFileContent);
    return packageJson.version;
  }

  if (side === ApplicationSide.backend) {
    const platformVersionMatch = rawFileContent.match(platformVersionRegex);

    if (!platformVersionMatch) throw new Error('Could not extract version from raw file');

    return platformVersionMatch[1];
  }

  throw new Error('Could not extract version from raw file');
};
