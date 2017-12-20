import { snapshotAll } from '../../testUtils/index.js';
import requester from 'algoliasearch-http-requester';
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
      { requester }
    ),
  ];

  snapshotAll(requests);
});
