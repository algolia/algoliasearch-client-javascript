const test = require('tape');

test('Last working timeout multiplier is reused', t => {
  const fauxJax = require('faux-jax');
  fauxJax.install({ gzip: true });

  const createFixture = require('../../../utils/create-fixture');
  const baseTimeout = 20;
  const fixture = createFixture({ clientOptions: { timeout: baseTimeout } });
  const fixture2 = createFixture({
    credentials: fixture.credentials,
    clientOptions: { timeout: baseTimeout },
  });
  const fixture3 = createFixture({
    credentials: fixture.credentials,
    clientOptions: { timeout: baseTimeout },
  });

  const firstClientIndex = fixture.index;
  const secondClientIndex = fixture2.index;
  const thirdClientIndex = fixture3.index;

  const reqHandlers = [
    function(req) {
      t.pass();

      // first search, timeout
      setTimeout(() => {
        req.respond(200, {}, JSON.stringify({ search: 'first timeout' }));
      }, baseTimeout * 1.5);
    },
    function(req) {
      t.pass();

      // first search, answers
      setTimeout(() => {
        req.respond(200, {}, JSON.stringify({ search: 'first' }));
      }, baseTimeout * 1.5);
    },
    function(req) {
      t.pass();

      // second search, answers because we remember last good timeout
      setTimeout(() => {
        req.respond(200, {}, JSON.stringify({ search: 'second' }));
      }, baseTimeout * 1.5);
    },
    function(req) {
      t.pass();

      // third search, timeout, we reset timeouts after RESET_APP_DATA_TIMER
      setTimeout(() => {
        req.respond(200, {}, JSON.stringify({ search: 'third timeout' }));
      }, baseTimeout + 1);
    },
    function(req) {
      // third search, answers, we raised timeout again
      setTimeout(() => {
        req.respond(200, {}, JSON.stringify({ search: 'third' }));
      }, baseTimeout * 1.5);
    },
  ];

  let reqCount = 1;
  fauxJax.on('request', req => {
    if (reqCount > 5) {
      t.fail('Received more requests than planned');
    }
    reqHandlers[reqCount - 1](req);
    reqCount++;
  });

  firstSearch();

  function firstSearch() {
    firstClientIndex.search('one', (err, res) => {
      t.error(err, 'No error on first search');
      t.equal(res.search, 'first');
      secondSearch();
    });
  }

  function secondSearch() {
    secondClientIndex.search('two', (err, res) => {
      t.error(err, 'No error on second search');
      t.equal(res.search, 'second');
      setTimeout(thirdSearch, parseInt(process.env.RESET_APP_DATA_TIMER, 10));
    });
  }

  function thirdSearch() {
    thirdClientIndex.search('three', (err, res) => {
      t.error(err, 'No error on third search');
      t.equal(res.search, 'third');
      t.pass();
      setTimeout(() => {
        fauxJax.restore();
        t.end();
      }, baseTimeout * 4);
    });
  }
});
