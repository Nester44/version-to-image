import { VersionStatus, getVersionStatus } from '../src/utils/getVersionStatus';
import Version from '../src/utils/version';

describe('getVersionStatus', () => {
  it('should return upToDate when versions are equal', () => {
    // Arrange
    const templateVersion = new Version('1.2.3');
    const actualVersion = new Version('1.2.3');
    // Act
    const status = getVersionStatus(templateVersion, actualVersion);
    // Assert
    expect(status).toBe(VersionStatus.upToDate);
  });

  it('should return majorUpdate when template version is higher', () => {
    // Arrange
    const templateVersion = new Version('2.2.3');
    const actualVersion = new Version('1.2.3');
    // Act
    const status = getVersionStatus(templateVersion, actualVersion);
    // Assert
    expect(status).toBe(VersionStatus.majorUpdate);
  });

  it('should return minorUpdate when template version is higher', () => {
    // Arrange
    const templateVersion = new Version('1.3.3');
    const actualVersion = new Version('1.2.3');
    // Act
    const status = getVersionStatus(templateVersion, actualVersion);
    // Assert
    expect(status).toBe(VersionStatus.minorUpdate);
  });
});
