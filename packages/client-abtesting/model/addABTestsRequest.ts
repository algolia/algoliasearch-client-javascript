// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { AddABTestsVariant } from './addABTestsVariant';

export type AddABTestsRequest = {
  /**
   * A/B test name.
   */
  name: string;

  /**
   * List of 2 variants for the A/B test.
   */
  variant: AddABTestsVariant[];

  /**
   * End date for the A/B test expressed as YYYY-MM-DDThh:mm:ssZ.
   */
  endAt: string;
};
