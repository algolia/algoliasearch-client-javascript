import { searchClient } from './searchClient';

const appId = process.env.ALGOLIA_APPLICATION_ID_1 || '**** APP_ID *****';
const apiKey = process.env.ALGOLIA_ADMIN_KEY_1 || '**** API_KEY *****';
// Init client with appId and apiKey
const client = new searchClient(appId, apiKey);

async function testClient() {
  // test openapi gen
  try {
    const res = await client.multipleQueries({
      requests: [
        {
          indexName: 'docsearch',
          query: 'crawler',
        },
      ],
    });

    console.log('[1-RESPONSE]', res);
  } catch (e) {
    console.error('[1-ERROR]', e);
  }
}

testClient();
