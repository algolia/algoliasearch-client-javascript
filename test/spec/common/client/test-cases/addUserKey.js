'use strict';

module.exports = [{
  testName: 'client.addUserKey(acls, cb)',
  object: 'client',
  methodName: 'addUserKey',
  callArguments: [['search', 'browse']],
  action: 'write',
  expectedRequest: {
    method: 'POST',
    body: {acl: ['search', 'browse']},
    URL: {pathname: '/1/keys'}
  }
}, {
  testName: 'client.addUserKey(acls, params, cb)',
  object: 'client',
  methodName: 'addUserKey',
  callArguments: [['smurf', 'it'], {
    validity: 299,
    maxQueriesPerIPPerHour: 9000,
    maxHitsPerQuery: 0,
    indexes: ['le chat', 'black'],
    description: 'Le chat is black',
    queryParameters: {
      tagFilters: 'public'
    },
    referers: ['*.algolia.com']
  }],
  action: 'write',
  expectedRequest: {
    method: 'POST',
    body: {
      acl: ['smurf', 'it'],
      validity: 299,
      maxQueriesPerIPPerHour: 9000,
      maxHitsPerQuery: 0,
      indexes: ['le chat', 'black'],
      description: 'Le chat is black',
      queryParameters: 'tagFilters=public',
      referers: ['*.algolia.com']
    },
    URL: {pathname: '/1/keys'}
  }
}, {
  testName: 'client.addUserKey(acls, params, cb) some params',
  object: 'client',
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
  action: 'write',
  expectedRequest: {
    method: 'POST',
    body: {acl: ['search', 'browse'], validity: 42, maxQueriesPerIPPerHour: 100, maxHitsPerQuery: 10},
    URL: {pathname: '/1/keys'}
  }
}];
