var cloneDeep = require('lodash-compat/lang/cloneDeep');

var commonExpectedRequest = {
  method: 'POST',
  URL: {pathname: '/1/indexes/%s/query'},
  body: {
    params: 'query='
  }
};

module.exports = [{
  testName: 'index.search(undefined, cb)',
  callArguments: [undefined],
  methodName: 'search',
  expectedRequest: cloneDeep(commonExpectedRequest)
}, {
  testName: 'index.search(null, cb)',
  callArguments: [null],
  methodName: 'search',
  expectedRequest: cloneDeep(commonExpectedRequest)
}, {
  testName: 'index.search(\'\', cb)',
  callArguments: [''],
  methodName: 'search',
  expectedRequest: cloneDeep(commonExpectedRequest)
}, {
  testName: 'index.search(cb)',
  callArguments: [],
  methodName: 'search',
  expectedRequest: cloneDeep(commonExpectedRequest)
}];
