var sinon = require('sinon');

module.exports = [{
  object: 'index',
  methodName: 'browse',
  testName: 'index.browse(page, cb)',
  callArguments: [8],
  expectedRequest: {
    method: 'GET',
    URL: {
      pathname: '/1/indexes/%s/browse',
      query: {
        page: 8
      }
    }
  }
}, {
  object: 'index',
  methodName: 'browse',
  testName: 'index.browse(page, cb, hitsPerPage)',
  callArguments: [10, sinon.spy(), 15],
  expectedRequest: {
    method: 'GET',
    URL: {
      pathname: '/1/indexes/%s/browse',
      query: {
        page: 10,
        hitsPerPage: 15
      }
    }
  }
}];
