import type { Anchoring } from './anchoring';

export type Condition = {
  /**
   * Query pattern syntax.
   */
  pattern?: string;
  anchoring?: Anchoring;
  /**
   * Whether the pattern matches on plurals, synonyms, and typos.
   */
  alternatives?: boolean;
  /**
   * Rule context format: [A-Za-z0-9_-]+).
   */
  context?: string;
};
