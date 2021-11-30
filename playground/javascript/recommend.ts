import { RecommendApi, ApiError, RecommendationRequest } from '@algolia/recommend';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const appId = process.env.ALGOLIA_APPLICATION_ID || '**** APP_ID *****';
const apiKey = process.env.ALGOLIA_SEARCH_KEY || '**** SEARCH_API_KEY *****';

const searchIndex = process.env.SEARCH_INDEX || 'test_index';
const searchQuery = process.env.SEARCH_QUERY || 'test_query';

// Init client with appId and apiKey
const client = new RecommendApi(appId, apiKey);

async function testRecommend() {
  try {
    const res = await client.getRecommendations({
      requests: [
        {
          indexName: searchIndex,
          model: RecommendationRequest.ModelEnum['BoughtTogether'],
          objectID: searchQuery,
          threshold: 0,
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

testRecommend();
