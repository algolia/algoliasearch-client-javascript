import type { Edit } from './edit';

export type ConsequenceQuery = {
  /**
   * Words to remove.
   */
  remove?: string[];
  /**
   * Edits to apply.
   */
  edits?: Edit[];
};
