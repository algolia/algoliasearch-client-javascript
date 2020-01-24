/* eslint functional/no-let: 0 */ // --> OFF
/* eslint functional/immutable-data: 0 */ // --> OFF
/* eslint no-undef: 0 */ // --> OFF
jest.setTimeout(180000);

global.testing = {
  environment: () => environment,
  isBrowser: () => isBrowser,
  isBrowserLite: () => isBrowser && environment === 'browser-lite',
};
