'use strict';

const clone = require('lodash-compat/lang/clone');

const partialObject = {
  objectID: 'dawg IE!',
  yaw: 'partial',
};

module.exports = [
  {
    object: 'index',
    methodName: 'partialUpdateObject',
    testName: 'index.partialUpdateObject(partialObject, cb)',
    callArguments: [partialObject],
    action: 'write',
    expectedRequest: {
      method: 'POST',
      body: clone(partialObject),
      URL: {
        pathname: `/1/indexes/%s/${encodeURIComponent(
          partialObject.objectID
        )}/partial`,
      },
    },
  },
  {
    object: 'index',
    methodName: 'partialUpdateObject',
    testName:
      'index.partialUpdateObject(partialObject, createIfNotExists=false, cb)',
    callArguments: [partialObject, false],
    action: 'write',
    expectedRequest: {
      method: 'POST',
      body: clone(partialObject),
      URL: {
        pathname: `/1/indexes/%s/${encodeURIComponent(
          partialObject.objectID
        )}/partial`,
        query: {
          createIfNotExists: 'false',
        },
      },
    },
  },
  {
    object: 'index',
    methodName: 'partialUpdateObject',
    testName:
      'index.partialUpdateObject(partialObject, createIfNotExists=true, cb)',
    callArguments: [partialObject, true],
    action: 'write',
    expectedRequest: {
      method: 'POST',
      body: clone(partialObject),
      URL: {
        pathname: `/1/indexes/%s/${encodeURIComponent(
          partialObject.objectID
        )}/partial`,
      },
    },
  },
];
