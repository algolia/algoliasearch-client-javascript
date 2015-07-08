'use strict';

module.exports = {
  object: 'index',
  methodName: 'addUserKeyWithValidity',
  testName: 'index.addUserKeyWithValidity(acls, cb)',
  callArguments: [
    ['search', 'mom'], {
      validity: 42141,
      maxQueriesPerIPPerHour: 421,
      maxHitsPerQuery: 420
    }
  ],
  action: 'write',
  expectedRequest: {
    method: 'POST',
    body: {
      acl: ['search', 'mom'],
      validity: 42141,
      maxQueriesPerIPPerHour: 421,
      maxHitsPerQuery: 420
    },
    URL: {
      pathname: '/1/indexes/%s/keys'
    }
  }
};
