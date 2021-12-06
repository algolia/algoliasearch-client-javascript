import type { EventScoring } from './eventScoring';
import type { FacetScoring } from './facetScoring';

export type PersonalizationStrategyObject = {
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
