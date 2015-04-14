module.exports = [{
  object: 'index',
  methodName: 'addUserKey',
  testName: 'index.addUserKey(acls, cb)',
  callArguments: [['search', 'mom']],
  action: 'write',
  expectedRequest: {
    method: 'POST',
    body: {
      acl: ['search', 'mom']
    },
    URL: {
      pathname: '/1/indexes/%s/keys'
    }
  }
}, {
  testName: 'index.addUserKey(acls, params, cb)',
  object: 'index',
  methodName: 'addUserKey',
  callArguments: [['smurf', 'it'], {
    validity: 299,
    maxQueriesPerIPPerHour: 9000,
    maxHitsPerQuery: 0
  }],
  action: 'write',
  expectedRequest: {
    method: 'POST',
    body: {
      acl: ['smurf', 'it'],
      validity: 299,
      maxQueriesPerIPPerHour: 9000,
      maxHitsPerQuery: 0
    },
    URL: {
      pathname: '/1/indexes/%s/keys'
    }
  }
}, {
  testName: 'index.addUserKey(acls, params, cb) some params',
  object: 'index',
  methodName: 'addUserKey',
  callArguments: [['smurf', 'it'], {
    validity: 299,
    maxQueriesPerIPPerHour: 9000
  }],
  action: 'write',
  expectedRequest: {
    method: 'POST',
    body: {
      acl: ['smurf', 'it'],
      validity: 299,
      maxQueriesPerIPPerHour: 9000
    },
    URL: {
      pathname: '/1/indexes/%s/keys'
    }
  }
}];
