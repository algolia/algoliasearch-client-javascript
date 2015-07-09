'use strict';

var bulkRequire = require('bulk-require');
var compression = require('compression');
var express = require('express');
var forEach = require('lodash/collection/forEach');
var http = require('http');
var logger = require('morgan');
var path = require('path');

var app = express();

app.use(compression());

app.use(logger('dev'));

app.set('etag', false);

app.use(express.static(path.join(__dirname, '..', '..')));

app.use(function noCache(req, res, next) {
  res.set('Cache-Control', 'max-age=0, no-cache');
  res.set('Expires', (new Date(0)).toUTCString());

  next();
});

var middlewares = bulkRequire(path.join(__dirname, 'middlewares'), '*.js');

forEach(middlewares, function useIt(middleware, mountPoint) {
  app.use('/1/indexes/' + mountPoint, middleware());
});

var server = http.createServer(app);

server.listen(process.env.ZUUL_PORT);
