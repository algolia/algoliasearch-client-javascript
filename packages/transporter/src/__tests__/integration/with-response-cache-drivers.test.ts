/* eslint sonarjs/cognitive-complexity: 0 */ // --> OFF

import { createBrowserLocalStorageCache } from '@algolia/cache-browser-local-storage';
import { createNullCache } from '@algolia/cache-common';
import { createInMemoryCache } from '@algolia/cache-in-memory';
import { version } from '@algolia/client-common';
import { anything, spy, verify, when } from 'ts-mockito';

import { createFakeRequester, createFixtures } from '../fixtures';

const transporterRequest = createFixtures().transporterRequest();

describe('response cache integration with cache drivers', () => {
  beforeEach(() => {
    transporterRequest.cacheable = true;

    if (testing.isBrowser()) {
      window.localStorage.clear();
    }
  });

  const drivers = [createNullCache, createInMemoryCache];
  const createBrowserLocalStorageCacheFunction = () =>
    createBrowserLocalStorageCache({ key: version });

  if (testing.isBrowser()) {
    drivers.push(createBrowserLocalStorageCacheFunction);
  }

  const expectedCalls = {
    '2xx': {
      [createNullCache.name]: 16,
      [createInMemoryCache.name]: 7,
      [createBrowserLocalStorageCacheFunction.name]: 7,
    },
    '4xx': {
      [createNullCache.name]: 10,
      [createInMemoryCache.name]: 10,
      [createBrowserLocalStorageCacheFunction.name]: 10,
    },
    '2xx-mutate-transporter': {
      [createNullCache.name]: 5,
      [createInMemoryCache.name]: 3,
      [createBrowserLocalStorageCacheFunction.name]: 3,
    },
  };

  it('cache 2xx results', async () => {
    for (let index = 0; index < drivers.length; index++) {
      transporterRequest.cacheable = true;
      const requester = createFakeRequester();
      const requesterMock = spy(requester);

      when(requesterMock.send(anything())).thenResolve({
        content: JSON.stringify({ hits: [] }),
        status: 200,
        isTimedOut: false,
      });

      const driver = drivers[index]();

      const transporter = createFixtures().transporter(requester, { responsesCache: driver });

      for (let callNumber = 1; callNumber <= 10; callNumber++) {
        transporterRequest.data = {};
        await expect(transporter.read(transporterRequest)).resolves.toMatchObject({ hits: [] });
      }

      for (let callNumber = 1; callNumber <= 3; callNumber++) {
        // Body is different every time, we should not cache here.
        transporterRequest.data = { callNumber };
        await expect(transporter.read(transporterRequest)).resolves.toMatchObject({ hits: [] });
      }

      for (let callNumber = 1; callNumber <= 3; callNumber++) {
        // We are explicit saying that we don't want any type of cache.
        transporterRequest.data = { callNumber };
        transporterRequest.cacheable = false;
        await expect(transporter.read(transporterRequest)).resolves.toMatchObject({ hits: [] });
      }

      verify(requesterMock.send(anything())).times(expectedCalls['2xx'][drivers[index].name]);
    }
  });

  it('do not cache 4xx results', async () => {
    for (let index = 0; index < drivers.length; index++) {
      const requester = createFakeRequester();
      const requesterMock = spy(requester);

      when(requesterMock.send(anything())).thenResolve({
        content: JSON.stringify({ message: 'Unauthorized' }),
        status: 400,
        isTimedOut: false,
      });

      const driver = drivers[index]();

      const transporter = createFixtures().transporter(requester, { responsesCache: driver });

      for (let callNumber = 1; callNumber <= 10; callNumber++) {
        await expect(transporter.read(transporterRequest)).rejects.toMatchObject({
          message: 'Unauthorized',
        });
      }

      verify(requesterMock.send(anything())).times(expectedCalls['4xx'][drivers[index].name]);
    }
  });

  it('transporter query parameters and headers are part of the cache key', async () => {
    for (let index = 0; index < drivers.length; index++) {
      transporterRequest.cacheable = true;
      const requester = createFakeRequester();
      const requesterMock = spy(requester);

      when(requesterMock.send(anything())).thenResolve({
        content: JSON.stringify({ hits: [] }),
        status: 200,
        isTimedOut: false,
      });

      const driver = drivers[index]();

      const transporter = createFixtures().transporter(requester, { responsesCache: driver });

      await expect(transporter.read(transporterRequest)).resolves.toMatchObject({ hits: [] });
      await expect(transporter.read(transporterRequest)).resolves.toMatchObject({ hits: [] });

      Object.assign(transporter.headers, {
        'new header': 'new header value',
      });

      await expect(transporter.read(transporterRequest)).resolves.toMatchObject({ hits: [] });

      Object.assign(transporter.queryParameters, {
        'new query parameter': 'new query parameter value',
      });

      await expect(transporter.read(transporterRequest)).resolves.toMatchObject({ hits: [] });
      await expect(transporter.read(transporterRequest)).resolves.toMatchObject({ hits: [] });

      verify(requesterMock.send(anything())).times(
        expectedCalls['2xx-mutate-transporter'][drivers[index].name]
      );
    }
  });
});
