module.exports = onlyPublicProperties;

function onlyPublicProperties(propName) {
  // private prop/method, don't care
  if (/^_/.test(propName)) {
    return false;
  }

    return true;
}
