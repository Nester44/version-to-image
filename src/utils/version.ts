class Version {
  constructor(
    public major: number,
    public minor: number,
    public patch: number,
  ) {}

  public static parse(version: string): Version {
    const [major, minor, patch] = version.split('.').map((v) => parseInt(v, 10));
    return new Version(major, minor, patch);
  }

  public toString(): string {
    return `${this.major}.${this.minor}.${this.patch}`;
  }

  public diff(other: Version): number[] {
    return [this.major - other.major, this.minor - other.minor, this.patch - other.patch];
  }
}

export default Version;
