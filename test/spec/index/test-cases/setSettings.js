var fauxJax = require('faux-jax');

if (fauxJax.support.xhr.cors) {
  module.exports = {
    object: 'index',
    methodName: 'setSettings',
    callArguments: [{
      attributesToIndex: ['HEY!', 'How are u???']
    }],
    testName: 'index.setSettings(settings, cb)',
    expectedRequest: {
      method: 'PUT',
      body: {
        attributesToIndex: ['HEY!', 'How are u???']
      },
      URL: {
        pathname: '/1/indexes/%s/settings'
      }
    }
  };
}
