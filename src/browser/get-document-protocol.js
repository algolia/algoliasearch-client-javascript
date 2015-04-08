module.exports = getDocumentProtocol;

function getDocumentProtocol() {
  var protocol = global.document.location.protocol;

  // when in `file:` mode (local html file), default to `http:`
  if (protocol !== 'http:' && protocol !== 'https:') {
    protocol = 'http:';
  }

  return protocol;
}
