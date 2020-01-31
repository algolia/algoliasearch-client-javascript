import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import { GetObjectsOptions, GetObjectsResponse, SearchIndex } from '../..';

export const getObjects = (base: SearchIndex) => {
  return <TObject>(
    objectIDs: readonly string[],
    requestOptions?: RequestOptions & GetObjectsOptions
  ): Readonly<Promise<GetObjectsResponse<TObject>>> => {
    const { attributesToRetrieve, ...options } = requestOptions || {};

    const requests = objectIDs.map(objectID => {
      return {
        indexName: base.indexName,
        objectID,
        ...(attributesToRetrieve ? { attributesToRetrieve } : {}),
      };
    });

    return base.transporter.read(
      {
        method: MethodEnum.Post,
        path: '1/indexes/*/objects',
        data: {
          requests,
        },
      },
      options
    );
  };
};
