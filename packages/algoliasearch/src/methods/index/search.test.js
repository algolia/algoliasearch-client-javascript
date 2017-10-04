import { snapshotAll, fakeRequester } from '../../testUtils';
import search from './search';

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
