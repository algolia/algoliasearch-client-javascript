'use strict';

var clone = require('lodash/lang/clone');

var objects = [{
  objectID: 'well',
  first: 'object'
}, {
  objectID: 'boom?',
  second: 'object'
}];

module.exports = {
  object: 'index',
  methodName: 'saveObjects',
  testName: 'index.saveObjects(objects, cb)',
  callArguments: [objects],
  action: 'write',
  expectedRequest: {
    method: 'POST',
    body: {
      requests: [{
        action: 'updateObject',
        objectID: objects[0].objectID,
        body: clone(objects[0])
      }, {
        action: 'updateObject',
        objectID: objects[1].objectID,
        body: clone(objects[1])
      }]
    },
    URL: {
      pathname: '/1/indexes/%s/batch'
    }
  }
};
