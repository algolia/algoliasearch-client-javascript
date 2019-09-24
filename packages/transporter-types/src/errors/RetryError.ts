export class RetryError {
  public readonly name: string;

  public readonly message: string;

  public constructor(
    message: string = 'Unreachable hosts - your application id may be incorrect. If the error persists, contact support@algolia.com.'
  ) {
    this.name = 'RetryError';
    this.message = message;
  }
}
