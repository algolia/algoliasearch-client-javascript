// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { TrendingModels } from './trendingModels';

export type BaseTrendingRequest = {
  model: TrendingModels;
  /**
   * The facet name to use for trending models.
   */
  facetName?: string;
  /**
   * The facet value to use for trending models.
   */
  facetValue?: string;
};
