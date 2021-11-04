import { SearchApi } from 'algoliasearch-client-javascript';

const client = new SearchApi();

async function testClient() {
  // test openapi gen
  try {
    const res = await client.search(
      [
        {
          indexName: 'docsearch',
          query: 'crawler',
        },
      ],
      'R2IYF7ETH7',
      'e1e920e59f457ec70473486171c1d3b6'
    );

    console.log('[1-RESPONSE]', res);
  } catch (e) {
    console.error('[1-ERROR]', e);
  }
}

testClient();
