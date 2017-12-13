'use strict';

module.exports = [{
  testName: 'client.listUserIDs(undefined, cb)',
  object: 'client',
  methodName: 'listUserIDs',
  callArguments: [undefined],
  action: 'read',
  expectedRequest: {
    method: 'GET',
    body: undefined,
    URL: {pathname: '/1/clusters/mapping'}
  }
}, {
  testName: 'client.listUserIDs({page}, cb)',
  object: 'client',
  methodName: 'listUserIDs',
  callArguments: [{page: 5}],
  action: 'read',
  expectedRequest: {
    method: 'GET',
    body: {page: 5},
    URL: {pathname: '/1/clusters/mapping'}
  }
}, {
  testName: 'client.listUserIDs({page, hitsPerPage}, cb)',
  object: 'client',
  methodName: 'listUserIDs',
  callArguments: [{page: 5, hitsPerPage: 3}],
  action: 'read',
  expectedRequest: {
    method: 'GET',
    body: {page: 5, hitsPerPage: 3},
    URL: {pathname: '/1/clusters/mapping'}
  }
}];
