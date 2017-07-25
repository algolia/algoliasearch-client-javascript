// @flow

export type AppId = string;
export type ApiKey = string;
export type IndexName = string;
export type TaskID = string;
export type ObjectID = string;

export type Rule = Object; // todo: type this according to https://docs.google.com/document/d/1ZJY8uVbY-lUf88BeHZwSU5JQ-lKx6bMq8N7MnXyL1W4/edit#heading=h.dq5y55g3y74f
export type { Synonym } from './synonyms';

export type BatchActions =
  | 'addObject'
  | 'updateObject'
  | 'partialUpdateObject'
  | 'partialUpdateObjectNoCreate'
  | 'deleteObject'
  | 'delete'
  | 'clear';

export type SearchParameters = {|
  hitsPerPage?: number,
  // more
|};

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
