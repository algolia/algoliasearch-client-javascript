'use strict';

module.exports = [{
  testName: 'client.searchUserIDs(undefined, cb)',
  object: 'client',
  methodName: 'searchUserIDs',
  callArguments: [undefined],
  action: 'write',
  expectedRequest: {
    method: 'POST',
    body: undefined,
    URL: {pathname: '/1/clusters/mapping/search'}
  }
}, {
  testName: 'client.searchUserIDs({page}, cb)',
  object: 'client',
  methodName: 'searchUserIDs',
  callArguments: [{page: 5}],
  action: 'write',
  expectedRequest: {
    method: 'POST',
    body: {page: 5},
    URL: {pathname: '/1/clusters/mapping/search'}
  }
}, {
  testName: 'client.searchUserIDs({query, page, hitsPerPage}, cb)',
  object: 'client',
  methodName: 'searchUserIDs',
  callArguments: [{query: 'hi', page: 5, hitsPerPage: 3}],
  action: 'write',
  expectedRequest: {
    method: 'POST',
    body: {query: 'hi', page: 5, hitsPerPage: 3},
    URL: {pathname: '/1/clusters/mapping/search'}
  }
}];
