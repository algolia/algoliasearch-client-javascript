import type { DictionaryEntry } from './dictionaryEntry';

export type BatchDictionaryEntriesRequest = {
  /**
   * Actions to perform.
   */
  action: BatchDictionaryEntriesRequestAction;
  body: DictionaryEntry;
};

export type BatchDictionaryEntriesRequestAction = 'addEntry' | 'deleteEntry';
