import type { DictionaryEntry } from './dictionaryEntry';

export type BatchDictionaryEntriesRequest = {
  /**
   * Actions to perform.
   */
  action: BatchDictionaryEntriesRequest.ActionEnum;
  body: DictionaryEntry;
};

export namespace BatchDictionaryEntriesRequest {
  export enum ActionEnum {
    AddEntry = 'addEntry',
    DeleteEntry = 'deleteEntry',
  }
}
