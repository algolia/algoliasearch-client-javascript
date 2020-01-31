export const SynonymEnum: Readonly<Record<string, SynonymType>> = {
  Synonym: 'synonym',
  OneWaySynonym: 'oneWaySynonym',
  AltCorrection1: 'altCorrection1',
  AltCorrection2: 'altCorrection2',
  Placeholder: 'placeholder',
};

export type SynonymType =
  | 'synonym'
  | 'oneWaySynonym'
  | 'altCorrection1'
  | 'altCorrection2'
  | 'placeholder';

export type Synonym = {
  /**
   *  Synonym object ID.
   */
  readonly objectID: string;

  /**
   * There are 4 synonym types. The parameter can be one of the following value.
   */
  readonly type: SynonymType;

  /**
   * A list of synonyms.
   */
  readonly synonyms?: readonly string[];

  /**
   * Defines the synonym. A word or expression, used as the basis for the array of synonyms.
   */
  readonly input?: string;

  /**
   * A single word, used as the basis for the below array of corrections.
   */
  readonly word?: string;

  /**
   * An list of corrections of the word.
   */
  readonly corrections?: readonly string[];

  /**
   * A single word, used as the basis for the below list of replacements.
   */
  readonly placeholder?: string;

  /**
   * An list of replacements of the placeholder.
   */
  readonly replacements?: readonly string[];
};
