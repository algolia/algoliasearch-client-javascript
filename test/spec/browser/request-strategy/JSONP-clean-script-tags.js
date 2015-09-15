'use strict';

var test = require('tape');

var requestTimeout = 5000;

// this test ensures that any created JSONP script tags is then removed
test('Request strategy clean JSONP created script tags', function(t) {
  var every = require('lodash/collection/every');
  var fauxJax = require('faux-jax');
  var parse = require('url-parse');
  var sinon = require('sinon');

  var createFixture = require('../../../utils/create-fixture');

  var currentURL = parse(location.href);
  var fixture = createFixture({
    clientOptions: {
      hosts: [
        currentURL.host,
        currentURL.host,
        currentURL.host,
        currentURL.host
      ],
      timeout: requestTimeout
    },
    indexName: 'simple-JSONP-response'
  });

  var index = fixture.index;

  fauxJax.install();

  var initialScriptTags = document.getElementsByTagName('script');
  var initialScriptTagsCount = initialScriptTags.length;

  // check that the current state is clean
  t.ok(
    every(initialScriptTags, function noJSONPTag(script) {
      return !script.src ||
        parse(script.src).pathname !== '/1/indexes/simple-JSONP-response';
    }),
    'No script matches a JSONP script'
  );

  var searchCallback = sinon.spy(function() {
    t.ok(searchCallback.calledOnce, 'Callback was called once');
    t.deepEqual(
      searchCallback.args[0],
      [null, {query: 'clean script tags'}],
      'Callback called with null, {"query": "clean script tags"}'
    );

    var postCallbackScriptTags = document.getElementsByTagName('script');

    t.equal(
      postCallbackScriptTags.length,
      initialScriptTagsCount,
      'Script tag count back to previous'
    );

    t.ok(
      every(postCallbackScriptTags, function noJSONPTag(script) {
        return !script.src ||
          parse(script.src).pathname !== '/1/indexes/simple-JSONP-response';
      }),
      'No more script matches a JSONP script'
    );

    fauxJax.restore();
    t.end();
  });

  index.search('clean script tags', searchCallback);

  // send 500 to 4XHRS
  fauxJax.on('request', function(req) {
    req.respond(500, {}, JSON.stringify({message: 'Try again', status: 500}));
  });
});
