import { EventScoring, FacetScoring } from '.';

export type PersonalizationStrategy = {
  readonly eventsScoring: { readonly [key: string]: EventScoring };
  readonly facetsScoring: { readonly [key: string]: FacetScoring };
};
