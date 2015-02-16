var functionTester = require( '../lib/functionTester' );

var applicationID = 'index.search.applicationID';
var searchOnlyAPIKey = 'index.search.searchOnlyAPIKey';
var indexName = 'index.search.searchOnlyAPIKey';

module.exports = {
  applicationID: applicationID,
  searchOnlyAPIKey: searchOnlyAPIKey,
  indexName: indexName,
  // to add a test, add a call
  calls: [
  {
    testName: 'simple query',
    args: ['yaw query'],
    expectedRequest: {
      url: {
        protocol: 'http:',
        host: applicationID + '-dsn.algolia.net',
        pathname: '/1/indexes/' + indexName + '/query',
        query: {
          'X-Algolia-API-Key': searchOnlyAPIKey,
          'X-Algolia-Application-Id': applicationID
        }
      },
      body: {
        params: 'query=yaw%20query'
      },
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    },
    fakeResponse: {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: {
        hits: [{
          objectID: '1',
          name: 'yaw',
        }, {
          objectID: '2',
          name: 'ya',
        }],
        'nbHits': 2,
        'page': 0,
        'nbPages': 1,
        'hitsPerPage': 20
      }
    }
  }, {
    testName: 'simple query',
    args: ['Dawg query', functionTester( true, 1 )],
    expectedRequest: {
      url: {
        protocol: 'http:',
        host: applicationID + '-dsn.algolia.net',
        pathname: '/1/indexes/' + indexName + '/query',
        query: {
          'X-Algolia-API-Key': searchOnlyAPIKey,
          'X-Algolia-Application-Id': applicationID
        }
      },
      body: {
        params: 'query=Dawg%20query'
      },
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    },
    fakeResponse: {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: {
        hits: [{
          objectID: '1',
          name: 'daw',
        }, {
          objectID: '2',
          name: 'da',
        }],
        'nbHits': 2,
        'page': 0,
        'nbPages': 1,
        'hitsPerPage': 20
      }
    }
  }, {
    testName: 'no query given',
    args: [functionTester( true, 1 )],
    expectedRequest: {
      url: {
        protocol: 'http:',
        host: applicationID + '-dsn.algolia.net',
        pathname: '/1/indexes/' + indexName + '/query',
        query: {
          'X-Algolia-API-Key': searchOnlyAPIKey,
          'X-Algolia-Application-Id': applicationID
        }
      },
      body: {
        params: 'query='
      },
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    },
    fakeResponse: {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: {
        hits: [{
          objectID: '1',
          name: 'daw',
        }, {
          objectID: '2',
          name: 'da',
        }],
        'nbHits': 2,
        'page': 0,
        'nbPages': 1,
        'hitsPerPage': 20
      }
    }
  }, {
    testName: 'query is undefined',
    args: [undefined, functionTester( true, 1 )],
    expectedRequest: {
      url: {
        protocol: 'http:',
        host: applicationID + '-dsn.algolia.net',
        pathname: '/1/indexes/' + indexName + '/query',
        query: {
          'X-Algolia-API-Key': searchOnlyAPIKey,
          'X-Algolia-Application-Id': applicationID
        }
      },
      body: {
        params: 'query='
      },
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    },
    fakeResponse: {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: {
        hits: [{
          objectID: '1',
          name: 'daw',
        }, {
          objectID: '2',
          name: 'da',
        }],
        'nbHits': 2,
        'page': 0,
        'nbPages': 1,
        'hitsPerPage': 20
      }
    }
  }, {
    testName: 'query is null',
    args: [null, functionTester( true, 1 )],
    expectedRequest: {
      url: {
        protocol: 'http:',
        host: applicationID + '-dsn.algolia.net',
        pathname: '/1/indexes/' + indexName + '/query',
        query: {
          'X-Algolia-API-Key': searchOnlyAPIKey,
          'X-Algolia-Application-Id': applicationID
        }
      },
      body: {
        params: 'query='
      },
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    },
    fakeResponse: {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: {
        hits: [{
          objectID: '1',
          name: 'daw',
        }, {
          objectID: '2',
          name: 'da',
        }],
        'nbHits': 2,
        'page': 0,
        'nbPages': 1,
        'hitsPerPage': 20
      }
    }
  }]
};
