import { createBrowserLocalStorageCache } from '@algolia/cache-browser-local-storage';
import { createInMemoryCache } from '@algolia/cache-in-memory';
import {
  addABTest,
  createAnalyticsClient,
  deleteABTest,
  getABTest,
  getABTests,
  stopABTest,
} from '@algolia/client-analytics';
import { version } from '@algolia/client-common';
import {
  addApiKey,
  batch,
  browseObjects,
  browseRules,
  browseSynonyms,
  clearObjects,
  clearRules,
  clearSynonyms,
  copyIndex,
  copySettings,
  copySynonyms,
  createSearchClient,
  deleteApiKey,
  deleteBy,
  deleteIndex,
  deleteObject,
  deleteObjects,
  deleteRule,
  deleteSynonym,
  exists,
  findObject,
  getApiKey,
  getLogs,
  getObject,
  getObjectPosition,
  getObjects,
  getPersonalizationStrategy,
  getRule,
  getSettings,
  getSynonym,
  initIndex,
  listApiKeys,
  listClusters,
  listIndices,
  moveIndex,
  multipleBatch,
  multipleGetObjects,
  multipleQueries,
  multipleSearchForFacetValues,
  partialUpdateObject,
  partialUpdateObjects,
  replaceAllObjects,
  replaceAllRules,
  replaceAllSynonyms,
  restoreApiKey,
  saveObject,
  saveObjects,
  saveRule,
  saveRules,
  saveSynonym,
  saveSynonyms,
  search,
  searchForFacetValues,
  searchRules,
  searchSynonyms,
  setPersonalizationStrategy,
  setSettings,
  updateApiKey,
  waitTask,
} from '@algolia/client-search';
import { LogLevelEnum } from '@algolia/logger-common';
import { createConsoleLogger } from '@algolia/logger-console';
import { createBrowserXhrRequester } from '@algolia/requester-browser-xhr';
import { createUserAgent } from '@algolia/transporter';

import { AlgoliaSearchOptions } from '../types';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function algoliasearch(
  appId: string,
  apiKey: string,
  options: AlgoliaSearchOptions = {}
) {
  const logger = createConsoleLogger(options.logLevel || LogLevelEnum.Error);

  const clientOptions = {
    appId,
    apiKey,
    timeouts: {
      read: 1,
      write: 30,
    },
    requester: createBrowserXhrRequester(),
    logger,
    responsesCache: createInMemoryCache(),
    requestsCache: createInMemoryCache(),
    hostsCache: createBrowserLocalStorageCache(logger),
    userAgent: createUserAgent(version).add({ segment: 'Browser' }),
  };

  return createSearchClient({
    ...clientOptions,
    methods: {
      search: multipleQueries,
      searchForFacetValues: multipleSearchForFacetValues,
      multipleBatch,
      multipleGetObjects,
      multipleQueries,
      copyIndex,
      copySettings,
      copySynonyms,
      moveIndex,
      getPersonalizationStrategy,
      setPersonalizationStrategy,
      listIndices,
      getLogs,
      listClusters,
      multipleSearchForFacetValues,
      getApiKey,
      addApiKey,
      listApiKeys,
      updateApiKey,
      deleteApiKey,
      restoreApiKey,
      initIndex: base => (indexName: string) => {
        return initIndex(base)(indexName, {
          methods: {
            batch,
            delete: deleteIndex,
            getObject,
            getObjects,
            saveObject,
            saveObjects,
            search,
            searchForFacetValues,
            waitTask,
            setSettings,
            getSettings,
            partialUpdateObject,
            partialUpdateObjects,
            deleteObject,
            deleteObjects,
            deleteBy,
            clearObjects,
            browseObjects,
            getObjectPosition,
            findObject,
            exists,
            saveSynonym,
            saveSynonyms,
            getSynonym,
            searchSynonyms,
            browseSynonyms,
            deleteSynonym,
            clearSynonyms,
            replaceAllObjects,
            replaceAllSynonyms,
            searchRules,
            getRule,
            deleteRule,
            saveRule,
            saveRules,
            replaceAllRules,
            browseRules,
            clearRules,
          },
        });
      },
      initAnalytics: () => (region?: string) => {
        return createAnalyticsClient({
          ...clientOptions,
          region,
          methods: {
            addABTest,
            getABTest,
            getABTests,
            stopABTest,
            deleteABTest,
          },
        });
      },
    },
  });
}

export type SearchClient = ReturnType<typeof algoliasearch>;
export type SearchIndex = ReturnType<SearchClient['initIndex']>;
export type AnalyticsClient = ReturnType<SearchClient['initAnalytics']>;

export * from '../types';

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions, functional/immutable-data
(<any>window).algoliasearch = algoliasearch;
