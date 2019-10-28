import { WaitablePromise } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter';

import { SearchIndex } from '../../SearchIndex';
import { BatchAction } from '../types/BatchAction';
import { BatchResponse } from '../types/BatchResponse';
import { ChunkOptions } from '../types/ChunkOptions';
import { batch, HasBatch } from './batch';

export const deleteObjects = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasBatch & HasDeleteObjects => {
  return {
    ...batch(base),
    deleteObjects(
      objectIDs: readonly string[],
      requestOptions?: RequestOptions & ChunkOptions
    ): Readonly<WaitablePromise<readonly BatchResponse[]>> {
      const objects = objectIDs.map(objectID => {
        return { objectID };
      });

      return this.chunk(objects, BatchAction.DeleteObject, requestOptions);
    },
  };
};

export type HasDeleteObjects = {
  readonly deleteObjects: (
    objectIDs: readonly string[],
    requestOptions?: RequestOptions & ChunkOptions
  ) => Readonly<WaitablePromise<readonly BatchResponse[]>>;
};
