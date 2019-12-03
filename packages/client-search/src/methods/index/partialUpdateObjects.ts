import { WaitablePromise } from '@algolia/client-common';
import { popRequestOption, RequestOptions } from '@algolia/transporter';

import {
  BatchActionEnum,
  BatchResponse,
  ChunkOptions,
  PartialUpdateObjectsOptions,
  SearchIndex,
} from '../..';
import { chunk } from '.';

export const partialUpdateObjects = (base: SearchIndex) => {
  return (
    objects: ReadonlyArray<Record<string, any>>,
    requestOptions?: RequestOptions & ChunkOptions & PartialUpdateObjectsOptions
  ): Readonly<WaitablePromise<readonly BatchResponse[]>> => {
    const createIfNotExists = popRequestOption(requestOptions, 'createIfNotExists', false);

    const action = createIfNotExists
      ? BatchActionEnum.PartialUpdateObject
      : BatchActionEnum.PartialUpdateObjectNoCreate;

    return chunk(base)(objects, action, requestOptions);
  };
};
