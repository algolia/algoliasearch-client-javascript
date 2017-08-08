import { snapshotAll, fakeRequester } from '../../testUtils';
import getPlace from './getPlace';

it('regular getPlaces', () => {
  const requests = [
    getPlace({ requester: fakeRequester, objectID: 'some_item' }),
    getPlace({
      requester: fakeRequester,
      objectID: 'some_item',
      options: {
        attributesToRetrieve: ['one', 'name'],
      },
    }),
  ];
  snapshotAll(requests);
});
