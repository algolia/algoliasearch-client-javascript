// @flow

import { AlgoliaError } from 'algoliasearch-errors';
import type { IndexName, Rule } from 'algoliasearch';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export default function saveSynonym(
  body: Rule,
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
  const { objectID } = body;
  if (
    !objectID ||
    typeof objectID !== 'string' ||
    typeof objectID !== 'number'
  ) {
    throw new AlgoliaError(
      `You supplied an object without objectID to saveSynonym, but this is required.

body: ${JSON.stringify(body)}`
    );
  }

  return requester({
    method: 'PUT',
    path: `/1/indexes/${indexName}/synonyms/${objectID}`,
    body,
    requestType: 'write',
    requestOptions,
  });
}
