import { WaitablePromise } from '@algolia/client-common';
import { RequestOptions } from '@algolia/transporter';

import {
  BatchActionEnum,
  BatchResponse,
  chunk,
  ChunkOptions,
  PartialUpdateObjectsOptions,
  SearchIndex,
} from '../..';

export const partialUpdateObjects = (base: SearchIndex) => {
  return (
    objects: ReadonlyArray<Record<string, any>>,
    requestOptions?: RequestOptions & ChunkOptions & PartialUpdateObjectsOptions
  ): Readonly<WaitablePromise<readonly BatchResponse[]>> => {
    const { createIfNotExists, ...options } = requestOptions || {};

    const action = createIfNotExists
      ? BatchActionEnum.PartialUpdateObject
      : BatchActionEnum.PartialUpdateObjectNoCreate;

    return chunk(base)(objects, action, options);
  };
};
