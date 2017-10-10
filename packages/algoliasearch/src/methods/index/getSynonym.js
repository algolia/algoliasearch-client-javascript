// @flow

import type { IndexName, ObjectID } from 'algoliasearch';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export default function getRule(
  {
    objectID,
  }: {
    objectID: ObjectID,
  },
  {
    requester,
    indexName,
    requestOptions,
  }: {
    requester: RequestMethod,
    indexName: IndexName,
    requestOptions?: RequestOptions,
  }
) {
  return requester({
    method: 'GET',
    path: `/1/indexes/${indexName}/synonyms/${objectID}`,
    requestOptions,
    requestType: 'read',
  });
}
