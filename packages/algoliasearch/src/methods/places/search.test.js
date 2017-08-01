import { snapshotAll, fakeRequester } from '../../testUtils';
import search from './search';

it('search', () => {
  const requests = [
    search({ requester: fakeRequester, params: {} }),
    search({ requester: fakeRequester, params: { hitsPerPage: 4 } }),
  ];
  snapshotAll(requests);
});
