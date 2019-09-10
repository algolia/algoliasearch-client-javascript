export class ApiError {
  public readonly name: string;

  public readonly message: string;

  public readonly status: number;

  public constructor(message: string, status: number) {
    this.name = ApiError.name;
    this.message = message;
    this.status = status;
  }
}
