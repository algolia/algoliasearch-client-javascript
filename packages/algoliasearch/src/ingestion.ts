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

import {
  IngestionClient,
  PushOptions,
  PushProps,
  REGIONS,
  TransformationOptions,
  WatchResponse,
} from './types';

export function createIngestionClient(
  options: SearchClientOptions & ClientTransporterOptions & TransformationOptions
): IngestionClient {
  if (!options || !options.transformation || !options.transformation.region) {
    throw new Error('`region` must be provided when leveraging the transformation pipeline');
  }

  if (!REGIONS.includes(options.transformation.region)) {
    throw new Error(
      `\`region\` is required and must be one of the following: ${REGIONS.join(', ')}`
    );
  }

  const appId = options.appId;

  const auth = createAuth(AuthMode.WithinHeaders, appId, options.apiKey);

  const transporter = createTransporter({
    hosts: [
      {
        url: `data.${options.transformation.region}.algolia.com`,
        accept: CallEnum.ReadWrite,
        protocol: 'https',
      },
    ],
    ...options,
    headers: {
      ...auth.headers(),
      ...{ 'content-type': 'text/plain' },
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
      transporter.userAgent.add({ segment: 'Ingestion', version });
      transporter.userAgent.add({ segment: 'Ingestion via Algoliasearch' });
    },
    clearCache(): Readonly<Promise<void>> {
      return Promise.all([
        transporter.requestsCache.clear(),
        transporter.responsesCache.clear(),
      ]).then(() => undefined);
    },
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

      const opts: RequestOptions = requestOptions || { queryParameters: {} };

      return await transporter.write<WatchResponse>(
        {
          method: MethodEnum.Post,
          path: encode('1/push/%s', indexName),
          data: pushTaskPayload,
        },
        {
          ...opts,
          queryParameters: {
            ...opts.queryParameters,
            watch: watch !== undefined,
          },
        }
      );
    },
  };
}

export function saveObjectsWithTransformation(indexName: string, client?: IngestionClient) {
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
}

export function partialUpdateObjectsWithTransformation(
  indexName: string,
  client?: IngestionClient
) {
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
}
