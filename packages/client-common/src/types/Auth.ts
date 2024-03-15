export type Auth = {
  /**
   * Returns the headers related to auth. Should be merged into the headers.
   */
  readonly headers: () => Readonly<Record<string, string>>;

  /**
   * Returns the query parameters related to auth. Should be merged into the
   * query parameters.
   */
  readonly queryParameters: () => Readonly<Record<string, string>>;

  /**
   * Returns the data related to auth. Should be merged into the body.
   */
  readonly data: () => Readonly<Record<string, string>>;
};
