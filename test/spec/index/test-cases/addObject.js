var fauxJax = require('faux-jax');
var sinon = require('sinon');

var testCases = module.exports = [{
  object: 'index',
  methodName: 'addObject',
  testName: 'index.addObject(content, cb)',
  callArguments: [{
    yaw: 'one'
  }],
  expectedRequest: {
    method: 'POST',
    body: {
      yaw: 'one'
    },
    URL: {
      pathname: '/1/indexes/%s'
    }
  }
}];

// only cors supports PUT
if (fauxJax.support.cors) {
  testCases.push({
    object: 'index',
    methodName: 'addObject',
    testName: 'index.addObject(content, cb, objectID)',
    callArguments: [{
      yaw: 'two'
    }, sinon.spy(), 'dsa dsd/ sa'],
    expectedRequest: {
      method: 'PUT',
      body: {
        yaw: 'two'
      },
      URL: {
        pathname: '/1/indexes/%s/' + encodeURIComponent('dsa dsd/ sa')
      }
    }
  });
}
