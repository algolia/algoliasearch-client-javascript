'use strict';

var objectsIDs = ['1000', '1001'];

module.exports = {
  object: 'index',
  methodName: 'deleteObjects',
  testName: 'index.deleteObjects(objectsIDs, cb)',
  callArguments: [objectsIDs],
  action: 'write',
  expectedRequest: {
    method: 'POST',
    body: {
      requests: [{
        action: 'deleteObject',
        body: {
          objectID: '1000'
        },
        objectID: '1000'
      }, {
        action: 'deleteObject',
        body: {
          objectID: '1001'
        },
        objectID: '1001'
      }]
    },
    URL: {
      pathname: '/1/indexes/%s/batch'
    }
  }
};
