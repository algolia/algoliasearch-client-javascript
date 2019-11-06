import { WaitablePromise } from '@algolia/client-common';
import { popRequestOption, RequestOptions } from '@algolia/transporter';

import { BatchActionEnum, BatchResponse, PartialUpdateObjectsOptions, SearchIndex } from '../..';
import { batch, HasBatch } from '.';

export const partialUpdateObjects = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasBatch & HasPartialUpdateObjects => {
  return {
    ...batch(base),
    partialUpdateObjects(
      objects: ReadonlyArray<Record<string, any>>,
      requestOptions?: RequestOptions & PartialUpdateObjectsOptions
    ): Readonly<WaitablePromise<readonly BatchResponse[]>> {
      const createIfNotExists = popRequestOption(requestOptions, 'createIfNotExists', false);

      const action = createIfNotExists
        ? BatchActionEnum.PartialUpdateObject
        : BatchActionEnum.PartialUpdateObjectNoCreate;

      return this.chunk(objects, action, requestOptions);
    },
  };
};

export type HasPartialUpdateObjects = {
  readonly partialUpdateObjects: (
    objects: readonly object[],
    requestOptions?: RequestOptions & PartialUpdateObjectsOptions
  ) => Readonly<WaitablePromise<readonly BatchResponse[]>>;
};
