'use strict';

const test = require('tape');

const requestTimeout = 5000;

// this test ensures that any created JSONP script tags is then removed
test('Request strategy clean JSONP created script tags', t => {
  const every = require('lodash-compat/collection/every');
  const fauxJax = require('faux-jax');
  const parse = require('url-parse');
  const sinon = require('sinon');

  const createFixture = require('../../../utils/create-fixture');

  const currentURL = parse(location.href);
  const fixture = createFixture({
    clientOptions: {
      hosts: [
        currentURL.host,
        currentURL.host,
        currentURL.host,
        currentURL.host,
      ],
      timeout: requestTimeout,
    },
    indexName: 'simple-JSONP-response-clean',
  });

  const index = fixture.index;

  fauxJax.install();

  const initialScriptTags = document.getElementsByTagName('script');

  // check that the current state is clean
  t.ok(
    every(
      initialScriptTags,
      script =>
        !script.src ||
        parse(script.src).pathname !== '/1/indexes/simple-JSONP-response-clean'
    ),
    'No script matches a JSONP script of the current index'
  );

  var searchCallback = sinon.spy(() => {
    t.ok(searchCallback.calledOnce, 'Callback was called once');
    t.deepEqual(
      searchCallback.args[0],
      [null, { query: 'clean script tags' }],
      'Callback called with null, {"query": "clean script tags"}'
    );

    const postCallbackScriptTags = document.getElementsByTagName('script');

    t.ok(
      every(
        postCallbackScriptTags,
        script =>
          !script.src ||
          parse(script.src).pathname !==
            '/1/indexes/simple-JSONP-response-clean'
      ),
      'No more script matches a JSONP script of the current index'
    );

    fauxJax.restore();
    t.end();
  });

  index.search('clean script tags', searchCallback);

  // send 500 to 4XHRS
  fauxJax.on('request', req => {
    req.respond(500, {}, JSON.stringify({ message: 'Try again', status: 500 }));
  });
});
