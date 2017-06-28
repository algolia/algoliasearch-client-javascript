'use strict';

const test = require('tape');

test('index.search(cb, params)', t => {
  t.plan(1);
  const bind = require('lodash-compat/function/bind');

  const createFixture = require('../../../../utils/create-fixture');
  const fixture = createFixture();
  const index = fixture.index;

  const badCall = bind(index.search, index, () => {}, {
    page: 10,
  });

  t.throws(badCall, Error, 'Calling index.search(cb, params) throws');
});

test('index.search(query, callback, params)', t => {
  t.plan(1);
  const bind = require('lodash-compat/function/bind');

  const createFixture = require('../../../../utils/create-fixture');
  const fixture = createFixture();
  const index = fixture.index;

  const badCall = bind(index.search, index, '', () => {}, {
    page: 10,
  });

  t.throws(badCall, Error, 'Calling index.search(query, cb, params) throws');
});
