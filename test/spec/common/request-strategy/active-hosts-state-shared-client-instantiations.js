var test = require('tape');

test('When not using custom hosts, active hosts state is shared amongst client instantiations', function(t) {
  var fauxJax = require('faux-jax');
  var parse = require('url-parse');
  fauxJax.install({gzip: true});

  var createFixture = require('../../../utils/create-fixture');
  var fixture = createFixture();
  var fixture2 = createFixture({
    credentials: fixture.credentials
  });
  var fixture3 = createFixture({
    credentials: fixture.credentials
  });

  var credentials = fixture.credentials;
  var failingHost = credentials.applicationID.toLowerCase() + '-dsn.algolia.net';
  var workingHost;
  var firstClientIndex = fixture.index;
  var secondClientIndex = fixture2.index;
  var thirdClientIndex = fixture3.index;

  var reqHandlers = [function(req) {
    t.equal(
      parse(req.requestURL).hostname,
      failingHost,
      'First client, first search, first request done on ' + failingHost
    );

    // simulate network error
    req.respond(500, {}, JSON.stringify({}));
  }, function(req) {
    workingHost = parse(req.requestURL).hostname;
    t.notEqual(
      workingHost,
      failingHost,
      'First client, first search, second request not done on ' + failingHost
    );
    req.respond(200, {}, JSON.stringify({message: 'First client, first search, second request'}));
  }, function(req) {
    t.equal(
      parse(req.requestURL).hostname,
      workingHost,
      'Second client, first search, first request done on ' + workingHost
    );
    req.respond(200, {}, JSON.stringify({message: 'Second client, first search, first request'}));
  }, function(req) {
    // after RESET_TO_FIRST_HOST_TIMER, we should try again the failing host
    t.equal(
      parse(req.requestURL).hostname,
      failingHost,
      'Third client, first search, first request done on ' + failingHost
    );
    req.respond(200, {}, JSON.stringify({message: 'Third client, first search, first request'}));
  }];

  var reqCount = 1;
  fauxJax.on('request', function(req) {
    if (reqCount > 4) {
      t.fail('Received more requests than planned');
    }
    console.log(reqCount, 'count');
    reqHandlers[reqCount - 1](req);
    reqCount++;
  });

  firstSearch();

  function firstSearch() {
    firstClientIndex
      .search('one', function(err, res) {
        t.error(err, 'No error on first search');
        t.deepEqual(res,
          {
            message: 'First client, first search, second request'
          },
          'First client, first search receives right message'
        );
        secondSearch();
      });
  }

  function secondSearch() {
    secondClientIndex.search('two', function(err, res) {
      t.error(err, 'No error on second search');
      t.deepEqual(res,
        {
          message: 'Second client, first search, first request'
        },
        'Second client, first search receives right message'
      );
      setTimeout(thirdSearch, parseInt(process.env.RESET_TO_FIRST_HOST_TIMER, 10));
    });
  }

  function thirdSearch() {
    thirdClientIndex.search('three', function(err, res) {
      t.error(err, 'No error on third search');
      t.deepEqual(res,
        {
          message: 'Third client, first search, first request'
        },
        'Third client, first search receives right message'
      );
      fauxJax.restore();
      t.end();
    });
  }
});
