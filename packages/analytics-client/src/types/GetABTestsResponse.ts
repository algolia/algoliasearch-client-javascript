import { GetABTestResponse } from './GetABTestResponse';

export type GetABTestsResponse = {
  /**
   * The number of ab tests within this response.
   */
  readonly count: number;

  /**
   * The total of ab tests.
   */
  readonly total: number;

  /**
   * The list of ab tests.
   */
  readonly abtests: readonly GetABTestResponse[];
};
