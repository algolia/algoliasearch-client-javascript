'use strict';

var test = require('tape');

test('deleteObject() without an objectID', function(t) {
  t.plan(2);
  var bind = require('lodash/function/bind');

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

test('deleteObject(cb)  without an objectID, with a cb', function(t) {
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
