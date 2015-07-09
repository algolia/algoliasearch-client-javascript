'use strict';

var test = require('tape');

test('using a custom httpAgent', function(t) {
  t.plan(5);

  var httpProxy = require('http-proxy');
  var proxyAgent = require('proxy-agent');

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

    var proxy = httpProxy.createProxyServer({
      target: 'http://' + server.address().address + ':' + server.address().port
    });

    var createFixture = require('../../utils/create-fixture');
    var fixture = createFixture({
      clientOptions: {
        hosts: [
          server.address().address + ':' + server.address().port
        ],
        protocol: 'http:',
        httpAgent: proxyAgent(proxyLocation)
      }
    });
    var index = fixture.index;
    index.search('YES!', function(err, content) {
      t.error(err, 'No error while receiving proxied response');
      t.deepEqual(content, {yeswe: 'proxy'}, 'Content matches');
      proxyServer.destroy();
      server.destroy();
      // no client.destroy because no destroy on the proxy-agent module
      delete process.env.HTTP_PROXY;
    });

    // https://gist.github.com/tommuhm/5653643
    proxyServer.on('request', function(req, res) {
      proxyTime = Date.now();
      t.pass('We received a proxied request');
      proxy.web(req, res);
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
