'use strict';

var test = require('tape');

test('client.destroy()', function(t) {
  t.plan(2);
  t.timeoutAfter(5000);

  var createFixture = require('../../utils/create-fixture');
  var createServer = require('../../utils/create-server');

  var server = createServer.http();
  server.once('listening', run);

  function run() {
    var port = server.address().port;

    var fixture = createFixture({
      clientOptions: {
        hosts: [
          '127.0.0.1:' + port
        ],
        protocol: 'http:'
      }
    });

    var index = fixture.index;
    var client = fixture.client;

    server.once('request', function(req, res) {
      res.writeHead(200);
      res.write('{}');
      res.end();
    });

    index.search('well').then(function() {
      t.doesNotThrow(client.destroy.bind(client), 'client.destroy() does not throws');

      // if client.destroy was not destroying all connections,
      // this test would timeout because server would never close
      server.once('close', function() {
        t.pass('Server closed properly');
      });
      server.close();
    });
  }
});
