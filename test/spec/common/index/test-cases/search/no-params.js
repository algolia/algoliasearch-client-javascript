'use strict';

module.exports = {
  testName: 'index.search(query, cb)',
  methodName: 'search',
  callArguments: ['yaw query'],
  action: 'read',
  expectedRequest: {
    method: 'POST',
    URL: {pathname: '/1/indexes/%s/query'},
    body: {
      params: 'query=yaw%20query'
    }
  }
};
