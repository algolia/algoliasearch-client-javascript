export class MissingObjectIDError {
  public readonly name: string = 'MissingObjectIDError';

  public readonly message: string;

  public constructor(message: string) {
    this.message = message;
  }
}
