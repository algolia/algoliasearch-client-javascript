import { createWaitablePromise, encode, WaitablePromise } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import {
  ChunkedBatchResponse,
  ChunkOptions,
  IndexOperationResponse,
  ReplaceAllObjectsOptions,
  saveObjects,
  SaveObjectsOptions,
  SearchIndex,
  waitTask,
} from '../..';

export const replaceAllObjects = (base: SearchIndex) => {
  return (
    objects: ReadonlyArray<Readonly<Record<string, any>>>,
    requestOptions?: ReplaceAllObjectsOptions & ChunkOptions & SaveObjectsOptions & RequestOptions
  ): Readonly<WaitablePromise<ChunkedBatchResponse>> => {
    const { safe, autoGenerateObjectIDIfNotExist, batchSize, ...options } = requestOptions || {};

    const operation = (
      from: string,
      to: string,
      type: string,
      operationRequestOptions?: RequestOptions
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
          operationRequestOptions
        ),
        (response, waitRequestOptions) => waitTask(base)(response.taskID, waitRequestOptions)
      );
    };

    const randomSuffix = Math.random()
      .toString(36)
      .substring(7);

    const temporaryIndexName = `${base.indexName}_tmp_${randomSuffix}`;

    const saveObjectsInTemporary = saveObjects({
      appId: base.appId,
      transporter: base.transporter,
      indexName: temporaryIndexName,
    });

    // @ts-ignore
    // eslint-disable-next-line prefer-const, functional/no-let, functional/prefer-readonly-type
    let responses: [
      WaitablePromise<IndexOperationResponse>,
      WaitablePromise<ChunkedBatchResponse>,
      WaitablePromise<IndexOperationResponse>
    ] = [];

    const copyWaitablePromise = operation(base.indexName, temporaryIndexName, 'copy', {
      ...options,
      scope: ['settings', 'synonyms', 'rules'],
    });

    // eslint-disable-next-line functional/immutable-data
    responses.push(copyWaitablePromise);

    const result: Promise<ChunkedBatchResponse> = (safe
      ? copyWaitablePromise.wait(options)
      : copyWaitablePromise
    )
      .then(() => {
        const saveObjectsWaitablePromise = saveObjectsInTemporary(objects, {
          ...options,
          autoGenerateObjectIDIfNotExist,
          batchSize,
        });

        // eslint-disable-next-line functional/immutable-data
        responses.push(saveObjectsWaitablePromise);

        return safe ? saveObjectsWaitablePromise.wait(options) : saveObjectsWaitablePromise;
      })
      .then(() => {
        const moveWaitablePromise = operation(temporaryIndexName, base.indexName, 'move', options);

        // eslint-disable-next-line functional/immutable-data
        responses.push(moveWaitablePromise);

        return safe ? moveWaitablePromise.wait(options) : moveWaitablePromise;
      })
      .then(() => Promise.all(responses))
      .then(([copyResponse, saveObjectsResponse, moveResponse]) => {
        return {
          objectIDs: saveObjectsResponse.objectIDs,
          taskIDs: [copyResponse.taskID, ...saveObjectsResponse.taskIDs, moveResponse.taskID],
        };
      });

    return createWaitablePromise(result, (_, waitRequestOptions) => {
      return Promise.all(
        responses.map(response => response.wait(waitRequestOptions) as WaitablePromise<any>)
      );
    });
  };
};
