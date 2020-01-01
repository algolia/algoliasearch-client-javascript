export type MultipleGetObjectsResponse<TResult> = {
  /**
   * The list of objects.
   */
  readonly results: readonly TResult[];
};
