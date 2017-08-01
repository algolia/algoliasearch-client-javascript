import { snapshotAll, fakeRequester } from '../../testUtils';
import search from './search';

it('search', () => {
  const requests = [
    search({
      requester: fakeRequester,
      indexName: 'some_index',
      params: {},
    }),
    search({
      requester: fakeRequester,
      indexName: 'other_index',
      params: { hitsPerPage: 4 },
    }),
  ];
  snapshotAll(requests);
});
