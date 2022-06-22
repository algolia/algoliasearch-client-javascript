import type { MatchLevel } from './matchLevel';

export type SnippetResult = {
  /**
   * Markup text with occurrences highlighted.
   */
  value?: string;
  matchLevel?: MatchLevel;
};
