export {
  browse,
  clear,
  copy,
  _delete as delete,
  move,
  search,
  similarSearch,
  waitTask
};

/*
 * Clear the index content. Settings and index specific API keys are kept.
 *
 */
function clear(req, indexName) {
  return req({
    method: 'POST',
    path: '/1/indexes/%s/clear',
    pathParams: [indexName]
  });
}

/**
 * Copy the index.
 *
 * @param {string} destination Name of the destination index.
 * Destination is overriden if it already exists.
 * @return {Promise}
 * @see https://www.algolia.com/doc/rest#copymove-an-index
 */
function copy(req, indexName, destination) {
  return req({
    method: 'POST',
    path: '/1/indexes/%s/operation',
    pathParams: [indexName],
    body: {operation: 'copy', destination}
  });
}

/**
 * Delete the index.
 *
 * @return {Promise}
 * @see https://www.algolia.com/doc/rest#delete-an-index
 */
function _delete(req, indexName) {
  return req({
    method: 'DELETE',
    path: '/1/indexes/%s',
    pathParams: [indexName]
  });
}

/*
 * Browse index content. The response content will have a `cursor` property that you can use
 * to browse subsequent objects using `index.browseFrom(cursor)`.
 *
 * @param {Object} params Any search parameter like query or hitsPerPage.
 * The full list of search parameters is available at https://www.algolia.com/doc/rest#full-text-search-parameters.
 * @return {Promise}
 * @see https://www.algolia.com/doc/rest#browse-all-index-content
 * @see https://www.algolia.com/doc/rest#full-text-search-parameters
 */
function browse(req, indexName, params) {
  return req({
    method: 'GET',
    path: '/1/indexes/%s/browse',
    pathParams: [indexName],
    qs: params
  });
}

/*
 * Continue browsing using a `cursor`.
 *
 * @param {string} cursor Cursor to browse from.
 * @return {Promise}
 * @see https://www.algolia.com/doc/rest#browse-all-index-content
 */
function browseFrom(req, indexName, cursor) {
  return req({
    method: 'GET',
    path: '/1/indexes/%s/browse',
    pathParams: [indexName],
    qs: {cursor}
  });
}

/**
 * Move the index to another index.
 *
 * @param {string} destination Name of the destination index.
 * Destination is overriden if it already exists.
 * @return {Promise}
 * @see https://www.algolia.com/doc/rest#copymove-an-index
 */
function move(req, indexName, destination) {
  return req({
    method: 'POST',
    path: '/1/indexes/%s/operation',
    pathParams: [indexName],
    body: {operation: 'move', destination}
  });
}

/**
 * Search in an index.
 *
 * @param {Object} params Any search parameter like `query` or `hitsPerPage`.
 * The full list of search parameters is available at https://www.algolia.com/doc/rest#full-text-search-parameters.
 * @return {Promise}
 * @see https://www.algolia.com/doc/rest#query-multiple-indexes
 * @see https://www.algolia.com/doc/rest#full-text-search-parameters
 */
function search(req, indexName, params) {
  return req({
    method: 'POST',
    path: '/1/indexes/%s/query',
    pathParams: indexName,
    body: {params},
    forceReadHosts: true
  });
}

/**
 * Search in an index, using the `similar` algorithm (BETA).
 *
 * @param {Object} params Any search parameter like `query` or `hitsPerPage`.
 * The full list of search parameters is available at https://www.algolia.com/doc/rest#full-text-search-parameters
 * @return {Promise}
 * @see https://www.algolia.com/doc/rest#query-multiple-indexes
 * @see https://www.algolia.com/doc/rest#full-text-search-parameters
 */
function similarSearch(req, indexName, params) {
  return req({
    method: 'POST',
    path: '/1/indexes/%s/query',
    pathParams: indexName,
    body: {params},
    forceReadHosts: true
  });
}

/*
 * Wait for a write task to be finished.
 *
 * @param {number} taskID The id of the task to wait for.
 */
function waitTask(req, indexName, taskID, {loop = 0, baseDelay = 250, maxDelay = 10000} = {}) {
  return req({
    method: 'GET',
    path: '/1/indexes/%s/task/%s',
    pathParams: [indexName, taskID]
  })
  .then(res => {
    if (res.status === 'published') {
      return res;
    }

    const currentLoop = loop + 1;

    const delay = new Promise(resolve =>
      setTimeout(
        resolve,
        Math.min(baseDelay * currentLoop * currentLoop, maxDelay)
      )
    );

    return delay.then(() => waitTask(req, indexName, taskID, {loop: currentLoop}));
  });
}
