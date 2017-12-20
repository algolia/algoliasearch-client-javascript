import { snapshotAll } from '../../testUtils/index.js';
import requester from 'algoliasearch-http-requester';
import search from './search.js';

it('search', () => {
  const requests = [
    search({}, { requester }),
    search({ hitsPerPage: 4 }, { requester }),
  ];
  snapshotAll(requests);
});
