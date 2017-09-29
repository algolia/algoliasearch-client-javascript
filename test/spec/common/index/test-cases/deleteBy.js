'use strict';

module.exports = [
  {
    object: 'index',
    methodName: 'deleteBy',
    testName: 'index.deleteBy({query}, cb)',
    callArguments: [{query: 'some q'}],
    action: 'write',
    expectedRequest: {
      method: 'POST',
      URL: {
        pathname: '/1/indexes/%s/deleteByQuery'
      },
      body: {
        params: 'query=some%20q'
      }
    }
  },
  {
    object: 'index',
    methodName: 'deleteBy',
    testName: 'index.deleteBy({query}, cb)',
    callArguments: [
      {query: 'some q', facetFilters: 'category:Book,author:John%20Doe'}
    ],
    action: 'write',
    expectedRequest: {
      method: 'POST',
      URL: {
        pathname: '/1/indexes/%s/deleteByQuery'
      },
      body: {
        params:
          'query=some%20q&facetFilters=category%3ABook%2Cauthor%3AJohn%2520Doe'
      }
    }
  }
];
