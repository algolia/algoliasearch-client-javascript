// @flow

import type { IndexName, Rule } from 'algoliasearch';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export default function saveRule(
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
    throw new Error(
      `You supplied an object without objectID to saveRule, but this is required.

body: ${JSON.stringify(body)}`
    );
  }

  return requester({
    method: 'PUT',
    path: `/1/indexes/${indexName}/rules/${objectID}`,
    body,
    requestType: 'write',
    requestOptions,
  });
}
