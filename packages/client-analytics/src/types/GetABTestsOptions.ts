export type GetABTestsOptions = {
  /**
   * The number of ab tests to skip from the biginning of the list.
   */
  readonly offset?: number;

  /**
   *  The limit of the number of ab tests returned.
   */
  readonly limit?: number;

  /**
   *  Filters the returned ab tests by any indices starting with the
   *  provided prefix that are assigned to either variant of an ab test.
   */
  readonly indexPrefix?: string;

  /**
   *  Filters the returned ab tests by any indices ending with the
   *  provided suffix that are assigned to either variant of an ab test.
   */
  readonly indexSuffix?: string;
};
