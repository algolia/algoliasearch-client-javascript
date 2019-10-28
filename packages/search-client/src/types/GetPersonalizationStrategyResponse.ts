import { EventScoring } from './EventScoring';
import { FacetScoring } from './FacetScoring';

export type GetPersonalizationStrategyResponse = {
  readonly eventsScoring: { readonly [key: string]: EventScoring };
  readonly facetsScoring: { readonly [key: string]: FacetScoring };
  readonly taskID: number;
};
