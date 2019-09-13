import { Fixtures, FakeRequester } from '../Fixtures';
import { mock, anything, when, verify } from 'ts-mockito';
import { InMemoryCache } from '../../../../cache-in-memory/src';
import { BrowserLocalStorageCache } from '../../../../cache-browser-local-storage/src';
import { NullCache } from '@algolia/cache-types';

const transporterRequest = Fixtures.transporterRequest();

describe('response cache integration with cache drivers', () => {
  beforeEach(async () => {
    // local storage has global state
    await new BrowserLocalStorageCache().clear();
  });

  const drivers = [NullCache, InMemoryCache, BrowserLocalStorageCache];

  const expectedCalls = {
    '2xx': {
      [new NullCache().constructor.name]: 13,
      [new InMemoryCache().constructor.name]: 4,
      [new BrowserLocalStorageCache().constructor.name]: 4,
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
      when((requester = mock(FakeRequester)).send(anything())).thenResolve({
        content: JSON.stringify({ hits: [] }),
        status: 200,
        isTimedOut: false,
      });

      const driver = new drivers[index]();

      const transporter = Fixtures.transporter(requester, { responseCache: driver });

      for (let callNumber = 1; callNumber <= 10; callNumber++) {
        transporterRequest.data = {};
        await expect(transporter.read(transporterRequest)).resolves.toMatchObject({ hits: [] });
      }

      for (let callNumber = 1; callNumber <= 3; callNumber++) {
        // Body is different every time, we should not cache here.
        transporterRequest.data = { callNumber };
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

      const transporter = Fixtures.transporter(requester, { responseCache: driver });

      for (let callNumber = 1; callNumber <= 10; callNumber++) {
        await expect(transporter.read(transporterRequest)).rejects.toMatchObject({
          message: 'Unauthorized',
        });
      }

      verify(requester.send(anything())).times(expectedCalls['4xx'][driver.constructor.name]);
    }
  });
});
