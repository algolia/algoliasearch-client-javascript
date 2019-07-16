import { RequestOptions } from '@algolia/transporter-types';
import { SearchIndex } from '../../SearchIndex';
import { ConstructorOf } from '../../helpers';
import { saveObjects, HasSaveObjects, SaveObjectsOptions } from './saveObjects';
import { WaitablePromise } from '../../WaitablePromise';

export const saveObject = <TSearchIndex extends ConstructorOf<SearchIndex & HasSaveObjects>>(
  base: TSearchIndex
) => {
  const Index = class extends base implements HasSaveObject {
    public saveObject(
      object: object,
      requestOptions?: RequestOptions & SaveObjectsOptions
    ): WaitablePromise<SaveObjectResponse> {
      const promise = new WaitablePromise<SaveObjectResponse>(resolve => {
        this.saveObjects([object], requestOptions).then(response => {
          resolve({
            objectID: response[0].objectIDs[0],
            taskID: response[0].taskID,
          });
        });
      });

      promise.waitClosure = (result: SaveObjectResponse) => {
        return this.waitTask(result.taskID);
      };

      return promise;
    }
  };

  return saveObjects(Index);
};

export interface HasSaveObject extends SearchIndex {
  saveObject(
    object: object,
    requestOptions?: RequestOptions & SaveObjectsOptions
  ): WaitablePromise<SaveObjectResponse>;
}

export type SaveObjectResponse = {
  taskID: number;
  objectID: string;
};
