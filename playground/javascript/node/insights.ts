import { insightsClient } from '@experimental-api-clients-automation/client-insights';
import { ApiError } from '@experimental-api-clients-automation/client-common';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

const appId = process.env.ALGOLIA_APPLICATION_ID || '**** APP_ID *****';
const apiKey =
  process.env.ALGOLIA_INSIGHTS_API_KEY || '**** INSIGHTS_API_KEY *****';

// Init client with appId and apiKey
const client = insightsClient(appId, apiKey);

async function testInsights() {
  try {
    const res = await client.pushEvents({
      events: [],
    });

    console.log(`[OK]`, res);
  } catch (e) {
    if (e instanceof ApiError) {
      return console.log(`[${e.status}] ${e.message}`, e.stackTrace);
    }

    console.log('[ERROR]', e);
  }
}

testInsights();
