import { createBrowserLocalStorageCache } from '@algolia/cache-browser-local-storage';
import { createNullCache } from '@algolia/cache-common';
import { createInMemoryCache } from '@algolia/cache-in-memory';
import { version } from '@algolia/client-common';
import { anything, spy, verify, when } from 'ts-mockito';

import { createFakeRequester, createFixtures } from '../fixtures';

const transporterRequest = createFixtures().transporterRequest();
const drivers = [createNullCache, createInMemoryCache];

const createBrowserLocalStorageCacheFunction = () =>
  createBrowserLocalStorageCache({ key: version });

if (testing.isBrowser()) {
  drivers.push(createBrowserLocalStorageCacheFunction);
}

describe('hosts cache integration with cache drivers', () => {
  beforeEach(() => {
    if (testing.isBrowser()) {
      window.localStorage.clear();
    }
  });

  const expectedCalls = [
    {
      [createNullCache.name]: 4,
      [createInMemoryCache.name]: 3,
      [createBrowserLocalStorageCacheFunction.name]: 3,
    },
    {
      [createNullCache.name]: 4,
      // all down.
      [createInMemoryCache.name]: 4,
      [createBrowserLocalStorageCacheFunction.name]: 4,
    },
    {
      [createNullCache.name]: 4,
      // all down.
      [createInMemoryCache.name]: 4,
      [createBrowserLocalStorageCacheFunction.name]: 4,
    },
  ];

  it('preserve hosts state between calls', async () => {
    const driversCreated = drivers.map(driver => driver());

    for (let callsNumber = 0; callsNumber < 2; callsNumber++) {
      for (let index = 0; index < drivers.length; index++) {
        const requester = createFakeRequester();
        const requesterMock = spy(requester);

        when(requesterMock.send(anything())).thenResolve({
          content: JSON.stringify({ hits: [] }),
          status: 500,
          isTimedOut: false,
        });

        const transporter = createFixtures().transporter(requester, {
          hostsCache: driversCreated[index],
        });

        const message =
          // eslint-disable-next-line max-len
          'Unreachable hosts - your application id may be incorrect. If the error persists, contact support@algolia.com.';

        await expect(transporter.read(transporterRequest)).rejects.toMatchObject({
          message,
          name: 'RetryError',
        });

        await expect(transporter.write(transporterRequest)).rejects.toMatchObject({
          message,
          name: 'RetryError',
        });

        verify(requesterMock.send(anything())).times(
          expectedCalls[callsNumber][drivers[index].name]
        );
      }
    }
  });
});
