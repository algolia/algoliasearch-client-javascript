export type GetABTestsOptions = {
  /**
   * The number of ab tests to skip from the biginning of the list.
   */
  readonly offset?: number;

  /**
   *  The limit of the number of ab tests returned.
   */
  readonly limit?: number;
};
