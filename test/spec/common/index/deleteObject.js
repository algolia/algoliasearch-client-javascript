'use strict';

var test = require('tape');

test('deleteObject("id") with a valid objectID', function(t) {
  t.plan(1);
  var fauxJax = require('faux-jax');
  var sinon = require('sinon');
  var bind = require('lodash-compat/function/bind');
  var createFixture = require('../../../utils/create-fixture');
  var fixture = createFixture();
  var index = fixture.index;
  var algoliaSearchCore = index.as;

  sinon.spy(algoliaSearchCore, '_jsonRequest');
  fauxJax.install();
  fauxJax.on('request', function(req) {
    req.respond(200, {}, '{}');
  });

  index
    .deleteObject('valid-object-id')
    .then(function() {
      t.ok(algoliaSearchCore._jsonRequest.calledOnce, 'delete object request was called');
      fauxJax.restore();
      algoliaSearchCore._jsonRequest.restore();
    })
    .catch(bind(t.fail, t));
});

test('deleteObject("id", cb) with a valid objectID and a callback', function(t) {
  t.plan(2);
  var fauxJax = require('faux-jax');
  var sinon = require('sinon');
  var createFixture = require('../../../utils/create-fixture');
  var fixture = createFixture();
  var index = fixture.index;
  var algoliaSearchCore = index.as;

  sinon.spy(algoliaSearchCore, '_jsonRequest');
  fauxJax.install();
  fauxJax.on('request', function(req) {
    req.respond(200, {}, '{}');
  });

  index
    .deleteObject('valid-object-id', function(err, response) {
      if (err) t.error(err);
      t.ok(algoliaSearchCore._jsonRequest.calledOnce, 'delete object request was called');
      t.ok(response);

      fauxJax.restore();
      algoliaSearchCore._jsonRequest.restore();
    });
});

test('deleteObject() without an objectID', function(t) {
  t.plan(2);
  var bind = require('lodash-compat/function/bind');

  var createFixture = require('../../../utils/create-fixture');
  var fixture = createFixture();
  var index = fixture.index;

  index.deleteObject().then(bind(t.fail, t), function(err) {
    t.ok(err instanceof Error, 'received an error');
    t.equal(
      err.message,
      'Cannot delete an object without an objectID'
    );
  });
});

test('deleteObject(cb) without an objectID, with a cb', function(t) {
  t.plan(2);
  var createFixture = require('../../../utils/create-fixture');
  var fixture = createFixture();
  var index = fixture.index;

  index.deleteObject(function(err) {
    t.ok(err instanceof Error, 'received an error');
    t.equal(
      err.message,
      'Cannot delete an object without an objectID'
    );
  });
});

test('deleteObject("") with an empty string', function(t) {
  t.plan(2);
  var bind = require('lodash-compat/function/bind');

  var createFixture = require('../../../utils/create-fixture');
  var fixture = createFixture();
  var index = fixture.index;

  index.deleteObject('').then(bind(t.fail, t), function(err) {
    t.ok(err instanceof Error, 'received an error');
    t.equal(
      err.message,
      'Cannot delete an object without an objectID'
    );
  });
});

test('deleteObject(cb) with bad type objectID', function(t) {
  t.plan(2);
  var bind = require('lodash-compat/function/bind');

  var createFixture = require('../../../utils/create-fixture');
  var fixture = createFixture();
  var index = fixture.index;

  index.deleteObject([]).then(bind(t.fail, t), function(err) {
    t.ok(err instanceof Error, 'received an error');
    t.equal(
      err.message,
      'ObjectID must be a string'
    );
  });
});
