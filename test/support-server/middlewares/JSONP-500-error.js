'use strict';

module.exports = JSONP500Error;

function JSONP500Error() {
  return function(req, res) {
    res.jsonp({status: 500, message: 'Sorry man'});
  };
}
