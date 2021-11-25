import { searchClient, ApiError } from 'algoliasearch-client-javascript';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const appId = process.env.ALGOLIA_APPLICATION_ID || '**** APP_ID *****';
const apiKey = process.env.ALGOLIA_SEARCH_KEY || '**** SEARCH_API_KEY *****';

const searchIndex = process.env.SEARCH_INDEX || 'test_index';
const searchQuery = process.env.SEARCH_QUERY || 'test_query';

// Init client with appId and apiKey
const client = new searchClient(appId, apiKey);

async function testMultiQueries() {
  try {
    const res = await client.multipleQueries({
      requests: [
        {
          indexName: searchIndex,
          query: searchQuery,
        },
      ],
    });

    console.log(`[OK]`, res);
  } catch (e) {
    if (e instanceof ApiError) {
      return console.log(`[${e.status}] ${e.message}`, e.stackTrace);
    }

    console.log('[ERROR]', e);
  }
}

async function testSearch() {
  try {
    const res = await client.search(searchIndex, {
      query: searchQuery,
    });

    console.log(`[OK]`, res);
  } catch (e) {
    if (e instanceof ApiError) {
      return console.log(`[${e.status}] ${e.message}`, e.stackTrace);
    }

    console.log('[ERROR]', JSON.stringify(e, null, 4));
  }
}

// testMultiQueries();
testSearch();
