import { snapshotAll } from '../../testUtils';
import search from './search';

import { createRequester } from '../../request';
const req = createRequester();

it('search', () => {
  const requests = [
    search(req, [
      {
        indexName: 'some_index',
        params: {},
      },
    ]),
  ];

  snapshotAll(requests);
});
