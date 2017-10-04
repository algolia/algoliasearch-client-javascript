import { snapshotAll, fakeRequester } from '../../testUtils';
import search from './search';

it('search', () => {
  const requests = [
    search(
      {
        requests: [
          {
            indexName: 'some_index',
            params: {},
          },
        ],
      },
      { requester: fakeRequester }
    ),
  ];

  snapshotAll(requests);
});
