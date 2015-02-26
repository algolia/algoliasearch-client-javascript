var fauxJax = require('faux-jax');

if (fauxJax.support.cors) {
  module.exports = {
    object: 'index',
    methodName: 'deleteObject',
    testName: 'index.deleteObject(objectID, cb)',
    callArguments: ['WELL :)'],
    expectedRequest: {
      method: 'DELETE',
      URL: {
        pathname: '/1/indexes/%s/' + encodeURIComponent('WELL :)')
      }
    }
  };
}
