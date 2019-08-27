export class ApiError extends Error {
  public readonly message: string;

  public readonly status: number;

  public constructor(message: string, status: number) {
    super(message);

    this.name = ApiError.name;
    this.message = message;
    this.status = status;
  }
}
