// client methods that should be implemented, `true` if they are

export const apiMethods = {
  addApiKey: true,
  batch: true,
  clearIndex: true,
  copyIndex: true,
  deleteApiKey: true,
  deleteIndex: true,
  getApiKey: true,
  getLogs: true,
  initIndex: true,
  listApiKeys: true,
  listIndexes: true,
  moveIndex: true,
  search: true,
  updateApiKey: true,
  node: {
    generateSecuredApiKey: false,
  },
};

export const requesterMethods = {
  setSecurityTags: false, // deprecate and remove
  clearCache: false,
  setExtraHeader: false, // move to requestParams.headers
  getExtraHeader: false,
  unsetExtraHeader: false,
  setTimeouts: false, // move to requestParams.timeouts
  setRequestTimeout: false,
  getTimeouts: false,
  nodeOnly: {
    destroy: false, // maybe remove
    disableRateLimitForward: false, // move to requestParams.headers
    disableSecuredAPIKey: false,
    enableRateLimitForward: false,
    useSecuredAPIKey: false,
  },
};
