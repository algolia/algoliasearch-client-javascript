import { encode } from '@sefai/client-common';
import { MethodEnum } from '@sefai/requester-common';
import { RequestOptions } from '@sefai/transporter';

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
