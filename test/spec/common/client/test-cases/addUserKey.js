module.exports = [{
  testName: 'client.addUserKey(acls, cb)',
  object: 'client',
  methodName: 'addUserKey',
  callArguments: [['search', 'browse']],
  expectedRequest: {
    method: 'POST',
    body: { acl: ['search', 'browse'], validity: 0, maxQueriesPerIPPerHour: 0, maxHitsPerQuery: 0 },
    URL: {pathname: '/1/keys'}
  }
}, {
  testName: 'client.addUserKeyWithValidity(acls, validity, maxQueriesPerIPPerHour, maxHitsPerQuery, cb)',
  object: 'client',
  methodName: 'addUserKeyWithValidity',
  callArguments: [
    ['search', 'browse'], {
      validity: 42,
      maxQueriesPerIPPerHour: 100,
      maxHitsPerQuery: 10
    }
  ],
  expectedRequest: {
    method: 'POST',
    body: { acl: ['search', 'browse'], validity: 42, maxQueriesPerIPPerHour: 100, maxHitsPerQuery: 10 },
    URL: {pathname: '/1/keys'}
  }
}];
