import { RequestOptions, popRequestOption } from '@algolia/transporter-types';
import { SearchIndex } from '../../SearchIndex';
import { ConstructorOf } from '../../helpers';
import { MissingObjectID } from '../../Errors/MissingObjectID';
import { WaitablePromise } from '../../WaitablePromise';
import { SaveObjectsOptions } from '../Types/SaveObjectsOptions';
import { BatchAction } from '../Types/BatchAction';
import { BatchResponse } from '../Types/BatchResponse';
import { batch } from './batch';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const saveObjects = <TSearchIndex extends ConstructorOf<SearchIndex>>(
  base: TSearchIndex
) => {
  const Mixin = batch(base);

  return class extends Mixin implements HasSaveObjects {
    public saveObjects(
      objects: ReadonlyArray<Record<string, any>>,
      requestOptions?: RequestOptions & SaveObjectsOptions
    ): Readonly<WaitablePromise<readonly BatchResponse[]>> {
      const autoGenerateObjectIDIfNotExist = popRequestOption(
        requestOptions,
        'autoGenerateObjectIDIfNotExist',
        false
      );

      const action = autoGenerateObjectIDIfNotExist
        ? BatchAction.AddObject
        : BatchAction.UpdateObject;

      if (action === BatchAction.UpdateObject) {
        ensureObjectIdsWithin(objects);
      }

      return this.chunk(objects, action, requestOptions);
    }
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
      throw new MissingObjectID(
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
