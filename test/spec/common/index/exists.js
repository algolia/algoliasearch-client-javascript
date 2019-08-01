'use strict';

var test = require('tape');

test('index.exists()', function(t) {
  indexDoesNotExist('callback', t);
  indexDoesNotExist('promise', t);
  indexExists('callback', t);
  indexExists('promise', t);
});

function indexDoesNotExist(asyncMode, mainTest) {
  mainTest.test('unexisting index using a ' + asyncMode, function(t) {
    t.plan(1);

    var bind = require('lodash-compat/function/bind');
    var fauxJax = require('faux-jax');

    var createFixture = require('../../../utils/create-fixture');
    var fixture = createFixture();
    var index = fixture.index;

    fauxJax.install();
    fauxJax.once('request', respondToGetSettings);

    if (asyncMode === 'callback') {
      index.exists(function(err, response) {
        if (err) {
          t.error(err);
        }
        t.notOk(response);
        fauxJax.restore();
      });
    } else if (asyncMode === 'promise') {
      index
        .exists()
        .then(function(response) {
          t.notOk(response);
          fauxJax.restore();
        }, bind(t.fail, t));
    }

    function respondToGetSettings(req) {
      req.respond(
        404,
        {},
        JSON.stringify({
          name: 'AlgoliaSearchError',
          message: 'Index does not exist'
        })
      );
    }
  });
}

function indexExists(asyncMode, mainTest) {
  mainTest.test('existing index using a ' + asyncMode, function(t) {
    t.plan(1);

    var bind = require('lodash-compat/function/bind');
    var fauxJax = require('faux-jax');

    var createFixture = require('../../../utils/create-fixture');
    var fixture = createFixture();
    var index = fixture.index;

    fauxJax.install();
    fauxJax.once('request', respondToGetSettings);

    if (asyncMode === 'callback') {
      index.exists(function(err, response) {
        if (err) {
          t.error(err);
        }
        t.ok(response);
        fauxJax.restore();
      });
    } else if (asyncMode === 'promise') {
      index
        .exists()
        .then(function(response) {
          t.ok(response);
          fauxJax.restore();
        }, bind(t.fail, t));
    }

    function respondToGetSettings(req) {
      req.respond(
        200,
        {},
        JSON.stringify({
          attributesForFaceting: ['searchable(category)']
        })
      );
    }
  });
}
