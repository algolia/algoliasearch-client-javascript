var fauxJax = require('faux-jax');

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
if (fauxJax.support.xhr.cors) {
  testCases.push({
    object: 'index',
    methodName: 'addObject',
    testName: 'index.addObject(content, objectID, cb)',
    callArguments: [{
      yaw: 'two'
    }, 'dsa dsd/ sa'],
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
