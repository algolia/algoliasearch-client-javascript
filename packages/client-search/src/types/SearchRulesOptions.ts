export type SearchRulesOptions = {
  /**
   * Full text query.
   */
  readonly query?: string;

  /**
   * When specified, restricts matches to rules with a specific anchoring type. When omitted, all anchoring types may match.
   */
  readonly anchoring?: string;

  /**
   * Restricts matches to contextual rules with a specific context (exact match).
   */
  readonly context?: string;

  /**
   * Requested page (zero-based).
   */
  readonly page?: number;

  /**
   * Maximum number of hits in a page. Minimum is 1, maximum is 1000.
   */
  readonly hitsPerPage?: number;

  /**
   * When specified, restricts matches to rules with a specific enabled status.
   * When absent (default), all rules are retrieved, regardless of their enabled status.
   */
  readonly enabled?: boolean;
};
