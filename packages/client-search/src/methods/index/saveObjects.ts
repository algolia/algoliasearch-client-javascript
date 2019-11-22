import { createWaitablePromise, WaitablePromise } from '@algolia/client-common';
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
      // eslint-disable-next-line functional/no-loop-statement
      for (const object of objects) {
        if (object.objectID === undefined) {
          return createWaitablePromise(Promise.reject(createMissingObjectIDError()));
        }
      }
    }

    return chunk(base)(objects, action, requestOptions);
  };
};
