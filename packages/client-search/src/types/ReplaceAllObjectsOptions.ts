export type ReplaceAllObjectsOptions = {
  /**
   * If the all objects should be replaced using wait operations. Keep
   * in mind that, when the `safe` option is used, the operation may
   * take a little more than expected.
   */
  readonly safe?: boolean;
};
