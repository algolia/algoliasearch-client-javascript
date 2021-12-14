import type { SynonymHitHighlightResult } from './synonymHitHighlightResult';

/**
 * Synonym object.
 */
export type SynonymHit = {
  /**
   * Unique identifier of the synonym object to be created or updated.
   */
  objectID: string;
  /**
   * Type of the synonym object.
   */
  type: SynonymHit.TypeEnum;
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

export namespace SynonymHit {
  export enum TypeEnum {
    Synonym = 'synonym',
    Onewaysynonym = 'onewaysynonym',
    Altcorrection1 = 'altcorrection1',
    Altcorrection2 = 'altcorrection2',
    Placeholder = 'placeholder',
  }
}
