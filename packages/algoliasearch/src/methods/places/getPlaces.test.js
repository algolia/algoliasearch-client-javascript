import { snapshotAll, fakeRequester } from '../../testUtils';
import getPlaces from './getPlaces';

it('regular getPlaces', () => {
  const requests = [
    getPlaces({ requester: fakeRequester, objectIDs: ['some_item', 'bingo'] }),
    getPlaces({
      requester: fakeRequester,
      objectIDs: ['some_item', 'bingo'],
      attributesToRetrieve: ['sing', 'som'],
    }),
  ];
  snapshotAll(requests);
});

it('errors when no objectIDs are given', () => {
  expect(() =>
    getPlaces({ requester: fakeRequester, objectIDs: [] })
  ).toThrow();
});

it('errors when no attributesToRetrieve is not an array', () => {
  expect(() =>
    getPlaces({ requester: fakeRequester, attributesToRetrieve: 'test' })
  ).toThrow();
  expect(() =>
    getPlaces({
      requester: fakeRequester,
      attributesToRetrieve: { cool: 'test' },
    })
  ).toThrow();
});
