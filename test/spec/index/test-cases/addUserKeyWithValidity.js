module.exports = {
  object: 'index',
  methodName: 'addUserKeyWithValidity',
  testName: 'index.addUserKeyWithValidity(acls, cb)',
  callArguments: [['search', 'mom'], 42141, 421, 420],
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
