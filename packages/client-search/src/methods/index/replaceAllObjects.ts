import { createWaitablePromise, encode, WaitablePromise } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import { IndexOperationResponse, ReplaceAllObjectsOptions, SearchIndex } from '../..';
import { saveObjects, waitTask } from '.';

export const replaceAllObjects = (base: SearchIndex) => {
  return (
    objects: ReadonlyArray<{ readonly [key: string]: any }>,
    requestOptions?: ReplaceAllObjectsOptions & RequestOptions
  ): Readonly<WaitablePromise<void>> => {
    const { safe, ...options } = requestOptions || {};

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

    // eslint-disable-next-line prefer-const, functional/no-let, functional/prefer-readonly-type
    let responses: Array<Readonly<WaitablePromise<any>>> = [];

    const copyWaitablePromise = operation(base.indexName, temporaryIndexName, 'copy', {
      ...options,
      scope: ['settings', 'synonyms', 'rules'],
    });

    // eslint-disable-next-line functional/immutable-data
    responses.push(copyWaitablePromise);

    const result = (safe ? copyWaitablePromise.wait(options) : copyWaitablePromise)
      .then(() => {
        const saveObjectsWaitablePromise = saveObjectsInTemporary(objects, options);

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
      .then(() => Promise.resolve());

    return createWaitablePromise<void>(result, (_, waitRequestOptions) => {
      return Promise.all(responses.map(response => response.wait(waitRequestOptions)));
    });
  };
};
