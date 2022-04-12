/**
 * Selects a strategy to remove words from the query when it doesn\'t match any hits.
 */

export type RemoveWordsIfNoResults =
  | 'allOptional'
  | 'firstWords'
  | 'lastWords'
  | 'none';
