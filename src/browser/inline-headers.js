'use strict';

module.exports = inlineHeaders;

var encode = require('querystring').encode;

function inlineHeaders(url, headers) {
  if (/\?/.test(url)) {
    url += '&';
  } else {
    url += '?';
  }

  return url + encode(headers);
}
