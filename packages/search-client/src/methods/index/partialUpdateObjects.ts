import { WaitablePromise } from '@algolia/support';
import { popRequestOption, RequestOptions } from '@algolia/transporter';

import { BatchAction } from '../../types/BatchAction';
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
        ? BatchAction.PartialUpdateObject
        : BatchAction.PartialUpdateObjectNoCreate;

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
