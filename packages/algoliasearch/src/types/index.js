// @flow

export type AppId = string;
export type ApiKey = string;
export type IndexName = string;
export type TaskID = string;
export type ObjectID = string;

export type { Rule } from './rules';
export type { Synonym } from './synonyms';
export type { GetObjectParameters, SearchParameters } from './parameters';

export type BatchActions =
  | 'addObject'
  | 'updateObject'
  | 'partialUpdateObject'
  | 'partialUpdateObjectNoCreate'
  | 'deleteObject'
  | 'delete'
  | 'clear';

export type Method = 'POST' | 'GET' | 'DELETE' | 'PUT';
export type RequestOptions = {
  method: Method,
  path: string,
  qs?: Object,
  body?: Object,
  options?: Object,
};
export type Result = Object;
export type RequestMethod = RequestOptions => Promise<Result>;
export type Requester = (appId: AppId, apiKey: ApiKey) => RequestMethod;

export type ClientMethods = {
  batch: Function,
  getLogs: Function,
  listIndexes: Function,
  search: Function,
};

export type IndexMethods = {
  batch: Function,
  clear: Function,
  copy: Function,
  remove: Function,
  browse: Function,
  browseFrom: Function,
  move: Function,
  search: Function,
  waitTask: Function,
};
