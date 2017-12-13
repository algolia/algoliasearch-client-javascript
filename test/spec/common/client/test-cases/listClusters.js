'use strict';

module.exports = [{
  testName: 'client.listClusters(cb)',
  object: 'client',
  methodName: 'listClusters',
  callArguments: [],
  action: 'read',
  expectedRequest: {
    method: 'GET',
    URL: {pathname: '/1/clusters'}
  }
}];
