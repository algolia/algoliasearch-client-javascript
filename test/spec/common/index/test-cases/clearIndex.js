'use strict';

module.exports = {
  object: 'index',
  methodName: 'clearIndex',
  callArguments: [],
  action: 'write',
  testName: 'index.clearIndex(cb)',
  expectedRequest: {
    method: 'POST',
    URL: {
      pathname: '/1/indexes/%s/clear'
    }
  }
};
