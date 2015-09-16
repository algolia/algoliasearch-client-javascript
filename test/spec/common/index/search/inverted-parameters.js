'use strict';

var test = require('tape');

test('index.search(cb, params)', function(t) {
  t.plan(1);
  var bind = require('lodash/function/bind');

  var createFixture = require('../../../../utils/create-fixture');
  var fixture = createFixture();
  var index = fixture.index;

  var badCall = bind(index.search, index, function() {}, {
    page: 10
  });

  t.throws(badCall, Error, 'Calling index.search(cb, params) throws');
});

test('index.search(query, callback, params)', function(t) {
  t.plan(1);
  var bind = require('lodash/function/bind');

  var createFixture = require('../../../../utils/create-fixture');
  var fixture = createFixture();
  var index = fixture.index;

  var badCall = bind(index.search, index, '', function() {}, {
    page: 10
  });

  t.throws(badCall, Error, 'Calling index.search(query, cb, params) throws');
});
