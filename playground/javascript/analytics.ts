import { AnalyticsApi, ApiError } from '@algolia/client-analytics';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const appId = process.env.ALGOLIA_APPLICATION_ID || '**** APP_ID *****';
const apiKey =
  process.env.ALGOLIA_ANALYTICS_KEY || '**** ANALYTICS_API_KEY *****';

const analyticsIndex = process.env.ANALYTICS_INDEX || 'test_index';

// Init client with appId and apiKey
const client = new AnalyticsApi(appId, apiKey, 'de');

async function testAnalytics() {
  try {
    const res = await client.getSearchesNoResults({
      index: analyticsIndex,
    });

    console.log(`[OK]`, res);
  } catch (e) {
    if (e instanceof ApiError) {
      return console.log(`[${e.status}] ${e.message}`, e.stackTrace, e);
    }

    console.log('[ERROR]', e);
  }
}

testAnalytics();
