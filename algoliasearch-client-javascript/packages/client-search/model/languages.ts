import type { DictionaryLanguage } from './dictionaryLanguage';

/**
 * A dictionary language.
 */
export type Languages = {
  plurals: DictionaryLanguage | null;
  stopwords: DictionaryLanguage | null;
  compounds: DictionaryLanguage | null;
};
