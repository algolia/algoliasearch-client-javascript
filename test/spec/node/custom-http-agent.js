'use strict';

const test = require('tape');

test('using a custom httpAgent', t => {
  t.plan(5);

  const httpProxy = require('http-proxy');
  const proxyAgent = require('proxy-agent');

  const createServer = require('../../utils/create-server');
  const proxyServer = createServer.http();
  const server = createServer.http();
  let proxyTime;
  let serverTime;

  proxyServer.once('listening', run);
  server.once('listening', run);

  let ready = 0;

  function run() {
    ready++;
    if (ready < 2) {
      return;
    }

    const proxyLocation = `http://${proxyServer.address()
      .address}:${proxyServer.address().port}`;

    const proxy = httpProxy.createProxyServer({
      target: `http://${server.address().address}:${server.address().port}`,
    });

    const createFixture = require('../../utils/create-fixture');
    const fixture = createFixture({
      clientOptions: {
        hosts: [`${server.address().address}:${server.address().port}`],
        protocol: 'http:',
        httpAgent: proxyAgent(proxyLocation),
      },
    });
    const index = fixture.index;
    index.search('YES!', (err, content) => {
      t.error(err, 'No error while receiving proxied response');
      t.deepEqual(content, { yeswe: 'proxy' }, 'Content matches');
      proxyServer.destroy();
      server.destroy();
      // no client.destroy because no destroy on the proxy-agent module
      delete process.env.HTTP_PROXY;
    });

    // https://gist.github.com/tommuhm/5653643
    proxyServer.on('request', (req, res) => {
      proxyTime = Date.now();
      t.pass('We received a proxied request');
      proxy.web(req, res);
    });

    server.on('request', (req, res) => {
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
