import { Method } from '@algolia/requester-types';
import { encode } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter';

import { SearchIndex } from '../types/SearchIndex';

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
          method: Method.Get,
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
