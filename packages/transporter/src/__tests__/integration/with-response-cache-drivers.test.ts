/* eslint sonarjs/cognitive-complexity: 0 */ // --> OFF

import { createBrowserLocalStorageCache } from '@algolia/cache-browser-local-storage';
import { createNullCache } from '@algolia/cache-common';
import { createInMemoryCache } from '@algolia/cache-in-memory';
import { anything, mock, verify, when } from 'ts-mockito';

import { FakeRequester, Fixtures } from '../Fixtures';

const transporterRequest = Fixtures.transporterRequest();

describe('response cache integration with cache drivers', () => {
  beforeEach(async () => {
    transporterRequest.cacheable = true;

    // @ts-ignore
    // eslint-disable-next-line no-undef
    if (testing.isBrowser()) {
      await createBrowserLocalStorageCache().clear();
    }
  });

  const drivers = [createNullCache, createInMemoryCache];

  // @ts-ignore
  // eslint-disable-next-line no-undef
  if (testing.isBrowser()) {
    drivers.push(createBrowserLocalStorageCache);
  }

  const expectedCalls = {
    '2xx': {
      [createNullCache.name]: 16,
      [createInMemoryCache.name]: 7,
      [createBrowserLocalStorageCache.name]: 7,
    },
    '4xx': {
      [createNullCache.name]: 10,
      [createInMemoryCache.name]: 10,
      [createBrowserLocalStorageCache.name]: 10,
    },
  };

  it('cache 2xx results', async () => {
    let requester: FakeRequester;
    for (let index = 0; index < drivers.length; index++) {
      transporterRequest.cacheable = true;

      when((requester = mock(FakeRequester)).send(anything())).thenResolve({
        content: JSON.stringify({ hits: [] }),
        status: 200,
        isTimedOut: false,
      });

      const driver = drivers[index]();

      const transporter = Fixtures.transporter(requester, { responsesCache: driver });

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

      verify(requester.send(anything())).times(expectedCalls['2xx'][drivers[index].name]);
    }
  });

  it('do not cache 4xx results', async () => {
    let requester: FakeRequester;

    for (let index = 0; index < drivers.length; index++) {
      when((requester = mock(FakeRequester)).send(anything())).thenResolve({
        content: JSON.stringify({ message: 'Unauthorized' }),
        status: 400,
        isTimedOut: false,
      });

      const driver = drivers[index]();

      const transporter = Fixtures.transporter(requester, { responsesCache: driver });

      for (let callNumber = 1; callNumber <= 10; callNumber++) {
        await expect(transporter.read(transporterRequest)).rejects.toMatchObject({
          message: 'Unauthorized',
        });
      }

      verify(requester.send(anything())).times(expectedCalls['4xx'][drivers[index].name]);
    }
  });
});
