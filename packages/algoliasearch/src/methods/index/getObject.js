// @flow

import type { RequestMethod, IndexName, ObjectID } from '../../types';

export type GetObjectOptions = {| attributesToRetrieve: string[] |};

export default function getObjects(
  req: RequestMethod,
  indexName: IndexName,
  objectID: ObjectID,
  options: GetObjectOptions
) {
  const { attributesToRetrieve: attrs } = options;
  const attributesToRetrieve = attrs.join(',');

  return req({
    method: 'GET',
    path: `/1/indexes/${indexName}/${objectID}`,
    qs: { attributes: attributesToRetrieve },
  });
}
