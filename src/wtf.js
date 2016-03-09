/**
 * Return last log entries.
 * @param offset Specify the first entry to retrieve (0-based, 0 is the most recent log entry).
 * @param length Specify the maximum number of entries to retrieve starting
 * at offset. Maximum allowed value: 1000.
 * @param callback the result callback called with two arguments
 *  error: null or Error('message')
 *  content: the server answer that contains the task ID
 */
getLogs(offset, length) {
  if (arguments.length === 0 || typeof offset === 'function') {
    // getLogs([cb])
    callback = offset;
    offset = 0;
    length = 10;
  } else if (arguments.length === 1 || typeof length === 'function') {
    // getLogs(1, [cb)]
    callback = length;
    length = 10;
  }

  return this._jsonRequest({
    method: 'GET',
    url: '/1/logs?offset=' + offset + '&length=' + length,
    hostType: 'read',
    callback: callback
  });
},

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
