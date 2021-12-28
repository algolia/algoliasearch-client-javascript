import type { StandardEntries } from './standardEntries';

/**
 * Disable the builtin Algolia entries for a type of dictionary per language.
 */
export type DictionarySettingsRequest = {
  disableStandardEntries: StandardEntries;
};
