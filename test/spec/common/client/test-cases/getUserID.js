'use strict';

module.exports = [{
  testName: 'client.getUserID({ userID }, cb)',
  object: 'client',
  methodName: 'getUserID',
  callArguments: [{userID: 'cool-user'}],
  action: 'write',
  expectedRequest: {
    method: 'GET',
    URL: {pathname: '/1/clusters/mapping/cool-user'}
  }
}];
