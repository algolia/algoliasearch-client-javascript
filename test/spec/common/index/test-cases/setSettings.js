'use strict';

var fauxJax = require('faux-jax');

if (!process.browser || fauxJax.support.xhr.cors) {
  module.exports = [{
    object: 'index',
    methodName: 'setSettings',
    callArguments: [{
      attributesToIndex: ['HEY!', 'How are u???']
    }],
    action: 'write',
    testName: 'index.setSettings(settings, cb)',
    expectedRequest: {
      method: 'PUT',
      body: {
        attributesToIndex: ['HEY!', 'How are u???']
      },
      URL: {
        pathname: '/1/indexes/%s/settings',
        query: {
          forwardToReplicas: 'false'
        }
      }
    }
  }, {
    object: 'index',
    methodName: 'setSettings',
    callArguments: [{
      attributesToIndex: ['HEY!', 'How are u???']
    }, {forwardToSlaves: true}],
    action: 'write',
    testName: 'index.setSettings(settings, {forwardToSlaves: true}, cb)',
    expectedRequest: {
      method: 'PUT',
      body: {
        attributesToIndex: ['HEY!', 'How are u???']
      },
      URL: {
        pathname: '/1/indexes/%s/settings',
        query: {
          forwardToReplicas: 'true'
        }
      }
    }
  }, {
    object: 'index',
    methodName: 'setSettings',
    callArguments: [{
      attributesToIndex: ['HEY!', 'How are u???']
    }, {forwardToSlaves: true}],
    action: 'write',
    testName: 'index.setSettings(settings, {forwardToReplicas: true}, cb)',
    expectedRequest: {
      method: 'PUT',
      body: {
        attributesToIndex: ['HEY!', 'How are u???']
      },
      URL: {
        pathname: '/1/indexes/%s/settings',
        query: {
          forwardToReplicas: 'true'
        }
      }
    }
  }];
}
