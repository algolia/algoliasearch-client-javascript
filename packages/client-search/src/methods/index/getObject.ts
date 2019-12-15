import { encode } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { createMappedRequestOptions, RequestOptions } from '@algolia/transporter';

import { ObjectWithObjectID, SearchIndex } from '../..';
import { GetObjectOptions } from '../../types/GetObjectOptions';

export const getObject = (base: SearchIndex) => {
  return <TObject>(
    objectID: string,
    requestOptions?: RequestOptions & GetObjectOptions
  ): Readonly<Promise<TObject & ObjectWithObjectID>> => {
    const { attributesToRetrieve, ...options } = requestOptions || {};
    const mappedRequestOptions = createMappedRequestOptions(options);
    if (attributesToRetrieve) {
      mappedRequestOptions.queryParameters.attributesToRetrieve = attributesToRetrieve; // eslint-disable-line functional/immutable-data
    }

    return base.transporter.read(
      {
        method: MethodEnum.Get,
        path: encode('1/indexes/%s/%s', base.indexName, objectID),
      },
      mappedRequestOptions
    );
  };
};
