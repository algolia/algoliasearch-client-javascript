import { RequestOptions } from '@algolia/transporter-types';
import { SearchIndex } from '../../SearchIndex';
import { ConstructorOf } from '../../helpers';
import { saveObjects } from './saveObjects';
import { WaitablePromise } from '../../WaitablePromise';
import { SaveObjectResponse } from '../Types/SaveObjectResponse';
import { SaveObjectsOptions } from '../Types/SaveObjectsOptions';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const saveObject = <TSearchIndex extends ConstructorOf<SearchIndex>>(base: TSearchIndex) => {
  const Mixin = saveObjects(base);

  return class extends Mixin implements HasSaveObject {
    public saveObject(
      object: object,
      requestOptions?: RequestOptions & SaveObjectsOptions
    ): Readonly<WaitablePromise<SaveObjectResponse>> {
      return WaitablePromise.from<SaveObjectResponse>(
        new Promise(resolve => {
          this.saveObjects([object], requestOptions).then(response => {
            resolve({
              objectID: response[0].objectIDs[0],
              taskID: response[0].taskID,
            });
          });
        })
      ).onWait((result: SaveObjectResponse) => {
        return this.waitTask(result.taskID);
      });
    }
  };
};

export type HasSaveObject = {
  readonly saveObject: (
    object: object,
    requestOptions?: RequestOptions & SaveObjectsOptions
  ) => Readonly<WaitablePromise<SaveObjectResponse>>;
};
