'use strict';

// this module will either get a regular http keepalive agent or
// a proxying agent if `HTTP_PROXY` or `HTTPS_PROXY` environment variables
// are set
// request/request module could have been used but it does not do any
// keepalive on POST requests https://github.com/request/request/issues/236#issuecomment-94587587

module.exports = getAgent;

function getAgent(protocol) {
  let agent;

  if (protocol !== 'http:' && protocol !== 'https:') {
    throw new Error('get-agent: `protocol` must be `http:` or `https:`');
  }

  const parsedProxy = getParsedProxy();

  if (parsedProxy.protocol) {
    agent = getProxyingAgent(protocol, parsedProxy);
  } else {
    // no proxy given, let's use regular keepalived agents
    agent = getKeepaliveAgent(protocol);
  }

  return agent;
}

function getParsedProxy() {
  const url = require('url');
  const proxy = process.env.HTTP_PROXY || process.env.HTTPS_PROXY || '';

  return url.parse(proxy);
}

function getKeepaliveAgent(protocol) {
  const http = require('http');
  const https = require('https');

  const HttpsAgent = require('agentkeepalive').HttpsAgent;
  const HttpAgent = require('agentkeepalive');
  const semver = require('semver');

  let keepAliveAgent;

  // node 0.10 => agentkeepalive
  // node >= 0.12 => native keepalive
  // iojs => native keepalive
  // node >= 0.11.4 has good keepAlive https://github.com/joyent/node/commit/b5b841
  if (semver.satisfies(process.version, '<0.11.4')) {
    if (protocol === 'http:') {
      keepAliveAgent = new HttpAgent({
        maxSockets: Infinity,
      });
    } else if (protocol === 'https:') {
      keepAliveAgent = new HttpsAgent({
        maxSockets: Infinity,
      });
    }
  } else if (protocol === 'http:') {
    keepAliveAgent = new http.Agent({
      keepAlive: true,
      maxSockets: Infinity,
    });
  } else if (protocol === 'https:') {
    keepAliveAgent = new https.Agent({
      keepAlive: true,
      maxSockets: Infinity,
    });
  }

  return keepAliveAgent;
}

function getProxyingAgent(protocol, parsedProxy) {
  const tunnel = require('tunnel-agent');

  const agentSettings = {
    maxSockets: Infinity,
    proxy: {
      host: parsedProxy.hostname,
      port: parseInt(parsedProxy.port, 10),
      proxyAuth: parsedProxy.auth,
    },
  };

  // httpOverHttps
  // httpsOverHttps
  // https://github.com/mikeal/tunnel-agent/blob/912a7a6d00e10ec76baf9c9369de280fa5badef3/index.js#L12-L15
  const tunnelType = `${protocol.replace(
    ':',
    ''
  )}Over${parsedProxy.protocol.replace(':', '').replace('h', 'H')}`;

  const agent = new tunnel[tunnelType](agentSettings);

  // `tunnel-agent` does not have a destroy method
  agent.destroy = function() {
    this.sockets.forEach(socket => {
      socket.destroy();
    });
  };

  return agent;
}
