import {
  BatchActionType,
  ChunkOptions,
  PartialUpdateObjectsOptions,
  SaveObjectsOptions,
} from '@algolia/client-search';
import { RequestOptions } from '@algolia/transporter';

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
