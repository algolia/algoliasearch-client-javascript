/* eslint sonarjs/cognitive-complexity: 0 */ // --> OFF

import { Fixtures, FakeRequester } from '../Fixtures';
import { mock, anything, when, verify } from 'ts-mockito';
import { InMemoryCache } from '@algolia/cache-in-memory';
import { BrowserLocalStorageCache } from '@algolia/cache-browser-local-storage';
import { Cache, NullCache } from '@algolia/cache-types';

const transporterRequest = Fixtures.transporterRequest();

let drivers: Cache[] = [];

describe('hosts cache integration with cache drivers', () => {
  beforeEach(async () => {
    // @ts-ignore
    // eslint-disable-next-line no-undef
    if (testing.isBrowser()) {
      await new BrowserLocalStorageCache().clear();
    }

    drivers = [new NullCache(), new InMemoryCache()];

    // @ts-ignore
    // eslint-disable-next-line no-undef
    if (testing.isBrowser()) {
      drivers.push(new BrowserLocalStorageCache());
    }
  });

  const expectedCalls = [
    {
      [new NullCache().constructor.name]: 3,
      [new InMemoryCache().constructor.name]: 3,
      [new BrowserLocalStorageCache().constructor.name]: 3,
    },
    {
      [new NullCache().constructor.name]: 3,
      [new InMemoryCache().constructor.name]: 0,
      [new BrowserLocalStorageCache().constructor.name]: 0,
    },
    {
      [new NullCache().constructor.name]: 3,
      [new InMemoryCache().constructor.name]: 0,
      [new BrowserLocalStorageCache().constructor.name]: 0,
    },
  ];

  it('preserve hosts state between calls', async () => {
    for (let callsNumber = 0; callsNumber < 2; callsNumber++) {
      for (let index = 0; index < drivers.length; index++) {
        let requester: FakeRequester;

        when((requester = mock(FakeRequester)).send(anything())).thenResolve({
          content: JSON.stringify({ hits: [] }),
          status: 500,
          isTimedOut: false,
        });

        const driver = drivers[index];

        const transporter = Fixtures.transporter(requester, { hostsCache: driver });

        await expect(transporter.read(transporterRequest)).rejects.toMatchObject({
          message:
            'Unreachable hosts - your application id may be incorrect. If the error persists, contact support@algolia.com.',
          name: 'RetryError',
        });

        await expect(transporter.write(transporterRequest)).rejects.toMatchObject({
          message:
            'Unreachable hosts - your application id may be incorrect. If the error persists, contact support@algolia.com.',
          name: 'RetryError',
        });

        verify(requester.send(anything())).times(
          expectedCalls[callsNumber][driver.constructor.name]
        );
      }
    }
  });
});
