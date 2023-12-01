import { ApplicationSide, Stage } from '../types';
import { fetchAndExtractVersion } from './fetchAndExtractVersion';

const TEMPLATE_APP_NAME = 'projecttemplate';

export const getCurrentTemplateVersions = async (): Promise<Record<ApplicationSide, string>> => {
  const result = {} as Record<ApplicationSide, string>;

  for (const side of Object.values(ApplicationSide)) {
    const version = await fetchAndExtractVersion(TEMPLATE_APP_NAME, side, Stage.production);
    result[side] = version;
  }

  return result;
};
