// @flow

export type AppId = string;
export type ApiKey = string;
export type IndexName = string;
export type TaskID = string;
export type ObjectID = string;
export type UserID = string;
export type ClusterID = string;
export type Attribute = string;
export type AlgoliaValue =
  | string
  | number
  | AlgoliaValue[]
  | { [key: Attribute]: AlgoliaValue };
export type AlgoliaObject = { [key: Attribute]: AlgoliaValue };

export type ClientMethods = {
  addApiKey: Function,
  batch: Function,
  clearIndex: Function,
  copyIndex: Function,
  deleteApiKey: Function,
  deleteIndex: Function,
  getApiKey: Function,
  getLogs: Function,
  index: Function,
  listApiKeys: Function,
  listIndexes: Function,
  moveIndex: Function,
  search: Function,
  updateApiKey: Function,
  // non-api methods
  requester: Function,
};

export type IndexMethods = {
  addApiKey: Function,
  addObject: Function,
  addObjects: Function,
  batch: Function,
  batchRules: Function,
  batchSynonyms: Function,
  browse: Function,
  browseAll: Function,
  browseFrom: Function,
  clearRules: Function,
  clearSynonyms: Function,
  deleteApiKey: Function,
  deleteBy: Function,
  deleteObject: Function,
  deleteObjects: Function,
  deleteRule: Function,
  deleteSynonym: Function,
  getApiKey: Function,
  getObject: Function,
  getObjects: Function,
  getRule: Function,
  getSettings: Function,
  getSynonym: Function,
  index: Function,
  listApiKeys: Function,
  partialUpdateObject: Function,
  partialUpdateObjects: Function,
  saveObject: Function,
  saveObjects: Function,
  saveRule: Function,
  saveSynonym: Function,
  search: Function,
  searchForFacetValues: Function,
  searchRules: Function,
  searchSynonyms: Function,
  setSettings: Function,
  updateApiKey: Function,
  // non-api methods
  requester: Function,
  waitTask: Function,
};

export type BatchActions =
  | 'addObject'
  | 'updateObject'
  | 'partialUpdateObject'
  | 'partialUpdateObjectNoCreate'
  | 'deleteObject'
  | 'delete'
  | 'clear';

// todo: type the settings
export type Settings = {};

export type SearchParameters = {
  hitsPerPage?: number,
  query?: string,
  filters?: string,
  queryType?: 'prefixLast' | 'prefixAll' | 'prefixNone',
  attributesToRetrieve?: string[],
  attributesToHighlight?: string[],
  sortFacetValuesBy?: 'alpha' | 'count',
  // todo: add all search parameters
};

export type BrowseParameters = {
  ...SearchParameters,
  // todo: exclude impossible params
};

// todo: type this according to https://docs.google.com/document/d/1ZJY8uVbY-lUf88BeHZwSU5JQ-lKx6bMq8N7MnXyL1W4/edit#heading=h.dq5y55g3y74f
export type Rule = { objectID: string };

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

export type SynonymType =
  | 'synonym'
  | 'onewaysynonym'
  | 'altcorrection1'
  | 'altcorrection2'
  | 'placeholder';

export type ACL =
  | 'search'
  | 'browse'
  | 'addObject'
  | 'deleteObject'
  | 'deleteIndex'
  | 'settings'
  | 'editSettings'
  | 'analytics'
  | 'listIndexes';

export type ApiKeyOptions = {|
  acls?: ACL[],
  description?: string,
  maxHitsPerQuery?: number,
  maxQueriesPerIPPerHour?: number,
  queryParameters?: string,
  referers?: string[],
  validity?: number,
|};
