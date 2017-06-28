'use strict';

module.exports = getDocumentProtocol;

function getDocumentProtocol() {
  let protocol = window.document.location.protocol;

  // when in `file:` mode (local html file), default to `http:`
  if (protocol !== 'http:' && protocol !== 'https:') {
    protocol = 'http:';
  }

  return protocol;
}
