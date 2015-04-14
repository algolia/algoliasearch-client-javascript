// this module helps in getting the right keepalive agent based on the current
// node engine

module.exports = getKeepaliveAgent;

function getKeepaliveAgent(protocol) {
  var http = require('http');
  var https = require('https');

  var HttpsAgent = require('agentkeepalive').HttpsAgent;
  var HttpAgent = require('agentkeepalive');
  var semver = require('semver');

  var keepaliveAgent;

  if (protocol !== 'http:' && protocol !== 'https:') {
    throw new Error('get-keepalive-agent: `protocol` must be `http:` or `https:`');
  }

  // node >= 0.11.4 has good keepAlive https://github.com/joyent/node/commit/b5b841
  if (semver.satisfies(process.version, '<0.11.4')) {
    if (protocol === 'http:') {
      agent = new HttpAgent();
    } else if (protocol === 'https:') {
      agent = new HttpsAgent();
    }
  } else {
    if (protocol === 'http:') {
      agent = new http.Agent({
        keepAlive: true
      });
    } else if (protocol === 'https:') {
      agent = new https.Agent({
        keepAlive: true
      });
    }
  }

  return agent;
}
