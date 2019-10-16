export type Edit = {
  /* eslint-disable functional/prefer-readonly-type */

  /**
   * Type of edit @see Enums.EditType
   */
  type?: string;

  /** Text or patterns to remove from the query string. */
  delete?: string;

  /** Text that should be inserted in place of the removed text inside the query string. */
  insert?: string;
};
