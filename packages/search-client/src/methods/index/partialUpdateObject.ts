import { RequestOptions } from '@algolia/transporter-types';
import { SearchIndex } from '../../SearchIndex';
import { ConstructorOf, WaitablePromise } from '@algolia/support';
import { partialUpdateObjects } from './partialUpdateObjects';
import { PartialUpdateObjectResponse } from '../types/PartialUpdateObjectResponse';
import { PartialUpdateObjectsOptions } from '../types/PartialUpdateObjectsOptions';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const partialUpdateObject = <TSearchIndex extends ConstructorOf<SearchIndex>>(
  base: TSearchIndex
) => {
  const mixin = partialUpdateObjects(base);

  return class extends mixin implements HasPartialUpdateObject {
    public partialUpdateObject(
      object: object,
      requestOptions?: RequestOptions & PartialUpdateObjectsOptions
    ): Readonly<WaitablePromise<PartialUpdateObjectResponse>> {
      return WaitablePromise.from<PartialUpdateObjectResponse>(
        this.partialUpdateObjects([object], requestOptions).then(response => {
          return {
            objectID: response[0].objectIDs[0],
            taskID: response[0].taskID,
          };
        })
      ).onWait(response => this.waitTask(response.taskID));
    }
  };
};

export type HasPartialUpdateObject = {
  readonly partialUpdateObject: (
    object: object,
    requestOptions?: RequestOptions & PartialUpdateObjectsOptions
  ) => Readonly<WaitablePromise<PartialUpdateObjectResponse>>;
};
