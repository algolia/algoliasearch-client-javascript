module.exports = onlyPublicMethods;

function onlyPublicMethods(obj) {

  return function filter(propName) {
    // private prop/method, don't care
    if (/^_/.test(propName)) {
      return false;
    }

    if (typeof obj[propName] !== 'function') {
      return false;
    }

    return true;
  };
}
