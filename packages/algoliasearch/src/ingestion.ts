import { AuthMode, ClientTransporterOptions, createAuth, encode } from '@algolia/client-common';
import {
  BatchActionEnum,
  ChunkOptions,
  PartialUpdateObjectsOptions,
  SaveObjectsOptions,
  SearchClientOptions,
} from '@algolia/client-search';
import { MethodEnum } from '@algolia/requester-common';
import { CallEnum, createTransporter, RequestOptions } from '@algolia/transporter';

import { PushOptions, PushProps, TransformationOptions, WatchResponse } from './types';

export const createIngestionClient = (
  options: SearchClientOptions & ClientTransporterOptions & TransformationOptions
) => {
  if (!options.transformation?.region) {
    throw new Error('`region` must be provided when leveraging the transformation pipeline');
  }

  const appId = options.appId;

  const auth = createAuth(
    options.authMode !== undefined ? options.authMode : AuthMode.WithinHeaders,
    appId,
    options.apiKey
  );

  const transporter = createTransporter({
    hosts: [
      {
        url: `data.${options.transformation?.region}.algolia.com`,
        accept: CallEnum.ReadWrite,
        protocol: 'https',
      },
    ],
    ...options,
    headers: {
      ...auth.headers(),
      ...{ 'content-type': 'application/x-www-form-urlencoded' },
      ...options.headers,
    },
    queryParameters: {
      ...auth.queryParameters(),
      ...options.queryParameters,
    },
  });

  return {
    transporter,
    appId,
    addAlgoliaAgent(segment: string, version?: string): void {
      transporter.userAgent.add({ segment, version });
      transporter.userAgent.add({ segment: 'Ingestion via Algoliasearch' });
    },
    clearCache(): Readonly<Promise<void>> {
      return Promise.all([
        transporter.requestsCache.clear(),
        transporter.responsesCache.clear(),
      ]).then(() => undefined);
    },
    /**
     * Pushes records through the Pipeline, directly to an index. You can make the call synchronous by providing the `watch` parameter, for asynchronous calls, you can use the observability endpoints and/or debugger dashboard to see the status of your task. This method is similar to `pushTask`, but requires an `indexName` instead of a `taskID`. If zero or many tasks are found, an error will be returned.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param push - The push object.
     * @param push.indexName - Name of the index on which to perform the operation.
     * @param push.pushTaskPayload - The pushTaskPayload object.
     * @param push.watch - When provided, the push operation will be synchronous and the API will wait for the ingestion to be finished before responding.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
    async push(
      { indexName, pushTaskPayload, watch }: PushProps,
      requestOptions?: RequestOptions
    ): Promise<WatchResponse> {
      if (!indexName) {
        throw new Error('Parameter `indexName` is required when calling `push`.');
      }

      if (!pushTaskPayload) {
        throw new Error('Parameter `pushTaskPayload` is required when calling `push`.');
      }

      if (!pushTaskPayload.action) {
        throw new Error('Parameter `pushTaskPayload.action` is required when calling `push`.');
      }

      if (!pushTaskPayload.records) {
        throw new Error('Parameter `pushTaskPayload.records` is required when calling `push`.');
      }

      return await transporter.write<WatchResponse>(
        {
          method: MethodEnum.Post,
          path: encode('1/push/%s', indexName),
          data: pushTaskPayload,
        },
        {
          ...(requestOptions || {}),
          queryParameters: {
            ...requestOptions?.queryParameters,
            watch: watch !== undefined,
          },
        }
      );
    },
  };
};

export const saveObjectsWithTransformation = (indexName: string, client?: IngestionClient) => {
  return async (
    objects: ReadonlyArray<Readonly<Record<string, any>>>,
    requestOptions?: RequestOptions & ChunkOptions & SaveObjectsOptions & PushOptions
  ): Promise<WatchResponse> => {
    if (!client) {
      throw new Error(
        '`options.transformation.region` must be provided at client instantiation before calling this method.'
      );
    }

    const { autoGenerateObjectIDIfNotExist, watch, ...rest } = requestOptions || {};

    const action = autoGenerateObjectIDIfNotExist
      ? BatchActionEnum.AddObject
      : BatchActionEnum.UpdateObject;

    /* eslint functional/immutable-data: "off" */
    return await client.push(
      {
        indexName,
        pushTaskPayload: { action, records: objects },
        watch,
      },
      rest
    );
  };
};

export const partialUpdateObjectsWithTransformation = (
  indexName: string,
  client?: IngestionClient
) => {
  return async (
    objects: ReadonlyArray<Readonly<Record<string, any>>>,
    requestOptions?: RequestOptions & ChunkOptions & PartialUpdateObjectsOptions & PushOptions
  ): Promise<WatchResponse> => {
    if (!client) {
      throw new Error(
        '`options.transformation.region` must be provided at client instantiation before calling this method.'
      );
    }

    const { createIfNotExists, watch, ...rest } = requestOptions || {};

    const action = createIfNotExists
      ? BatchActionEnum.PartialUpdateObject
      : BatchActionEnum.PartialUpdateObjectNoCreate;

    /* eslint functional/immutable-data: "off" */
    return await client.push(
      {
        indexName,
        pushTaskPayload: { action, records: objects },
        watch,
      },
      rest
    );
  };
};

export type IngestionClient = ReturnType<typeof createIngestionClient>;
