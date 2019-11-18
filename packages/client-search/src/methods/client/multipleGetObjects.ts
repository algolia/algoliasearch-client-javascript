import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import { MultipleGetObject, MultipleGetObjectsResponse, SearchClient } from '../..';

export const multipleGetObjects = <TClient extends SearchClient>(
  base: TClient
): TClient & HasMultipleGetObjects => {
  return {
    ...base,
    multipleGetObjects<TObject>(
      requests: readonly MultipleGetObject[],
      requestOptions?: RequestOptions
    ): Readonly<Promise<MultipleGetObjectsResponse<TObject>>> {
      return this.transporter.read(
        {
          method: MethodEnum.Post,
          path: '1/indexes/*/objects',
          data: {
            requests,
          },
        },
        requestOptions
      );
    },
  };
};

export type HasMultipleGetObjects = {
  readonly multipleGetObjects: <TObject>(
    requests: readonly MultipleGetObject[],
    requestOptions?: RequestOptions
  ) => Readonly<Promise<MultipleGetObjectsResponse<TObject>>>;
};
