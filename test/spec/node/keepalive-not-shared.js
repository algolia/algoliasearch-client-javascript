'use strict';

var test = require('tape');

// do not share keepalive agent between requests
// because we want to expose a client.destroy() that will destroy
// the client's http Agent
test('keepalive agent is not shared between clients', function(t) {
  t.plan(1);

  var createServer = require('../../utils/create-server');

  var server = createServer.http();
  server.once('listening', run);

  function run() {
    var createFixture = require('../../utils/create-fixture');
    var port = server.address().port;
    var opts = {
      clientOptions: {
        hosts: [
          '127.0.0.1:' + port
        ],
        protocol: 'http:'
      }
    };
    var socket;

    var index1 = createFixture(opts).index;
    var index2 = createFixture(opts).index;

    index1.search('well').then(function() {
      return index2.search('hey');
    }).catch(t.fail.bind(t, 'Error while calling `.search`'));

    server.on('request', function(req, res) {
      res.writeHead(200);
      res.write('{}');
      res.end();

      if (!socket) {
        socket = req.socket;
        return;
      }

      t.notEqual(socket, req.socket, 'Requests should have different sockets');

      // because we are using keepalive, connections will..be..kept..alive
      // we must destroy the server and all connections, not just close it
      server.destroy();
    });
  }
});
