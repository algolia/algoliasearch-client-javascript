import { createBrowserLocalStorageCache } from '@algolia/cache-browser-local-storage/createBrowserLocalStorageCache';
import { createNullCache } from '@algolia/cache-common/createNullCache';
import { createInMemoryCache } from '@algolia/cache-in-memory/createInMemoryCache';
import { anything, mock, verify, when } from 'ts-mockito';

import { FakeRequester, Fixtures } from '../Fixtures';

const transporterRequest = Fixtures.transporterRequest();
const drivers = [createNullCache, createInMemoryCache];

// @ts-ignore
// eslint-disable-next-line no-undef
if (testing.isBrowser()) {
  drivers.push(createBrowserLocalStorageCache);
}

describe('hosts cache integration with cache drivers', () => {
  beforeEach(async () => {
    // @ts-ignore
    // eslint-disable-next-line no-undef
    if (testing.isBrowser()) {
      await createBrowserLocalStorageCache().clear();
    }
  });

  const expectedCalls = [
    {
      [createNullCache.name]: 3,
      [createInMemoryCache.name]: 3,
      [createBrowserLocalStorageCache.name]: 3,
    },
    {
      [createNullCache.name]: 3,
      [createInMemoryCache.name]: 0,
      [createBrowserLocalStorageCache.name]: 0,
    },
    {
      [createNullCache.name]: 3,
      [createInMemoryCache.name]: 0,
      [createBrowserLocalStorageCache.name]: 0,
    },
  ];

  it('preserve hosts state between calls', async () => {
    const driversCreated = drivers.map(driver => driver());

    for (let callsNumber = 0; callsNumber < 2; callsNumber++) {
      for (let index = 0; index < drivers.length; index++) {
        let requester: FakeRequester;

        when((requester = mock(FakeRequester)).send(anything())).thenResolve({
          content: JSON.stringify({ hits: [] }),
          status: 500,
          isTimedOut: false,
        });

        const transporter = Fixtures.transporter(requester, { hostsCache: driversCreated[index] });

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

        verify(requester.send(anything())).times(expectedCalls[callsNumber][drivers[index].name]);
      }
    }
  });
});
