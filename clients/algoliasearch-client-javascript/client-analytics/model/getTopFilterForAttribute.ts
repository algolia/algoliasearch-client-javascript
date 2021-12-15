export type GetTopFilterForAttribute = {
  /**
   * The attribute.
   */
  attribute: string;
  /**
   * The operator.
   */
  operator: string;
  /**
   * The value of the attribute.
   */
  value: string;
  /**
   * The number of occurrences.
   */
  count: number;
};
