import { snapshotAll, fakeRequester } from '../../testUtils';
import getPlace from './getPlace';

it('regular getPlaces', () => {
  const requests = [
    getPlace({ objectID: 'some_item' }, { requester: fakeRequester }),
    getPlace(
      {
        objectID: 'some_item',
        attributesToRetrieve: ['one', 'name'],
      },
      { requester: fakeRequester }
    ),
  ];
  snapshotAll(requests);
});
