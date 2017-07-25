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
  getTimeouts: false,
  initIndex: false,
  listApiKeys: false,
  listIndexes: true,
  moveIndex: true,
  search: true,
  setSecurityTags: false,
  updateApiKey: false,
  node: {
    generateSecuredApiKey: false,
  },
};

const requesterMethods = {
  clearCache: false,
  extraHeaders: false, // js Map
  setTimeouts: false,
  setRequestTimeout: false,
  nodeOnly: {
    destroy: false,
    disableRateLimitForward: false,
    disableSecuredAPIKey: false,
    enableRateLimitForward: false,
    useSecuredAPIKey: false,
  },
};
