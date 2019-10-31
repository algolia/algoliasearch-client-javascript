import { WaitablePromise } from '@algolia/client-common/types/WaitablePromise';
import { popRequestOption } from '@algolia/transporter/request-options';
import { RequestOptions } from '@algolia/transporter/types/RequestOptions';

import { createMissingObjectIDError } from '../../errors/createMissingObjectIDError';
import { BatchActionEnum } from '../../types/BatchActionType';
import { BatchResponse } from '../../types/BatchResponse';
import { SaveObjectsOptions } from '../../types/SaveObjectsOptions';
import { SearchIndex } from '../../types/SearchIndex';
import { batch, HasBatch } from './batch';

export const saveObjects = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasBatch & HasSaveObjects => {
  return {
    ...batch(base),
    saveObjects(
      objects: ReadonlyArray<Record<string, any>>,
      requestOptions?: RequestOptions & SaveObjectsOptions
    ): Readonly<WaitablePromise<readonly BatchResponse[]>> {
      const autoGenerateObjectIDIfNotExist = popRequestOption(
        requestOptions,
        'autoGenerateObjectIDIfNotExist',
        false
      );

      const action = autoGenerateObjectIDIfNotExist
        ? BatchActionEnum.AddObject
        : BatchActionEnum.UpdateObject;

      if (action === BatchActionEnum.UpdateObject) {
        ensureObjectIdsWithin(objects);
      }

      return this.chunk(objects, action, requestOptions);
    },
  };
};

export type HasSaveObjects = {
  readonly saveObjects: (
    objects: readonly object[],
    requestOptions?: RequestOptions & SaveObjectsOptions
  ) => Readonly<WaitablePromise<readonly BatchResponse[]>>;
};

function ensureObjectIdsWithin(objects: readonly object[]): void {
  objects.forEach((object: object) => {
    if (!object.hasOwnProperty('objectID')) {
      throw createMissingObjectIDError(
        '. All objects must have an unique objectID ' +
          '(like a primary key) to be valid. ' +
          'Algolia is also able to generate objectIDs ' +
          "automatically but *it's not recommended*. " +
          'To do it, use `saveObjects(objects, ' +
          "{'autoGenerateObjectIDIfNotExist': true})`."
      );
    }
  });
}
