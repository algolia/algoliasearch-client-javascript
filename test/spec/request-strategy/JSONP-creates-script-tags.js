var test = require('tape');

var requestTimeout = 2000;

test('Request strategy creates and remove script tags when using JSONP', function(t) {
  var every = require('lodash-compat/collection/every');
  var fauxJax = require('faux-jax');
  var parse = require('url-parse');
  var sinon = require('sinon');
  var some = require('lodash-compat/collection/some');

  var createFixture = require('../../utils/create-fixture');
  var ticker = require('../../utils/ticker');

  var currentURL = parse(location.href);
  var fixture = createFixture({
    clientOptions: {
      hosts: [
        currentURL.host,
        currentURL.host,
        currentURL.host,
        currentURL.host
      ]
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
      [null, {query: 'creates script tags'}],
      'Callback called with null, {"query": "creates script tags"}'
    );

    // script tag deletion is done after calling our callback
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

    t.end();
  });

  var clock = sinon.useFakeTimers();

  index.search('creates script tags', searchCallback);

  // 4 XHR timeouts
  ticker({
    clock: clock,
    maxTicks: 4,
    tickDuration: requestTimeout,
    cb: XHRTimeoutsDone
  });

  function XHRTimeoutsDone() {
    clock.restore();

    t.equal(
      fauxJax.requests.length,
      4,
      'Four requests made'
    );

    var currentScriptTags = document.getElementsByTagName('script');

    t.equal(
      currentScriptTags.length,
      initialScriptTagsCount + 1,
      'We added one script tag'
    );

    t.ok(
      some(currentScriptTags, function noJSONPTag(script) {
        return script.src && parse(script.src).pathname === '/1/indexes/simple-JSONP-response';
      }),
      'A new script matches a JSONP script'
    );

    fauxJax.restore();
  }
});
