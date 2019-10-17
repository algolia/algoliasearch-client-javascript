/* eslint functional/no-let: 0 */ // --> OFF
/* eslint functional/immutable-data: 0 */ // --> OFF
/* eslint no-undef: 0 */ // --> OFF
jest.setTimeout(60000);

global.testing = {
  environment: () => environment,
  isBrowser: () => isBrowser,
};
