// @flow

export type AppId = string;
export type ApiKey = string;
export type IndexName = string;
export type TaskID = string;

export type Parameters = {|
  hitsPerPage?: number,
  // more
|};

export type BrowseParameters = {|
  cursor?: string,
|};

export type LogsParameters = {
  offset?: number,
  length?: number,
};

export type ListIndicesParameters = {
  page?: number,
};

type BatchActions =
  | 'addObject'
  | 'updateObject'
  | 'partialUpdateObject'
  | 'partialUpdateObjectNoCreate'
  | 'deleteObject'
  | 'delete'
  | 'clear';

export type ClientBatchRequest = {|
  action: BatchActions,
  indexName: IndexName,
  body?: Object,
|};

export type IndexBatchRequest = {|
  action: BatchActions,
  body?: Object,
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

export type RequestMethod = RequestOptions => Result;
