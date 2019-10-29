export type Edit = {
  /**
   * Type of edit @see EditType
   */
  readonly type?: string;

  /** Text or patterns to remove from the query string. */
  readonly delete?: string;

  /** Text that should be inserted in place of the removed text inside the query string. */
  readonly insert?: string;
};
