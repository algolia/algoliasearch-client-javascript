export type FacetHit = {
  /**
   * The value of the facet.
   */
  readonly value: string;

  /**
   * The highlighted value.
   */
  readonly highlighted: string;

  /**
   * The count.
   */
  readonly count: number;
};
