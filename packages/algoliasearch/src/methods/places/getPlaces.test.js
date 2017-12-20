import { snapshotAll } from '../../testUtils/index.js';
import requester from 'algoliasearch-http-requester';

import getPlaces from './getPlaces.js';

it('regular getPlaces', () => {
  const requests = [
    getPlaces({ objectIDs: ['some_item', 'bingo'] }, { requester }),
    getPlaces(
      {
        objectIDs: ['some_item', 'bingo'],

        attributesToRetrieve: ['sing', 'som'],
      },
      { requester }
    ),
  ];
  snapshotAll(requests);
});

it('errors when no objectIDs are given', () => {
  expect(() => getPlaces({ objectIDs: [] }, { requester })).toThrow();
});

it('errors when no attributesToRetrieve is not an array', () => {
  expect(() =>
    getPlaces({ attributesToRetrieve: 'test' }, { requester })
  ).toThrow();
  expect(() =>
    getPlaces({ attributesToRetrieve: { cool: 'test' } }, { requester })
  ).toThrow();
});
