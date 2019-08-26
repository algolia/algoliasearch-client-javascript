import { RequestOptions, popRequestOption } from '@algolia/transporter-types';
import { SearchIndex } from '../../SearchIndex';
import { ConstructorOf } from '../../helpers';
import { Method } from '@algolia/requester-types';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getObjects = <TSearchIndex extends ConstructorOf<SearchIndex>>(base: TSearchIndex) => {
  return class extends base implements HasGetObjects {
    public getObjects<TObject>(
      objectIds: readonly string[],
      requestOptions?: RequestOptions & GetObjectsOptions
    ): Promise<GetObjectsResponse<TObject>> {
      const requests = objectIds.map(objectId => {
        return {
          indexName: this.indexName,
          objectID: objectId,
          attributesToRetrieve: popRequestOption(requestOptions, 'attributesToRetrieve', '*'),
        };
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

export type HasGetObjects = {
  readonly getObjects: <TObject>(
    objectIDs: readonly string[],
    requestOptions?: RequestOptions & GetObjectsOptions
  ) => Promise<GetObjectsResponse<TObject>>;
};

export type GetObjectsResponse<TObject> = {
  readonly results: readonly TObject[];
};

export type GetObjectsOptions = {
  readonly attributesToRetrieve?: readonly string[];
};
