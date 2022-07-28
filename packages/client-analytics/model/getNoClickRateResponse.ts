// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { NoClickRateEvent } from './noClickRateEvent';

export type GetNoClickRateResponse = {
  /**
   * The click-through rate.
   */
  rate: number;

  /**
   * The number of click event.
   */
  count: number;

  /**
   * The number of click event.
   */
  noClickCount: number;

  /**
   * A list of searches without clicks with their date, rate and counts.
   */
  dates: NoClickRateEvent[];
};
