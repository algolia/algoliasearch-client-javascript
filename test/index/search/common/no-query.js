var sinon = require('sinon');

var commonExpectedRequest = {
  body: {
    params: 'query='
  }
};

module.exports = [{
  testName: 'query is `undefined`',
  callArguments: [undefined, sinon.spy()],
  expectedRequest: commonExpectedRequest
}, {
  testName: 'query is `null`',
  callArguments: [null, sinon.spy()],
  expectedRequest: commonExpectedRequest
}, {
  testName: 'query is `\'\'`',
  callArguments: ['', sinon.spy()],
  expectedRequest: commonExpectedRequest
}, {
  testName: 'no query parameter at all',
  callArguments: [sinon.spy()],
  expectedRequest: commonExpectedRequest
}];
