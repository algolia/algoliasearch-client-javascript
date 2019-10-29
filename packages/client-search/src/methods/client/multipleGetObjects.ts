import { Method } from '@algolia/requester-common/src/types/Method';
import { RequestOptions, TransporterAware } from '@algolia/transporter';

import { MultipleGetObject } from '../../types/MultipleGetObject';
import { MultipleGetObjectsResponse } from '../../types/MultipleGetObjectsResponse';

export const multipleGetObjects = <TClient extends TransporterAware>(
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
          method: Method.Post,
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
