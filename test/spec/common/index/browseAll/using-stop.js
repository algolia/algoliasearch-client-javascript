'use strict';

const test = require('tape');

test('browser = index.browseAll(); browser.stop()', t => {
  t.plan(1);

  const fauxJax = require('faux-jax');

  const bind = require('lodash-compat/function/bind');
  const createFixture = require('../../../../utils/create-fixture');
  const fixture = createFixture();
  const index = fixture.index;

  fauxJax.install({ gzip: true });

  const browser = index.browseAll({
    hitsPerPage: 1200,
  });

  fauxJax.once('request', browse);
  browser.on('result', () => {
    // if we pass two times here then it will fail
    t.pass('We received a result event');
    browser.stop();
  });
  browser.once('end', bind(t.fail, t));
  browser.once('error', bind(t.fail, t));

  function browse(req) {
    req.respond(
      200,
      {},
      JSON.stringify({
        nbHits: 100,
        cursor: 'fslajf21rf31fé==!',
      })
    );

    fauxJax.restore();
  }
});
