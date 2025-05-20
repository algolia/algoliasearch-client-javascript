import { AuthMode, ClientTransporterOptions, createAuth, encode } from '@algolia/client-common';
import {
  BatchActionEnum,
  BatchActionType,
  ChunkOptions,
  PartialUpdateObjectsOptions,
  SaveObjectsOptions,
  SearchClientOptions,
} from '@algolia/client-search';
import { MethodEnum } from '@algolia/requester-common';
import { CallEnum, createTransporter, RequestOptions } from '@algolia/transporter';

// The Algolia log regions supported by the Ingestion API.
export declare const INGESTION_REGIONS: readonly ['eu', 'us'];

// The Algolia log regions supported by the Ingestion API.
export type IngestionRegion = typeof INGESTION_REGIONS[number];

export type TransformationOptions = {
  // When provided, a second transporter will be created in order to leverage the `*WithTransformation` methods exposed by the Push connector (https://www.algolia.com/doc/guides/sending-and-managing-data/send-and-update-your-data/connectors/push/).
  readonly transformation?: {
    // The region of your Algolia application ID, used to target the correct hosts of the transformation service.
    readonly region: IngestionRegion;
  };
};

export type IngestionMethods = {
  /**
   * Helper: Similar to the `saveObjects` method but requires a Push connector (https://www.algolia.com/doc/guides/sending-and-managing-data/send-and-update-your-data/connectors/push/) to be created first, in order to transform records before indexing them to Algolia. The `region` must've been passed to the client instantiation method.
   *
   * @summary Save objects to an Algolia index by leveraging the Transformation pipeline setup in the Push connector (https://www.algolia.com/doc/guides/sending-and-managing-data/send-and-update-your-data/connectors/push/).
   * @param objects - The array of `objects` to store in the given Algolia `indexName`.
   * @param requestOptions - The requestOptions to send along with the query, they will be forwarded to the `batch` method and merged with the transporter requestOptions.
   */
  readonly saveObjectsWithTransformation: (
    objects: ReadonlyArray<Readonly<Record<string, any>>>,
    requestOptions?: RequestOptions & ChunkOptions & SaveObjectsOptions & PushOptions
  ) => Promise<WatchResponse>;

  /**
   * Helper: Similar to the `partialUpdateObjects` method but requires a Push connector (https://www.algolia.com/doc/guides/sending-and-managing-data/send-and-update-your-data/connectors/push/) to be created first, in order to transform records before indexing them to Algolia. The `region` must've been passed to the client instantiation method.
   *
   * @summary Save objects to an Algolia index by leveraging the Transformation pipeline setup in the Push connector (https://www.algolia.com/doc/guides/sending-and-managing-data/send-and-update-your-data/connectors/push/).
   * @param objects - The array of `objects` to update in the given Algolia `indexName`.
   * @param requestOptions - The requestOptions to send along with the query, they will be forwarded to the `getTask` method and merged with the transporter requestOptions.
   */
  readonly partialUpdateObjectsWithTransformation: (
    objects: ReadonlyArray<Readonly<Record<string, any>>>,
    requestOptions?: RequestOptions & ChunkOptions & PartialUpdateObjectsOptions & PushOptions
  ) => Promise<WatchResponse>;
};

export type WatchResponse = {
  /**
   * Universally unique identifier (UUID) of a task run.
   */
  readonly runID: string;
  /**
   * when used with discovering or validating sources, the sampled data of your source is returned.
   */
  readonly data?: ReadonlyArray<Record<string, unknown>>;
  /**
   * in case of error, observability events will be added to the response, if any.
   */
  readonly events?: readonly Event[];
  /**
   * a message describing the outcome of a validate run.
   */
  readonly message?: string;
};

/**
 * Properties for the `push` method.
 */
export type PushProps = {
  /**
   * Name of the index on which to perform the operation.
   */
  readonly indexName: string;
  readonly pushTaskPayload: {
    readonly action: BatchActionType;
    readonly records: Record<string, any>;
  };
  /**
   * When provided, the push operation will be synchronous and the API will wait for the ingestion to be finished before responding.
   */
  readonly watch?: boolean;
};

export type PushOptions = Pick<PushProps, 'watch'>;

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
