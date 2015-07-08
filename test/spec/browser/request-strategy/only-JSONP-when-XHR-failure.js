'use strict';

var test = require('tape');

test('Request strategy uses only JSONP if one XHR fails', function(t) {
  t.plan(4);

  var fauxJax = require('faux-jax');
  var parse = require('url-parse');
  var sinon = require('sinon');

  var createFixture = require('../../../utils/create-fixture');

  var currentURL = parse(location.href);
  var fixture = createFixture({
    clientOptions: {
      hosts: [
        currentURL.host
      ],
      timeout: 5000
    },
    indexName: 'simple-JSONP-response'
  });

  var index = fixture.index;

  fauxJax.install();

  fauxJax.once('request', function(req) {
    fauxJax.restore();
    req.onerror();
  });

  var secondCallback = sinon.spy(function() {
    t.ok(
      secondCallback.calledOnce,
      'Second callback called once'
    );

    t.deepEqual(
      secondCallback.args[0],
      [null, {query: 'second'}],
      'Second callback called with null, {"query": "second"}'
    );
  });

  var firstCallback = sinon.spy(function() {
    t.ok(
      firstCallback.calledOnce,
      'First callback called once'
    );

    t.deepEqual(
      firstCallback.args[0],
      [null, {query: 'first'}],
      'First callback called with null, {"query": "first"}'
    );

    index.search('second', secondCallback);
  });

  index.search('first', firstCallback);
});
