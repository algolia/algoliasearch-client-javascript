// client methods that should be implemented, `true` if they are

const apiMethods = {
  addApiKey: false,
  batch: true,
  clearIndex: true,
  copyIndex: true,
  deleteApiKey: false,
  deleteIndex: true,
  getApiKey: false,
  getLogs: true,
  initIndex: false,
  listApiKeys: false,
  listIndexes: true,
  moveIndex: true,
  search: true,
  updateApiKey: false,
  node: {
    generateSecuredApiKey: false,
  },
};

const requesterMethods = {
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
