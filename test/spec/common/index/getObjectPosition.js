'use strict';

var test = require('tape');
var createFixture = require('../../../utils/create-fixture');
var index = createFixture().index;

var hits = [
  {company: 'Algolia', name: 'Julien Lemoine', objectID: 'julien-lemoine'},
  {company: 'Algolia', name: 'Nicolas Dessaigne', objectID: 'nicolas-dessaigne'},
  {company: 'Amazon', name: 'Jeff Bezos'},
  {company: 'Arista Networks', name: 'Jayshree Ullal'},
  {company: 'Google', name: 'Larry Page'},
  {company: 'Google', name: 'Rob Pike'}
];

test('getObjectPosition: find position 0', function(t) {
  t.plan(1);

  t.same(index.getObjectPosition({hits: hits}, 'julien-lemoine'), 0);
});

test('getObjectPosition: find position 1', function(t) {
  t.plan(1);

  t.same(index.getObjectPosition({hits: hits}, 'nicolas-dessaigne'), 1);
});

test('getObjectPosition: find no position', function(t) {
  t.plan(1);

  t.same(index.getObjectPosition({hits: hits}, 'foooo'), -1);
});
