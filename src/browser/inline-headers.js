'use strict';

module.exports = inlineHeaders;

const encode = require('querystring-es3/encode');

function inlineHeaders(url, headers) {
  const joiner = /\?/.test(url) ? '&' : '?';

  return url + joiner + encode(headers);
}
