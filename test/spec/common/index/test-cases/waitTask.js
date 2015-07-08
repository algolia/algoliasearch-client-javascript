'use strict';

var testCases = module.exports = [];

testCases.push({
  object: 'index',
  methodName: 'waitTask',
  testName: 'index.waitTask(taskID, cb) success',
  callArguments: [25000],
  action: 'read',
  expectedRequest: {
    method: 'GET',
    URL: {
      pathname: '/1/indexes/%s/task/25000'
    }
  },
  fakeResponse: {
    body: {
      status: 'published'
    }
  }
});

testCases.push({
  object: 'index',
  methodName: 'waitTask',
  testName: 'index.waitTask(taskID, cb) error',
  callArguments: [26000],
  action: 'read',
  expectedRequest: {
    method: 'GET',
    URL: {
      pathname: '/1/indexes/%s/task/26000'
    }
  },
  fakeResponse: {
    statusCode: 400,
    body: JSON.stringify({
      message: 'woops!',
      status: 400
    })
  }
});
