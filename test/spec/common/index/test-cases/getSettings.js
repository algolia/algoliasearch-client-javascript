'use strict';

module.exports = {
  object: 'index',
  methodName: 'getSettings',
  testName: 'index.getSettings(cb)',
  action: 'read',
  expectedRequest: {
    method: 'GET',
    URL: {
      pathname: '/1/indexes/%s/settings'
    }
  }
};
