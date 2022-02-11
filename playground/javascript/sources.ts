import { sourcesApi } from '@algolia/client-sources';
import { ApiError } from '@algolia/client-common';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const appId = process.env.ALGOLIA_APPLICATION_ID || '**** APP_ID *****';
const apiKey = process.env.ALGOLIA_ADMIN_KEY || '**** ALGOLIA_ADMIN_KEY *****';

// Init client with appId and apiKey
const client = sourcesApi(appId, apiKey, 'us');

async function testSource() {
  try {
    const res = await client.postIngestUrl({
      type: 'csv',
      input: {
        url: '',
      },
      target: {
        indexName: 'test',
        operation: 'replace',
        type: 'search',
      },
    });

    console.log(`[OK]`, res);
  } catch (e) {
    if (e instanceof ApiError) {
      return console.log(`[${e.status}] ${e.message}`, e.stackTrace);
    }

    console.log('[ERROR]', e);
  }
}

testSource();
