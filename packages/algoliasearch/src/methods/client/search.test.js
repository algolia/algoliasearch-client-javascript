import { snapshotAll, fakeRequester } from '../../testUtils/index.js';
import search from './search.js';

it('search', () => {
  const requests = [
    search(
      {
        requests: [
          {
            indexName: 'some_index',
            params: {},
          },
        ],
      },
      { requester: fakeRequester }
    ),
  ];

  snapshotAll(requests);
});
