'use strict';

module.exports = [{
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
}, {
  testName: 'index.getObjects(objectIDs, attributesToRetrieve, cb)',
  object: 'index',
  methodName: 'getObjects',
  callArguments: [['100', '101'], ['some', 'attr']],
  indexName: 'getObjects',
  action: 'read',
  expectedRequest: {
    method: 'POST',
    body: {
      requests: [{
        indexName: 'getObjects',
        objectID: '100',
        attributesToRetrieve: 'some,attr'
      }, {
        indexName: 'getObjects',
        objectID: '101',
        attributesToRetrieve: 'some,attr'
      }]
    },
    URL: {
      pathname: '/1/indexes/*/objects'
    }
  }
}];
