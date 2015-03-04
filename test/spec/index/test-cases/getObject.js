var sinon = require('sinon');

module.exports = [{
  testName: 'index.getObject(objectID, cb)',
  object: 'index',
  methodName: 'getObject',
  callArguments: ['first object'],
  expectedRequest: {
    method: 'GET',
    URL: {
      pathname: '/1/indexes/%s/' + encodeURIComponent('first object')
    }
  }
}, {
  testName: 'index.getObject(objectID, cb, attributes)',
  object: 'index',
  methodName: 'getObject',
  callArguments: ['second object', sinon.spy(), ['some', 'attrs']],
  expectedRequest: {
    method: 'GET',
    URL: {
      pathname: '/1/indexes/%s/' + encodeURIComponent('second object'),
      query: {
        attributes: ['some', 'attrs'].join(',')
      }
    }
  }
}];
