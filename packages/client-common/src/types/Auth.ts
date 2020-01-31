export type Auth = {
  /**
   * Returns the headers related to auth. Should be
   * merged to the transporter headers.
   */
  readonly headers: () => Readonly<Record<string, string>>;

  /**
   * Returns the query parameters related to auth. Should be
   * merged to the query parameters headers.
   */
  readonly queryParameters: () => Readonly<Record<string, string>>;
};
