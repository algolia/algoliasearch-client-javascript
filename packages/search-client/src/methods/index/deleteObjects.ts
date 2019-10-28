import { ConstructorOf, WaitablePromise } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter';

import { SearchIndex } from '../../SearchIndex';
import { BatchAction } from '../types/BatchAction';
import { BatchResponse } from '../types/BatchResponse';
import { ChunkOptions } from '../types/ChunkOptions';
import { batch } from './batch';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const deleteObjects = <TSearchIndex extends ConstructorOf<SearchIndex>>(
  base: TSearchIndex
) => {
  const mixin = batch(base);

  return class extends mixin implements HasDeleteObjects {
    public deleteObjects(
      objectIDs: readonly string[],
      requestOptions?: RequestOptions & ChunkOptions
    ): Readonly<WaitablePromise<readonly BatchResponse[]>> {
      const objects = objectIDs.map(objectID => {
        return { objectID };
      });

      return this.chunk(objects, BatchAction.DeleteObject, requestOptions);
    }
  };
};

export type HasDeleteObjects = {
  readonly deleteObjects: (
    objectIDs: readonly string[],
    requestOptions?: RequestOptions & ChunkOptions
  ) => Readonly<WaitablePromise<readonly BatchResponse[]>>;
};
