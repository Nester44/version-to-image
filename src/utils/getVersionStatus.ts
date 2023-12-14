import { Color } from '../types';
import Version from './version';

export enum VersionStatus {
  upToDate,
  majorUpdate,
  minorUpdate,
}

export const getVersionStatus = (
  templateVersion: Version,
  actualVersion: Version,
): VersionStatus => {
  const [majorDiff, minorDiff] = templateVersion.diff(actualVersion);

  if (majorDiff > 0) return VersionStatus.majorUpdate;
  if (minorDiff > 0) return VersionStatus.minorUpdate;

  return VersionStatus.upToDate;
};

export const colorsByStatus: Record<VersionStatus, Color> = {
  [VersionStatus.upToDate]: Color.green,
  [VersionStatus.minorUpdate]: Color.yellow,
  [VersionStatus.majorUpdate]: Color.red,
};

export const emojiByStatus: Record<VersionStatus, string> = {
  [VersionStatus.upToDate]: '🟢',
  [VersionStatus.minorUpdate]: '🟡',
  [VersionStatus.majorUpdate]: '🔴',
};
