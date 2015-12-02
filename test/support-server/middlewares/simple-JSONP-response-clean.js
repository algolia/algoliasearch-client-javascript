'use strict';

module.exports = simpleJSONPResponseClean;

function simpleJSONPResponseClean() {
  return function(req, res) {
    res.jsonp({query: req.query.query});
  };
}
