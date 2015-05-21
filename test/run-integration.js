if (!process.env.INTEGRATION_TEST_API_KEY || !process.env.INTEGRATION_TEST_APPID) {
  throw new Error('usage: INTEGRATION_TEST_APPID=$APPID INTEGRATION_TEST_API_KEY=$APIKEY npm run test-integration');
}

// simple integration tests, checking the whole communication
var _ = require('lodash');
var Chance = require('chance');
var test = require('tape');

// ensure that on the browser we use the global algoliasearch,
// so that we are absolutely sure the builded version exposes algoliasearch
// in browser integration tests
var algoliasearch;
if (process.browser) {
  algoliasearch = global.algoliasearch;
} else {
  // on nodejs, we require algoliasearch
  algoliasearch = require('../');
}
var getFakeObjects = require('./utils/get-fake-objects');

var chance = new Chance();

var ApiKey = process.env.INTEGRATION_TEST_API_KEY;
var AppID = process.env.INTEGRATION_TEST_APPID;
var indexName = process.env.TRAVIS_BUILD_NUMBER ||
  'JS-integration-tests-' + chance.word({length: 12});

var client = algoliasearch(AppID, ApiKey, {
  protocol: 'https:'
});
var index = client.initIndex(indexName);
var objects = getFakeObjects(10);

// force all index.commands to be bound to the index object,
// avoid having to type index.waitTask.bind(index)
_.bindAll(index);

test('A simple integration test', function(t) {
  t.plan(4);

  index.clearIndex()
    .then(get('taskID'))
    .then(index.waitTask)
    .then(get('status'))
    .then(_.partialRight(t.equal, 'published', 'clearIndex done'))

    .then(_.partial(index.saveObjects, objects))
    .then(get('taskID'))
    .then(index.waitTask)
    .then(get('status'))
    .then(_.partialRight(t.equal, 'published', 'saveObjects done'))

    .then(_.partial(index.browse, 0))
    .then(function(content) {
      t.deepEqual(
        _.sortBy(content.hits, 'objectID'),
        _.sortBy(objects, 'objectID'),
        'Remote hits matches'
      );
    })

    .then(index.clearIndex)
    .then(get('taskID'))
    .then(index.waitTask)
    .then(get('status'))
    .then(_.partialRight(t.equal, 'published', 'clearIndex done'))

    .catch(function(err) {
      t.error(err);
    });
});

function get(pattern) {
  return _.partialRight(_.get, pattern);
}
