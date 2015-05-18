// This file hosts our error definitions
// We use custom error "types" so that we can act on them when we need it
// e.g.: if error instanceof errors.UnparsableJSON then..

var foreach = require('foreach');
var inherits = require('inherits');

function AlgoliaSearchError(message, extraProperties) {
  var error = this;

  if (typeof Error.captureStackTrace === 'function') {
    Error.captureStackTrace(this, this.constructor);
  }

  this.name = this.constructor.name;
  this.message = message || 'Unknown error';

  if (extraProperties) {
    foreach(extraProperties, function addToErrorObject(value, key) {
      error[key] = value;
    });
  }
}

inherits(AlgoliaSearchError, Error);

function createCustomError(name, message) {
  function AlgoliaSearchCustomError() {
    var args = Array.prototype.slice.call(arguments, 0);

    // custom message not set, use default
    if (typeof args[0] !== 'string') {
      args.unshift(message);
    }

    AlgoliaSearchError.apply(this, args);
    this.name = 'AlgoliaSearch' + name + 'Error';
  }

  inherits(AlgoliaSearchCustomError, AlgoliaSearchError);

  return AlgoliaSearchCustomError;
}

// late exports to let various fn defs and inherits take place
module.exports = {
  AlgoliaSearchError: AlgoliaSearchError,
  UnparsableJSON: createCustomError(
    'UnparsableJSON',
    'Could not parse the incoming response as JSON, see err.more for details'
  ),
  RequestTimeout: createCustomError(
    'RequestTimeout',
    'Request timedout before getting a response'
  ),
  Network: createCustomError(
    'Network',
    'Network issue, see err.more for details'
  ),
  JSONP: createCustomError(
    'JSONP',
    'JSONP failed'
  ),
  Unknown: createCustomError(
    'Unknown',
    'Unknown error occured'
  )
};
