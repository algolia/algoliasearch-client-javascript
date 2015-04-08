var test = require('tape');

var servers = {
  http: createHttpServer,
  https: createHttpsServer
};

test('https keepalive enabled', testProtocol('https'));

test('http keepalive enabled', testProtocol('http'));

function testProtocol(testedProtocol) {
  return function(t) {
    t.plan(1);

    if (testedProtocol === 'https') {
      // we are using a self signed certificate for our test https server
      // let's ignore nodejs errors on it
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    }

    var socket;
    var connections = [];

    var server = servers[testedProtocol]();
    server.on('listening', function() {
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

      server.on('connection', function(conn) {
        connections.push(conn);
      });

      server.on('request', function(req, res) {
        res.writeHead(200);
        res.write('{}');
        res.end();

        if (!socket) {
          socket = req.socket;
          return;
        }

        t.equal(socket, req.socket, 'Both requests should be using the same socket');

        connections.forEach(function destroyIt(conn) {
          conn.destroy();
        });
        server.close();

        if (testedProtocol === 'https') {
          delete process.env.NODE_TLS_REJECT_UNAUTHORIZED;
        }
      });

      server.once('error', t.fail.bind(t));
    });
  };
}

function createHttpsServer() {
  var https = require('https');
  var generate = require('self-signed');
  var pems = generate({
    name: 'localhost',
    city: 'Paris',
    state: 'IDF',
    organization: 'Test',
    unit: 'Test'
  }, {
    alt: ['127.0.0.1']
  });

  var server = https.createServer({
    key: pems.private,
    cert: pems.cert
  });

  server.listen(0, 'localhost');
  return server;
}

function createHttpServer() {
  var http = require('http');
  var server = http.createServer();
  server.listen(0, 'localhost');
  return server;
}
