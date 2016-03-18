export {
  _delete as delete,
  get,
  partialUpdate,
  save
};

/*
 * Delete one or multiple objects from an index.
 *
 * @param {(string|string[])} objectID Unique identifier of the object to delete.
 * Pass an array of objectIDs if you want to delete multiple objects at the same time.
 *  content: the server answer that contains 3 elements: createAt, taskId and objectID
 * @return {Promise}
 * @see https://www.algolia.com/doc/rest#delete-an-object
 * @see https://www.algolia.com/doc/rest#batch-write-operations
 */
function _delete(req, indexName, objectID) {
  if (!Array.isArray(objectID)) {
    return req({
      method: 'DELETE',
      path: '/1/indexes/%s/%s',
      pathParams: [indexName, objectID]
    });
  }

  return req({
    method: 'POST',
    path: '/1/indexes/%s/batch',
    pathParams: [indexName],
    body: {
      requests: objectID.map(id => ({
        action: 'deleteObject',
        objectID: id
      }))
    }
  });
}

/*
 * Get one or multiple objects from an index.
 *
 * @param {(string|string[])} objectID Id of the object to retrieve.
 * Pass an array of objectIDs if you want to delete multiple objects at the same time.
 * @param {Object} [params]
 * @param {string[]} [params.attributesToRetrieve] List of attributes to retrieve in the response.
 * Default to index settings.
 * @return {Promise}
 * @see https://www.algolia.com/doc/rest#get-an-object
 * @see https://www.algolia.com/doc/rest#retrieve-several-objects
 */
function get(req, indexName, objectID, {attributesToRetrieve = []} = {}) {
  if (!Array.isArray(objectID)) {
    return req({
      method: 'GET',
      path: '/1/indexes/%s/%s',
      pathParams: [indexName, objectID],
      qs: {attributes: attributesToRetrieve.join(',')}
    });
  }

  return req({
    method: 'POST',
    path: '/1/indexes/*/objects',
    body: {
      requests: objectID.map(id => ({
        indexName,
        objectID: id,
        attributesToRetrieve: attributesToRetrieve.join(',')
      }))
    },
    forceReadHosts: true
  });
}

/*
 * Partially update one or multiple objects in an index.
 *
 * @param {(Object|Object[])} partialObject Partial object data you want to update.
 * You can pass an array of partial objects to update multiple objects.
 * @param {string} partialObject.objectID objectID of the object to update, this is required.
 * @param {Object} [params]
 * @param {boolean[]} [params.createIfNotExists] Create the object if it does not exists. True by default.
 * @return {Promise}
 * @see https://www.algolia.com/doc/rest#partially-update-an-object
 * @see https://www.algolia.com/doc/rest#batch-write-operations
 */
function partialUpdate(req, indexName, partialObject, {createIfNotExists} = {}) {
  if (!Array.isArray(partialObject)) {
    return req({
      method: 'POST',
      path: '/1/indexes/%s/%s/partial',
      pathParams: [indexName, partialObject.objectID],
      qs: {createIfNotExists},
      body: partialObject
    });
  }

  return req({
    method: 'POST',
    path: '/1/indexes/%s/batch',
    pathParams: [indexName],
    body: {
      requests: partialObject.map(object => ({
        action: 'partialUpdateObject',
        objectID: object.objectID,
        body: object
      }))
    }
  });
}

/*
 * Add or update one or multiple objects in an index.
 *
 * @param {(Object|Object[])} object Object data you want to update.
 * You can pass an array of objectIDs to update multiple objects.
 * @param {string} [object.objectID] objectID of the object to add or update.
 * If you do not provide an objectID
 * it will be automatically computed by Algolia.
 * @return {Promise}
 * @see https://www.algolia.com/doc/rest#add-an-object-without-id
 * @see https://www.algolia.com/doc/rest#addupdate-an-object-by-id
 * @see https://www.algolia.com/doc/rest#batch-write-operations
 */
function save(req, indexName, object) {
  if (!Array.isArray(object)) {
    return req({
      method: 'POST',
      path: '/1/indexes/%s',
      pathParams: [indexName],
      body: object
    });
  }

  return req({
    method: 'POST',
    path: '/1/indexes/%s/batch',
    pathParams: [indexName],
    body: {
      requests: object.map(o => ({
        action: 'addObject',
        body: o
      }))
    }
  });
}
