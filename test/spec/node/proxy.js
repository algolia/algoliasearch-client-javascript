'use strict';

var test = require('tape');

test('when using a proxy', function(t) {
  t.plan(5);

  var net = require('net');
  var url = require('url');

  var createServer = require('../../utils/create-server');
  var proxyServer = createServer.http();
  var server = createServer.http();
  var proxyTime;
  var serverTime;

  proxyServer.once('listening', run);
  server.once('listening', run);

  var ready = 0;

  function run() {
    ready++;
    if (ready < 2) {
      return;
    }

    var proxyLocation = 'http://' +
      proxyServer.address().address + ':' +
      proxyServer.address().port;

    // proxyServer and server are listening
    process.env.HTTP_PROXY = proxyLocation;

    var createFixture = require('../../utils/create-fixture');
    var fixture = createFixture({
      clientOptions: {
        hosts: [
          server.address().address + ':' + server.address().port
        ],
        protocol: 'http:'
      }
    });
    var client = fixture.client;
    var index = fixture.index;
    index.search('YES!', function(err, content) {
      t.error(err, 'No error while receiving proxied response');
      t.deepEqual(content, {yeswe: 'proxy'}, 'Content matches');
      proxyServer.destroy();
      server.destroy();
      client.destroy();
      delete process.env.HTTP_PROXY;
    });

    // https://gist.github.com/tommuhm/5653643
    proxyServer.on('connect', function(req, proxySocket) {
      proxyTime = Date.now();
      t.pass('We received a proxied request');
      var serverUrl = url.parse('http://' + req.url);
      var serverSocket = net.connect(serverUrl.port, serverUrl.hostname, function() {
        proxySocket.write('HTTP/1.1 200 Connection Established\r\n\r\n');
        serverSocket.pipe(proxySocket);
        proxySocket.pipe(serverSocket);
      });
      serverSocket.on('error', function() {
        // ignore ECONNRESET errors
      });
    });

    server.on('request', function(req, res) {
      serverTime = Date.now();
      t.pass('Request was proxied through our servers');
      t.ok(
        serverTime > proxyTime,
        'Request on server was received after the proxy received it (fail check)'
      );
      res.writeHead(200);
      res.write('{"yeswe": "proxy"}');
      res.end();
    });
  }
});
