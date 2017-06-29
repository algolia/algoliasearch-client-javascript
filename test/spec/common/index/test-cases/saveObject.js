'use strict';

const fauxJax = require('faux-jax');

if (!process.browser || fauxJax.support.xhr.cors) {
  const clone = require('lodash-compat/lang/clone');

  const object = {
    objectID: 'dawg IE!',
    yaw: 'partial',
  };

  module.exports = {
    object: 'index',
    methodName: 'saveObject',
    testName: 'index.saveObject(object, cb)',
    callArguments: [object],
    action: 'write',
    expectedRequest: {
      method: 'PUT',
      body: clone(object),
      URL: {
        pathname: `/1/indexes/%s/${encodeURIComponent(object.objectID)}`,
      },
    },
  };
}
