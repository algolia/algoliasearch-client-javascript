import { addMethod, WaitablePromise } from '@algolia/client-common';
import { popRequestOption, RequestOptions } from '@algolia/transporter';

import { BatchActionEnum, BatchResponse, PartialUpdateObjectsOptions, SearchIndex } from '../..';
import { batch } from '.';

export const partialUpdateObjects = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasPartialUpdateObjects => {
  return {
    ...base,
    partialUpdateObjects(
      objects: ReadonlyArray<Record<string, any>>,
      requestOptions?: RequestOptions & PartialUpdateObjectsOptions
    ): Readonly<WaitablePromise<readonly BatchResponse[]>> {
      const createIfNotExists = popRequestOption(requestOptions, 'createIfNotExists', false);

      const action = createIfNotExists
        ? BatchActionEnum.PartialUpdateObject
        : BatchActionEnum.PartialUpdateObjectNoCreate;

      return addMethod(base, batch).chunk(objects, action, requestOptions);
    },
  };
};

export type HasPartialUpdateObjects = {
  readonly partialUpdateObjects: (
    objects: readonly object[],
    requestOptions?: RequestOptions & PartialUpdateObjectsOptions
  ) => Readonly<WaitablePromise<readonly BatchResponse[]>>;
};
