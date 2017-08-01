import { snapshotAll, fakeRequester } from '../../testUtils';
import search from './search';

it('search', () => {
  const requests = [
    search({
      requester: fakeRequester,
      requests: [
        {
          indexName: 'some_index',
          params: {},
        },
      ],
    }),
  ];

  snapshotAll(requests);
});
