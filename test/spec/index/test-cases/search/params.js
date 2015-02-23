var sinon = require('sinon');

module.exports = [{
  testName: 'index.search(query, cb, simpleParameters)',
  methodName: 'search',
  pathname: '/1/indexes/%s/query',
  callArguments: ['some params', sinon.spy(), {
    page: 1
  }],
  expectedRequest: {
    method: 'POST',
    body: {
      params: 'query=some%20params&page=1'
    }
  }
}, {
  testName: 'index.search(query, cb, fullParameters)',
  methodName: 'search',
  pathname: '/1/indexes/%s/query',
  callArguments: [
    'full params',
    sinon.spy(), {
      // https://www.algolia.com/doc/javascript#QueryParameters
      queryType: 'prefixAll',
      typoTolerance: true,
      minWordSizefor1Typo: 1,
      minWordSizefor2Typos: 2,
      allowTyposOnNumericTokens: false,
      ignorePlurals: true,
      restrictSearchableAttributes: 'comma,separated',
      advancedSyntax: true,
      analytics: false,
      analyticsTags: ['as', 'an array'],
      synonyms: false,
      replaceSynonymsInHighlight: true,
      optionalWords: 'donot,ever',
      removeWordsIfNoResults: 'allOptional'
    }
  ],
  expectedRequest: {
    method: 'POST',
    body: {
      params: 'query=full%20params&queryType=prefixAll&typoTolerance=true&minWordSizefor1Typo=1&minWordSizefor2Typos=2&allowTyposOnNumericTokens=false&ignorePlurals=true&restrictSearchableAttributes=comma%2Cseparated&advancedSyntax=true&analytics=false&analyticsTags=%5B%22as%22%2C%22an%20array%22%5D&synonyms=false&replaceSynonymsInHighlight=true&optionalWords=donot%2Cever&removeWordsIfNoResults=allOptional'
    }
  }
}];
