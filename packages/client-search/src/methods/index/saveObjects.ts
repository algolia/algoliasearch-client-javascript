import { addMethod, WaitablePromise } from '@algolia/client-common';
import { popRequestOption, RequestOptions } from '@algolia/transporter';

import {
  BatchActionEnum,
  BatchResponse,
  createMissingObjectIDError,
  SaveObjectsOptions,
  SearchIndex,
} from '../..';
import { batch } from '.';

export const saveObjects = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasSaveObjects => {
  return {
    ...base,
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

      return addMethod(base, batch).chunk(objects, action, requestOptions);
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
      throw createMissingObjectIDError();
    }
  });
}
