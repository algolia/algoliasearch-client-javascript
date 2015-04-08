module.exports = {
  testName: 'index.getObjects(objectIDs, cb)',
  object: 'index',
  methodName: 'getObjects',
  callArguments: [['100', '101']],
  indexName: 'getObjects',
  action: 'read',
  expectedRequest: {
    method: 'POST',
    body: {
      requests: [{
        indexName: 'getObjects',
        objectID: '100'
      }, {
        indexName: 'getObjects',
        objectID: '101'
      }]
    },
    URL: {
      pathname: '/1/indexes/*/objects'
    }
  }
};
