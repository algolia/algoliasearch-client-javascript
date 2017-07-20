// @flow

import type { RequestMethod, ObjectID, GetObjectOptions } from '../../types';

export default function getObject(
  req: RequestMethod,
  objectID: ObjectID | ObjectID[],
  options: GetObjectOptions
) {
  const { attributesToRetrieve: attrs } = options;
  const attributesToRetrieve = attrs.join(',');

  if (!Array.isArray(objectID)) {
    return req({
      method: 'GET',
      path: `/1/indexes/places/${objectID}`,
      qs: { attributes: attributesToRetrieve },
    });
  }

  return req({
    method: 'POST',
    path: '/1/indexes/*/objects',
    body: {
      requests: objectID.map(id => ({
        indexName: 'places',
        objectID: id,
        attributesToRetrieve,
      })),
    },
  });
}
