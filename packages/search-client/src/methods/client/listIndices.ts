import { Method } from '@algolia/requester-types';
import { RequestOptions } from '@algolia/transporter';

import { SearchClient } from '../../SearchClient';
import { ListIndicesResponse } from '../types/ListIndicesResponse';

export const listIndices = <TSearchClient extends SearchClient>(
  base: TSearchClient
): TSearchClient & HasListIndices => {
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
