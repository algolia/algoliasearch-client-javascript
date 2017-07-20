import { snapshotAll, fakeRequester } from '../../testUtils';
import search from './search';

it('search', () => {
  const requests = [
    search(fakeRequester, 'some_index', {}),
    search(fakeRequester, 'other_index', { hitsPerPage: 4 }),
  ];
  snapshotAll(requests);
});
