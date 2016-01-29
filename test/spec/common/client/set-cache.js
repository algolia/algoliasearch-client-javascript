'use strict';

var test = require('tape');

test('providing a cache when initializing', function(t) {
  t.plan(1);

  var fauxJax = require('faux-jax');
  var getCredentials = require('../../../utils/get-credentials');
  var credentials = getCredentials();

  fauxJax.install();

  var cachedResult = '{"hits":[{"company":"Periscope","url":"https://itunes.apple.com/app/id972909677","platform":"ios","type":"ugc","vertical":"entertainment","features":[""],"languages":["english"],"notes":"","nda":false,"appID":"PERISCOPE_LIVE","totalOperations":399659694,"objectID":"periscope-PERISCOPE_LIVE-ios","_highlightResult":{"company":{"value":"<em>Periscope</em>","matchLevel":"full","matchedWords":["periscope"]},"platform":{"value":"ios","matchLevel":"none","matchedWords":[]},"type":{"value":"ugc","matchLevel":"none","matchedWords":[]},"vertical":{"value":"entertainment","matchLevel":"none","matchedWords":[]},"features":[{"value":"","matchLevel":"none","matchedWords":[]}],"languages":[{"value":"english","matchLevel":"none","matchedWords":[]}],"notes":{"value":"","matchLevel":"none","matchedWords":[]}}},{"appID":"PERISCOPE_LIVE","company":"Periscope","type":"ugc","vertical":"entertainment","totalOperations":399659694,"platform":"android","features":["doc search","doc search"],"languages":["english","english"],"locale":"United States","url":"https://itunes.apple.com/app/id972909677","notes":"Here are some notes on why it\'s a good one.","image":["image/upload/v1450864429/builtwith/j3uugqlwdod4aapajtq5.png#59d03cc5c80ca9a6c82bd6ea814b42fd26a21138"],"objectID":"periscope-PERISCOPE_LIVE-android","_highlightResult":{"company":{"value":"<em>Periscope</em>","matchLevel":"full","matchedWords":["periscope"]},"type":{"value":"ugc","matchLevel":"none","matchedWords":[]},"vertical":{"value":"entertainment","matchLevel":"none","matchedWords":[]},"platform":{"value":"android","matchLevel":"none","matchedWords":[]},"features":[{"value":"doc search","matchLevel":"none","matchedWords":[]},{"value":"doc search","matchLevel":"none","matchedWords":[]}],"languages":[{"value":"english","matchLevel":"none","matchedWords":[]},{"value":"english","matchLevel":"none","matchedWords":[]}],"notes":{"value":"Here are some notes on why it\'s a good one.","matchLevel":"none","matchedWords":[]}}},{"appID":"4PWCJLQ65F","company":"Periscope Photos","type":"UGC","vertical":"Tech","totalOperations":100,"platform":"web","features":["powered by"],"languages":["bengali"],"locale":"United States","url":"http://www.karate-pelissanne.org","notes":"d","image":["image/upload/v1449763295/builtwith/leyqrwqd0wria7flleye.png#966d4ac04b9bbdd150c43f152aadc06c6f4d025a","image/upload/v1449763296/builtwith/nso1mhcald8ix8zvx4ch.png#7a216f74dec36f0ee5216c104a42db2d88d819ae"],"objectID":"periscope-photos-4PWCJLQ65F-web","_highlightResult":{"company":{"value":"<em>Periscope</em> Photos","matchLevel":"full","matchedWords":["periscope"]},"type":{"value":"UGC","matchLevel":"none","matchedWords":[]},"vertical":{"value":"Tech","matchLevel":"none","matchedWords":[]},"platform":{"value":"web","matchLevel":"none","matchedWords":[]},"features":[{"value":"powered by","matchLevel":"none","matchedWords":[]}],"languages":[{"value":"bengali","matchLevel":"none","matchedWords":[]}],"notes":{"value":"d","matchLevel":"none","matchedWords":[]}}}],"nbHits":3,"page":0,"nbPages":1,"hitsPerPage":20,"processingTimeMS":1,"query":"periscope","queryAfterRemoval":"periscope","params":"query=periscope"}';
  var searchTerm = 'search';
  var cacheKey = '/1/indexes/*/queries_body_{"requests":[{"indexName":"' + credentials.indexName + '","params":"query=search"}]}';
  var cache = {};
  cache[cacheKey] = cachedResult;

  var opts = {
    _cache: cache
  };

  var algoliasearch = require('../../../../');
  var searchWithCache = algoliasearch(credentials.applicationID, credentials.searchOnlyAPIKey, opts);

  fauxJax.on('request', function() {
    t.fail('Request made after cache specified');
  });

  searchWithCache.search([{
    query: searchTerm,
    indexName: credentials.indexName
  }], end);

  function end(err, results) {
    fauxJax.restore();

    if (err) {
      t.fail('Cached search failed' + err);
    }

    t.deepEqual(
      results,
      JSON.parse(cachedResult),
      'Specified cache returned for search'
    );
  }
});
