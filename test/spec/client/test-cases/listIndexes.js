var cloneDeep = require('lodash-compat/lang/cloneDeep');
var merge = require('lodash-compat/object/merge');
var sinon = require('sinon');

var baseTestCase = {
  object: 'client',
  methodName: 'listIndexes',
  expectedRequest: {
    method: 'GET',
    headers: {},
    URL: {
      pathname: '/1/indexes'
    }
  }
};

module.exports = [
  merge(
    cloneDeep(baseTestCase), {
      testName: 'client.listIndexes(cb)',
      callArguments: []
    }
  ),
  merge(
    cloneDeep(baseTestCase), {
      testName: 'client.listIndexes(cb, page)',
      callArguments: [sinon.spy(), 10],
      expectedRequest: {
        URL: {
          query: {
            page: 10
          }
        }
      }
    }
  )
];
