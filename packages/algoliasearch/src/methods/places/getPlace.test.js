import { snapshotAll } from '../../testUtils/index.js';
import requester from 'algoliasearch-http-requester';

import getPlace from './getPlace.js';

it('regular getPlaces', () => {
  const requests = [
    getPlace({ objectID: 'some_item' }, { requester }),
    getPlace(
      {
        objectID: 'some_item',
        attributesToRetrieve: ['one', 'name'],
      },
      { requester }
    ),
  ];
  snapshotAll(requests);
});
