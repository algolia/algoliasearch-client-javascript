'use strict';

if (!process.env.INTEGRATION_TEST_API_KEY || !process.env.INTEGRATION_TEST_APPID) {
  throw new Error('missing: INTEGRATION_TEST_APPID=$APPID INTEGRATION_TEST_API_KEY=$APIKEY command');
}

// simple integration tests, checking the whole communication
var _ = require('lodash-compat');
var arrayFrom = require('array.from');
var Chance = require('chance');
var test = require('tape');

var getFakeObjects = require('./utils/get-fake-objects');

var isABrowser = process.browser;
var canPUT = !isABrowser || require('faux-jax').support.xhr.cors;
var canDELETE = canPUT;

// ensure that on the browser we use the global algoliasearch,
// so that we are absolutely sure the builded version exposes algoliasearch
// in browser integration tests
var algoliasearch;
if (isABrowser) {
  algoliasearch = window.algoliasearch;
} else {
  // on nodejs, we require algoliasearch
  algoliasearch = require('../');
}

var chance = new Chance();
var apiKey = process.env.INTEGRATION_TEST_API_KEY;
var appId = process.env.INTEGRATION_TEST_APPID;
var indexName = '_travis-algoliasearch-client-js' +
  (process.env.TRAVIS_BUILD_NUMBER || 'DEV') +
  chance.word({length: 12});

var client = algoliasearch(appId, apiKey, {
  protocol: 'https:',
  _useCache: false
});
var index = client.initIndex(indexName);
var objects = getFakeObjects(50);

// force all index.commands to be bound to the index object,
// avoid having to type index.waitTask.bind(index)
_.bindAll(index);

test('index.clearIndex', clearIndex);
if (canPUT) {
  test('index.setSettings', setSettings);
  test('index.getSettings', getSettings);
}
test('index.saveObjects', saveObjects);
if (canPUT) {
  test('index.searchForFacetValues', indexSearchForFacetValues);
  test('searchForFacetValues', searchForFacetValues);
}
test('index.browse', browse);
test('index.getObject', getObject);
test('index.browseFrom', browseFrom);
test('index.browseAll', browseAll);

if (canPUT) {
  test('synonyms API', synonyms);
  test('query rules', queryRules);
}

if (canPUT) {
  test('export synonyms', exportSynonyms);
  test('export query rules', exportRules);
}

if (!isABrowser) {
  test('client.generateSecuredApiKey', generateSecuredApiKey);
}

if (canPUT) {
  // saveObject is a PUT, only supported by Node.js or CORS, not XDomainRequest
  test('index.saveObject', saveObject);
}

test('fallback strategy success', dnsFailThenSuccess);
test('fallback strategy success, not a search method', dnsFailThenSuccessNoSearch);
test('fallback strategy all servers fail', dnsFailed);

if (!process.browser) {
  test('using a http proxy to https', proxyHttpToHttps);
}

if (canDELETE) {
  test('client.deleteIndex', deleteIndex);
} else {
  test('index.clearIndex', clearIndex);
}

test('places with credentials', initPlaces(process.env.PLACES_APPID, process.env.PLACES_APIKEY));
test('places without credentials', initPlaces());

if (!isABrowser) {
  test('client.destroy', destroy);
}

function initPlaces(placesAppId, placesApiKey) {
  return function(t) {
    t.plan(1);
    var places = algoliasearch.initPlaces(placesAppId, placesApiKey);

    places.search('paris').then(function(res) {
      t.ok(res.nbHits, 'We got some results by querying `paris`');
    }, function(e) {
      t.fail(e);
    });
  };
}

function clearIndex(t) {
  t.plan(1);

  index.clearIndex()
    // clear index
    .then(get('taskID'))
    .then(index.waitTask)
    .then(get('status'))
    .then(_.partialRight(t.equal, 'published', 'Index was cleared'))
    // we do not use .catch since it's a reserved word in IE8
    // https://github.com/jakearchibald/es6-promise/issues/20
    .then(noop, _.bind(t.error, t));
}

function setSettings(t) {
  t.plan(1);

  index
    .setSettings({attributesForFaceting: ['searchable(category)']})
    .then(get('taskID'))
    .then(index.waitTask)
    .then(get('status'))
    .then(_.partialRight(t.equal, 'published', 'Settings were updated'))
    .then(noop, _.bind(t.error, t));
}

function getSettings(t) {
  t.plan(2);

  index
    .setSettings({attributesForFaceting: ['searchable(category)']})
    .then(function() {return index.getSettings({advanced: 1});})
    .then(get('attributesForFaceting'))
    .then(_.partialRight(t.deepEqual, ['searchable(category)'], 'Settings were get (advanced)'))
    .then(function() {return index.getSettings();})
    .then(get('attributesForFaceting'))
    .then(_.partialRight(t.deepEqual, ['searchable(category)'], 'Settings were get'))
    .then(noop, _.bind(t.error, t));
}

function indexSearchForFacetValues(t) {
  t.plan(1);

  index
    .searchForFacetValues({facetName: 'category', facetQuery: 'a'})
    .then(get('facetHits'))
    .then(function(facetHits) {
      t.ok(facetHits.length, 'We got some facet hits');
    })
    .then(noop, _.bind(t.error, t));
}

function searchForFacetValues(t) {
  t.plan(1);

  client.
    searchForFacetValues({
      indexName: indexName,
      params: {facetName: 'category', facetQuery: 'a'}
    })
    .then(get('facetHits'))
    .then(function(facetHits) {
      t.ok(facetHits.length, 'We got some facet hits');
    })
    .then(noop, _.bind(t.error, t));
}

function saveObjects(t) {
  t.plan(1);

  index.saveObjects(objects)
    .then(get('taskID'))
    .then(index.waitTask)
    .then(get('status'))
    .then(_.partialRight(t.equal, 'published', 'Objects were saved'))
    .then(noop, _.bind(t.error, t));
}

function generateSecuredApiKey(t) {
  t.plan(4);

  client.addApiKey(['search'], {validity: 360}, function(err, keyResult) {
    t.error(err, 'No error adding a key');
    t.ok(keyResult.key, 'We got the added key');

    var tmpKey = keyResult.key;

    waitKey(tmpKey, testSecuredKey);
  });

  function testSecuredKey(tmpKey) {
    var securedKey = client.generateSecuredApiKey(tmpKey, {
      hitsPerPage: 2
    });

    var securedClient = algoliasearch(appId, securedKey);
    var securedIndex = securedClient.initIndex(indexName);
    securedIndex.search({hitsPerPage: 100}, function(err, res) {
      if (!isABrowser) {
        securedClient.destroy();
      }
      t.error(err, 'No error on using a secured key');
      t.equal(res.hits.length, 2, 'We got only two hits');
    });
  }
}

function browse(t) {
  t.plan(1);

  // check objects are matching
  index.browse(0)
    .then(function(content) {
      t.deepEqual(
        _.sortBy(content.hits, 'objectID'),
        _.sortBy(objects, 'objectID'),
        'Remote hits matches'
      );
    })
    .then(noop, _.bind(t.error, t));
}

function getObject(t) {
  t.plan(3);

  index.getObject(objects[0].objectID)
    .then(function(object) {
      t.notEqual(object, objects[0], 'Objects references are different');
      t.notEqual(object.isModified, 'yes', 'Object was not yet modified');
      t.deepEqual(object, objects[0], 'Objects have the same content');
    })
    .then(noop, _.bind(t.error, t));
}

function saveObject(t) {
  t.plan(2);

  var modifiedObject = _.assign({}, objects[0], {isModified: 'yes'});

  index.saveObject(modifiedObject)
    .then(get('taskID'))
    .then(index.waitTask)
    .then(get('status'))
    .then(_.partialRight(t.equal, 'published', 'Object was saved'))
    .then(_.partial(index.getObject, objects[0].objectID))
    .then(function(object) {
      t.equal(object.isModified, 'yes', 'Object was modified');
    })
    .then(noop, _.bind(t.error, t));
}

function browseFrom(t) {
  t.plan(7);

  var firstHits;

  index.browse({hitsPerPage: 2})
    .then(function(content) {
      t.equal(
        content.hits.length,
        2,
        'We received two hits'
      );

      t.ok(content.cursor, 'We have a cursor');
      t.equal(content.page, 0, 'We are on the first page');
      firstHits = content.hits;
      return index.browseFrom(content.cursor);
    })
    .then(function(content) {
      t.equal(
        content.hits.length,
        2,
        'We received two more hits'
      );
      t.equal(content.page, 1, 'We are on the second page');
      t.ok(content.cursor, 'We have a new cursor');
      t.notDeepEqual(
        _.sortBy(content.hits, 'objectID'),
        _.sortBy(firstHits, 'objectID'),
        'Received hits are different'
      );
    })
    .then(noop, _.bind(t.error, t));
}

function browseAll(t) {
  // 5 `result` events
  // 1 `end` event
  t.plan(11);

  var browsedObjects = [];

  var browser = index.browseAll({
    hitsPerPage: 10
  });

  browser.on('result', function(content) {
    browsedObjects = browsedObjects.concat(content.hits);
    t.equal(content.hits.length, 10);
    t.pass('We received a result event');
  });

  browser.on('end', function() {
    t.deepEqual(
      _.sortBy(browsedObjects, 'objectID'),
      _.sortBy(objects, 'objectID'),
      'Remote hits matches'
    );
  });

  browser.on('error', _.bind(t.fail, t));
}

function deleteIndex(t) {
  t.plan(1);

  client.deleteIndex(indexName)
    .then(get('taskID'))
    .then(index.waitTask)
    .then(get('status'))
    .then(_.partialRight(t.equal, 'published', 'Index was deleted'))
    .then(noop, _.bind(t.error, t));
}

function get(pattern) {
  return _.partialRight(_.get, pattern);
}

function noop() {
}

function proxyHttpToHttps(t) {
  t.plan(1);

  var http = require('http');
  var setup = require('proxy');

  var server = setup(http.createServer());

  server.listen(0, function() {
    var tunnel = require('tunnel-agent');

    var agentSettings = {
      proxy: {
        host: server.address().host,
        port: server.address().port
      }
    };

    var proxyClient = algoliasearch(appId, apiKey, {
      httpAgent: tunnel.httpsOverHttp(agentSettings)
    });
    var proxyIndex = proxyClient.initIndex(indexName);
    proxyIndex
      .browse()
      .then(end)
      .then(null, _.bind(t.error, t));

    function end(content) {
      server.close();
      proxyClient.destroy();
      t.ok(content.hits.length, 'We got some content');
    }
  });
}

function synonyms(t) {
  index.saveObject({objectID: 'synonyms-test', name: '589 Howard St., San Francisco'})
    .then(get('taskID'))
    .then(index.waitTask)
    .then(function() {
      return index.batchSynonyms([{
        objectID: 'city',
        type: 'synonym',
        synonyms: ['San Francisco', 'SF']
      }, {
        objectID: 'street',
        type: 'altCorrection1',
        word: 'Street',
        corrections: ['St']
      }]);
    })
    .then(get('taskID'))
    .then(index.waitTask)
    .then(_.bind(t.pass, t, 'we batch added synonyms'))
    .then(_.partial(index.searchSynonyms, {query: ''}))
    .then(function(res) {
      t.equal(res.hits.length, 2);
    })
    .then(_.partial(index.getSynonym, 'city'))
    .then(function(synonym) {
      t.equal('city', synonym.objectID);
    })
    .then(_.partial(index.search, 'Howard Street SF'))
    .then(function(res) {
      t.equal(1, res.hits.length);
      t.equal('synonyms-test', res.hits[0].objectID);
    })
    .then(_.partial(index.deleteSynonym, 'city'))
    .then(get('taskID'))
    .then(index.waitTask)
    .then(function() {
      return index.searchSynonyms({query: '', type: 'altCorrection1'});
    })
    .then(function(res) {
      t.equal(1, res.hits.length);
      t.equal('street', res.hits[0].objectID);
    })
    .then(function() { return index.clearSynonyms(); })
    .then(get('taskID'))
    .then(index.waitTask)
    .then(function() {
      return index.searchSynonyms();
    })
    .then(function(res) {
      t.equal(0, res.hits.length);
    })
    .then(function() {t.end();})
    .then(noop, _.bind(t.error, t));
}

function queryRules(t) {
  index
    // we add an object with a specific name
    .saveObject({objectID: 'query-rule', name: 'query-rule-integration-test'})
    .then(get('taskID'))
    .then(index.waitTask)
    // we clear all rules
    .then(function() { return index.clearRules(); })
    .then(get('taskID'))
    .then(index.waitTask)
    // we try and fail to find an object with a weird query
    .then(_.partial(index.search, {query: 'hellomyfriendhowareyou???'}))
    .then(function(res) {
      t.equal(res.hits.length, 0);
    })
    // we add a rule matching the weird query to the name
    .then(function() {
      return index.batchRules([{
        objectID: 'to-integration-test',
        condition: {pattern: 'hellomyfriendhowareyou???', anchoring: 'is'},
        consequence: {params: {query: 'query-rule-integration-test'}}
      }]);
    })
    .then(get('taskID'))
    .then(index.waitTask)
    .then(_.bind(t.pass, t, 'we batch added rules'))
    // we search and try to hit the query rule pattern
    .then(_.partial(index.search, {query: 'hellomyfriendhowareyou???'}))
    .then(function(res) {
      t.equal(res.hits.length, 1);
      t.equal(res.hits[0].name, 'query-rule-integration-test');
    })
    // we get the rule
    .then(_.partial(index.getRule, 'to-integration-test'))
    .then(function(rule) {
      t.deepEqual(rule,
        {
          objectID: 'to-integration-test',
          condition: {pattern: 'hellomyfriendhowareyou???', anchoring: 'is'},
          consequence: {params: {query: 'query-rule-integration-test'}}}
        );
    })
    .then(_.partial(index.deleteRule, 'to-integration-test'))
    .then(get('taskID'))
    .then(index.waitTask)
    .then(_.partial(index.search, {query: 'hellomyfriendhowareyou???'}))
    .then(function(res) {
      t.equal(res.hits.length, 0);
    })
    .then(_.partial(index.saveRule, {
      objectID: 'to-integration-test2',
      condition: {pattern: 'hellomyfriendhowareyou???', anchoring: 'is'},
      consequence: {params: {query: 'query-rule-integration-test'}}
    }))
    .then(get('taskID'))
    .then(index.waitTask)
    .then(_.partial(index.getRule, 'to-integration-test2'))
    .then(function(rule) {
      t.deepEqual(rule, {
        objectID: 'to-integration-test2',
        condition: {pattern: 'hellomyfriendhowareyou???', anchoring: 'is'},
        consequence: {params: {query: 'query-rule-integration-test'}}
      });
    })
    .then(function() {t.end();})
    .then(noop, _.bind(t.error, t));
}

function exportRules(t) {
  var rulesBatch = arrayFrom({length: 300}, function(v, num) {
    return {
      objectID: 'some-qr-rule-' + num,
      condition: {pattern: 'hellomyfriendhowareyou??? ' + num, anchoring: 'is'},
      consequence: {params: {query: 'query-rule-integration-test'}}
    };
  }).sort(sortByObjectID);

  index
    // we clean the index
    .clearRules()
    .then(get('taskID'))
    .then(index.waitTask)
    // add 300 rules
    .then(function() {
      return index.batchRules(rulesBatch);
    })
    .then(get('taskID'))
    .then(index.waitTask)
    .then(_.bind(t.pass, t, 'we batch added rules'))
    // now the exported rules should be the same
    .then(index.exportRules)
    .then(function(exported) {
      exported.sort(sortByObjectID);
      t.deepEqual(exported, rulesBatch);
    })
    .then(_.bind(t.end, t))
    .catch(_.bind(t.error, t));
}

function sortByObjectID(a, b) {
  function getNum(string) {
    var lengthToDiscard = 'some-qr-rule-'.length;
    var number = string.substring(lengthToDiscard);
    return parseInt(number, 10);
  }
  return getNum(a.objectID) - getNum(b.objectID);
}

function exportSynonyms(t) {
  var synonymBatch = arrayFrom({length: 300}, function(v, num) {
    return {
      objectID: 'some-synonym-' + num,
      type: 'placeholder',
      placeholder: '<gotcha' + num + '>',
      replacements: ['replacement number ' + num]
    };
  }).sort(sortByObjectID);

  index
    // we clean the index
    .clearSynonyms()
    .then(get('taskID'))
    .then(index.waitTask)
    // add 300 synonyms
    .then(function() {
      return index.batchSynonyms(synonymBatch);
    })
    .then(get('taskID'))
    .then(index.waitTask)
    .then(_.bind(t.pass, t, 'we batch added synonyms'))
    // now the exported synonyms should be the same
    .then(index.exportSynonyms)
    .then(function(exported) {
      exported.sort(sortByObjectID);
      t.deepEqual(exported, synonymBatch);
    })
    .then(_.bind(t.end, t))
    .catch(_.bind(t.error, t));
}

function waitKey(key, callback, tries) {
  if (tries === undefined) tries = 0;

  if (tries === 20) throw new Error('waitKey: Never managed to use the key');

  var tmpClient = algoliasearch(appId, key);
  var tmpIndex = tmpClient.initIndex(indexName);
  tmpIndex.search(function(err) {
    if (err) return setTimeout(waitKey, 200, key, callback, tries++);
    tmpClient.destroy();
    callback(key);
  });
}


function dnsFailThenSuccess(t) {
  t.plan(4);

  var firstSearchTiming;
  var firstSearchStart = (new Date()).getTime();
  var client_ = algoliasearch(
    appId,
    apiKey, {
      // .biz is a black hole DNS name (not resolving)
      hosts: [appId + '-dsn.algolia.biz', appId + '-dsn.algolia.net']
    }
  );

  var index_ = client_.initIndex(indexName);
  var connectTimeout = isABrowser ? 1000 : 2000;
  index_.search('').then(function(content) {
    var now = (new Date()).getTime();
    firstSearchTiming = now - firstSearchStart;
    t.ok(firstSearchTiming > connectTimeout, 'first search takes more than 2s because of connect timeout = 2s. ' + firstSearchTiming);
    t.ok(content.hits.length > 0, 'hits should not be empty');
    secondSearch();
  }, function() {
    t.fail('No error should be generated as it should lastly route to a good domain.');
  });

  function secondSearch() {
    var secondSearchStart = (new Date()).getTime();
    var secondSearchTiming;
    index_.search('a').then(function(content) {
      if (!isABrowser) {
        client_.destroy();
      }
      var now = (new Date()).getTime();
      secondSearchTiming = now - secondSearchStart;
      t.ok(secondSearchTiming < connectTimeout, 'second search is fast because we know .biz is failing. ' + secondSearchTiming);
      t.ok(content.hits.length > 0, 'hits should not be empty');
    }, function() {
      t.fail('No error should be generated as it should lastly route to a good domain.');
    });
  }
}

function dnsFailThenSuccessNoSearch(t) {
  t.plan(1);

  var client_ = algoliasearch(
    appId,
    apiKey, {
      // .biz is a black hole DNS name (not resolving)
      hosts: [appId + '-dsn.algolia.biz', appId + '-dsn.algolia.net'],
      protocol: 'https:'
    }
  );

  client_.listIndexes().then(function(content) {
    if (!isABrowser) {
      client_.destroy();
    }
    t.ok(content.items.length > 0, 'we found a list of indices');
  }, function() {
    t.fail('No error should be generated as it should lastly route to a good domain.');
  });
}

function dnsFailed(t) {
  t.plan(1);
  var client_ = algoliasearch(
    appId,
    apiKey, {
      hosts: [appId + '-dsn.algolia.biz']
    }
  );

  var index_ = client_.initIndex(indexName);

  index_.search('').then(function() {
    t.fail('Should fail as no host are reachable');
    t.end();
  }, function() {
    if (!isABrowser) {
      client_.destroy();
    }
    t.pass('An error was triggered');
    t.end();
  });
}

function destroy(t) {
  client.destroy();
  t.end();
}
