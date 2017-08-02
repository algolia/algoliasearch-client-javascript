// index methods that should be implemented, `true` if they are

export const apiMethods = {
  addApiKey: true,
  addObject: true,
  addObjects: true,
  batch: true,
  batchRules: true,
  batchSynonyms: true,
  browse: true,
  browseFrom: true,
  clearRules: true,
  clearSynonyms: true,
  deleteApiKey: true,
  deleteObject: false,
  deleteObjects: false,
  deleteRule: false,
  deleteSynonym: false,
  getApiKey: false,
  getObject: true,
  getObjects: true,
  getRule: false,
  getSettings: false,
  getSynonym: false,
  listApiKeys: false,
  partialUpdateObject: false,
  partialUpdateObjects: false,
  saveObject: false,
  saveObjects: false,
  saveRule: false,
  saveSynonym: false,
  search: true,
  searchForFacetValues: false,
  searchRules: false,
  searchSynonyms: false,
  setSettings: false,
  updateApiKey: false,
};

export const different = {
  waitTask: true, // different
};

export const requesterMethods = {
  clearCache: false,
};

export const separatePackage = {
  deleteByQuery: false,
  browseAll: false,
};
