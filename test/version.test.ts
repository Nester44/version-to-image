import Version from '../src/utils/version';

describe('version', () => {
  it('should parse version', () => {
    // Arrange
    const versionString = '1.2.3';
    // Act
    const version = new Version(versionString);
    // Assert
    expect(version.major).toBe(1);
    expect(version.minor).toBe(2);
    expect(version.patch).toBe(3);
  });

  it('should not drop postfixes', () => {
    // Arrange
    const versionString = '1.2.3-alpha';
    // Act
    const version = new Version(versionString);
    // Assert
    expect(version.toString()).toBe('1.2.3-alpha');
  });

  it('should convert version to string', () => {
    // Arrange
    const version = new Version('1.2.3');
    // Act
    const versionString = version.toString();
    // Assert
    expect(versionString).toBe('1.2.3');
  });

  it('should diff versions', () => {
    // Arrange
    const version1 = new Version('2.3.4');
    const version2 = new Version('1.2.3');
    // Act
    const diff = version1.diff(version2);
    // Assert
    expect(diff).toEqual([1, 1, 1]);
  });
});
