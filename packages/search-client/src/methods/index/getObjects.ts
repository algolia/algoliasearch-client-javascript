import { Method } from '@algolia/requester-types';
import { ConstructorOf } from '@algolia/support';
import { popRequestOption, RequestOptions } from '@algolia/transporter-types';

import { SearchIndex } from '../../SearchIndex';
import { GetObjectsOptions } from '../types/GetObjectsOptions';
import { GetObjectsResponse } from '../types/GetObjectsResponse';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getObjects = <TSearchIndex extends ConstructorOf<SearchIndex>>(base: TSearchIndex) => {
  return class extends base implements HasGetObjects {
    public getObjects<TObject>(
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
    }
  };
};

export type HasGetObjects = {
  readonly getObjects: <TObject>(
    objectIDs: readonly string[],
    requestOptions?: RequestOptions & GetObjectsOptions
  ) => Readonly<Promise<GetObjectsResponse<TObject>>>;
};
