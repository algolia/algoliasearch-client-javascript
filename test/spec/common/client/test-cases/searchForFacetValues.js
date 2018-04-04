'use strict';

// FIXME: This test is skipped for now because the test framework doesn't
// allow to make it pass for now. It is tested with an integration test.
module.exports = [/* {
  testName: 'client.searchForFacetValues(queries)',
  object: 'client',
  methodName: 'searchForFacetValues',
  indexName: 'indexName',
  callArguments: [[{
    indexName: 'indexName',
    params: {facetName: 'brands', facetQuery: 'co', ignorePlurals: false}
  }]],
  action: 'read',
  expectedRequest: {
    method: 'POST',
    URL: {pathname: '/1/indexes/%s/facets/brands/query'},
    body: {
      params: 'facetQuery=co&ignorePlurals=false'
    }
  }
} */];
