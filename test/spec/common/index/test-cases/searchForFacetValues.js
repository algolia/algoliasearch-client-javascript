'use strict';

module.exports = [{
  testName: 'index.searchForFacetValues(params, cb)',
  methodName: 'searchForFacetValues',
  callArguments: [{facetName: 'brands', facetQuery: 'co', ignorePlurals: false}],
  action: 'read',
  expectedRequest: {
    method: 'POST',
    URL: {pathname: '/1/indexes/%s/facets/brands/query'},
    body: {
      params: 'facetQuery=co&ignorePlurals=false'
    }
  }
}, {
  testName: 'index.searchFacet(params, cb)',
  methodName: 'searchFacet',
  callArguments: [{facetName: 'brands', facetQuery: 'co', ignorePlurals: false}],
  action: 'read',
  expectedRequest: {
    method: 'POST',
    URL: {pathname: '/1/indexes/%s/facets/brands/query'},
    body: {
      params: 'facetQuery=co&ignorePlurals=false'
    }
  }
}];
