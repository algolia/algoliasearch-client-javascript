'use strict';

module.exports = [{
  testName: 'client.listClusters(undefined, cb)',
  object: 'client',
  methodName: 'listClusters',
  callArguments: [undefined],
  action: 'read',
  expectedRequest: {
    method: 'GET',
    URL: {pathname: '/1/clusters'}
  }
}];
