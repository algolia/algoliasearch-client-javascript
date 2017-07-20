// @flow

import type {
  RequestMethod,
  IndexName,
  ObjectID,
  GetObjectOptions,
} from '../../types';

export default function getObject(
  req: RequestMethod,
  indexName: IndexName,
  objectID: ObjectID | ObjectID[],
  options: GetObjectOptions
) {
  const { attributesToRetrieve: attrs } = options;
  const attributesToRetrieve = attrs.join(',');

  if (!Array.isArray(objectID)) {
    return req({
      method: 'GET',
      path: `/1/indexes/${indexName}/${objectID}`,
      qs: { attributes: attributesToRetrieve },
    });
  }

  return req({
    method: 'POST',
    path: '/1/indexes/*/objects',
    body: {
      requests: objectID.map(id => ({
        indexName,
        objectID: id,
        attributesToRetrieve,
      })),
    },
  });
}
