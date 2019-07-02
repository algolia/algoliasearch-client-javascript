export interface Response {
  readonly content: string;
  readonly isTimedOut: boolean;
  readonly statusCode: number;
}
