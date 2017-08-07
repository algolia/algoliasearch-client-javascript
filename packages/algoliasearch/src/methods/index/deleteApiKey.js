// @flow

import type { RequestMethod, IndexName, ApiKey } from '../../types';

export default function clearSynonyms(
  requester: RequestMethod,
  indexName: IndexName,
  key: ApiKey
) {
  return requester({
    method: 'DELETE',
    path: `/1/indexes/${indexName}/keys/${key}`,
    requestType: 'write',
  });
}
