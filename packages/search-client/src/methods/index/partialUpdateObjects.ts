import { ConstructorOf, WaitablePromise } from '@algolia/support';
import { popRequestOption, RequestOptions } from '@algolia/transporter';

import { SearchIndex } from '../../SearchIndex';
import { BatchAction } from '../types/BatchAction';
import { BatchResponse } from '../types/BatchResponse';
import { PartialUpdateObjectsOptions } from '../types/PartialUpdateObjectsOptions';
import { batch } from './batch';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const partialUpdateObjects = <TSearchIndex extends ConstructorOf<SearchIndex>>(
  base: TSearchIndex
) => {
  const mixin = batch(base);

  return class extends mixin implements HasPartialUpdateObjects {
    public partialUpdateObjects(
      objects: ReadonlyArray<Record<string, any>>,
      requestOptions?: RequestOptions & PartialUpdateObjectsOptions
    ): Readonly<WaitablePromise<readonly BatchResponse[]>> {
      const createIfNotExists = popRequestOption(requestOptions, 'createIfNotExists', false);

      const action = createIfNotExists
        ? BatchAction.PartialUpdateObject
        : BatchAction.PartialUpdateObjectNoCreate;

      return this.chunk(objects, action, requestOptions);
    }
  };
};

export type HasPartialUpdateObjects = {
  readonly partialUpdateObjects: (
    objects: readonly object[],
    requestOptions?: RequestOptions & PartialUpdateObjectsOptions
  ) => Readonly<WaitablePromise<readonly BatchResponse[]>>;
};
