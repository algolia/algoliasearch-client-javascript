import { WaitablePromise } from '@algolia/client-common';
import { RequestOptions } from '@algolia/transporter';

import {
  BatchActionEnum,
  chunkedBatch,
  ChunkedBatchResponse,
  ChunkOptions,
  SearchIndex,
} from '../..';

export const deleteObjects = (base: SearchIndex) => {
  return (
    objectIDs: readonly string[],
    requestOptions?: RequestOptions & ChunkOptions
  ): Readonly<WaitablePromise<ChunkedBatchResponse>> => {
    const objects = objectIDs.map(objectID => {
      return { objectID };
    });

    return chunkedBatch(base)(objects, BatchActionEnum.DeleteObject, requestOptions);
  };
};
