// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { Anchoring } from './anchoring';

/**
 * Parameters for the search.
 */
export type SearchRulesParams = {
  /**
   * Full text query.
   */
  query?: string;
  anchoring?: Anchoring;
  /**
   * Restricts matches to contextual rules with a specific context (exact match).
   */
  context?: string;
  /**
   * Requested page (zero-based).
   */
  page?: number;
  /**
   * Maximum number of hits in a page. Minimum is 1, maximum is 1000.
   */
  hitsPerPage?: number;
  /**
   * When specified, restricts matches to rules with a specific enabled status. When absent (default), all rules are retrieved, regardless of their enabled status.
   */
  enabled?: boolean;
  /**
   * A mapping of requestOptions to send along with the request.
   */
  requestOptions?: Array<Record<string, any>>;
};
