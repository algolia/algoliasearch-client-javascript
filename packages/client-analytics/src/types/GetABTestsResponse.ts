import { GetABTestResponse } from '.';

export type GetABTestsResponse = {
  /**
   * The number of ab tests within this response.
   */
  count: number;

  /**
   * The total of ab tests.
   */
  total: number;

  /**
   * The list of ab tests.
   */
  abtests: GetABTestResponse[] | null;
};
