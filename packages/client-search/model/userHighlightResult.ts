import type { HighlightResult } from './highlightResult';

export type UserHighlightResult = {
  /**
   * Show highlighted section and words matched on a query.
   */
  userID: Record<string, HighlightResult>;
  /**
   * Show highlighted section and words matched on a query.
   */
  clusterName: Record<string, HighlightResult>;
};
