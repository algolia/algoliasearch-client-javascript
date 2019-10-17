import { Method } from '@algolia/requester-types';
import { ConstructorOf, encode, WaitablePromise } from '@algolia/support';
import { popRequestOption, RequestOptions } from '@algolia/transporter-types';

import { SearchIndex } from '../../SearchIndex';
import { IndexOperationResponse } from '../types/IndexOperationResponse';
import { ReplaceAllObjectsOptions } from '../types/ReplaceAllObjectsOptions';
import { saveObjects } from './saveObjects';
import { HasWaitTask, waitTask } from './waitTask';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const replaceAllObjects = <TSearchIndex extends ConstructorOf<SearchIndex>>(
  base: TSearchIndex
) => {
  const mixin: ConstructorOf<SearchIndex & HasWaitTask> = waitTask(base);

  return class extends mixin implements HasReplaceAllObjects {
    public replaceAllObjects(
      objects: readonly object[],
      requestOptions?: ReplaceAllObjectsOptions & RequestOptions
    ): Readonly<WaitablePromise<void>> {
      const safe = popRequestOption(requestOptions, 'safe', false);

      const randomSuffix = Math.random()
        .toString(36)
        .substring(7);

      const temporaryIndexName = `${this.indexName}_tmp_${randomSuffix}`;
      const TemporaryIndexConstructor = saveObjects(SearchIndex);

      const temporaryIndex = new TemporaryIndexConstructor({
        transporter: this.transporter,
        indexName: temporaryIndexName,
      });

      // eslint-disable-next-line prefer-const, functional/no-let, functional/prefer-readonly-type
      let responses: Array<Readonly<WaitablePromise<any>>> = [];

      const copyWaitablePromise = this.operation(this.indexName, temporaryIndexName, 'copy', {
        ...requestOptions,
        scope: ['settings', 'synonyms', 'rules'],
      });

      // eslint-disable-next-line functional/immutable-data
      responses.push(copyWaitablePromise);

      const result = (safe ? copyWaitablePromise.wait() : copyWaitablePromise)
        .then(() => {
          const saveObjectsWaitablePromise = temporaryIndex.saveObjects(objects, requestOptions);

          // eslint-disable-next-line functional/immutable-data
          responses.push(saveObjectsWaitablePromise);

          return safe ? saveObjectsWaitablePromise.wait() : saveObjectsWaitablePromise;
        })
        .then(() => {
          const moveWaitablePromise = this.operation(
            temporaryIndex.indexName,
            this.indexName,
            'move',
            requestOptions
          );

          // eslint-disable-next-line functional/immutable-data
          responses.push(moveWaitablePromise);

          return safe ? moveWaitablePromise.wait() : moveWaitablePromise;
        })
        .then(() => Promise.resolve());

      return WaitablePromise.from<void>(result).onWait(() => {
        return Promise.all(responses.map(response => response.wait()));
      });
    }

    private operation(
      from: string,
      to: string,
      type: string,
      requestOptions: RequestOptions
    ): Readonly<WaitablePromise<IndexOperationResponse>> {
      return WaitablePromise.from<IndexOperationResponse>(
        this.transporter.write(
          {
            method: Method.Post,
            path: encode('1/indexes/%s/operation', from),
            data: {
              operation: type,
              destination: to,
            },
          },
          requestOptions
        )
      ).onWait(response => this.waitTask(response.taskID));
    }
  };
};

export type HasReplaceAllObjects = {
  readonly replaceAllObjects: (
    objects: readonly object[],
    requestOptions?: ReplaceAllObjectsOptions & RequestOptions
  ) => Readonly<WaitablePromise<void>>;
};
