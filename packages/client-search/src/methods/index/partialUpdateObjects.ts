import { WaitablePromise } from '@algolia/client-common/types/WaitablePromise';
import { popRequestOption } from '@algolia/transporter/request-options';
import { RequestOptions } from '@algolia/transporter/types/RequestOptions';

import { BatchActionEnum } from '../../types/BatchActionType';
import { BatchResponse } from '../../types/BatchResponse';
import { PartialUpdateObjectsOptions } from '../../types/PartialUpdateObjectsOptions';
import { SearchIndex } from '../../types/SearchIndex';
import { batch, HasBatch } from './batch';

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
