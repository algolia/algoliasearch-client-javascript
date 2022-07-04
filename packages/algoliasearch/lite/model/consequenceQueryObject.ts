import type { Edit } from './edit';

export type ConsequenceQueryObject = {
  /**
   * Words to remove.
   */
  remove?: string[];
  /**
   * Edits to apply.
   */
  edits?: Edit[];
};
