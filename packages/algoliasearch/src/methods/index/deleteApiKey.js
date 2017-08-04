// @flow

import type { RequestMethod, IndexName, ApiKey } from '../../types';

export default function clearSynonyms(
  req: RequestMethod,
  indexName: IndexName,
  key: ApiKey
) {
  return req({
    method: 'DELETE',
    path: `/1/indexes/${indexName}/keys/${key}`,
    requestType: 'write',
  });
}
