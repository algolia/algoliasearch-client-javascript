import { RequestOptions } from '@algolia/transporter-types';
import { SearchIndex } from '../../SearchIndex';
import { Method } from '@algolia/requester-types';
import { ConstructorOf, WaitablePromise } from '@algolia/support';

import { waitTask } from './waitTask';
import { DeleteResponse } from '../types/DeleteResponse';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const deleteIndex = <TSearchIndex extends ConstructorOf<SearchIndex>>(
  base: TSearchIndex
) => {
  const Mixin = waitTask(base);

  return class extends Mixin implements HasDelete {
    public delete(requestOptions?: RequestOptions): Readonly<WaitablePromise<DeleteResponse>> {
      return WaitablePromise.from<DeleteResponse>(
        this.transporter.write(
          {
            method: Method.Delete,
            path: `1/indexes/${this.indexName}`,
          },
          requestOptions
        )
      ).onWait(response => this.waitTask(response.taskID));
    }
  };
};

export type HasDelete = {
  readonly delete: (requestOptions?: RequestOptions) => Readonly<WaitablePromise<DeleteResponse>>;
};
