// @flow

import type { IndexName, ApiKey } from 'types/Algolia';
import type { RequestMethod } from 'algoliasearch-requester';

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
