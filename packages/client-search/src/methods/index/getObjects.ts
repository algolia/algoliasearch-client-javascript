import { MethodEnum } from '@algolia/requester-common';
import { popRequestOption, RequestOptions } from '@algolia/transporter';

import { GetObjectsOptions, GetObjectsResponse, SearchIndex } from '../..';

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

export type HasGetObjects = {
  readonly getObjects: <TObject>(
    objectIDs: readonly string[],
    requestOptions?: RequestOptions & GetObjectsOptions
  ) => Readonly<Promise<GetObjectsResponse<TObject>>>;
};
