class Version {
  public major: number;
  public minor: number;
  public patch: number;
  public fullVersion: string;

  constructor(version: string) {
    const [major, minor, patch] = version.split('.').map((v) => parseInt(v, 10));
    this.major = major;
    this.minor = minor;
    this.patch = patch;
    this.fullVersion = version;
  }

  public toString(): string {
    return this.fullVersion;
  }

  public diff(other: Version): number[] {
    return [this.major - other.major, this.minor - other.minor, this.patch - other.patch];
  }
}

export default Version;
