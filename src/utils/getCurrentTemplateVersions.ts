import { ApplicationSide, Stage } from '../types';
import { fetchAndExtractVersion } from './fetchAndExtractVersion';
import Version from './version';

const TEMPLATE_APP_NAME = 'projecttemplate';

export const getCurrentTemplateVersions = async () => {
  const result = {} as Record<ApplicationSide, Version>;

  for (const side of Object.values(ApplicationSide)) {
    const version = await fetchAndExtractVersion(TEMPLATE_APP_NAME, side, Stage.develop);
    result[side] = version;
  }

  return result;
};
