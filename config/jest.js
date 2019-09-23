/* eslint functional/no-let: 0 */ // --> OFF
/* eslint functional/immutable-data: 0 */ // --> OFF
/* eslint no-undef: 0 */ // --> OFF
jest.setTimeout(30000);

const NodeHttpRequester = require('../packages/requester-node-http').NodeHttpRequester;
const BrowserXhrRequester = require('../packages/requester-browser-xhr').BrowserXhrRequester;

const NullCache = require('../packages/cache-types').NullCache;
const InMemoryCache = require('../packages/cache-in-memory').InMemoryCache;
const BrowserLocalStorageCache = require('../packages/cache-browser-local-storage')
  .BrowserLocalStorageCache;

const drivers = {
  node: {
    Requester: NodeHttpRequester,
    RequestsCache: NullCache,
    HostsCache: NullCache,
    ResponsesCache: NullCache,
  },
  browser: {
    Requester: BrowserXhrRequester,
    RequestsCache: InMemoryCache,
    HostsCache: BrowserLocalStorageCache,
    ResponsesCache: InMemoryCache,
  },
};

global.testing = {
  requester: () => new drivers[environment].Requester(),
  requestsCache: () => new drivers[environment].RequestsCache(),
  hostsCache: () => new drivers[environment].HostsCache(),
  responsesCache: () => new drivers[environment].ResponsesCache(),
  environment: () => environment,
  isBrowser: () => isBrowser,
};
