'use strict';

var test = require('tape');

test('https keepalive enabled', testProtocol('https'));

test('http keepalive enabled', testProtocol('http'));

function testProtocol(testedProtocol) {
  return function(t) {
    t.plan(1);

    var socket;

    var createServer = require('../../utils/create-server');
    var server = createServer[testedProtocol]();
    server.once('listening', run);

    function run() {
      var port = server.address().port;

      var createFixture = require('../../utils/create-fixture');
      var fixture = createFixture({
        clientOptions: {
          hosts: [
            '127.0.0.1:' + port
          ],
          protocol: testedProtocol + ':'
        }
      });
      var index = fixture.index;

      index.search('first', function() {
        index.search('second');
      });

      server.on('request', function(req, res) {
        res.writeHead(200);
        res.write('{}');
        res.end();

        if (!socket) {
          socket = req.socket;
          return;
        }

        t.ok(socket === req.socket, 'Both requests should be using the same socket');

        // because we are using keepalive, connections will..be..kept..alive
        // we must destroy the server and all connections, not just close it
        server.destroy();
      });

      server.once('error', t.fail.bind(t));
    }
  };
}
