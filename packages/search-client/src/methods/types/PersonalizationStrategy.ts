import { EventScoring } from './EventScoring';
import { FacetScoring } from './FacetScoring';

export type PersonalizationStrategy = {
  readonly eventsScoring: { readonly [key: string]: EventScoring };
  readonly facetsScoring: { readonly [key: string]: FacetScoring };
};
