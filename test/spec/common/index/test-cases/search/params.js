module.exports = [{
  testName: 'index.search(query, simpleParameters, cb)',
  methodName: 'search',
  callArguments: ['some params', {
    page: 1
  }],
  expectedRequest: {
    method: 'POST',
    URL: {pathname: '/1/indexes/%s/query'},
    body: {
      params: 'query=some%20params&page=1'
    }
  }
}, {
  testName: 'index.search(queryInParameter, cb)',
  methodName: 'search',
  callArguments: [{
    query: 'dear Slim',
    page: 2
  }],
  expectedRequest: {
    method: 'POST',
    URL: {pathname: '/1/indexes/%s/query'},
    body: {
      params: 'query=dear%20Slim&page=2'
    }
  }
}, {
  testName: 'index.search(query, fullParameters, cb)',
  methodName: 'search',
  callArguments: [
    'full params', {
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
    URL: {pathname: '/1/indexes/%s/query'},
    body: {
      params: 'query=full%20params&queryType=prefixAll&typoTolerance=true&minWordSizefor1Typo=1&minWordSizefor2Typos=2&allowTyposOnNumericTokens=false&ignorePlurals=true&restrictSearchableAttributes=comma%2Cseparated&advancedSyntax=true&analytics=false&analyticsTags=%5B%22as%22%2C%22an%20array%22%5D&synonyms=false&replaceSynonymsInHighlight=true&optionalWords=donot%2Cever&removeWordsIfNoResults=allOptional'
    }
  }
}];
