var commonExpectedRequest = {
  method: 'POST',
  body: {
    params: 'query='
  }
};

module.exports = [{
  testName: 'index.search(undefined, cb)',
  callArguments: [undefined],
  methodName: 'search',
  pathname: '/1/indexes/%s/query',
  expectedRequest: commonExpectedRequest
}, {
  testName: 'index.search(null, cb)',
  callArguments: [null],
  methodName: 'search',
  pathname: '/1/indexes/%s/query',
  expectedRequest: commonExpectedRequest
}, {
  testName: 'index.search(\'\', cb)',
  callArguments: [''],
  methodName: 'search',
  pathname: '/1/indexes/%s/query',
  expectedRequest: commonExpectedRequest
}, {
  testName: 'index.search(cb)',
  callArguments: [],
  methodName: 'search',
  pathname: '/1/indexes/%s/query',
  expectedRequest: commonExpectedRequest
}];
