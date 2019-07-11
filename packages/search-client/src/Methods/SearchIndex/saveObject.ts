import { RequestOptions } from '@algolia/transporter-types';
import { SearchIndex } from '../../SearchIndex';
import { ConstructorOf } from '../../helpers';
import { saveObjects, HasSaveObjects, SaveObjectsOptions } from './saveObjects';

export const saveObject = <TSearchIndex extends ConstructorOf<SearchIndex & HasSaveObjects>>(
  base: TSearchIndex
) => {
  const Index = class extends base implements HasSaveObject {
    public saveObject(
      object: object,
      requestOptions?: RequestOptions & SaveObjectsOptions
    ): Promise<SaveObjectResponse> {
      return new Promise(resolve => {
        this.saveObjects([object], requestOptions).then(response => {
          resolve({
            objectID: response[0].objectIDs[0],
            taskID: response[0].taskID,
          });
        });
      });
    }
  };

  return saveObjects(Index);
};

export interface HasSaveObject extends SearchIndex {
  saveObject(
    object: object,
    requestOptions?: RequestOptions & SaveObjectsOptions
  ): Promise<SaveObjectResponse>;
}

export type SaveObjectResponse = {
  taskID: number;
  objectID: string;
};
