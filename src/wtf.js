/**
* Set the number of milliseconds a request can take before automatically being terminated.
*
* @param {Number} milliseconds
*/
setRequestTimeout(milliseconds) {
  if (milliseconds) {
    this.requestTimeout = parseInt(milliseconds, 10);
  }
},
