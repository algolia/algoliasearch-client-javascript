'use strict';

const test = require('tape');

test('index.browseAll(query, queryParameters)', t => {
  t.plan(6);

  const fauxJax = require('faux-jax');
  const parse = require('url-parse');

  const bind = require('lodash-compat/function/bind');
  const createFixture = require('../../../../utils/create-fixture');
  const fixture = createFixture();
  const index = fixture.index;

  fauxJax.install({ gzip: true });

  const browser = index.browseAll('some', {
    hitsPerPage: 200,
  });

  browser.once('result', firstResult);
  fauxJax.once('request', firstBrowse);
  browser.once('end', end);
  browser.once('error', bind(t.fail, t));

  function firstBrowse(req) {
    const parsedURL = parse(req.requestURL, true);

    t.equal(
      parsedURL.pathname,
      `/1/indexes/${encodeURIComponent(fixture.credentials.indexName)}/browse`,
      'pathname matches'
    );
    t.deepEqual(
      JSON.parse(req.requestBody),
      { params: 'hitsPerPage=200&query=some' },
      'params matches'
    );

    req.respond(
      200,
      {},
      JSON.stringify({
        nbHits: 100,
        cursor: 'fslajf21rf31fé==!',
      })
    );

    fauxJax.once('request', secondBrowse);
  }

  function secondBrowse(req) {
    t.deepEqual(
      JSON.parse(req.requestBody),
      { cursor: 'fslajf21rf31fé==!' },
      'cursor matches'
    );

    req.respond(
      200,
      {},
      JSON.stringify({
        nbHits: 300,
      })
    );

    fauxJax.restore();
  }

  function firstResult(content) {
    t.equal(content.nbHits, 100, 'first result matches');
    browser.once('result', secondResult);
  }

  function secondResult(content) {
    t.equal(content.nbHits, 300, 'second result matches');
  }

  function end() {
    t.pass('we got an end event');
  }
});
