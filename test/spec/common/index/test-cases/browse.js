module.exports = [{
  object: 'index',
  methodName: 'browse',
  testName: 'index.browse(page, cb)',
  callArguments: [8],
  action: 'read',
  expectedRequest: {
    method: 'GET',
    URL: {
      pathname: '/1/indexes/%s/browse',
      query: {
        page: '8'
      }
    }
  }
}, {
  object: 'index',
  methodName: 'browse',
  testName: 'index.browse(page, hitsPerPage, cb)',
  callArguments: [10, 15],
  action: 'read',
  expectedRequest: {
    method: 'GET',
    URL: {
      pathname: '/1/indexes/%s/browse',
      query: {
        page: '10',
        hitsPerPage: '15'
      }
    }
  }
}];
