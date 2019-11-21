import { WaitablePromise } from '@algolia/client-common';
import { popRequestOption, RequestOptions } from '@algolia/transporter';

import {
  BatchActionEnum,
  BatchResponse,
  createMissingObjectIDError,
  SaveObjectsOptions,
  SearchIndex,
} from '../..';
import { chunk } from '.';

export const saveObjects = (base: SearchIndex) => {
  return (
    objects: ReadonlyArray<Record<string, any>>,
    requestOptions?: RequestOptions & SaveObjectsOptions
  ): Readonly<WaitablePromise<readonly BatchResponse[]>> => {
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

    return chunk(base)(objects, action, requestOptions);
  };
};

function ensureObjectIdsWithin(objects: readonly object[]): void {
  objects.forEach((object: object) => {
    if (!object.hasOwnProperty('objectID')) {
      throw createMissingObjectIDError();
    }
  });
}
