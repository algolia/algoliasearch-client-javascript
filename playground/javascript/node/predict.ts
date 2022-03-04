import { predictApi } from '@experimental-api-clients-automation/client-predict';
import { ApiError } from '@experimental-api-clients-automation/client-common';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

const appId = process.env.ALGOLIA_APPLICATION_ID || '**** APP_ID *****';
const apiKey = process.env.ALGOLIA_SEARCH_KEY || '**** SEARCH_API_KEY *****';

const userId = process.env.USER_ID || 'user1';

// Init client with appId and apiKey
const predictClient = predictApi(appId, apiKey);

async function testPredict() {
  try {
    const userProfile = await predictClient.fetchUserProfile({
      userID: userId,
      params: {
        modelsToRetrieve: ['funnel_stage', 'order_value', 'affinities'],
        typesToRetrieve: ['properties', 'segments'],
      },
    });

    console.log(`[OK]`, userProfile);
  } catch (e) {
    if (e instanceof ApiError) {
      return console.log(`[${e.status}] ${e.message}`, e.stackTrace);
    }

    console.log('[ERROR]', e);
  }
}

testPredict();
