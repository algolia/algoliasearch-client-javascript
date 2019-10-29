import { Method } from '@algolia/requester-types/src/types/Method';
import { popRequestOption, RequestOptions } from '@algolia/transporter';

import { GetObjectsOptions } from '../../types/GetObjectsOptions';
import { GetObjectsResponse } from '../../types/GetObjectsResponse';
import { SearchIndex } from '../../types/SearchIndex';

export const getObjects = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasGetObjects => {
  return {
    ...base,
    getObjects<TObject>(
      objectIDs: readonly string[],
      requestOptions?: RequestOptions & GetObjectsOptions
    ): Readonly<Promise<GetObjectsResponse<TObject>>> {
      const requests = objectIDs.map(objectID => {
        return {
          indexName: this.indexName,
          objectID,
          attributesToRetrieve: popRequestOption(requestOptions, 'attributesToRetrieve', '*'),
        };
      });

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

export type HasGetObjects = {
  readonly getObjects: <TObject>(
    objectIDs: readonly string[],
    requestOptions?: RequestOptions & GetObjectsOptions
  ) => Readonly<Promise<GetObjectsResponse<TObject>>>;
};
