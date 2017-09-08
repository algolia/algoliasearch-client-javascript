import { snapshotAll, fakeRequester } from '../../testUtils';
import search from './search';

it('search', () => {
  const requests = [
    search({}, { requester: fakeRequester }),
    search({ hitsPerPage: 4 }, { requester: fakeRequester }),
  ];
  snapshotAll(requests);
});
