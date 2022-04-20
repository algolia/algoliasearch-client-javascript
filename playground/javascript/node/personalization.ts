import { personalizationClient } from '@experimental-api-clients-automation/client-personalization';
import { ApiError } from '@experimental-api-clients-automation/client-common';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

const appId = process.env.ALGOLIA_APPLICATION_ID || '**** APP_ID *****';
const apiKey =
  process.env.ALGOLIA_RECOMMENDATION_KEY || '**** RECOMMENDATION_API_KEY *****';

// Init client with appId and apiKey
const client = personalizationClient(appId, apiKey, 'eu');

async function testPersonalization() {
  try {
    const res = await client.deleteUserProfile({ userToken: 'userToken' });

    console.log(`[OK]`, res);
  } catch (e) {
    if (e instanceof ApiError) {
      return console.log(`[${e.status}] ${e.message}`, e.stackTrace);
    }

    console.log('[ERROR]', e);
  }
}

testPersonalization();
