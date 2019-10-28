/* eslint sonarjs/cognitive-complexity: 0 */ // --> OFF

import { createBrowserLocalStorageCache } from '@algolia/cache-browser-local-storage';
import { createInMemoryCache } from '@algolia/cache-in-memory';
import { createNullCache } from '@algolia/cache-types';
import { anything, mock, verify, when } from 'ts-mockito';

import { FakeRequester, Fixtures } from '../Fixtures';

const transporterRequest = Fixtures.transporterRequest();
transporterRequest.cacheable = true;

const drivers = [createNullCache, createInMemoryCache];

// @ts-ignore
// eslint-disable-next-line no-undef
if (testing.isBrowser()) {
  drivers.push(createBrowserLocalStorageCache);
}

describe('request cache integration with cache drivers', () => {
  beforeEach(async () => {
    // @ts-ignore
    // eslint-disable-next-line no-undef
    if (testing.isBrowser()) {
      await createBrowserLocalStorageCache().clear();
    }
  });

  const expectedCalls = {
    'in-progress': {
      [createNullCache.name]: 13,
      [createInMemoryCache.name]: 4,
      [createBrowserLocalStorageCache.name]: 4,
    },
    resolved: {
      [createNullCache.name]: 10,
      [createInMemoryCache.name]: 10,
      [createBrowserLocalStorageCache.name]: 10,
    },
  };

  it('cache read requests in progress', async () => {
    let requester: FakeRequester;

    for (let index = 0; index < drivers.length; index++) {
      when((requester = mock(FakeRequester)).send(anything())).thenResolve({
        content: JSON.stringify({ hits: [] }),
        status: 200,
        isTimedOut: false,
      });

      const driver = drivers[index]();

      const transporter = Fixtures.transporter(requester, { requestsCache: driver });

      const responses = [];
      for (let callNumber = 1; callNumber <= 10; callNumber++) {
        transporterRequest.data = {};
        responses.push(transporter.read(transporterRequest));
      }

      for (let callNumber = 1; callNumber <= 3; callNumber++) {
        transporterRequest.data = { callNumber };
        responses.push(transporter.read(transporterRequest));
      }

      for (let responsesNumber = 0; responsesNumber < responses.length; responsesNumber++) {
        await responses[responsesNumber];
      }

      verify(requester.send(anything())).times(expectedCalls['in-progress'][drivers[index].name]);
    }
  });

  it('do not cache read requests resolved', async () => {
    let requester: FakeRequester;

    for (let index = 0; index < drivers.length; index++) {
      when((requester = mock(FakeRequester)).send(anything())).thenResolve({
        content: JSON.stringify({ hits: [] }),
        status: 200,
        isTimedOut: false,
      });

      const driver = drivers[index]();

      const transporter = Fixtures.transporter(requester, { requestsCache: driver });

      for (let callNumber = 1; callNumber <= 10; callNumber++) {
        await expect(transporter.read(transporterRequest)).resolves.toMatchObject({ hits: [] });
      }

      verify(requester.send(anything())).times(expectedCalls.resolved[drivers[index].name]);
    }
  });
});
