export class RetryError {
  public readonly name: string;

  public readonly message: string;

  public constructor(message: string) {
    this.name = RetryError.name;
    this.message = message;
  }

  public static make(): RetryError {
    return new RetryError('Unreachable hosts');
  }
}
