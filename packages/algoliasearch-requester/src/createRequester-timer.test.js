/* eslint prefer-promise-reject-errors: off */
import lolex from 'lolex';

import { createRequester } from './createRequester.js';

let clock;
beforeEach(() => {
  clock = lolex.install();
});
afterEach(() => {
  clock = clock.uninstall();
});

it('host indices are reset to 0 after 12s', async () => {
  const httpRequester = jest.fn(
    () =>
      httpRequester.mock.calls.length === 1
        ? Promise.reject({ reason: 'network' })
        : Promise.resolve()
  );
  const requester = createRequester({
    appId: 'the_slow_app',
    apiKey: '',
    httpRequester,
  });

  // retries, changes host
  await requester({
    requestType: 'read',
  });

  clock.tick('00:06');

  // starts at second host
  await requester({
    requestType: 'read',
  });

  clock.tick('00:06');
  // hosts reset
  await requester({
    requestType: 'read',
  });

  const usedHosts = httpRequester.mock.calls.map(
    ([{ url: { hostname } }]) => hostname
  );
  expect(usedHosts).toMatchSnapshot();

  expect(usedHosts[0]).toEqual('the_slow_app-dsn.algolia.net'); // first try
  expect(usedHosts[1]).toEqual('the_slow_app-1.algolianet.com'); // first retry
  expect(usedHosts[2]).toEqual('the_slow_app-1.algolianet.com'); // second try
  // wait 2 mins
  expect(usedHosts[3]).toEqual('the_slow_app-dsn.algolia.net'); // third try
});

it('resets timeout to default after 20 minutes', async () => {
  const httpRequester = jest.fn(
    () =>
      httpRequester.mock.calls.length === 1
        ? Promise.reject({
            reason: 'timeout',
          })
        : Promise.resolve({})
  );
  const requester = createRequester({
    appId: 'the_fun_app',
    apiKey: '',
    httpRequester,
  });

  // retries and augments timeout
  await requester({
    requestType: 'write',
  });

  clock.tick('10:00');

  // now has long timeout
  await requester({
    requestType: 'write',
  });

  clock.tick('10:00');
  // now has original timeout
  await requester({
    requestType: 'write',
  });

  const timeouts = httpRequester.mock.calls.map(([{ timeout }]) => timeout);

  expect(timeouts).toMatchSnapshot();

  // last timeout is back at n
  expect(timeouts[0]).toBe(timeouts[timeouts.length - 1]);
  // last timeout of first === timeout of second
  expect(timeouts[2]).toBe(timeouts[1]);
});
