import { VariantResponse } from '.';

export type GetABTestResponse = {
  /**
   * The ab test name.
   */
  name: string;

  /**
   * The ab test status.
   */
  status: string;

  /**
   * The ab test list of variants.
   */
  variants: VariantResponse[];

  /**
   * The ab test end date, if any.
   */
  endAt: string;

  /**
   * The ab test created date, if any.
   */
  createdAt: string;

  /**
   * The ab test updated date.
   */
  updatedAt: string;

  /**
   * The ab test unique identifier.
   */
  abTestID: number;

  /**
   * The ab test significance based on click data. Should be higher than 0.95 to be considered significant - no matter which variant is winning.
   */
  clickSignificance: number;

  /**
   *
   * The ab test significance based on conversion data. Should be higher than 0.95 to be considered significant - no matter which variant is winning.
   */
  conversionSignificance: number;
};
