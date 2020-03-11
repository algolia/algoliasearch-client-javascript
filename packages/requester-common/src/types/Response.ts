export type Response = {
  /**
   * The raw response from the server.
   */
  content: string;

  /**
   * If the request timeouted.
   */
  isTimedOut: boolean;

  /**
   * The http status code.
   */
  status: number;
};
