'use strict';

const test = require('tape');

test('deleteObject() without an objectID', t => {
  t.plan(2);
  const bind = require('lodash-compat/function/bind');

  const createFixture = require('../../../utils/create-fixture');
  const fixture = createFixture();
  const index = fixture.index;

  index.deleteObject().then(bind(t.fail, t), err => {
    t.ok(err instanceof Error, 'received an error');
    t.equal(err.message, 'Cannot delete an object without an objectID');
  });
});

test('deleteObject(cb)  without an objectID, with a cb', t => {
  t.plan(2);
  const createFixture = require('../../../utils/create-fixture');
  const fixture = createFixture();
  const index = fixture.index;

  index.deleteObject(err => {
    t.ok(err instanceof Error, 'received an error');
    t.equal(err.message, 'Cannot delete an object without an objectID');
  });
});
