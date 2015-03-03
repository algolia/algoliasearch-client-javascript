var bulkRequire = require('bulk-require');
var express = require('express');
var forEach = require('lodash/collection/forEach');
var http = require('http');
var path = require('path');

var app = express();

var middlewares = bulkRequire(path.join(__dirname, 'middlewares'), '*.js');

forEach(middlewares, function useIt(middleware, mountPoint) {
  app.use('/1/indexes/' + mountPoint, middleware());
});

var server = http.createServer(app);

server.listen(process.env.ZUUL_PORT);
