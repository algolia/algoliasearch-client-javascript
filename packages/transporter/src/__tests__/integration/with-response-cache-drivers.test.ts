/* eslint sonarjs/cognitive-complexity: 0 */ // --> OFF

import { Fixtures, FakeRequester } from '../Fixtures';
import { mock, anything, when, verify } from 'ts-mockito';
import { InMemoryCache } from '@algolia/cache-in-memory';
import { BrowserLocalStorageCache } from '@algolia/cache-browser-local-storage';
import { NullCache } from '@algolia/cache-types';

const transporterRequest = Fixtures.transporterRequest();

describe('response cache integration with cache drivers', () => {
  beforeEach(async () => {
    transporterRequest.cacheable = true;

    // @ts-ignore
    // eslint-disable-next-line no-undef
    if (testing.isBrowser()) {
      await new BrowserLocalStorageCache().clear();
    }
  });

  const drivers = [NullCache, InMemoryCache];

  // @ts-ignore
  // eslint-disable-next-line no-undef
  if (testing.isBrowser()) {
    drivers.push(BrowserLocalStorageCache);
  }

  const expectedCalls = {
    '2xx': {
      [new NullCache().constructor.name]: 16,
      [new InMemoryCache().constructor.name]: 7,
      [new BrowserLocalStorageCache().constructor.name]: 7,
    },
    '4xx': {
      [new NullCache().constructor.name]: 10,
      [new InMemoryCache().constructor.name]: 10,
      [new BrowserLocalStorageCache().constructor.name]: 10,
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

      const driver = new drivers[index]();

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

      verify(requester.send(anything())).times(expectedCalls['2xx'][driver.constructor.name]);
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

      const driver = new drivers[index]();

      const transporter = Fixtures.transporter(requester, { responsesCache: driver });

      for (let callNumber = 1; callNumber <= 10; callNumber++) {
        await expect(transporter.read(transporterRequest)).rejects.toMatchObject({
          message: 'Unauthorized',
        });
      }

      verify(requester.send(anything())).times(expectedCalls['4xx'][driver.constructor.name]);
    }
  });
});
