import type { EditType } from './editType';

export type Edit = {
  type?: EditType;
  /**
   * Text or patterns to remove from the query string.
   */
  delete?: string;
  /**
   * Text that should be inserted in place of the removed text inside the query string.
   */
  insert?: string;
};
