import {
  BatchActionType,
  ChunkOptions,
  PartialUpdateObjectsOptions,
  SaveObjectsOptions,
  SearchClient as BaseSearchClient,
} from '@algolia/client-search';
import { RequestOptions } from '@algolia/transporter';

export const REGIONS = ['eu', 'us'] as const;
export type Region = typeof REGIONS[number];

export type TransformationOptions = {
  // When provided, a second transporter will be created in order to leverage the `*WithTransformation` methods exposed by the Push connector (https://www.algolia.com/doc/guides/sending-and-managing-data/send-and-update-your-data/connectors/push/).
  readonly transformation?: {
    // The region of your Algolia application ID, used to target the correct hosts of the transformation service.
    readonly region: Region;
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
   * Universally unique identifier (UUID) of an event.
   */
  readonly eventID?: string;

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

  /**
   * Date of creation in RFC 3339 format.
   */
  readonly createdAt?: string;
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

export type IngestionClient = BaseSearchClient & {
  /**
   * Pushes records through the Pipeline, directly to an index. You can make the call synchronous by providing the `watch` parameter, for asynchronous calls, you can use the observability endpoints and/or debugger dashboard to see the status of your task. If you want to leverage the [pre-indexing data transformation](https://www.algolia.com/doc/guides/sending-and-managing-data/send-and-update-your-data/how-to/transform-your-data/), this is the recommended way of ingesting your records. If zero or many tasks are found, an error will be returned.
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
  readonly push: (
    { indexName, pushTaskPayload, watch }: PushProps,
    requestOptions?: RequestOptions
  ) => Promise<WatchResponse>;
};
