'use strict';

console.warn('lol it runs')

module.exports = [
  {
    object: 'index',
    methodName: 'deleteBy',
    testName: 'index.deleteBy({query}, cb)',
    callArguments: [{ query: 'some q' }],
    action: 'write',
    expectedRequest: {
      method: 'POST',
      URL: {
        pathname: '/1/indexes/%s/deleteByQuery',
      },
      body: {
        params: 'query=some%22q',
      },
    },
  },
];
