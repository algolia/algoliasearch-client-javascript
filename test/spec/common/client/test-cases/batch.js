'use strict';

module.exports = {
  testName: 'client.batch(operations, cb)',
  object: 'client',
  methodName: 'batch',
  callArguments: [[{
    action: 'addObject',
    indexName: 'clients',
    body: {
      name: 'Bill'
    }
  }, {
    action: 'udpateObject',
    indexName: 'fruits',
    body: {
      objectID: '29138',
      name: 'banana'
    }
  }]],
  action: 'write',
  expectedRequest: {
    method: 'POST',
    URL: {pathname: '/1/indexes/*/batch'},
    body: {
      requests: [{
        action: 'addObject',
        indexName: 'clients',
        body: {
          name: 'Bill'
        }
      }, {
        action: 'udpateObject',
        indexName: 'fruits',
        body: {
          objectID: '29138',
          name: 'banana'
        }
      }]
    }
  }
};
