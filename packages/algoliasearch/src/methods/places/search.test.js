import { snapshotAll, fakeRequester } from '../../testUtils/index.js';
import search from './search.js';

it('search', () => {
  const requests = [
    search({}, { requester: fakeRequester }),
    search({ hitsPerPage: 4 }, { requester: fakeRequester }),
  ];
  snapshotAll(requests);
});
