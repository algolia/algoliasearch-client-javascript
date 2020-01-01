export type ApiError = Error & {
  /**
   * The http status code.
   */
  readonly status: number;
};
