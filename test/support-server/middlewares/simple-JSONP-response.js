module.exports = simpleJSONPResponse;

function simpleJSONPResponse() {

  return function(req, res) {
    res.jsonp({yaw: 'JSONP'});
  };
}
