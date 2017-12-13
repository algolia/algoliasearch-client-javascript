'use strict';

module.exports = [{
  testName: 'client.getTopUserID(undefined, cb)',
  object: 'client',
  methodName: 'getTopUserID',
  callArguments: [undefined],
  action: 'read',
  expectedRequest: {
    method: 'GET',
    URL: {pathname: '/1/clusters/mapping/top'}
  }
}];
