'use strict';

module.exports = {
  http: createHttpServer,
  https: createHttpsServer
};

function createHttpsServer() {
  // we are using a self signed certificate for our test https server
  // let's ignore nodejs errors on it
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  var https = require('https');
  var enableDestroy = require('server-destroy');
  var generate = require('self-signed');
  var pems = generate({
    name: 'localhost',
    city: 'Paris',
    state: 'IDF',
    organization: 'Test',
    unit: 'Test'
  });

  var server = https.createServer({
    key: pems.private,
    cert: pems.cert
  });

  server.listen(0, '127.0.0.1');
  enableDestroy(server);
  server.once('close', function restoreSelfSignedFlag() {
    delete process.env.NODE_TLS_REJECT_UNAUTHORIZED;
  });
  return server;
}

function createHttpServer() {
  var http = require('http');
  var enableDestroy = require('server-destroy');
  var server = http.createServer();
  server.listen(0, '127.0.0.1');
  enableDestroy(server);
  return server;
}
