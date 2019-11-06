import { VariantResponse } from '.';

export type GetABTestResponse = {
  /**
   * The ab test name.
   */
  readonly name: string;

  /**
   * The ab test status.
   */
  readonly status: string;

  /**
   * The ab test list of variants.
   */
  readonly variants: readonly VariantResponse[];

  /**
   * The ab test end date, if any.
   */
  readonly endAt: string;

  /**
   * The ab test created date, if any.
   */
  readonly createdAt: string;

  /**
   * The ab test unique identifier.
   */
  readonly abTestID: number;

  /**
   * The ab test significance based on click data. Should be > 0.95 to be considered significant - no matter which variant is winning.
   */
  readonly clickSignificance: number;

  /**
   *
   * The ab test significance based on conversion data. Should be > 0.95 to be considered significant - no matter which variant is winning.
   */
  readonly conversionSignificance: number;
};
