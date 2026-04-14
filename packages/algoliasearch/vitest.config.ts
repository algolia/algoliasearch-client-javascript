import { cloudflareTest } from '@cloudflare/vitest-pool-workers';
import { defineConfig } from 'vitest/config';

const compatibilityDate = '2026-04-08';

export default defineConfig({
  test: {
    projects: [
      {
        resolve: {
          alias: {
            '@algolia/client-search': '../../client-search/builds/node',
          },
        },
        test: {
          include: ['__tests__/algoliasearch.node.test.ts'],
          name: 'node',
          environment: 'node',
        },
      },
      {
        resolve: {
          alias: {
            '@algolia/abtesting': '../../abtesting/builds/browser',
            '@algolia/client-abtesting': '../../client-abtesting/builds/browser',
            '@algolia/client-analytics': '../../client-analytics/builds/browser',
            '@algolia/client-insights': '../../client-insights/builds/browser',
            '@algolia/client-personalization': '../../client-personalization/builds/browser',
            '@algolia/client-query-suggestions': '../../client-query-suggestions/builds/browser',
            '@algolia/client-search': '../../client-search/builds/browser',
            '@algolia/ingestion': '../../ingestion/builds/browser',
            '@algolia/monitoring': '../../monitoring/builds/browser',
            '@algolia/recommend': '../../recommend/builds/browser',
          },
        },
        test: {
          include: ['__tests__/algoliasearch.browser.test.ts', '__tests__/algoliasearch.common.test.ts'],
          name: 'jsdom',
          environment: 'jsdom',
        },
      },
      {
        plugins: [cloudflareTest({ miniflare: { compatibilityDate } })],
        resolve: {
          alias: {
            '@algolia/client-search': '../../client-search/builds/fetch',
          },
        },
        test: {
          include: ['__tests__/algoliasearch.fetch.test.ts'],
          name: 'miniflare fetch',
        },
      },
      {
        plugins: [cloudflareTest({ miniflare: { compatibilityDate } })],
        resolve: {
          alias: {
            '@algolia/client-search': '../../client-search/builds/worker',
          },
        },
        test: {
          include: ['__tests__/algoliasearch.worker.test.ts'],
          name: 'miniflare worker',
        },
      },
    ],
  },
});
