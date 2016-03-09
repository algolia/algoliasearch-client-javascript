export {
  addObject,
  addObjects,
  browse,
  browseFrom,
  clearIndex,
  deleteObject,
  deleteObjects,
  getObject,
  getObjects,
  getSettings,
  partialUpdateObject,
  partialUpdateObjects,
  setSettings,
  saveObject,
  saveObjects,
  search,
  similarSearch,
  waitTask
};

/*
 * Add an object in this index
 *
 * @param content contains the javascript object to add inside the index
 * @param objectID (optional) an objectID you want to attribute to this object
 * (if the attribute already exist the old object will be overwrite)
 * @param callback (optional) the result callback called with two arguments:
 *  error: null or Error('message')
 *  content: the server answer that contains 3 elements: createAt, taskId and objectID
 */
function addObject(content, objectID, callback) {
  var indexObj = this;

  if (arguments.length === 1 || typeof objectID === 'function') {
    callback = objectID;
    objectID = undefined;
  }

  return this.as._jsonRequest({
    method: objectID !== undefined ?
      'PUT' : // update or create
      'POST', // create (API generates an objectID)
    url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + // create
      (objectID !== undefined ? '/' + encodeURIComponent(objectID) : ''), // update or create
    body: content,
    hostType: 'write',
    callback: callback
  });
}


/*
 * Add several objects
 *
 * @param objects contains an array of objects to add
 * @param callback (optional) the result callback called with two arguments:
 *  error: null or Error('message')
 *  content: the server answer that updateAt and taskID
 */
addObjects: function(objects, callback) {
  var isArray = require('lodash/lang/isArray');
  var usage = 'Usage: index.addObjects(arrayOfObjects[, callback])';

  if (!isArray(objects)) {
    throw new Error(usage);
  }

  var indexObj = this;
  var postObj = {
    requests: []
  };
  for (var i = 0; i < objects.length; ++i) {
    var request = {
      action: 'addObject',
      body: objects[i]
    };
    postObj.requests.push(request);
  }
  return this.as._jsonRequest({
    method: 'POST',
    url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/batch',
    body: postObj,
    hostType: 'write',
    callback: callback
  });
},

/*
 * Get an object from this index
 *
 * @param objectID the unique identifier of the object to retrieve
 * @param attrs (optional) if set, contains the array of attribute names to retrieve
 * @param callback (optional) the result callback called with two arguments
 *  error: null or Error('message')
 *  content: the object to retrieve or the error message if a failure occured
 */
getObject: function(objectID, attrs, callback) {
  var indexObj = this;

  if (arguments.length === 1 || typeof attrs === 'function') {
    callback = attrs;
    attrs = undefined;
  }

  var params = '';
  if (attrs !== undefined) {
    params = '?attributes=';
    for (var i = 0; i < attrs.length; ++i) {
      if (i !== 0) {
        params += ',';
      }
      params += attrs[i];
    }
  }

  return this.as._jsonRequest({
    method: 'GET',
    url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/' + encodeURIComponent(objectID) + params,
    hostType: 'read',
    callback: callback
  });
},



/*
 * Get several objects from this index
 *
 * @param objectIDs the array of unique identifier of objects to retrieve
 */
getObjects: function(objectIDs, attributesToRetrieve, callback) {
  var isArray = require('lodash/lang/isArray');
  var map = require('lodash/collection/map');

  var usage = 'Usage: index.getObjects(arrayOfObjectIDs[, callback])';

  if (!isArray(objectIDs)) {
    throw new Error(usage);
  }

  var indexObj = this;

  if (arguments.length === 1 || typeof attributesToRetrieve === 'function') {
    callback = attributesToRetrieve;
    attributesToRetrieve = undefined;
  }

  var body = {
    requests: map(objectIDs, function prepareRequest(objectID) {
      var request = {
        indexName: indexObj.indexName,
        objectID: objectID
      };

      if (attributesToRetrieve) {
        request.attributesToRetrieve = attributesToRetrieve.join(',');
      }

      return request;
    })
  };

  return this.as._jsonRequest({
    method: 'POST',
    url: '/1/indexes/*/objects',
    hostType: 'read',
    body: body,
    callback: callback
  });
}

/*
 * Update partially an object (only update attributes passed in argument)
 *
 * @param partialObject contains the javascript attributes to override, the
 *  object must contains an objectID attribute
 * @param createIfNotExists (optional) if false, avoid an automatic creation of the object
 * @param callback (optional) the result callback called with two arguments:
 *  error: null or Error('message')
 *  content: the server answer that contains 3 elements: createAt, taskId and objectID
 */
partialUpdateObject: function(partialObject, createIfNotExists, callback) {
  if (arguments.length === 1 || typeof createIfNotExists === 'function') {
    callback = createIfNotExists;
    createIfNotExists = undefined;
  }

  var indexObj = this;
  var url = '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/' + encodeURIComponent(partialObject.objectID) + '/partial';
  if (createIfNotExists === false) {
    url += '?createIfNotExists=false';
  }

  return this.as._jsonRequest({
    method: 'POST',
    url: url,
    body: partialObject,
    hostType: 'write',
    callback: callback
  });
},

/*
 * Partially Override the content of several objects
 *
 * @param objects contains an array of objects to update (each object must contains a objectID attribute)
 * @param callback (optional) the result callback called with two arguments:
 *  error: null or Error('message')
 *  content: the server answer that updateAt and taskID
 */
partialUpdateObjects: function(objects, callback) {
  var isArray = require('lodash/lang/isArray');
  var usage = 'Usage: index.partialUpdateObjects(arrayOfObjects[, callback])';

  if (!isArray(objects)) {
    throw new Error(usage);
  }

  var indexObj = this;
  var postObj = {
    requests: []
  };
  for (var i = 0; i < objects.length; ++i) {
    var request = {
      action: 'partialUpdateObject',
      objectID: objects[i].objectID,
      body: objects[i]
    };
    postObj.requests.push(request);
  }
  return this.as._jsonRequest({
    method: 'POST',
    url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/batch',
    body: postObj,
    hostType: 'write',
    callback: callback
  });
},


/*
 * Override the content of object
 *
 * @param object contains the javascript object to save, the object must contains an objectID attribute
 * @param callback (optional) the result callback called with two arguments:
 *  error: null or Error('message')
 *  content: the server answer that updateAt and taskID
 */
saveObject: function(object, callback) {
  var indexObj = this;
  return this.as._jsonRequest({
    method: 'PUT',
    url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/' + encodeURIComponent(object.objectID),
    body: object,
    hostType: 'write',
    callback: callback
  });
},
/*
 * Override the content of several objects
 *
 * @param objects contains an array of objects to update (each object must contains a objectID attribute)
 * @param callback (optional) the result callback called with two arguments:
 *  error: null or Error('message')
 *  content: the server answer that updateAt and taskID
 */
saveObjects: function(objects, callback) {
  var isArray = require('lodash/lang/isArray');
  var usage = 'Usage: index.saveObjects(arrayOfObjects[, callback])';

  if (!isArray(objects)) {
    throw new Error(usage);
  }

  var indexObj = this;
  var postObj = {
    requests: []
  };
  for (var i = 0; i < objects.length; ++i) {
    var request = {
      action: 'updateObject',
      objectID: objects[i].objectID,
      body: objects[i]
    };
    postObj.requests.push(request);
  }
  return this.as._jsonRequest({
    method: 'POST',
    url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/batch',
    body: postObj,
    hostType: 'write',
    callback: callback
  });
},

/*
 * Browse index content. The response content will have a `cursor` property that you can use
 * to browse subsequent pages for this query. Use `index.browseFrom(cursor)` when you want.
 *
 * @param {string} query - The full text query
 * @param {Object} [queryParameters] - Any search query parameter
 * @param {Function} [callback] - The result callback called with two arguments
 *   error: null or Error('message')
 *   content: the server answer with the browse result
 * @return {Promise|undefined} Returns a promise if no callback given
 * @example
 * index.browse('cool songs', {
 *   tagFilters: 'public,comments',
 *   hitsPerPage: 500
 * }, callback);
 * @see {@link https://www.algolia.com/doc/rest_api#Browse|Algolia REST API Documentation}
 */
// pre 3.5.0 usage, backward compatible
// browse: function(page, hitsPerPage, callback) {
browse: function(query, queryParameters, callback) {
  var merge = require('lodash/object/merge');

  var indexObj = this;

  var page;
  var hitsPerPage;

  // we check variadic calls that are not the one defined
  // .browse()/.browse(fn)
  // => page = 0
  if (arguments.length === 0 || arguments.length === 1 && typeof arguments[0] === 'function') {
    page = 0;
    callback = arguments[0];
    query = undefined;
  } else if (typeof arguments[0] === 'number') {
    // .browse(2)/.browse(2, 10)/.browse(2, fn)/.browse(2, 10, fn)
    page = arguments[0];
    if (typeof arguments[1] === 'number') {
      hitsPerPage = arguments[1];
    } else if (typeof arguments[1] === 'function') {
      callback = arguments[1];
      hitsPerPage = undefined;
    }
    query = undefined;
    queryParameters = undefined;
  } else if (typeof arguments[0] === 'object') {
    // .browse(queryParameters)/.browse(queryParameters, cb)
    if (typeof arguments[1] === 'function') {
      callback = arguments[1];
    }
    queryParameters = arguments[0];
    query = undefined;
  } else if (typeof arguments[0] === 'string' && typeof arguments[1] === 'function') {
    // .browse(query, cb)
    callback = arguments[1];
    queryParameters = undefined;
  }

  // otherwise it's a .browse(query)/.browse(query, queryParameters)/.browse(query, queryParameters, cb)

  // get search query parameters combining various possible calls
  // to .browse();
  queryParameters = merge({}, queryParameters || {}, {
    page: page,
    hitsPerPage: hitsPerPage,
    query: query
  });

  var params = this.as._getSearchParams(queryParameters, '');

  return this.as._jsonRequest({
    method: 'GET',
    url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/browse?' + params,
    hostType: 'read',
    callback: callback
  });
},

/*
 * Continue browsing from a previous position (cursor), obtained via a call to `.browse()`.
 *
 * @param {string} query - The full text query
 * @param {Object} [queryParameters] - Any search query parameter
 * @param {Function} [callback] - The result callback called with two arguments
 *   error: null or Error('message')
 *   content: the server answer with the browse result
 * @return {Promise|undefined} Returns a promise if no callback given
 * @example
 * index.browseFrom('14lkfsakl32', callback);
 * @see {@link https://www.algolia.com/doc/rest_api#Browse|Algolia REST API Documentation}
 */
browseFrom: function(cursor, callback) {
  return this.as._jsonRequest({
    method: 'GET',
    url: '/1/indexes/' + encodeURIComponent(this.indexName) + '/browse?cursor=' + encodeURIComponent(cursor),
    hostType: 'read',
    callback: callback
  });
},

/*
 * Override the content of object
 *
 * @param object contains the javascript object to save, the object must contains an objectID attribute
 * @param callback (optional) the result callback called with two arguments:
 *  error: null or Error('message')
 *  content: the server answer that updateAt and taskID
 */
saveObject: function(object, callback) {
  var indexObj = this;
  return this.as._jsonRequest({
    method: 'PUT',
    url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/' + encodeURIComponent(object.objectID),
    body: object,
    hostType: 'write',
    callback: callback
  });
},

/*
 * Override the content of several objects
 *
 * @param objects contains an array of objects to update (each object must contains a objectID attribute)
 * @param callback (optional) the result callback called with two arguments:
 *  error: null or Error('message')
 *  content: the server answer that updateAt and taskID
 */
saveObjects: function(objects, callback) {
  var isArray = require('lodash/lang/isArray');
  var usage = 'Usage: index.saveObjects(arrayOfObjects[, callback])';

  if (!isArray(objects)) {
    throw new Error(usage);
  }

  var indexObj = this;
  var postObj = {
    requests: []
  };
  for (var i = 0; i < objects.length; ++i) {
    var request = {
      action: 'updateObject',
      objectID: objects[i].objectID,
      body: objects[i]
    };
    postObj.requests.push(request);
  }
  return this.as._jsonRequest({
    method: 'POST',
    url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/batch',
    body: postObj,
    hostType: 'write',
    callback: callback
  });
},

/*
 * Delete an object from the index
 *
 * @param objectID the unique identifier of object to delete
 * @param callback (optional) the result callback called with two arguments:
 *  error: null or Error('message')
 *  content: the server answer that contains 3 elements: createAt, taskId and objectID
 */
deleteObject: function(objectID, callback) {
  if (typeof objectID === 'function' || typeof objectID !== 'string' && typeof objectID !== 'number') {
    var err = new errors.AlgoliaSearchError('Cannot delete an object without an objectID');
    callback = objectID;
    if (typeof callback === 'function') {
      return callback(err);
    }

    return this.as._promise.reject(err);
  }

  var indexObj = this;
  return this.as._jsonRequest({
    method: 'DELETE',
    url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/' + encodeURIComponent(objectID),
    hostType: 'write',
    callback: callback
  });
},
/*
 * Delete several objects from an index
 *
 * @param objectIDs contains an array of objectID to delete
 * @param callback (optional) the result callback called with two arguments:
 *  error: null or Error('message')
 *  content: the server answer that contains 3 elements: createAt, taskId and objectID
 */
deleteObjects: function(objectIDs, callback) {
  var isArray = require('lodash/lang/isArray');
  var map = require('lodash/collection/map');

  var usage = 'Usage: index.deleteObjects(arrayOfObjectIDs[, callback])';

  if (!isArray(objectIDs)) {
    throw new Error(usage);
  }

  var indexObj = this;
  var postObj = {
    requests: map(objectIDs, function prepareRequest(objectID) {
      return {
        action: 'deleteObject',
        objectID: objectID,
        body: {
          objectID: objectID
        }
      };
    })
  };

  return this.as._jsonRequest({
    method: 'POST',
    url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/batch',
    body: postObj,
    hostType: 'write',
    callback: callback
  });
},

/*
 * Wait the publication of a task on the server.
 * All server task are asynchronous and you can check with this method that the task is published.
 *
 * @param taskID the id of the task returned by server
 * @param callback the result callback with with two arguments:
 *  error: null or Error('message')
 *  content: the server answer that contains the list of results
 */
waitTask: function(taskID, callback) {
  // wait minimum 100ms before retrying
  var baseDelay = 100;
  // wait maximum 5s before retrying
  var maxDelay = 5000;
  var loop = 0;

  // waitTask() must be handled differently from other methods,
  // it's a recursive method using a timeout
  var indexObj = this;
  var client = indexObj.as;

  var promise = retryLoop();

  function retryLoop() {
    return client._jsonRequest({
      method: 'GET',
      hostType: 'read',
      url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/task/' + taskID
    }).then(function success(content) {
      loop++;
      var delay = baseDelay * loop * loop;
      if (delay > maxDelay) {
        delay = maxDelay;
      }

      if (content.status !== 'published') {
        return client._promise.delay(delay).then(retryLoop);
      }

      return content;
    });
  }

  if (!callback) {
    return promise;
  }

  promise.then(successCb, failureCb);

  function successCb(content) {
    exitPromise(function exit() {
      callback(null, content);
    }, client._setTimeout || setTimeout);
  }

  function failureCb(err) {
    exitPromise(function exit() {
      callback(err);
    }, client._setTimeout || setTimeout);
  }
},

/*
 * This function deletes the index content. Settings and index specific API keys are kept untouched.
 *
 * @param callback (optional) the result callback called with two arguments
 *  error: null or Error('message')
 *  content: the settings object or the error message if a failure occured
 */
clearIndex: function(callback) {
  var indexObj = this;
  return this.as._jsonRequest({
    method: 'POST',
    url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/clear',
    hostType: 'write',
    callback: callback
  });
},
