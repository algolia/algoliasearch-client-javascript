import { RequestOptions } from '@algolia/transporter-types';
import { SearchIndex } from '../../SearchIndex';
import { ConstructorOf, WaitablePromise } from '@algolia/support';
import { DeleteResponse } from '../types/DeleteResponse';
import { deleteObjects } from './deleteObjects';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const deleteObject = <TSearchIndex extends ConstructorOf<SearchIndex>>(
  base: TSearchIndex
) => {
  const mixin = deleteObjects(base);

  return class extends mixin implements HasDeleteObject {
    public deleteObject(
      objectID: string,
      requestOptions?: RequestOptions
    ): Readonly<WaitablePromise<DeleteResponse>> {
      return WaitablePromise.from<DeleteResponse>(
        this.deleteObjects([objectID], requestOptions).then(response => {
          return { taskID: response[0].taskID };
        })
      ).onWait(response => this.waitTask(response.taskID));
    }
  };
};

export type HasDeleteObject = {
  readonly deleteObject: (
    objectID: string,
    requestOptions?: RequestOptions
  ) => Readonly<WaitablePromise<DeleteResponse>>;
};
