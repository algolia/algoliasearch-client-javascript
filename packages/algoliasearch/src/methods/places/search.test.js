import { snapshotAll, fakeRequester } from '../../testUtils';
import search from './search';

it('search', () => {
  const requests = [
    search(fakeRequester, {}),
    search(fakeRequester, { hitsPerPage: 4 }),
  ];
  snapshotAll(requests);
});
