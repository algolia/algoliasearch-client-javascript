import { EventScoring, FacetScoring } from '.';

export type GetPersonalizationStrategyResponse = {
  readonly eventsScoring: { readonly [key: string]: EventScoring };
  readonly facetsScoring: { readonly [key: string]: FacetScoring };
  readonly taskID: number;
};
