export {
  batch,
  clearIndex,
  copyIndex,
  deleteIndex,
  listIndexes,
  moveIndex,
  search
};

/**
 * Delete an index.
 *
 * @param {string} indexName Name of the index to delete.
 * @return {Promise}
 * @see https://www.algolia.com/doc/rest#delete-an-index
 */
function deleteIndex(req, indexName) {
  return req({
    method: 'DELETE',
    path: '/1/indexes/%s',
    pathParams: [indexName]
  });
}

/**
 * Move an index.
 *
 * @param {Object} params
 * @param {string} params.source Name of the source index.
 * @param {string} params.destination Name of the destination index.
 * Destination is overriden if it already exists.
 * @return {Promise}
 * @see https://www.algolia.com/doc/rest#copymove-an-index
 */
function moveIndex(req, {source, destination}) {
  return req({
    method: 'POST',
    path: '/1/indexes/%s/operation',
    pathParams: [source],
    body: {operation: 'move', destination}
  });
}

/**
 * Copy an index.
 *
 * @param {Object} params
 * @param {string} params.source Name of the source index.
 * @param {string} params.destination Name of the destination index.
 * Destination is overriden if it already exists.
 * @return {Promise}
 * @see https://www.algolia.com/doc/rest#copymove-an-index
 */
function copyIndex(req, {source, destination}) {
  return req({
    method: 'POST',
    path: '/1/indexes/%s/operation',
    pathParams: [source],
    body: {operation: 'copy', destination}
  });
}

/*
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


/*
 * This function deletes the index content. Settings and index specific API keys are kept untouched.
 *
 * @param callback (optional) the result callback called with two arguments
 *  error: null or Error('message')
 *  content: the settings object or the error message if a failure occured
 */
function clearIndex(req, indexName) {
  return this.as._jsonRequest({
    method: 'POST',
    path: '/1/indexes/%s/clear',
    pathParams: [indexName]
  });
}
