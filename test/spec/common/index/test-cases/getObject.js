'use strict';

module.exports = [{
  testName: 'index.getObject(objectID, cb)',
  object: 'index',
  methodName: 'getObject',
  callArguments: ['first object'],
  action: 'read',
  expectedRequest: {
    method: 'GET',
    URL: {
      pathname: '/1/indexes/%s/' + encodeURIComponent('first object')
    }
  }
}, {
  testName: 'index.getObject(objectID, attrs, cb)',
  object: 'index',
  methodName: 'getObject',
  callArguments: ['second object', ['some', 'attrs']],
  action: 'read',
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
