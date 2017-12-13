'use strict';

module.exports = [{
  testName: 'client.getTopUserID(cb)',
  object: 'client',
  methodName: 'getTopUserID',
  callArguments: [],
  action: 'read',
  expectedRequest: {
    method: 'GET',
    URL: {pathname: '/1/clusters/mapping/top'}
  }
}];
