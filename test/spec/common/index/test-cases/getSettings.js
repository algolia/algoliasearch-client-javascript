'use strict';

module.exports = [
  {
    object: 'index',
    methodName: 'getSettings',
    testName: 'index.getSettings(cb)',
    action: 'read',
    expectedRequest: {
      method: 'GET',
      URL: {
        pathname: '/1/indexes/%s/settings',
        query: {
          getVersion: '2'
        }
      }
    }
  },
  {
    object: 'index',
    methodName: 'getSettings',
    testName: 'index.getSettings({ advanced: 1 }, cb)',
    callArguments: [{advanced: 1}],
    action: 'read',
    expectedRequest: {
      method: 'GET',
      URL: {
        pathname: '/1/indexes/%s/settings',
        query: {
          getVersion: '2',
          advanced: '1'
        }
      }
    }
  }
];
