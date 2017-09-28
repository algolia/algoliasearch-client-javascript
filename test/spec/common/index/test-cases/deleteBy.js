'use strict';

console.warn('lol it runs')

module.exports = [
  {
    object: 'index',
    methodName: 'deleteBy',
    testName: 'index.deleteBy(undefined, cb)',
    callArguments: [],
    action: 'write',
    expectedRequest: {
      method: 'POST',
      URL: {
        pathname: '/1/indexes/%s/deleteByQuery',
      },
      body: {
        params: '',
      },
    },
  },
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
  {
    object: 'index',
    methodName: 'deleteBy',
    testName: 'index.deleteBy({query, filters}, cb)',
    // this test should fail but it doesn't, so I don't trust the new tests 😭
    callArguments: [{ query: '', filters: 'color:red', ridiculous:'mistake' }],
    action: 'write',
    expectedRequest: {
      method: 'POST',
      URL: {
        pathname: '/1/indexes/%s/deleteByQuery',
      },
      body: {
        params: 'query=&filters=color%3Ared',
      },
    },
  },
  {
    object: 'index',
    methodName: 'deleteBy',
    testName: 'index.deleteBy(queryParameters)',
    callArguments: [
      {
        some: 'thing',
      },
    ],
    action: 'write',
    expectedRequest: {
      method: 'POST',
      URL: {
        pathname: '/1/indexes/%s/deleteByQuery',
      },
      body: {
        params: 'some=thing',
      },
    },
  },
  {
    object: 'index',
    methodName: 'deleteBy',
    testName: 'index.deleteBy(queryParameters)',
    callArguments: [
      {
        query: 'BOUHHHH!!',
        some: 'thing',
      },
    ],
    action: 'write',
    expectedRequest: {
      method: 'POST',
      URL: {
        pathname: '/1/indexes/%s/deleteByQuery',
      },
      body: {
        params: 'some=thing&query=BOUHHHH!!',
      },
    },
  },
];
