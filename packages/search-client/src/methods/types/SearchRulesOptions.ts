export type SearchRulesOptions = {
  /* eslint-disable functional/prefer-readonly-type */

  /** Full text query. */
  query?: string;

  /** When specified, restricts matches to rules with a specific anchoring type. When omitted, all anchoring types may match. */
  anchoring?: string;

  /** Restricts matches to contextual rules with a specific context (exact match). */
  context?: string;

  /** Requested page (zero-based). */
  page?: number;

  /** Maximum number of hits in a page. Minimum is 1, maximum is 1000. */
  hitsPerPage?: number;

  /**
   * When specified, restricts matches to rules with a specific enabled status.
   * When absent (default), all rules are retrieved, regardless of their enabled status.
   */
  enabled?: boolean;
};
