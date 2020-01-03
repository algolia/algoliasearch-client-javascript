import { createWaitablePromise, WaitablePromise } from '@algolia/client-common';
import { RequestOptions } from '@algolia/transporter';

import {
  BatchActionEnum,
  chunkedBatch,
  ChunkedBatchResponse,
  ChunkOptions,
  createMissingObjectIDError,
  SaveObjectsOptions,
  SearchIndex,
} from '../..';

export const saveObjects = (base: SearchIndex) => {
  return (
    objects: ReadonlyArray<Readonly<Record<string, any>>>,
    requestOptions?: RequestOptions & ChunkOptions & SaveObjectsOptions
  ): Readonly<WaitablePromise<ChunkedBatchResponse>> => {
    const { autoGenerateObjectIDIfNotExist, ...options } = requestOptions || {};

    const action = autoGenerateObjectIDIfNotExist
      ? BatchActionEnum.AddObject
      : BatchActionEnum.UpdateObject;

    if (action === BatchActionEnum.UpdateObject) {
      // eslint-disable-next-line functional/no-loop-statement
      for (const object of objects) {
        if (object.objectID === undefined) {
          return createWaitablePromise(Promise.reject(createMissingObjectIDError()));
        }
      }
    }

    return chunkedBatch(base)(objects, action, options);
  };
};
