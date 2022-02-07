import { sourcesApi, ApiError } from '@algolia/client-sources';
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
        // url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR7HII972uvH_5IOVCH8HS6348FJP575hs-v1f8EtrUYEFzuapc5QYrZIktNQJMUiF-9ACN_ddodkCk/pub?output=csv'
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
