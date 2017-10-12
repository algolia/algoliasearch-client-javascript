// @flow

export type AppId = string;
export type ApiKey = string;
export type IndexName = string;
export type TaskID = string;
export type ObjectID = string;
export type Attribute = string;
export type AlgoliaValue =
  | string
  | number
  | AlgoliaValue[]
  | { [key: Attribute]: AlgoliaValue };
export type AlgoliaObject = { [key: Attribute]: AlgoliaValue };

export type ClientMethods = {
  batch: Function,
  getLogs: Function,
  listIndexes: Function,
  search: Function,
  // non-api methods
  requester: Function,
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

export type BatchActions =
  | 'addObject'
  | 'updateObject'
  | 'partialUpdateObject'
  | 'partialUpdateObjectNoCreate'
  | 'deleteObject'
  | 'delete'
  | 'clear';

export type GetObjectParameters = {| attributesToRetrieve: string[] |};

export type SearchParameters = {
  hitsPerPage?: number,
  query?: string,
  filters?: string,
  queryType?: 'prefixLast' | 'prefixAll' | 'prefixNone',
  attributesToRetrieve?: string[],
  attributesToHighlight?: string[],
  sortFacetValuesBy: 'alpha' | 'count',
  // todo: add all search parameters
};

export type BrowseParameters = {
  ...SearchParameters,
  // todo: exclude impossible params
};

// todo: type this according to https://docs.google.com/document/d/1ZJY8uVbY-lUf88BeHZwSU5JQ-lKx6bMq8N7MnXyL1W4/edit#heading=h.dq5y55g3y74f
export type Rule = {};

export type SimpleSynonym = {|
  objectID: string,
  type: 'synonym',
  synonyms: string[],
|};

export type OneWaySynonym = {|
  objectID: string,
  type: 'onewaysynonym',
  input: string,
  synonyms: string[],
|};

export type AltCorrectionSynonym = {|
  objectID: string,
  type: 'altcorrection1' | 'altcorrection2',
  word: string,
  corrections: string[],
|};

export type PlaceholderSynonym = {|
  objectID: string,
  type: 'placeholder',
  placeholder: string,
  replacements: string[],
|};

export type Synonym =
  | SimpleSynonym
  | OneWaySynonym
  | AltCorrectionSynonym
  | PlaceholderSynonym;
