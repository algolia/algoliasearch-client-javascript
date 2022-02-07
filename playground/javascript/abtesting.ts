import { abtestingApi, ApiError } from '@algolia/client-abtesting';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const appId = process.env.ALGOLIA_APPLICATION_ID || '**** APP_ID *****';
const apiKey =
  process.env.ALGOLIA_ANALYTICS_KEY || '**** ANALYTICS_API_KEY *****';

// Init client with appId and apiKey
const client = abtestingApi(appId, apiKey, 'de');

async function testABTesting() {
  try {
    const res = await client.addABTests({
      endAt: '2022-02-01',
      name: 'testing',
      variant: [
        {
          index: 'test1',
          trafficPercentage: 30,
        },
        {
          index: 'test2',
          trafficPercentage: 50,
        },
      ],
    });

    console.log(`[OK]`, res);
  } catch (e) {
    if (e instanceof ApiError) {
      return console.log(`[${e.status}] ${e.message}`, e.stackTrace, e);
    }

    console.log('[ERROR]', e);
  }
}

testABTesting();
