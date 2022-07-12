// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { EventScoring } from './eventScoring';
import type { FacetScoring } from './facetScoring';

export type PersonalizationStrategyParams = {
  /**
   * Scores associated with the events.
   */
  eventScoring: EventScoring[];
  /**
   * Scores associated with the facets.
   */
  facetScoring: FacetScoring[];
  /**
   * The impact that personalization has on search results: a number between 0 (personalization disabled) and 100 (personalization fully enabled).
   */
  personalizationImpact: number;
};
