var sinon = require('sinon');

module.exports = {
  testName: 'simple query',
  callArguments: ['yaw query', sinon.spy()],
  expectedRequest: {
    body: {
      params: 'query=yaw%20query'
    }
  }
};
