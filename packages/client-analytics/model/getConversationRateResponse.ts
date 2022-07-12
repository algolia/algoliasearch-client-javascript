// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { ConversionRateEvent } from './conversionRateEvent';

export type GetConversationRateResponse = {
  /**
   * The click-through rate.
   */
  rate: number;
  /**
   * The number of tracked search click.
   */
  trackedSearchCount: number;
  /**
   * The number of converted clicks.
   */
  conversionCount: number;
  /**
   * A list of conversion events with their date.
   */
  dates: ConversionRateEvent[];
};
