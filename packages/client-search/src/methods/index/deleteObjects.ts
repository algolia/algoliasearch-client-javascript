import { addMethod, WaitablePromise } from '@algolia/client-common';
import { RequestOptions } from '@algolia/transporter';

import { BatchActionEnum, BatchResponse, ChunkOptions, SearchIndex } from '../..';
import { batch } from '.';

export const deleteObjects = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasDeleteObjects => {
  return {
    ...base,
    deleteObjects(
      objectIDs: readonly string[],
      requestOptions?: RequestOptions & ChunkOptions
    ): Readonly<WaitablePromise<readonly BatchResponse[]>> {
      const objects = objectIDs.map(objectID => {
        return { objectID };
      });

      return addMethod(base, batch).chunk(objects, BatchActionEnum.DeleteObject, requestOptions);
    },
  };
};

export type HasDeleteObjects = {
  readonly deleteObjects: (
    objectIDs: readonly string[],
    requestOptions?: RequestOptions & ChunkOptions
  ) => Readonly<WaitablePromise<readonly BatchResponse[]>>;
};
