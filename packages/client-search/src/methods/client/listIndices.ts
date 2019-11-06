import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions, TransporterAware } from '@algolia/transporter';

import { ListIndicesResponse } from '../..';

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
