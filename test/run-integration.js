if (!process.env.INTEGRATION_TEST_API_KEY || !process.env.INTEGRATION_TEST_APPID) {
  throw new Error('usage: INTEGRATION_TEST_APPID=$APPID INTEGRATION_TEST_API_KEY=$APIKEY npm run test-integration');
}

// simple integration tests, checking the whole communication
var _ = require('lodash-compat');
var Chance = require('chance');
var test = require('tape');

var getFakeObjects = require('./utils/get-fake-objects');

var isABrowser = process.browser;
var canPUT = !isABrowser || require('faux-jax').support.xhr.cors;

// ensure that on the browser we use the global algoliasearch,
// so that we are absolutely sure the builded version exposes algoliasearch
// in browser integration tests
var algoliasearch;
if (isABrowser) {
  algoliasearch = global.algoliasearch;
} else {
  // on nodejs, we require algoliasearch
  algoliasearch = require('../');
}

var chance = new Chance();
var ApiKey = process.env.INTEGRATION_TEST_API_KEY;
var AppID = process.env.INTEGRATION_TEST_APPID;
var indexName = (process.env.TRAVIS_BUILD_NUMBER ||
  'JS-integration-tests-') + chance.word({length: 12});

var client = algoliasearch(AppID, ApiKey, {
  protocol: 'https:'
});
var index = client.initIndex(indexName);
var objects = getFakeObjects(10);

// force all index.commands to be bound to the index object,
// avoid having to type index.waitTask.bind(index)
_.bindAll(index);

test('Integration tests', function(t) {
  t.test('index.clearIndex', clearIndex);
  t.test('index.saveObjects', saveObjects);
  t.test('index.browse', browse);
  t.test('index.getObject', getObject);

  if (canPUT) {
    // saveObject is a PUT, only supported by Node.js or CORS, not XDomainRequest
    t.test('index.saveObject', saveObject);
  }

  t.test('index.clearIndex', clearIndex);
});

function clearIndex(t) {
  t.plan(1);

  index.clearIndex()
    // clear index
    .then(get('taskID'))
    .then(index.waitTask)
    .then(get('status'))
    .then(_.partialRight(t.equal, 'published', 'Index was cleared'))
    .then(_, _.bind(t.error, t));
}

function saveObjects(t) {
  t.plan(1);

  index.saveObjects(objects)
    .then(get('taskID'))
    .then(index.waitTask)
    .then(get('status'))
    .then(_.partialRight(t.equal, 'published', 'Objects were saved'))
    .then(_, _.bind(t.error, t));
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
    .then(_, _.bind(t.error, t));
}

function getObject(t) {
  t.plan(3);

  index.getObject(objects[0].objectID)
    .then(function(object) {
      t.notEqual(object, objects[0], 'Objects references are different');
      t.notEqual(object.isModified, 'yes', 'Object was not yet modified');
      t.deepEqual(object, objects[0], 'Objects have the same content');
    })
    .then(_, _.bind(t.error, t));
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
    .then(_, _.bind(t.error, t));
}

function get(pattern) {
  return _.partialRight(_.get, pattern);
}
