module.exports = [{
  object: 'index',
  methodName: 'updateUserKey',
  testName: 'index.updateUserKey(key, acls, cb)',
  callArguments: ['HI5', ['search', 'mom']],
  action: 'write',
  expectedRequest: {
    method: 'PUT',
    body: {
      acl: ['search', 'mom']
    },
    URL: {
      pathname: '/1/indexes/%s/keys/HI5'
    }
  }
}, {
  testName: 'index.updateUserKey(key, acls, params, cb)',
  object: 'index',
  methodName: 'updateUserKey',
  callArguments: ['NOM', ['smurf', 'it'], {
    validity: 299,
    maxQueriesPerIPPerHour: 9000,
    maxHitsPerQuery: 0
  }],
  action: 'write',
  expectedRequest: {
    method: 'PUT',
    body: {
      acl: ['smurf', 'it'],
      validity: 299,
      maxQueriesPerIPPerHour: 9000,
      maxHitsPerQuery: 0
    },
    URL: {
      pathname: '/1/indexes/%s/keys/NOM'
    }
  }
}, {
  testName: 'index.updateUserKey(key, acls, params, cb) some params',
  object: 'index',
  methodName: 'updateUserKey',
  callArguments: ['GREAT', ['smurf', 'it'], {
    validity: 299,
    maxQueriesPerIPPerHour: 9000
  }],
  action: 'write',
  expectedRequest: {
    method: 'PUT',
    body: {
      acl: ['smurf', 'it'],
      validity: 299,
      maxQueriesPerIPPerHour: 9000
    },
    URL: {
      pathname: '/1/indexes/%s/keys/GREAT'
    }
  }
}];
