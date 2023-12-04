export class BaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class FetchError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = 'FetchError';
  }
}

export class ExtractVersionError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = 'ExtractVersionError';
  }
}
