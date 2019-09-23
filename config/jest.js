/* eslint functional/no-let: 0 */ // --> OFF
/* eslint functional/immutable-data: 0 */ // --> OFF
jest.setTimeout(30000);

global.testing = {
  requester: () => {
    let Requester;

    // eslint-disable-next-line no-undef
    if (environment === 'node') {
      Requester = require('../packages/requester-node-http').NodeHttpRequester;
    } else {
      Requester = require('../packages/requester-browser-xhr').BrowserXhrRequester;
    }

    return new Requester();
  },
  // eslint-disable-next-line no-undef,
  environment: () => environment,
  // eslint-disable-next-line no-undef,
  isBrowser: () => isBrowser,
};
