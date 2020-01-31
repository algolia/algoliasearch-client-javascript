export type Response = {
  /**
   * The raw response from the server.
   */
  readonly content: string;

  /**
   * If the request timeouted.
   */
  readonly isTimedOut: boolean;

  /**
   * The http status code.
   */
  readonly status: number;
};
