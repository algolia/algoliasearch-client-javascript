'use strict';

module.exports = [{
  testName: 'client.search(queries, cb)',
  object: 'client',
  methodName: 'search',
  callArguments: [[{
    indexName: 'yaaaaaw',
    params: {
      hitsPerSmurf: 9
    }
  }, {
    indexName: 'smurf this',
    params: {
      query: 'THATS IT!'
    }
  }]],
  action: 'read',
  expectedRequest: {
    method: 'POST',
    URL: {pathname: '/1/indexes/*/queries'},
    body: {
      requests: [{
        indexName: 'yaaaaaw',
        params: 'hitsPerSmurf=9'
      }, {
        indexName: 'smurf this',
        params: 'query=THATS%20IT!'
      }]
    }
  }
}, {
  testName: 'client.search(queries, cb), with query parameter',
  object: 'client',
  methodName: 'search',
  callArguments: [[{
    indexName: 'yaaaaaw',
    query: 'YEAH!',
    params: {
      hitsPerSmurf: 9
    }
  }, {
    indexName: 'smurf this',
    query: 'Well!',
    params: {
      hitsPerSmurf: 200
    }
  }]],
  action: 'read',
  expectedRequest: {
    method: 'POST',
    URL: {pathname: '/1/indexes/*/queries'},
    body: {
      requests: [{
        indexName: 'yaaaaaw',
        params: 'query=YEAH!&hitsPerSmurf=9'
      }, {
        indexName: 'smurf this',
        params: 'query=Well!&hitsPerSmurf=200'
      }]
    }
  }
}];
