import { RequestOptions } from '@algolia/transporter-types';
import { SearchIndex } from '../../SearchIndex';
import { ConstructorOf } from '../../helpers';
import { Method } from '@algolia/requester-types';

export const getObjects = <TSearchIndex extends ConstructorOf<SearchIndex>>(base: TSearchIndex) => {
  return class extends base implements HasGetObjects {
    public getObjects<TObject>(
      objectIds: string[],
      requestOptions?: RequestOptions & GetObjectsOptions
    ): Promise<GetObjectsResponse<TObject>> {
      const requests = objectIds.map(objectId => {
        let request = {
          indexName: this.indexName,
          objectID: objectId,
        };

        if (requestOptions !== undefined && requestOptions.attributesToRetrieve !== undefined) {
          request = Object.assign(request, {
            attributesToRetrieve: requestOptions.attributesToRetrieve,
          });
        }

        return request;
      });

      return this.transporter.read(
        {
          method: Method.Post,
          path: `1/indexes/*/objects`,
          data: {
            requests,
          },
        },
        requestOptions
      );
    }
  };
};

export interface HasGetObjects extends SearchIndex {
  getObjects<TObject>(
    objectIDs: string[],
    requestOptions?: RequestOptions & GetObjectsOptions
  ): Promise<GetObjectsResponse<TObject>>;
}

export type GetObjectsResponse<TObject> = {
  results: TObject[];
};

export interface GetObjectsOptions {
  attributesToRetrieve?: string[];
}
