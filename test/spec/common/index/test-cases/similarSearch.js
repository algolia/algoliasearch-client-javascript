'use strict';

module.exports = {
  testName: 'index.similarSearch(query, cb)',
  methodName: 'similarSearch',
  callArguments: ['yaw query'],
  action: 'read',
  expectedRequest: {
    method: 'POST',
    URL: {pathname: '/1/indexes/%s/query'},
    body: {
      params: 'similarQuery=yaw%20query'
    }
  }
};
