'use strict';

module.exports = {
  testName: 'client.getUserKeyACL(key, cb)',
  object: 'client',
  methodName: 'getUserKeyACL',
  callArguments: ['WOOO!'],
  action: 'read',
  expectedRequest: {
    method: 'GET',
    URL: {pathname: '/1/keys/WOOO!'}
  }
};
