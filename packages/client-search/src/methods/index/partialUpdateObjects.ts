import { WaitablePromise } from '@sefai/client-common';
import { RequestOptions } from '@sefai/transporter';

import {
  BatchActionEnum,
  chunkedBatch,
  ChunkedBatchResponse,
  ChunkOptions,
  PartialUpdateObjectsOptions,
  SearchIndex,
} from '../..';

export const partialUpdateObjects = (base: SearchIndex) => {
  return (
    objects: ReadonlyArray<Record<string, any>>,
    requestOptions?: RequestOptions & ChunkOptions & PartialUpdateObjectsOptions
  ): Readonly<WaitablePromise<ChunkedBatchResponse>> => {
    const { createIfNotExists, ...options } = requestOptions || {};

    const action = createIfNotExists
      ? BatchActionEnum.PartialUpdateObject
      : BatchActionEnum.PartialUpdateObjectNoCreate;

    return chunkedBatch(base)(objects, action, options);
  };
};
