import { addMethod, createWaitablePromise, encode, WaitablePromise } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { popRequestOption, RequestOptions } from '@algolia/transporter';

import { IndexOperationResponse, ReplaceAllObjectsOptions, SearchIndex } from '../..';
import { saveObjects, waitTask } from '.';

export const replaceAllObjects = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasReplaceAllObjects => {
  return {
    ...base,
    replaceAllObjects(
      objects: readonly object[],
      requestOptions?: ReplaceAllObjectsOptions & RequestOptions
    ): Readonly<WaitablePromise<void>> {
      const operation = (
        from: string,
        to: string,
        type: string,
        operatioRequestOptions?: RequestOptions
      ): Readonly<WaitablePromise<IndexOperationResponse>> => {
        return createWaitablePromise<IndexOperationResponse>(
          base.transporter.write(
            {
              method: MethodEnum.Post,
              path: encode('1/indexes/%s/operation', from),
              data: {
                operation: type,
                destination: to,
              },
            },
            operatioRequestOptions
          )
        ).onWait((response, waitRequestOptions) =>
          addMethod(base, waitTask).waitTask(response.taskID, waitRequestOptions)
        );
      };

      const safe = popRequestOption(requestOptions, 'safe', false);

      const randomSuffix = Math.random()
        .toString(36)
        .substring(7);

      const temporaryIndex = saveObjects({
        appId: base.appId,
        transporter: base.transporter,
        indexName: `${base.indexName}_tmp_${randomSuffix}`,
      });

      // eslint-disable-next-line prefer-const, functional/no-let, functional/prefer-readonly-type
      let responses: Array<Readonly<WaitablePromise<any>>> = [];

      const copyWaitablePromise = operation(base.indexName, temporaryIndex.indexName, 'copy', {
        ...requestOptions,
        scope: ['settings', 'synonyms', 'rules'],
      });

      // eslint-disable-next-line functional/immutable-data
      responses.push(copyWaitablePromise);

      const result = (safe ? copyWaitablePromise.wait(requestOptions) : copyWaitablePromise)
        .then(() => {
          const saveObjectsWaitablePromise = temporaryIndex.saveObjects(objects, requestOptions);

          // eslint-disable-next-line functional/immutable-data
          responses.push(saveObjectsWaitablePromise);

          return safe
            ? saveObjectsWaitablePromise.wait(requestOptions)
            : saveObjectsWaitablePromise;
        })
        .then(() => {
          const moveWaitablePromise = operation(
            temporaryIndex.indexName,
            base.indexName,
            'move',
            requestOptions
          );

          // eslint-disable-next-line functional/immutable-data
          responses.push(moveWaitablePromise);

          return safe ? moveWaitablePromise.wait(requestOptions) : moveWaitablePromise;
        })
        .then(() => Promise.resolve());

      return createWaitablePromise<void>(result).onWait((_, waitRequestOptions) => {
        return Promise.all(responses.map(response => response.wait(waitRequestOptions)));
      });
    },
  };
};

export type HasReplaceAllObjects = {
  readonly replaceAllObjects: (
    objects: readonly object[],
    requestOptions?: ReplaceAllObjectsOptions & RequestOptions
  ) => Readonly<WaitablePromise<void>>;
};
