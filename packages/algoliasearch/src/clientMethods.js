export {
  batch,
  getLogs,
  listIndexes,
  search
};

/**
 * Perform write requests accross multiple indexes.
 *
 * @param {Object[]} requests An array of write requests to perform.
 * @param {string} requests[].action Name of the action. Possible values:
 *  - addObject
 *  - updateObject
 *  - partialUpdateObject
 *  - partialUpdateObjectNoCreate
 *  - deleteObject
 *  - clear
 * @param {string} requests[].indexName Name of the index
 * @param {string} [requests[].body] Object or partial object.
 * @return {Promise}
 * @see https://www.algolia.com/doc/rest#batch-write-operations
 */
function batch(req, requests) {
  return req({
    method: 'POST',
    path: '/1/indexes/*/batch',
    body: {requests}
  });
}

/**
 * Return last log entries of the appId
 *
 * @param {object} [params]
 * @param {number} [params.offset] Specify the first entry to retrieve, 0 being the most
 * recent entry.
 * @param {number} [params.length] Specify the maximum number of entries to retrieve starting
 * at offset. Maximum allowed value: 1000.
 */
function getLogs(req, {offset = 0, length = 10} = {}) {
  return req({
    method: 'GET',
    path: '/1/logs',
    qs: {offset, length}
  });
}

/**
 * List all existing indexes.
 *
 * @param {number} [page] The page to retrieve. If you do not use the page parameter,
 * you will get the whole list of indexes in one response. When provided,
 * you will get batches of 100 indexes per page. Pagination starts at 0.
 * @return {Promise}
 * @see https://www.algolia.com/doc/rest#list-indexes
 */
function listIndexes(req, page) {
  return req({
    method: 'GET',
    path: '/1/indexes',
    qs: {page}
  });
}

/**
 * Search through multiple indices at the same time.
 *
 * @param {Object[]} requests An array of queries you want to run.
 * @param {string} requests[].indexName The index name you want to target.
 * @param {Object} requests[].params Any search parameter like `query` or `hitsPerPage`.
 * The full list of search parameters is available at https://www.algolia.com/doc/rest#full-text-search-parameters
 * @return {Promise}
 * @see https://www.algolia.com/doc/rest#query-multiple-indexes
 * @see https://www.algolia.com/doc/rest#full-text-search-parameters
 */
function search(req, requests) {
  return req({
    method: 'POST',
    path: '/1/indexes/*/queries',
    body: {requests},
    forceReadHosts: true
  });
}
