'use strict';

module.exports = [{
  testName: 'client.listClusters(undefined, cb)',
  object: 'client',
  methodName: 'listClusters',
  callArguments: [undefined],
  action: 'write',
  expectedRequest: {
    method: 'GET',
    URL: {pathname: '/1/clusters'}
  }
}];
