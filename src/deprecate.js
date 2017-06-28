/* eslint-disable prefer-rest-params */
module.exports = function deprecate(fn, message) {
  let warned = false;

  function deprecated() {
    if (!warned) {
      console.log(message); // eslint-disable-line no-console
      warned = true;
    }

    return fn.apply(this, arguments);
  }

  return deprecated;
};
