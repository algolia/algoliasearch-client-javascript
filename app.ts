import {
  DefaultApi as DefaultOpenAPI,
  GetRecommendationsRequest,
} from 'algoliasearch-client-javascript-openapi';
import { DefaultApi as DefaultSwaggerAPI } from 'algoliasearch-client-javascript-swagger';
// not exported by default?
import { GetRecommendationsRequestModelEnum } from 'algoliasearch-client-javascript-swagger/dist/models';

const openApiClient = new DefaultOpenAPI();
const swaggerClient = new DefaultSwaggerAPI();

async function testClients() {
  // test openapi gen
  try {
    const openApiResult = await openApiClient.getRecommendations(
      [
        {
          indexName: 'gstar_demo_test',
          model: GetRecommendationsRequest.ModelEnum['RelatedProducts'],
          objectID: 'abcd',
        },
      ],
      'HYDY1KWTWB',
      '28cf6d38411215e2eef188e635216508'
    );

    console.log('[1-RESPONSE]', openApiResult);
  } catch (e) {
    console.error('[1-ERROR]', e);
  }

  // test swagger gen
  try {
    const swaggerResult = await swaggerClient.getRecommendations(
      [
        {
          indexName: 'gstar_demo_test',
          model: GetRecommendationsRequestModelEnum['RelatedProducts'],
          objectID: 'abcd',
        },
      ],
      'HYDY1KWTWB',
      '28cf6d38411215e2eef188e635216508'
    );

    console.log('[2-RESPONSE]', swaggerResult);
  } catch (e) {
    console.error('[2-ERROR]', e);
  }
}

testClients();
