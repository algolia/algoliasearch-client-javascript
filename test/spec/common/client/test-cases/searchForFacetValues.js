'use strict';

module.exports = [{
  testName: 'client.searchForFacetValues(query, cb)',
  object: 'client',
  methodName: 'searchForFacetValues',
  indexName: 'indexName',
  callArguments: [{
    indexName: 'indexName',
    params: {facetName: 'brands', facetQuery: 'co', ignorePlurals: false}
  }],
  action: 'read',
  expectedRequest: {
    method: 'POST',
    URL: {pathname: '/1/indexes/%s/facets/brands/query'},
    body: {
      params: 'facetQuery=co&ignorePlurals=false'
    }
  }
}];
