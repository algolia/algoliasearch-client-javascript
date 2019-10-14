import { RequestOptions } from '@algolia/transporter-types';
import { SearchIndex } from '../../SearchIndex';
import { ConstructorOf, WaitablePromise } from '@algolia/support';
import { saveObjects } from './saveObjects';

import { SaveObjectResponse } from '../types/SaveObjectResponse';
import { SaveObjectsOptions } from '../types/SaveObjectsOptions';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const saveObject = <TSearchIndex extends ConstructorOf<SearchIndex>>(base: TSearchIndex) => {
  const mixin = saveObjects(base);

  return class extends mixin implements HasSaveObject {
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
      ).onWait((result: SaveObjectResponse) => this.waitTask(result.taskID));
    }
  };
};

export type HasSaveObject = {
  readonly saveObject: (
    object: object,
    requestOptions?: RequestOptions & SaveObjectsOptions
  ) => Readonly<WaitablePromise<SaveObjectResponse>>;
};
