import {
  QuerySuggestionsApi,
  ApiError,
} from '@algolia/client-query-suggestions';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const appId = process.env.ALGOLIA_APPLICATION_ID || '**** APP_ID *****';
const apiKey =
  process.env.ALGOLIA_QUERY_SUGGESTIONS_KEY ||
  '**** QUERY_SUGGESTIONS_KEY *****';

// Init client with appId and apiKey
const client = new QuerySuggestionsApi(appId, apiKey, 'us');

async function testABTesting() {
  try {
    const res = await client.getAllConfigs();

    console.log(`[OK]`, res);
  } catch (e) {
    if (e instanceof ApiError) {
      return console.log(`[${e.status}] ${e.message}`, e.stackTrace, e);
    }

    console.log('[ERROR]', e);
  }
}

testABTesting();
