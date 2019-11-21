import { WaitablePromise } from '@algolia/client-common';
import { RequestOptions } from '@algolia/transporter';

import { BatchActionEnum, BatchResponse, chunk, ChunkOptions, SearchIndex } from '../..';

export const deleteObjects = (base: SearchIndex) => {
  return (
    objectIDs: readonly string[],
    requestOptions?: RequestOptions & ChunkOptions
  ): Readonly<WaitablePromise<readonly BatchResponse[]>> => {
    const objects = objectIDs.map(objectID => {
      return { objectID };
    });

    return chunk(base)(objects, BatchActionEnum.DeleteObject, requestOptions);
  };
};
