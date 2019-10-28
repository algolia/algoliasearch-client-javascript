import { Method } from '@algolia/requester-types';
import { RequestOptions, TransporterAware } from '@algolia/transporter';

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
