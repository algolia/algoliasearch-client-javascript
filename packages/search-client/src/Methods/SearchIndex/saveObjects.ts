import { RequestOptions } from '@algolia/transporter-types';
import { SearchIndex } from '../../SearchIndex';
import { ConstructorOf } from '../../helpers';
import { HasBatch, BatchResponse, batch, Action, ChunkOptions } from './batch';
import { MissingObjectID } from '../../Errors/MissingObjectID';

export const saveObjects = <TSearchIndex extends ConstructorOf<SearchIndex & HasBatch>>(
  base: TSearchIndex
) => {
  const Index = class extends base implements HasSaveObjects {
    public saveObjects(
      objects: Array<Record<string, any>>,
      requestOptions?: RequestOptions & SaveObjectsOptions
    ): Promise<BatchResponse[]> {
      const action =
        requestOptions !== undefined && requestOptions.autoGenerateObjectIDIfNotExist === true
          ? Action.AddObject
          : Action.UpdateObject;

      if (action === Action.UpdateObject) {
        ensureObjectIdsWithin(objects);
      }

      return this.chunk(objects, action, requestOptions);
    }
  };

  return batch(Index);
};

export interface HasSaveObjects extends HasBatch {
  saveObjects(
    objects: object[],
    requestOptions?: RequestOptions & SaveObjectsOptions
  ): Promise<BatchResponse[]>;
}

export interface SaveObjectsOptions extends ChunkOptions {
  autoGenerateObjectIDIfNotExist?: boolean;
}

function ensureObjectIdsWithin(objects: object[]): void {
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
