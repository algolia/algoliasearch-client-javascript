import { RequestOptions } from '@algolia/transporter-types';
import { SearchIndex } from '../../SearchIndex';
import { Method } from '@algolia/requester-types';
import { ConstructorOf, WaitablePromise } from '@algolia/support';
import { waitTask } from './waitTask';
import { DeleteResponse } from '../types/DeleteResponse';
import { DeleteByFiltersOptions } from '../types/DeleteByFiltersOptions';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const deleteBy = <TSearchIndex extends ConstructorOf<SearchIndex>>(base: TSearchIndex) => {
  const Mixin = waitTask(base);

  return class extends Mixin implements HasDeleteBy {
    public deleteBy(
      filters: DeleteByFiltersOptions,
      requestOptions?: RequestOptions
    ): Readonly<WaitablePromise<DeleteResponse>> {
      return WaitablePromise.from<DeleteResponse>(
        this.transporter.write(
          {
            method: Method.Post,
            path: `1/indexes/${this.indexName}/deleteByQuery`,
            data: filters,
          },
          requestOptions
        )
      ).onWait(response => this.waitTask(response.taskID));
    }
  };
};

export type HasDeleteBy = {
  readonly deleteBy: (
    filters: DeleteByFiltersOptions,
    requestOptions?: RequestOptions
  ) => Readonly<WaitablePromise<DeleteResponse>>;
};
