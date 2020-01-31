import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import { MultipleGetObject, MultipleGetObjectsResponse, SearchClient } from '../..';

export const multipleGetObjects = (base: SearchClient) => {
  return <TObject>(
    requests: readonly MultipleGetObject[],
    requestOptions?: RequestOptions
  ): Readonly<Promise<MultipleGetObjectsResponse<TObject>>> => {
    return base.transporter.read(
      {
        method: MethodEnum.Post,
        path: '1/indexes/*/objects',
        data: {
          requests,
        },
      },
      requestOptions
    );
  };
};
