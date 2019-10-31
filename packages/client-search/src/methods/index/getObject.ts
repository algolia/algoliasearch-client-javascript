import { encode } from '@algolia/client-common/helpers';
import { MethodEnum } from '@algolia/requester-common/types/MethodType';
import { RequestOptions } from '@algolia/transporter/types/RequestOptions';

import { SearchIndex } from '../../types/SearchIndex';

export const getObject = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasGetObject => {
  return {
    ...base,
    getObject<TObject>(
      objectID: string,
      requestOptions?: RequestOptions
    ): Readonly<Promise<TObject>> {
      return this.transporter.read(
        {
          method: MethodEnum.Get,
          path: encode('1/indexes/%s/%s', this.indexName, objectID),
        },
        requestOptions
      );
    },
  };
};

export type HasGetObject = {
  readonly getObject: <TObject>(
    objectID: string,
    requestOptions?: RequestOptions
  ) => Readonly<Promise<TObject>>;
};
