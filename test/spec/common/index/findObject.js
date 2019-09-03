'use strict';

var test = require('tape');
var fauxJax = require('faux-jax');
var bind = require('lodash-compat/function/bind');

var createFixture = require('../../../utils/create-fixture');
var fixture = createFixture();

var hits = [
  {company: 'Algolia', name: 'Julien Lemoine', objectID: 'julien-lemoine'},
  {company: 'Algolia', name: 'Nicolas Dessaigne', objectID: 'nicolas-dessaigne'},
  {company: 'Amazon', name: 'Jeff Bezos'},
  {company: 'Arista Networks', name: 'Jayshree Ullal'},
  {company: 'Google', name: 'Larry Page'},
  {company: 'Google', name: 'Rob Pike'},
  {company: 'Google', name: 'Serguey Brin'},
  {company: 'Apple', name: 'Steve Jobs'},
  {company: 'Apple', name: 'Steve Wozniak'},
  {company: 'Microsoft', name: 'Bill Gates'},
  {company: 'SpaceX', name: 'Elon Musk'},
  {company: 'Tesla', name: 'Elon Musk'},
  {company: 'Yahoo', name: 'Marissa Mayer'}
];

fauxJax.install();

test('findObject: no object was found when callback always return false', function(t) {
  var index = fixture.index;
  t.plan(1);

  fauxJax.once('request', function(req) {
    req.respond(
      200,
      {},
      JSON.stringify({
        hits: hits,
        nbPages: 1
      })
    );
  });

  index
    .findObject(function() {
      return false;
    })
    .then(bind(t.fail, t))
    .catch(function(error) {
      t.same(error, {
        name: 'AlgoliaSearchObjectNotFoundError',
        message: 'Object not found'
      });
    });
});

test('findObject: the first object is returned with a `position=0` and `page=0`', function(t) {
  var index = fixture.index;
  t.plan(1);

  fauxJax.once('request', function(req) {
    req.respond(
      200,
      {},
      JSON.stringify({
        hits: hits,
        nbPages: 1
      })
    );
  });

  index
    .findObject(function() {
      return true;
    })
    .then(function(result) {
      t.same(result, {
        object: {company: 'Algolia', name: 'Julien Lemoine', objectID: 'julien-lemoine'},
        position: 0,
        page: 0
      });
    })
    .catch(bind(t.fail, t));
});

test('findObject: object not found with non matching query', function(t) {
  var index = fixture.index;
  t.plan(1);

  fauxJax.once('request', function(req) {
    req.respond(
      200,
      {},
      JSON.stringify({
        hits: hits.filter(function(hit) {
          return hit.company === 'Algolia';
        }),
        nbPages: 1
      })
    );
  });

  index
    .findObject(function(hit) {
      return hit.company === 'Apple';
    }, {
      query: 'Algolia'
    })
    .then(bind(t.fail, t))
    .catch(function(error) {
      t.same(error, {
        name: 'AlgoliaSearchObjectNotFoundError',
        message: 'Object not found'
      });
    });
});

test('findObject: object not found without pagination', function(t) {
  var index = fixture.index;
  t.plan(1);

  var page = 0;
  fauxJax.once('request', function(req) {
    req.respond(
      200,
      {},
      JSON.stringify({
        hits: hits.slice(0, page * 5),
        nbPages: 3
      })
    );

    page++;
  });

  index
    .findObject(function(hit) {
      return hit.company === 'Apple';
    }, {
      query: '',
      paginate: false
    })
    .then(bind(t.fail, t))
    .catch(function(error) {
      t.same(error, {
        name: 'AlgoliaSearchObjectNotFoundError',
        message: 'Object not found'
      });
    });
});

test('findObject: object found with pagination', function(t) {
  var index = fixture.index;
  t.plan(1);

  var page = 0;
  fauxJax.on('request', function(req) {
    req.respond(
      200,
      {},
      JSON.stringify({
        hits: hits.slice(0, page * 5),
        nbPages: 3
      })
    );

    page++;
  });

  index
    .findObject(function(hit) {
      return hit.company === 'Apple';
    }, {
      query: '',
      paginate: true
    })
    .then(function(result) {
      t.same(result, {
        object: {company: 'Apple', name: 'Steve Jobs'},
        position: 7,
        page: 2
      });
    })
    .catch(t.fail, t);
});
