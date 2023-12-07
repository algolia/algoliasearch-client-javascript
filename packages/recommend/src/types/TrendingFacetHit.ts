export type TrendingFacetHit<TObject> = {
  readonly _score: number;
  readonly facetName: string;
  readonly facetValue: TObject;
};
