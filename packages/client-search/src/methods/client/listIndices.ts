import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import { ListIndicesResponse, SearchClient } from '../..';

export const listIndices = <TClient extends SearchClient>(
  base: TClient
): TClient & HasListIndices => {
  return {
    ...base,
    listIndices(requestOptions?: RequestOptions): Readonly<Promise<ListIndicesResponse>> {
      return base.transporter.read(
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
