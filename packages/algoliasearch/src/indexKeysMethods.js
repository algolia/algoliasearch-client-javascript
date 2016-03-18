import * as keysMethods from './keysMethods.js';

export {
  get,
  _delete as delete,
  save,
  list
};

function get(...args) {
  return keysMethods.get(...args);
}

function _delete(...args) {
  return keysMethods.delete(...args);
}

function save(...args) {
  return keysMethods.save(...args);
}

function list(...args) {
  return keysMethods.list(...args);
}
