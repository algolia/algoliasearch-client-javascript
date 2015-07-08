'use strict';

module.exports = simpleJSONPResponse;

function simpleJSONPResponse() {
  return function(req, res) {
    res.jsonp({query: req.query.query});
  };
}
