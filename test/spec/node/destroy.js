'use strict';

const test = require('tape');

test('client.destroy()', t => {
  t.plan(2);
  t.timeoutAfter(5000);

  const createFixture = require('../../utils/create-fixture');
  const createServer = require('../../utils/create-server');

  const server = createServer.http();
  server.once('listening', run);

  function run() {
    const port = server.address().port;

    const fixture = createFixture({
      clientOptions: {
        hosts: [`127.0.0.1:${port}`],
        protocol: 'http:',
      },
    });

    const index = fixture.index;
    const client = fixture.client;

    server.once('request', (req, res) => {
      res.writeHead(200);
      res.write('{}');
      res.end();
    });

    index.search('well').then(() => {
      t.doesNotThrow(
        client.destroy.bind(client),
        'client.destroy() does not throws'
      );

      // if client.destroy was not destroying all connections,
      // this test would timeout because server would never close
      server.once('close', () => {
        t.pass('Server closed properly');
      });
      server.close();
    });
  }
});
