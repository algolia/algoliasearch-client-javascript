import { snapshotAll, fakeRequester } from '../../testUtils/index.js';
import search from './search.js';

it('search', () => {
  const requests = [
    search(
      {},
      {
        requester: fakeRequester,
        indexName: 'some_index',
      }
    ),
    search(
      { hitsPerPage: 4 },
      { requester: fakeRequester, indexName: 'other_index' }
    ),
  ];
  snapshotAll(requests);
});
