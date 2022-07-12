// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { ClickThroughRateEvent } from './clickThroughRateEvent';

export type GetClickThroughRateResponse = {
  /**
   * The click-through rate.
   */
  rate: number;
  /**
   * The number of click event.
   */
  clickCount: number;
  /**
   * The number of tracked search click.
   */
  trackedSearchCount: number;
  /**
   * A list of click-through rate events with their date.
   */
  dates: ClickThroughRateEvent[];
};
