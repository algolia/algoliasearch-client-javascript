import { snapshotAll } from '../../testUtils/index.js';
import requester from 'algoliasearch-http-requester';
import search from './search.js';

it('search', () => {
  const requests = [
    search(
      {},
      {
        requester,
        indexName: 'some_index',
      }
    ),
    search({ hitsPerPage: 4 }, { requester, indexName: 'other_index' }),
  ];
  snapshotAll(requests);
});
