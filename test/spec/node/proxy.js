'use strict';

const test = require('tape');

test('when using a proxy', t => {
  t.plan(5);

  const net = require('net');
  const url = require('url');

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

    // proxyServer and server are listening
    process.env.HTTP_PROXY = proxyLocation;

    const createFixture = require('../../utils/create-fixture');
    const fixture = createFixture({
      clientOptions: {
        hosts: [`${server.address().address}:${server.address().port}`],
        protocol: 'http:',
      },
    });
    const client = fixture.client;
    const index = fixture.index;
    index.search('YES!', (err, content) => {
      t.error(err, 'No error while receiving proxied response');
      t.deepEqual(content, { yeswe: 'proxy' }, 'Content matches');
      proxyServer.destroy();
      server.destroy();
      client.destroy();
      delete process.env.HTTP_PROXY;
    });

    // https://gist.github.com/tommuhm/5653643
    proxyServer.on('connect', (req, proxySocket) => {
      proxyTime = Date.now();
      t.pass('We received a proxied request');
      const serverUrl = url.parse(`http://${req.url}`);
      var serverSocket = net.connect(serverUrl.port, serverUrl.hostname, () => {
        proxySocket.write('HTTP/1.1 200 Connection Established\r\n\r\n');
        serverSocket.pipe(proxySocket);
        proxySocket.pipe(serverSocket);
      });
      serverSocket.on('error', () => {
        // ignore ECONNRESET errors
      });
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
