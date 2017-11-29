import { snapshotAll, fakeRequester } from '../../testUtils/index.js';
import getPlaces from './getPlaces.js';

it('regular getPlaces', () => {
  const requests = [
    getPlaces(
      { objectIDs: ['some_item', 'bingo'] },
      { requester: fakeRequester }
    ),
    getPlaces(
      {
        objectIDs: ['some_item', 'bingo'],

        attributesToRetrieve: ['sing', 'som'],
      },
      { requester: fakeRequester }
    ),
  ];
  snapshotAll(requests);
});

it('errors when no objectIDs are given', () => {
  expect(() =>
    getPlaces({ objectIDs: [] }, { requester: fakeRequester })
  ).toThrow();
});

it('errors when no attributesToRetrieve is not an array', () => {
  expect(() =>
    getPlaces({ attributesToRetrieve: 'test' }, { requester: fakeRequester })
  ).toThrow();
  expect(() =>
    getPlaces(
      { attributesToRetrieve: { cool: 'test' } },
      { requester: fakeRequester }
    )
  ).toThrow();
});
