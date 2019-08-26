import { RequestOptions, popRequestOption } from '@algolia/transporter-types';
import { SearchIndex } from '../../SearchIndex';
import { ConstructorOf } from '../../helpers';
import { BatchResponse, batch, Action, ChunkOptions } from './batch';
import { MissingObjectID } from '../../Errors/MissingObjectID';
import { WaitablePromise } from '../../WaitablePromise';

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

      const action = autoGenerateObjectIDIfNotExist ? Action.AddObject : Action.UpdateObject;

      if (action === Action.UpdateObject) {
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

export type SaveObjectsOptions = ChunkOptions & {
  readonly autoGenerateObjectIDIfNotExist?: boolean;
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
