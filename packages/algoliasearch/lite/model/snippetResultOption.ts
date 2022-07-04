import type { MatchLevel } from './matchLevel';

/**
 * Snippeted attributes show parts of the matched attributes. Only returned when attributesToSnippet is non-empty.
 */
export type SnippetResultOption = {
  /**
   * Markup text with occurrences highlighted.
   */
  value: string;
  matchLevel: MatchLevel;
};
