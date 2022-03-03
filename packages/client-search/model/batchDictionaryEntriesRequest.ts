import type { DictionaryAction } from './dictionaryAction';
import type { DictionaryEntry } from './dictionaryEntry';

export type BatchDictionaryEntriesRequest = {
  action: DictionaryAction;
  body: DictionaryEntry;
};
