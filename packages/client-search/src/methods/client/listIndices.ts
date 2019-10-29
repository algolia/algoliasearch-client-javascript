import { Method } from '@algolia/requester-common/src/types/Method';
import { RequestOptions } from '@algolia/transporter/src/types/RequestOptions';
import { TransporterAware } from '@algolia/transporter/src/types/TransporterAware';

import { ListIndicesResponse } from '../../types/ListIndicesResponse';

export const listIndices = <TClient extends TransporterAware>(
  base: TClient
): TClient & HasListIndices => {
  return {
    ...base,
    listIndices(requestOptions?: RequestOptions): Readonly<Promise<ListIndicesResponse>> {
      return this.transporter.read(
        {
          method: Method.Get,
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
