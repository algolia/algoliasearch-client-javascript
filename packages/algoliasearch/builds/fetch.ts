// Code generated by OpenAPI Generator (https://openapi-generator.tech), manual changes will be lost - read more on https://github.com/algolia/api-clients-automation. DO NOT EDIT.

import type { ClientOptions, RequestOptions } from '@algolia/client-common';

import type { AbtestingClient } from '@algolia/client-abtesting';
import { abtestingClient } from '@algolia/client-abtesting';
import type { AnalyticsClient } from '@algolia/client-analytics';
import { analyticsClient } from '@algolia/client-analytics';
import type { InsightsClient } from '@algolia/client-insights';
import { insightsClient } from '@algolia/client-insights';
import type { PersonalizationClient } from '@algolia/client-personalization';
import { personalizationClient } from '@algolia/client-personalization';
import type { QuerySuggestionsClient } from '@algolia/client-query-suggestions';
import { querySuggestionsClient } from '@algolia/client-query-suggestions';
import type { SearchClient } from '@algolia/client-search';
import { searchClient } from '@algolia/client-search';
import type { IngestionClient } from '@algolia/ingestion';
import { ingestionClient } from '@algolia/ingestion';
import type { MonitoringClient } from '@algolia/monitoring';
import { monitoringClient } from '@algolia/monitoring';
import type { RecommendClient } from '@algolia/recommend';
import { recommendClient } from '@algolia/recommend';

import type { PartialUpdateObjectsOptions, SaveObjectsOptions } from '@algolia/client-search';
import type { PushTaskRecords, WatchResponse } from '@algolia/ingestion';

import type {
  AbtestingRegionOptions,
  AnalyticsRegionOptions,
  IngestionRegion,
  IngestionRegionOptions,
  InitClientOptions,
  InsightsRegionOptions,
  PersonalizationRegionOptions,
  QuerySuggestionsRegionOptions,
} from './models';

export * from './models';

export type Algoliasearch = SearchClient & {
  initAbtesting: (initOptions: InitClientOptions & AbtestingRegionOptions) => AbtestingClient;
  initAnalytics: (initOptions: InitClientOptions & AnalyticsRegionOptions) => AnalyticsClient;
  initIngestion: (initOptions: InitClientOptions & IngestionRegionOptions) => IngestionClient;
  initInsights: (initOptions: InitClientOptions & InsightsRegionOptions) => InsightsClient;
  initMonitoring: (initOptions?: InitClientOptions) => MonitoringClient;
  initPersonalization: (initOptions: InitClientOptions & PersonalizationRegionOptions) => PersonalizationClient;
  initQuerySuggestions: (initOptions: InitClientOptions & QuerySuggestionsRegionOptions) => QuerySuggestionsClient;
  initRecommend: (initOptions?: InitClientOptions) => RecommendClient;

  // Bridge helpers to expose along with the search endpoints at the root of the API client

  /**
   * Helper: Similar to the `saveObjects` method but requires a Push connector (https://www.algolia.com/doc/guides/sending-and-managing-data/send-and-update-your-data/connectors/push/) to be created first, in order to transform records before indexing them to Algolia. The `region` must've been passed to the client instantiation method.
   *
   * @summary Save objects to an Algolia index by leveraging the Transformation pipeline setup in the Push connector (https://www.algolia.com/doc/guides/sending-and-managing-data/send-and-update-your-data/connectors/push/).
   * @param saveObjects - The `saveObjects` object.
   * @param saveObjects.indexName - The `indexName` to save `objects` in.
   * @param saveObjects.objects - The array of `objects` to store in the given Algolia `indexName`.
   * @param saveObjects.batchSize - The size of the chunk of `objects`. The number of `batch` calls will be equal to `length(objects) / batchSize`. Defaults to 1000.
   * @param saveObjects.waitForTasks - Whether or not we should wait until every `batch` tasks has been processed, this operation may slow the total execution time of this method but is more reliable.
   * @param requestOptions - The requestOptions to send along with the query, they will be forwarded to the `batch` method and merged with the transporter requestOptions.
   */
  saveObjectsWithTransformation: (
    options: SaveObjectsOptions,
    requestOptions?: RequestOptions,
  ) => Promise<WatchResponse>;

  /**
   * Helper: Similar to the `partialUpdateObjects` method but requires a Push connector (https://www.algolia.com/doc/guides/sending-and-managing-data/send-and-update-your-data/connectors/push/) to be created first, in order to transform records before indexing them to Algolia. The `region` must've been passed to the client instantiation method.
   *
   * @summary Save objects to an Algolia index by leveraging the Transformation pipeline setup in the Push connector (https://www.algolia.com/doc/guides/sending-and-managing-data/send-and-update-your-data/connectors/push/).
   * @param partialUpdateObjects - The `partialUpdateObjects` object.
   * @param partialUpdateObjects.indexName - The `indexName` to update `objects` in.
   * @param partialUpdateObjects.objects - The array of `objects` to update in the given Algolia `indexName`.
   * @param partialUpdateObjects.createIfNotExists - To be provided if non-existing objects are passed, otherwise, the call will fail..
   * @param partialUpdateObjects.batchSize - The size of the chunk of `objects`. The number of `batch` calls will be equal to `length(objects) / batchSize`. Defaults to 1000.
   * @param partialUpdateObjects.waitForTasks - Whether or not we should wait until every `batch` tasks has been processed, this operation may slow the total execution time of this method but is more reliable.
   * @param requestOptions - The requestOptions to send along with the query, they will be forwarded to the `getTask` method and merged with the transporter requestOptions.
   */
  partialUpdateObjectsWithTransformation: (
    options: PartialUpdateObjectsOptions,
    requestOptions?: RequestOptions,
  ) => Promise<WatchResponse>;
};

export type TransformationOptions = {
  // When provided, a second transporter will be created in order to leverage the `*WithTransformation` methods exposed by the Push connector (https://www.algolia.com/doc/guides/sending-and-managing-data/send-and-update-your-data/connectors/push/).
  transformation?: {
    // The region of your Algolia application ID, used to target the correct hosts of the transformation service.
    region: IngestionRegion;
  };
};

export function algoliasearch(
  appId: string,
  apiKey: string,
  options?: ClientOptions & TransformationOptions,
): Algoliasearch {
  if (!appId || typeof appId !== 'string') {
    throw new Error('`appId` is missing.');
  }

  if (!apiKey || typeof apiKey !== 'string') {
    throw new Error('`apiKey` is missing.');
  }

  const client = searchClient(appId, apiKey, options);

  let ingestionTransporter: IngestionClient | undefined;

  if (options?.transformation) {
    if (!options.transformation.region) {
      throw new Error('`region` must be provided when leveraging the transformation pipeline');
    }

    ingestionTransporter = ingestionClient(appId, apiKey, options.transformation.region, options);
  }

  return {
    ...client,

    async saveObjectsWithTransformation({ indexName, objects, waitForTasks }, requestOptions): Promise<WatchResponse> {
      if (!ingestionTransporter) {
        throw new Error('`transformation.region` must be provided at client instantiation before calling this method.');
      }

      if (!options?.transformation?.region) {
        throw new Error('`region` must be provided when leveraging the transformation pipeline');
      }

      return ingestionTransporter?.push(
        {
          indexName,
          watch: waitForTasks,
          pushTaskPayload: {
            action: 'addObject',
            records: objects as PushTaskRecords[],
          },
        },
        requestOptions,
      );
    },

    async partialUpdateObjectsWithTransformation(
      { indexName, objects, createIfNotExists, waitForTasks },
      requestOptions,
    ): Promise<WatchResponse> {
      if (!ingestionTransporter) {
        throw new Error('`transformation.region` must be provided at client instantiation before calling this method.');
      }

      if (!options?.transformation?.region) {
        throw new Error('`region` must be provided when leveraging the transformation pipeline');
      }

      return ingestionTransporter?.push(
        {
          indexName,
          watch: waitForTasks,
          pushTaskPayload: {
            action: createIfNotExists ? 'partialUpdateObject' : 'partialUpdateObjectNoCreate',
            records: objects as PushTaskRecords[],
          },
        },
        requestOptions,
      );
    },

    /**
     * Get the value of the `algoliaAgent`, used by our libraries internally and telemetry system.
     */
    get _ua(): string {
      return client.transporter.algoliaAgent.value;
    },

    initAbtesting: (initOptions: InitClientOptions & AbtestingRegionOptions): AbtestingClient => {
      return abtestingClient(
        initOptions.appId || appId,
        initOptions.apiKey || apiKey,
        initOptions.region,
        initOptions.options,
      );
    },

    initAnalytics: (initOptions: InitClientOptions & AnalyticsRegionOptions): AnalyticsClient => {
      return analyticsClient(
        initOptions.appId || appId,
        initOptions.apiKey || apiKey,
        initOptions.region,
        initOptions.options,
      );
    },

    initIngestion: (initOptions: InitClientOptions & IngestionRegionOptions): IngestionClient => {
      return ingestionClient(
        initOptions.appId || appId,
        initOptions.apiKey || apiKey,
        initOptions.region,
        initOptions.options,
      );
    },

    initInsights: (initOptions: InitClientOptions & InsightsRegionOptions): InsightsClient => {
      return insightsClient(
        initOptions.appId || appId,
        initOptions.apiKey || apiKey,
        initOptions.region,
        initOptions.options,
      );
    },

    initMonitoring: (initOptions: InitClientOptions = {}): MonitoringClient => {
      return monitoringClient(initOptions.appId || appId, initOptions.apiKey || apiKey, initOptions.options);
    },

    initPersonalization: (initOptions: InitClientOptions & PersonalizationRegionOptions): PersonalizationClient => {
      return personalizationClient(
        initOptions.appId || appId,
        initOptions.apiKey || apiKey,
        initOptions.region,
        initOptions.options,
      );
    },

    initQuerySuggestions: (initOptions: InitClientOptions & QuerySuggestionsRegionOptions): QuerySuggestionsClient => {
      return querySuggestionsClient(
        initOptions.appId || appId,
        initOptions.apiKey || apiKey,
        initOptions.region,
        initOptions.options,
      );
    },

    initRecommend: (initOptions: InitClientOptions = {}): RecommendClient => {
      return recommendClient(initOptions.appId || appId, initOptions.apiKey || apiKey, initOptions.options);
    },
  };
}
