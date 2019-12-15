/* eslint sonarjs/cognitive-complexity: 0 */ // --> OFF

import { createNullCache } from '@algolia/cache-common';
import { createInMemoryCache } from '@algolia/cache-in-memory';
import { anything, spy, verify, when } from 'ts-mockito';

import { createFakeRequester, createFixtures } from '../fixtures';

const transporterRequest = createFixtures().transporterRequest();
transporterRequest.cacheable = true;

const drivers = [createNullCache, createInMemoryCache];

describe('request cache integration with cache drivers', () => {
  beforeEach(() => {
    if (testing.isBrowser()) {
      window.localStorage.clear();
    }
  });

  const expectedCalls = {
    'in-progress': {
      [createNullCache.name]: 13,
      [createInMemoryCache.name]: 4,
    },
    resolved: {
      [createNullCache.name]: 10,
      [createInMemoryCache.name]: 10,
    },
    rejected: {
      [createNullCache.name]: 10,
      [createInMemoryCache.name]: 10,
    },
  };

  it('cache read requests in progress', async () => {
    for (let index = 0; index < drivers.length; index++) {
      const requester = createFakeRequester();
      const requesterMock = spy(requester);

      when(requesterMock.send(anything())).thenResolve({
        content: JSON.stringify({ hits: [] }),
        status: 200,
        isTimedOut: false,
      });

      const driver = drivers[index]();

      const transporter = createFixtures().transporter(requester, {
        requestsCache: driver,
      });

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

      verify(requesterMock.send(anything())).times(
        expectedCalls['in-progress'][drivers[index].name]
      );
    }
  });

  it('do not cache read requests resolved', async () => {
    for (let index = 0; index < drivers.length; index++) {
      const requester = createFakeRequester();
      const requesterMock = spy(requester);

      when(requesterMock.send(anything())).thenResolve({
        content: JSON.stringify({ hits: [] }),
        status: 200,
        isTimedOut: false,
      });

      const driver = drivers[index]();

      const transporter = createFixtures().transporter(requester, {
        requestsCache: driver,
      });

      for (let callNumber = 1; callNumber <= 10; callNumber++) {
        await expect(transporter.read(transporterRequest)).resolves.toMatchObject({ hits: [] });
      }

      verify(requesterMock.send(anything())).times(expectedCalls.resolved[drivers[index].name]);
    }
  });

  it('do not cache read requests rejected', async () => {
    for (let index = 0; index < drivers.length; index++) {
      const requester = createFakeRequester();
      const requesterMock = spy(requester);

      when(requesterMock.send(anything())).thenResolve({
        content: 'Unreachable hosts - your application id...',
        status: 403,
        isTimedOut: false,
      });

      const driver = drivers[index]();

      const transporter = createFixtures().transporter(requester, {
        requestsCache: driver,
      });

      for (let callNumber = 1; callNumber <= 10; callNumber++) {
        await expect(transporter.read(transporterRequest)).rejects.toMatchObject({
          name: 'ApiError',
          message: 'Unreachable hosts - your application id...',
          status: 403,
        });
      }

      verify(requesterMock.send(anything())).times(expectedCalls.resolved[drivers[index].name]);
    }
  });
});
