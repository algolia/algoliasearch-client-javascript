export class RetryError {
  public readonly name: string = 'RetryError';

  public readonly message: string =
    'Unreachable hosts - your application id may be incorrect. If the error persists, contact support@algolia.com.';
}
