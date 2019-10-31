import { MethodEnum } from '@algolia/requester-common/types/MethodType';
import { RequestOptions } from '@algolia/transporter/types/RequestOptions';
import { TransporterAware } from '@algolia/transporter/types/TransporterAware';

import { ListIndicesResponse } from '../../types/ListIndicesResponse';

export const listIndices = <TClient extends TransporterAware>(
  base: TClient
): TClient & HasListIndices => {
  return {
    ...base,
    listIndices(requestOptions?: RequestOptions): Readonly<Promise<ListIndicesResponse>> {
      return this.transporter.read(
        {
          method: MethodEnum.Get,
          path: '1/indexes',
        },
        requestOptions
      );
    },
  };
};

export type HasListIndices = {
  readonly listIndices: (requestOptions?: RequestOptions) => Readonly<Promise<ListIndicesResponse>>;
};
