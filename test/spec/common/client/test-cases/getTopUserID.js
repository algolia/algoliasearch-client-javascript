'use strict';

module.exports = [{
  testName: 'client.getTopUserID(undefined, cb)',
  object: 'client',
  methodName: 'getTopUserID',
  callArguments: [undefined],
  action: 'write',
  expectedRequest: {
    method: 'GET',
    URL: {pathname: '/1/clusters/mapping/top'}
  }
}];
