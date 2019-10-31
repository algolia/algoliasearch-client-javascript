import { MethodEnum } from '@algolia/requester-common/types/MethodType';
import { popRequestOption } from '@algolia/transporter/request-options';
import { RequestOptions } from '@algolia/transporter/types/RequestOptions';

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
