import { MethodEnum } from '@algolia/requester-common/types/MethodType';
import { RequestOptions } from '@algolia/transporter/types/RequestOptions';
import { TransporterAware } from '@algolia/transporter/types/TransporterAware';

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
