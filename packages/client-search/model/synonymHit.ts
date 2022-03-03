import type { SynonymHitHighlightResult } from './synonymHitHighlightResult';
import type { SynonymType } from './synonymType';

/**
 * Synonym object.
 */
export type SynonymHit = {
  /**
   * Unique identifier of the synonym object to be created or updated.
   */
  objectID: string;
  type: SynonymType;
  /**
   * Words or phrases to be considered equivalent.
   */
  synonyms?: string[];
  /**
   * Word or phrase to appear in query strings (for onewaysynonym).
   */
  input?: string;
  /**
   * Word or phrase to appear in query strings (for altcorrection1 and altcorrection2).
   */
  word?: string;
  /**
   * Words to be matched in records.
   */
  corrections?: string[];
  /**
   * Token to be put inside records.
   */
  placeholder?: string;
  /**
   * List of query words that will match the token.
   */
  replacements?: string[];
  _highlightResult?: SynonymHitHighlightResult;
};
