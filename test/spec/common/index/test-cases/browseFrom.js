'use strict';

module.exports = [{
  object: 'index',
  methodName: 'browseFrom',
  testName: 'index.browseFrom(cursor, cb)',
  callArguments: ['dsafsaflsakfsalf'],
  action: 'read',
  expectedRequest: {
    method: 'POST',
    URL: {
      pathname: '/1/indexes/%s/browse'
    },
    body: {
      cursor: 'dsafsaflsakfsalf'
    }
  }
}, {
  object: 'index',
  methodName: 'browseFrom',
  testName: 'index.browseFrom(cursor, cb)',
  callArguments: ['=&"dsa'],
  action: 'read',
  expectedRequest: {
    method: 'POST',
    URL: {
      pathname: '/1/indexes/%s/browse'
    },
    body: {
      cursor: '=&"dsa'
    }
  }
}];
