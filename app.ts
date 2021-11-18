import { searchClient, HttpError } from 'algoliasearch-client-javascript';
import dotenv from 'dotenv';

dotenv.config();

const appId = process.env.ALGOLIA_APPLICATION_ID || '**** APP_ID *****';
const apiKey = process.env.ALGOLIA_SEARCH_KEY || '**** SEARCH_API_KEY *****';

// Init client with appId and apiKey
const client = new searchClient(appId, apiKey);

async function testMultiQueries() {
  try {
    const res = await client.multipleQueries({
      requests: [
        {
          indexName: 'docsearch',
          query: 'crawler',
        },
      ],
    });

    console.log(`[OK]`, res);
  } catch (e) {
    if (e instanceof HttpError) {
      return console.log(`[${e.statusCode} - ${e.response.statusMessage}]`, e.response);
    }

    console.log('[ERROR]', e);
  }
}

async function testSearch() {
  try {
    const res = await client.search('docsearch', {
      query: 'crawler',
    });

    console.log(`[OK]`, res);
  } catch (e) {
    if (e instanceof HttpError) {
      return console.log(`[${e.statusCode} - ${e.response.statusMessage}]`, e.response);
    }

    console.log('[ERROR]', e);
  }
}

// testMultiQueries();
testSearch();
