// @flow

export type AppId = string;
export type ApiKey = string;
export type IndexName = string;
export type TaskID = string;
export type ObjectID = string;

export type { Rule } from './rules';
export type { Synonym } from './synonyms';
export type { GetObjectParameters, SearchParameters } from './parameters';
export type {
  RequestOptions,
  Method,
  RequestArguments,
  Result,
  RequestMethod,
  Requester,
} from './requester';

export type BatchActions =
  | 'addObject'
  | 'updateObject'
  | 'partialUpdateObject'
  | 'partialUpdateObjectNoCreate'
  | 'deleteObject'
  | 'delete'
  | 'clear';

export type ClientMethods = {
  batch: Function,
  getLogs: Function,
  listIndexes: Function,
  search: Function,
};

export type IndexMethods = {
  addApiKey: Function,
  batch: Function,
  browse: Function,
  browseFrom: Function,
  search: Function,
  // non-api methods
  requester: Function,
  waitForCompletion: Function,
};
