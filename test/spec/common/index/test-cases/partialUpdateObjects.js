'use strict';

var clone = require('lodash/lang/clone');

var objects = [{
  first: 'object'
}, {
  second: 'object'
}];

module.exports = {
  object: 'index',
  methodName: 'partialUpdateObjects',
  testName: 'index.partialUpdateObjects(objects, cb)',
  callArguments: [objects],
  action: 'write',
  expectedRequest: {
    method: 'POST',
    body: {
      requests: [{
        action: 'partialUpdateObject',
        body: clone(objects[0])
      }, {
        action: 'partialUpdateObject',
        body: clone(objects[1])
      }]
    },
    URL: {
      pathname: '/1/indexes/%s/batch'
    }
  }
};
