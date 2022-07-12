// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { ABTest } from './aBTest';

export type ListABTestsResponse = {
  /**
   * List of A/B tests.
   */
  abtests: ABTest[];
  /**
   * Number of A/B tests found for the app.
   */
  count: number;
  /**
   * Number of A/B tests retrievable.
   */
  total: number;
};
