import { ApplicationSide } from '../types';
import { ExtractVersionError } from './errors';
import Version from './version';

const platformVersionRegex = /platformVersion\s*=\s*'([\w.-]+)'/i;

const allProjectsBlockPattern = /allprojects\s*\{([\s\S]*?)\}/g;
const versionPattern = /version\s+'([^']+)'/;

export const extractVersion = (rawFileContent: string, side: ApplicationSide): Version => {
  if (side === ApplicationSide.frontend) {
    const packageJson = JSON.parse(rawFileContent);
    return new Version(packageJson.version);
  }

  if (side === ApplicationSide.backend) {
    // Looking for platformVersion
    const platformVersionMatch = rawFileContent.match(platformVersionRegex);

    if (platformVersionMatch) return new Version(platformVersionMatch[1]);

    // If platformVersion is not found, looking for version in allprojects block
    const allProjectsBlockMatch = rawFileContent.match(allProjectsBlockPattern);

    if (!allProjectsBlockMatch) {
      throw new ExtractVersionError('Could not extract version from build.gradle');
    }

    const allProjectsBlock = allProjectsBlockMatch[0];
    const versionMatch = allProjectsBlock.match(versionPattern);

    if (!versionMatch) {
      throw new ExtractVersionError('Could not extract version from build.gradle');
    }

    return new Version(versionMatch[1]);
  }

  throw new ExtractVersionError('Unsupported side');
};
