import { encode } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import { GetObjectOptions, ObjectWithObjectID, SearchIndex } from '../..';

export const getObject = (base: SearchIndex) => {
  return <TObject>(
    objectID: string,
    requestOptions?: RequestOptions & GetObjectOptions
  ): Readonly<Promise<TObject & ObjectWithObjectID>> => {
    return base.transporter.read(
      {
        method: MethodEnum.Get,
        path: encode('1/indexes/%s/%s', base.indexName, objectID),
      },
      requestOptions
    );
  };
};
