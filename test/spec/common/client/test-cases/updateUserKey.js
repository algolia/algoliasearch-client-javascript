module.exports = [{
  testName: 'client.updateUserKey(key, acls, cb)',
  object: 'client',
  methodName: 'updateUserKey',
  callArguments: ['WOO', ['search', 'browse']],
  action: 'write',
  expectedRequest: {
    method: 'PUT',
    body: { acl: ['search', 'browse'] },
    URL: {pathname: '/1/keys/WOO'}
  }
}, {
  testName: 'client.updateUserKey(key, acls, params, cb)',
  object: 'client',
  methodName: 'updateUserKey',
  callArguments: ['WOOmom', ['smurf', 'it'], {
    validity: 299,
    maxQueriesPerIPPerHour: 9000,
    maxHitsPerQuery: 0,
    indexes: ['le chat', 'black']
  }],
  action: 'write',
  expectedRequest: {
    method: 'PUT',
    body: {
      acl: ['smurf', 'it'],
      validity: 299,
      maxQueriesPerIPPerHour: 9000,
      maxHitsPerQuery: 0,
      indexes: ['le chat', 'black']
    },
    URL: {pathname: '/1/keys/WOOmom'}
  }
}, {
  testName: 'client.updateUserKey(key, acls, params, cb) some params',
  object: 'client',
  methodName: 'updateUserKey',
  callArguments: ['WOOpop', ['smurf', 'it'], {
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
    URL: {pathname: '/1/keys/WOOpop'}
  }
}];
