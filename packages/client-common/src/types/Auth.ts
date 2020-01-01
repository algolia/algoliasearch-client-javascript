export type Auth = {
  /**
   * Returns the headers related to auth. Should be
   * merged to the transporter headers.
   */
  readonly headers: () => { readonly [key: string]: string };

  /**
   * Returns the query parameters related to auth. Should be
   * merged to the query parameters headers.
   */
  readonly queryParameters: () => { readonly [key: string]: string };
};
