import { Fixtures, FakeRequester } from '../Fixtures';
import { mock, anything, when, verify } from 'ts-mockito';
import { InMemoryCache } from '@algolia/cache-in-memory';
import { BrowserLocalStorageCache } from '@algolia/cache-browser-local-storage';
import { NullCache } from '@algolia/cache-types';

const transporterRequest = Fixtures.transporterRequest();

describe('request cache integration with cache drivers', () => {
  beforeEach(async () => {
    // local storage has global state
    await new BrowserLocalStorageCache().clear();
  });

  const drivers = [NullCache, InMemoryCache, BrowserLocalStorageCache];

  const expectedCalls = {
    'in-progress': {
      [new NullCache().constructor.name]: 13,
      [new InMemoryCache().constructor.name]: 4,
      [new BrowserLocalStorageCache().constructor.name]: 4,
    },
    resolved: {
      [new NullCache().constructor.name]: 10,
      [new InMemoryCache().constructor.name]: 10,
      [new BrowserLocalStorageCache().constructor.name]: 10,
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

      const driver = new drivers[index]();

      const transporter = Fixtures.transporter(requester, { requestCache: driver });

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

      verify(requester.send(anything())).times(
        expectedCalls['in-progress'][driver.constructor.name]
      );
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

      const driver = new drivers[index]();

      const transporter = Fixtures.transporter(requester, { requestCache: driver });

      for (let callNumber = 1; callNumber <= 10; callNumber++) {
        await expect(transporter.read(transporterRequest)).resolves.toMatchObject({ hits: [] });
      }

      verify(requester.send(anything())).times(expectedCalls.resolved[driver.constructor.name]);
    }
  });
});
