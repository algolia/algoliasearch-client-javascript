'use strict';

var clone = require('lodash/lang/clone');

var partialObject = {
  objectID: 'dawg IE!',
  yaw: 'partial'
};

module.exports = {
  object: 'index',
  methodName: 'partialUpdateObject',
  testName: 'index.partialUpdateObject(partialObject, cb)',
  callArguments: [partialObject],
  action: 'write',
  expectedRequest: {
    method: 'POST',
    body: clone(partialObject),
    URL: {
      pathname: '/1/indexes/%s/' + encodeURIComponent(partialObject.objectID) + '/partial'
    }
  }
};
