'use strict';

if (
  !process.env.INTEGRATION_TEST_API_KEY ||
  !process.env.INTEGRATION_TEST_APPID
) {
  throw new Error(
    'missing: INTEGRATION_TEST_APPID=$APPID INTEGRATION_TEST_API_KEY=$APIKEY command'
  );
}

// simple integration tests, checking the whole communication
const _ = require('lodash-compat');
const Chance = require('chance');
const test = require('tape');

const getFakeObjects = require('./utils/get-fake-objects');

const isABrowser = process.browser;
const canPUT = !isABrowser || require('faux-jax').support.xhr.cors;
const canDELETE = canPUT;

// ensure that on the browser we use the global algoliasearch,
// so that we are absolutely sure the builded version exposes algoliasearch
// in browser integration tests
let algoliasearch;
if (isABrowser) {
  algoliasearch = window.algoliasearch;
} else {
  // on nodejs, we require algoliasearch
  algoliasearch = require('../');
}

const chance = new Chance();
const apiKey = process.env.INTEGRATION_TEST_API_KEY;
const appId = process.env.INTEGRATION_TEST_APPID;
const indexName = `_travis-algoliasearch-client-js${process.env
  .TRAVIS_BUILD_NUMBER || 'DEV'}${chance.word({ length: 12 })}`;

const client = algoliasearch(appId, apiKey, {
  protocol: 'https:',
});
const index = client.initIndex(indexName);
const objects = getFakeObjects(50);

// force all index.commands to be bound to the index object,
// avoid having to type index.waitTask.bind(index)
_.bindAll(index);

test('index.clearIndex', clearIndex);
if (canPUT) {
  test('index.setSettings', setSettings);
}
test('index.saveObjects', saveObjects);
if (canPUT) {
  test('index.searchForFacetValues', searchForFacetValues);
}
test('index.browse', browse);
test('index.getObject', getObject);
test('index.browseFrom', browseFrom);
test('index.browseAll', browseAll);

if (canPUT) {
  test('synonyms API', synonyms);
  test.skip('query rules', queryRules);
}

if (!isABrowser) {
  test('client.generateSecuredApiKey', generateSecuredApiKey);
}

if (canPUT) {
  // saveObject is a PUT, only supported by Node.js or CORS, not XDomainRequest
  test('index.saveObject', saveObject);
}

test('fallback strategy success', dnsFailThenSuccess);
test(
  'fallback strategy success, not a search method',
  dnsFailThenSuccessNoSearch
);
test('fallback strategy all servers fail', dnsFailed);

if (!process.browser) {
  test('using a http proxy to https', proxyHttpToHttps);
}

if (canDELETE) {
  test('client.deleteIndex', deleteIndex);
} else {
  test('index.clearIndex', clearIndex);
}

test(
  'places with credentials',
  initPlaces(process.env.PLACES_APPID, process.env.PLACES_APIKEY)
);
test('places without credentials', initPlaces());

if (!isABrowser) {
  test('client.destroy', destroy);
}

function initPlaces(placesAppId, placesApiKey) {
  return function(t) {
    t.plan(1);
    const places = algoliasearch.initPlaces(placesAppId, placesApiKey);

    places.search('paris').then(
      res => {
        t.ok(res.nbHits, 'We got some results by querying `paris`');
      },
      e => {
        t.fail(e);
      }
    );
  };
}

function clearIndex(t) {
  t.plan(1);

  index
    .clearIndex()
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
    .setSettings({ attributesForFaceting: ['searchable(category)'] })
    .then(get('taskID'))
    .then(index.waitTask)
    .then(get('status'))
    .then(_.partialRight(t.equal, 'published', 'Settings were updated'))
    .then(noop, _.bind(t.error, t));
}

function searchForFacetValues(t) {
  t.plan(1);

  index
    .searchForFacetValues({ facetName: 'category', facetQuery: 'a' })
    .then(get('facetHits'))
    .then(facetHits => {
      t.ok(facetHits.length, 'We got some facet hits');
    })
    .then(noop, _.bind(t.error, t));
}

function saveObjects(t) {
  t.plan(1);

  index
    .saveObjects(objects)
    .then(get('taskID'))
    .then(index.waitTask)
    .then(get('status'))
    .then(_.partialRight(t.equal, 'published', 'Objects were saved'))
    .then(noop, _.bind(t.error, t));
}

function generateSecuredApiKey(t) {
  t.plan(4);

  client.addApiKey(['search'], { validity: 360 }, (err, keyResult) => {
    t.error(err, 'No error adding a key');
    t.ok(keyResult.key, 'We got the added key');

    const tmpKey = keyResult.key;

    waitKey(tmpKey, testSecuredKey);
  });

  function testSecuredKey(tmpKey) {
    const securedKey = client.generateSecuredApiKey(tmpKey, {
      hitsPerPage: 2,
    });

    const securedClient = algoliasearch(appId, securedKey);
    const securedIndex = securedClient.initIndex(indexName);
    securedIndex.search({ hitsPerPage: 100 }, (err, res) => {
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
  index
    .browse(0)
    .then(content => {
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

  index
    .getObject(objects[0].objectID)
    .then(object => {
      t.notEqual(object, objects[0], 'Objects references are different');
      t.notEqual(object.isModified, 'yes', 'Object was not yet modified');
      t.deepEqual(object, objects[0], 'Objects have the same content');
    })
    .then(noop, _.bind(t.error, t));
}

function saveObject(t) {
  t.plan(2);

  const modifiedObject = _.assign({}, objects[0], { isModified: 'yes' });

  index
    .saveObject(modifiedObject)
    .then(get('taskID'))
    .then(index.waitTask)
    .then(get('status'))
    .then(_.partialRight(t.equal, 'published', 'Object was saved'))
    .then(_.partial(index.getObject, objects[0].objectID))
    .then(object => {
      t.equal(object.isModified, 'yes', 'Object was modified');
    })
    .then(noop, _.bind(t.error, t));
}

function browseFrom(t) {
  t.plan(7);

  let firstHits;

  index
    .browse({ hitsPerPage: 2 })
    .then(content => {
      t.equal(content.hits.length, 2, 'We received two hits');

      t.ok(content.cursor, 'We have a cursor');
      t.equal(content.page, 0, 'We are on the first page');
      firstHits = content.hits;
      return index.browseFrom(content.cursor);
    })
    .then(content => {
      t.equal(content.hits.length, 2, 'We received two more hits');
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

  let browsedObjects = [];

  const browser = index.browseAll({
    hitsPerPage: 10,
  });

  browser.on('result', content => {
    browsedObjects = browsedObjects.concat(content.hits);
    t.equal(content.hits.length, 10);
    t.pass('We received a result event');
  });

  browser.on('end', () => {
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

  client
    .deleteIndex(indexName)
    .then(get('taskID'))
    .then(index.waitTask)
    .then(get('status'))
    .then(_.partialRight(t.equal, 'published', 'Index was deleted'))
    .then(noop, _.bind(t.error, t));
}

function get(pattern) {
  return _.partialRight(_.get, pattern);
}

function noop() {}

function proxyHttpToHttps(t) {
  t.plan(1);

  const http = require('http');
  const setup = require('proxy');

  const server = setup(http.createServer());

  server.listen(0, () => {
    const tunnel = require('tunnel-agent');

    const agentSettings = {
      proxy: {
        host: server.address().host,
        port: server.address().port,
      },
    };

    const proxyClient = algoliasearch(appId, apiKey, {
      httpAgent: tunnel.httpsOverHttp(agentSettings),
    });
    const proxyIndex = proxyClient.initIndex(indexName);
    proxyIndex.browse().then(end).then(null, _.bind(t.error, t));

    function end(content) {
      server.close();
      proxyClient.destroy();
      t.ok(content.hits.length, 'We got some content');
    }
  });
}

function synonyms(t) {
  index
    .saveObject({
      objectID: 'synonyms-test',
      name: '589 Howard St., San Francisco',
    })
    .then(get('taskID'))
    .then(index.waitTask)
    .then(() =>
      index.batchSynonyms([
        {
          objectID: 'city',
          type: 'synonym',
          synonyms: ['San Francisco', 'SF'],
        },
        {
          objectID: 'street',
          type: 'altCorrection1',
          word: 'Street',
          corrections: ['St'],
        },
      ])
    )
    .then(get('taskID'))
    .then(index.waitTask)
    .then(_.bind(t.pass, t, 'we batch added synonyms'))
    .then(_.partial(index.searchSynonyms, { query: '' }))
    .then(res => {
      t.equal(res.hits.length, 2);
    })
    .then(_.partial(index.getSynonym, 'city'))
    .then(synonym => {
      t.equal('city', synonym.objectID);
    })
    .then(_.partial(index.search, 'Howard Street SF'))
    .then(res => {
      t.equal(1, res.hits.length);
      t.equal('synonyms-test', res.hits[0].objectID);
    })
    .then(_.partial(index.deleteSynonym, 'city'))
    .then(get('taskID'))
    .then(index.waitTask)
    .then(() => index.searchSynonyms({ query: '', type: 'altCorrection1' }))
    .then(res => {
      t.equal(1, res.hits.length);
      t.equal('street', res.hits[0].objectID);
    })
    .then(index.clearSynonyms)
    .then(get('taskID'))
    .then(index.waitTask)
    .then(() => index.searchSynonyms())
    .then(res => {
      t.equal(0, res.hits.length);
    })
    .then(() => {
      t.end();
    })
    .then(noop, _.bind(t.error, t));
}

function queryRules(t) {
  index
    // we add an object with a specific name
    .saveObject({ objectID: 'query-rule', name: 'query-rule-integration-test' })
    .then(get('taskID'))
    .then(index.waitTask)
    // we clear all rules
    .then(index.clearRules)
    .then(get('taskID'))
    .then(index.waitTask)
    // we try and fail to find an object with a weird query
    .then(_.partial(index.search, { query: 'hellomyfriendhowareyou???' }))
    .then(res => {
      t.equal(res.hits.length, 0);
    })
    // we add a rule matching the weird query to the name
    .then(() =>
      index.batchRules([
        {
          objectID: 'to-integration-test',
          condition: { pattern: 'hellomyfriendhowareyou???', anchoring: 'is' },
          consequence: { params: { query: 'query-rule-integration-test' } },
        },
      ])
    )
    .then(get('taskID'))
    .then(index.waitTask)
    .then(_.bind(t.pass, t, 'we batch added rules'))
    // we search and try to hit the query rule pattern
    .then(_.partial(index.search, { query: 'hellomyfriendhowareyou???' }))
    .then(res => {
      t.equal(res.hits.length, 1);
      t.equal(res.hits[0].name, 'query-rule-integration-test');
    })
    // we get the rule
    .then(_.partial(index.getRule, 'to-integration-test'))
    .then(rule => {
      t.deepEqual(rule, {
        objectID: 'to-integration-test',
        condition: { pattern: 'hellomyfriendhowareyou???', anchoring: 'is' },
        consequence: { params: { query: 'query-rule-integration-test' } },
      });
    })
    .then(_.partial(index.deleteRule, 'to-integration-test'))
    .then(get('taskID'))
    .then(index.waitTask)
    .then(_.partial(index.search, { query: 'hellomyfriendhowareyou???' }))
    .then(res => {
      t.equal(res.hits.length, 0);
    })
    .then(
      _.partial(index.saveRule, {
        objectID: 'to-integration-test2',
        condition: { pattern: 'hellomyfriendhowareyou???', anchoring: 'is' },
        consequence: { params: { query: 'query-rule-integration-test' } },
      })
    )
    .then(get('taskID'))
    .then(index.waitTask)
    .then(_.partial(index.getRule, 'to-integration-test2'))
    .then(rule => {
      t.deepEqual(rule, {
        objectID: 'to-integration-test2',
        condition: { pattern: 'hellomyfriendhowareyou???', anchoring: 'is' },
        consequence: { params: { query: 'query-rule-integration-test' } },
      });
    })
    .then(() => {
      t.end();
    })
    .then(noop, _.bind(t.error, t));
}

function waitKey(key, callback, tries) {
  if (tries === undefined) tries = 0;

  if (tries === 20) throw new Error('waitKey: Never managed to use the key');

  const tmpClient = algoliasearch(appId, key);
  const tmpIndex = tmpClient.initIndex(indexName);
  tmpIndex.search(err => {
    if (err) return setTimeout(waitKey, 200, key, callback, tries++);
    tmpClient.destroy();
    callback(key);
  });
}

function dnsFailThenSuccess(t) {
  t.plan(4);

  let firstSearchTiming;
  const firstSearchStart = new Date().getTime();
  const client_ = algoliasearch(appId, apiKey, {
    // .biz is a black hole DNS name (not resolving)
    hosts: [`${appId}-dsn.algolia.biz`, `${appId}-dsn.algolia.net`],
  });

  const index_ = client_.initIndex(indexName);
  const connectTimeout = isABrowser ? 1000 : 2000;
  index_.search('').then(
    content => {
      const now = new Date().getTime();
      firstSearchTiming = now - firstSearchStart;
      t.ok(
        firstSearchTiming > connectTimeout,
        `first search takes more than 2s because of connect timeout = 2s. ${firstSearchTiming}`
      );
      t.ok(content.hits.length > 0, 'hits should not be empty');
      secondSearch();
    },
    () => {
      t.fail(
        'No error should be generated as it should lastly route to a good domain.'
      );
    }
  );

  function secondSearch() {
    const secondSearchStart = new Date().getTime();
    let secondSearchTiming;
    index_.search('a').then(
      content => {
        if (!isABrowser) {
          client_.destroy();
        }
        const now = new Date().getTime();
        secondSearchTiming = now - secondSearchStart;
        t.ok(
          secondSearchTiming < connectTimeout,
          `second search is fast because we know .biz is failing. ${secondSearchTiming}`
        );
        t.ok(content.hits.length > 0, 'hits should not be empty');
      },
      () => {
        t.fail(
          'No error should be generated as it should lastly route to a good domain.'
        );
      }
    );
  }
}

function dnsFailThenSuccessNoSearch(t) {
  t.plan(1);

  const client_ = algoliasearch(appId, apiKey, {
    // .biz is a black hole DNS name (not resolving)
    hosts: [`${appId}-dsn.algolia.biz`, `${appId}-dsn.algolia.net`],
    protocol: 'https:',
  });

  client_.listIndexes().then(
    content => {
      if (!isABrowser) {
        client_.destroy();
      }
      t.ok(content.items.length > 0, 'we found a list of indices');
    },
    () => {
      t.fail(
        'No error should be generated as it should lastly route to a good domain.'
      );
    }
  );
}

function dnsFailed(t) {
  t.plan(1);
  const client_ = algoliasearch(appId, apiKey, {
    hosts: [`${appId}-dsn.algolia.biz`],
  });

  const index_ = client_.initIndex(indexName);

  index_.search('').then(
    () => {
      t.fail('Should fail as no host are reachable');
      t.end();
    },
    () => {
      if (!isABrowser) {
        client_.destroy();
      }
      t.pass('An error was triggered');
      t.end();
    }
  );
}

function destroy(t) {
  client.destroy();
  t.end();
}
