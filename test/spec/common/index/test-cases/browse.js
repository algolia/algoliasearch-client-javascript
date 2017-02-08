'use strict';

module.exports = [{
  object: 'index',
  methodName: 'browse',
  testName: 'index.browse(page, cb)',
  callArguments: [8],
  action: 'read',
  expectedRequest: {
    method: 'POST',
    URL: {
      pathname: '/1/indexes/%s/browse'
    },
    body: {
      params: 'page=8'
    }
  }
}, {
  object: 'index',
  methodName: 'browse',
  testName: 'index.browse(page, hitsPerPage, cb)',
  callArguments: [10, 15],
  action: 'read',
  expectedRequest: {
    method: 'POST',
    URL: {
      pathname: '/1/indexes/%s/browse'
    },
    body: {
      params: 'page=10&hitsPerPage=15'
    }
  }
}, {
  object: 'index',
  methodName: 'browse',
  testName: 'index.browse(cb)',
  callArguments: [],
  action: 'read',
  expectedRequest: {
    method: 'POST',
    URL: {
      pathname: '/1/indexes/%s/browse'
    },
    body: {
      params: 'page=0'
    }
  }
}, {
  object: 'index',
  methodName: 'browse',
  testName: 'index.browse(query)',
  callArguments: ['hel""lo'],
  action: 'read',
  expectedRequest: {
    method: 'POST',
    URL: {
      pathname: '/1/indexes/%s/browse'
    },
    body: {
      params: 'query=hel%22%22lo'
    }
  }
}, {
  object: 'index',
  methodName: 'browse',
  testName: 'index.browse(queryParameters)',
  callArguments: [{
    some: 'thing'
  }],
  action: 'read',
  expectedRequest: {
    method: 'POST',
    URL: {
      pathname: '/1/indexes/%s/browse'
    },
    body: {
      params: 'some=thing'
    }
  }
}, {
  object: 'index',
  methodName: 'browse',
  testName: 'index.browse(query, queryParameters)',
  callArguments: ['BOUHHHH!!', {
    some: 'thing'
  }],
  action: 'read',
  expectedRequest: {
    method: 'POST',
    URL: {
      pathname: '/1/indexes/%s/browse'
    },
    body: {
      params: 'some=thing&query=BOUHHHH!!'
    }
  }
}];
