'use strict';

module.exports = {
  http: createHttpServer,
  https: createHttpsServer,
};

function createHttpsServer() {
  // we are using a self signed certificate for our test https server
  // let's ignore nodejs errors on it
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  const https = require('https');
  const enableDestroy = require('server-destroy-vvo');
  const generate = require('self-signed');
  const pems = generate({
    name: 'localhost',
    city: 'Paris',
    state: 'IDF',
    organization: 'Test',
    unit: 'Test',
  });

  const server = https.createServer({
    key: pems.private,
    cert: pems.cert,
  });

  server.listen(0, '127.0.0.1');
  enableDestroy(server);
  server.once('close', () => {
    delete process.env.NODE_TLS_REJECT_UNAUTHORIZED;
  });
  return server;
}

function createHttpServer() {
  const http = require('http');
  const enableDestroy = require('server-destroy-vvo');
  const server = http.createServer();
  server.listen(0, '127.0.0.1');
  enableDestroy(server);
  return server;
}
