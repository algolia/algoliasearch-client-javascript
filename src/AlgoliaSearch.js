'use strict';

module.exports = AlgoliaSearch;

var process = process || undefined;
// default debug activated in dev environments
// this is triggered in package.json, using the envify transform
if (process && process.env && process.env.APP_ENV === 'development') {
  require('debug').enable('algoliasearch*');
}

var errors = require('./errors');

/*
 * Algolia Search library initialization
 * https://www.algolia.com/
 *
 * @param {string} applicationID - Your applicationID, found in your dashboard
 * @param {string} apiKey - Your API key, found in your dashboard
 * @param {Object} [opts]
 * @param {number} [opts.timeout=2000] - The request timeout set in milliseconds,
 * another request will be issued after this timeout
 * @param {string} [opts.protocol='http:'] - The protocol used to query Algolia Search API.
 *                                        Set to 'https:' to force using https.
 *                                        Default to document.location.protocol in browsers
 * @param {Object|Array} [opts.hosts={
 *           read: [this.applicationID + '-dsn.algolia.net'].concat([
 *             this.applicationID + '-1.algolianet.com',
 *             this.applicationID + '-2.algolianet.com',
 *             this.applicationID + '-3.algolianet.com']
 *           ]),
 *           write: [this.applicationID + '.algolia.net'].concat([
 *             this.applicationID + '-1.algolianet.com',
 *             this.applicationID + '-2.algolianet.com',
 *             this.applicationID + '-3.algolianet.com']
 *           ]) - The hosts to use for Algolia Search API.
 *           If you provide them, you will less benefit from our HA implementation
 */
function AlgoliaSearch(applicationID, apiKey, opts) {
  var debug = require('debug')('algoliasearch');

  var clone = require('lodash/lang/clone');
  var isArray = require('lodash/lang/isArray');

  var usage = 'Usage: algoliasearch(applicationID, apiKey, opts)';

  if (!applicationID) {
    throw new errors.AlgoliaSearchError('Please provide an application ID. ' + usage);
  }

  if (!apiKey) {
    throw new errors.AlgoliaSearchError('Please provide an API key. ' + usage);
  }

  this.applicationID = applicationID;
  this.apiKey = apiKey;

  var defaultHosts = [
    this.applicationID + '-1.algolianet.com',
    this.applicationID + '-2.algolianet.com',
    this.applicationID + '-3.algolianet.com'
  ];
  this.hosts = {
    read: [],
    write: []
  };

  this.hostIndex = {
    read: 0,
    write: 0
  };

  opts = opts || {};

  var protocol = opts.protocol || 'https:';
  var timeout = opts.timeout === undefined ? 2000 : opts.timeout;

  // while we advocate for colon-at-the-end values: 'http:' for `opts.protocol`
  // we also accept `http` and `https`. It's a common error.
  if (!/:$/.test(protocol)) {
    protocol = protocol + ':';
  }

  if (opts.protocol !== 'http:' && opts.protocol !== 'https:') {
    throw new errors.AlgoliaSearchError('protocol must be `http:` or `https:` (was `' + opts.protocol + '`)');
  }

  // no hosts given, add defaults
  if (!opts.hosts) {
    this.hosts.read = [this.applicationID + '-dsn.algolia.net'].concat(defaultHosts);
    this.hosts.write = [this.applicationID + '.algolia.net'].concat(defaultHosts);
  } else if (isArray(opts.hosts)) {
    this.hosts.read = clone(opts.hosts);
    this.hosts.write = clone(opts.hosts);
  } else {
    this.hosts.read = clone(opts.hosts.read);
    this.hosts.write = clone(opts.hosts.write);
  }

  // add protocol and lowercase hosts
  this.hosts.read = map(this.hosts.read, prepareHost(protocol));
  this.hosts.write = map(this.hosts.write, prepareHost(protocol));
  this.requestTimeout = timeout;

  this.extraHeaders = [];
  this.cache = {};

  this._ua = opts._ua;
  this._useCache = opts._useCache === undefined ? true : opts._useCache;

  this._setTimeout = opts._setTimeout;

  debug('init done, %j', this);
}

AlgoliaSearch.prototype = {
  /*
   * Delete an index
   *
   * @param indexName the name of index to delete
   * @param callback the result callback called with two arguments
   *  error: null or Error('message')
   *  content: the server answer that contains the task ID
   */
  deleteIndex: function(indexName, callback) {
    return this._jsonRequest({
      method: 'DELETE',
      url: '/1/indexes/' + encodeURIComponent(indexName),
      hostType: 'write',
      callback: callback
    });
  },
  /**
   * Move an existing index.
   * @param srcIndexName the name of index to copy.
   * @param dstIndexName the new index name that will contains a copy of
   * srcIndexName (destination will be overriten if it already exist).
   * @param callback the result callback called with two arguments
   *  error: null or Error('message')
   *  content: the server answer that contains the task ID
   */
  moveIndex: function(srcIndexName, dstIndexName, callback) {
    var postObj = {
      operation: 'move', destination: dstIndexName
    };
    return this._jsonRequest({
      method: 'POST',
      url: '/1/indexes/' + encodeURIComponent(srcIndexName) + '/operation',
      body: postObj,
      hostType: 'write',
      callback: callback
    });
  },
  /**
   * Copy an existing index.
   * @param srcIndexName the name of index to copy.
   * @param dstIndexName the new index name that will contains a copy
   * of srcIndexName (destination will be overriten if it already exist).
   * @param callback the result callback called with two arguments
   *  error: null or Error('message')
   *  content: the server answer that contains the task ID
   */
  copyIndex: function(srcIndexName, dstIndexName, callback) {
    var postObj = {
      operation: 'copy', destination: dstIndexName
    };
    return this._jsonRequest({
      method: 'POST',
      url: '/1/indexes/' + encodeURIComponent(srcIndexName) + '/operation',
      body: postObj,
      hostType: 'write',
      callback: callback
    });
  },
  /**
   * Return last log entries.
   * @param offset Specify the first entry to retrieve (0-based, 0 is the most recent log entry).
   * @param length Specify the maximum number of entries to retrieve starting
   * at offset. Maximum allowed value: 1000.
   * @param callback the result callback called with two arguments
   *  error: null or Error('message')
   *  content: the server answer that contains the task ID
   */
  getLogs: function(offset, length, callback) {
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
  /*
   * List all existing indexes (paginated)
   *
   * @param page The page to retrieve, starting at 0.
   * @param callback the result callback called with two arguments
   *  error: null or Error('message')
   *  content: the server answer with index list
   */
  listIndexes: function(page, callback) {
    var params = '';

    if (page === undefined || typeof page === 'function') {
      callback = page;
    } else {
      params = '?page=' + page;
    }

    return this._jsonRequest({
      method: 'GET',
      url: '/1/indexes' + params,
      hostType: 'read',
      callback: callback
    });
  },

  /*
   * Get the index object initialized
   *
   * @param indexName the name of index
   * @param callback the result callback with one argument (the Index instance)
   */
  initIndex: function(indexName) {
    return new this.Index(this, indexName);
  },
  /*
   * List all existing user keys with their associated ACLs
   *
   * @param callback the result callback called with two arguments
   *  error: null or Error('message')
   *  content: the server answer with user keys list
   */
  listUserKeys: function(callback) {
    return this._jsonRequest({
      method: 'GET',
      url: '/1/keys',
      hostType: 'read',
      callback: callback
    });
  },
  /*
   * Get ACL of a user key
   *
   * @param key
   * @param callback the result callback called with two arguments
   *  error: null or Error('message')
   *  content: the server answer with user keys list
   */
  getUserKeyACL: function(key, callback) {
    return this._jsonRequest({
      method: 'GET',
      url: '/1/keys/' + key,
      hostType: 'read',
      callback: callback
    });
  },
  /*
   * Delete an existing user key
   * @param key
   * @param callback the result callback called with two arguments
   *  error: null or Error('message')
   *  content: the server answer with user keys list
   */
  deleteUserKey: function(key, callback) {
    return this._jsonRequest({
      method: 'DELETE',
      url: '/1/keys/' + key,
      hostType: 'write',
      callback: callback
    });
  },
  /*
   * Add a new global API key
   *
   * @param {string[]} acls - The list of ACL for this key. Defined by an array of strings that
   *   can contains the following values:
   *     - search: allow to search (https and http)
   *     - addObject: allows to add/update an object in the index (https only)
   *     - deleteObject : allows to delete an existing object (https only)
   *     - deleteIndex : allows to delete index content (https only)
   *     - settings : allows to get index settings (https only)
   *     - editSettings : allows to change index settings (https only)
   * @param {Object} [params] - Optionnal parameters to set for the key
   * @param {number} params.validity - Number of seconds after which the key will be automatically removed (0 means no time limit for this key)
   * @param {number} params.maxQueriesPerIPPerHour - Number of API calls allowed from an IP address per hour
   * @param {number} params.maxHitsPerQuery - Number of hits this API key can retrieve in one call
   * @param {string[]} params.indexes - Allowed targeted indexes for this key
   * @param {string} params.description - A description for your key
   * @param {string[]} params.referers - A list of authorized referers
   * @param {Object} params.queryParameters - Force the key to use specific query parameters
   * @param {Function} callback - The result callback called with two arguments
   *   error: null or Error('message')
   *   content: the server answer with user keys list
   * @return {Promise|undefined} Returns a promise if no callback given
   * @example
   * client.addUserKey(['search'], {
   *   validity: 300,
   *   maxQueriesPerIPPerHour: 2000,
   *   maxHitsPerQuery: 3,
   *   indexes: ['fruits'],
   *   description: 'Eat three fruits',
   *   referers: ['*.algolia.com'],
   *   queryParameters: {
   *     tagFilters: ['public'],
   *   }
   * })
   * @see {@link https://www.algolia.com/doc/rest_api#AddKey|Algolia REST API Documentation}
   */
  addUserKey: function(acls, params, callback) {
    var isArray = require('lodash/lang/isArray');
    var usage = 'Usage: client.addUserKey(arrayOfAcls[, params, callback])';

    if (!isArray(acls)) {
      throw new Error(usage);
    }

    if (arguments.length === 1 || typeof params === 'function') {
      callback = params;
      params = null;
    }

    var postObj = {
      acl: acls
    };

    if (params) {
      postObj.validity = params.validity;
      postObj.maxQueriesPerIPPerHour = params.maxQueriesPerIPPerHour;
      postObj.maxHitsPerQuery = params.maxHitsPerQuery;
      postObj.indexes = params.indexes;
      postObj.description = params.description;

      if (params.queryParameters) {
        postObj.queryParameters = this._getSearchParams(params.queryParameters, '');
      }

      postObj.referers = params.referers;
    }

    return this._jsonRequest({
      method: 'POST',
      url: '/1/keys',
      body: postObj,
      hostType: 'write',
      callback: callback
    });
  },
  /**
   * Add a new global API key
   * @deprecated Please use client.addUserKey()
   */
  addUserKeyWithValidity: deprecate(function(acls, params, callback) {
    return this.addUserKey(acls, params, callback);
  }, deprecatedMessage('client.addUserKeyWithValidity()', 'client.addUserKey()')),

  /**
   * Update an existing API key
   * @param {string} key - The key to update
   * @param {string[]} acls - The list of ACL for this key. Defined by an array of strings that
   *   can contains the following values:
   *     - search: allow to search (https and http)
   *     - addObject: allows to add/update an object in the index (https only)
   *     - deleteObject : allows to delete an existing object (https only)
   *     - deleteIndex : allows to delete index content (https only)
   *     - settings : allows to get index settings (https only)
   *     - editSettings : allows to change index settings (https only)
   * @param {Object} [params] - Optionnal parameters to set for the key
   * @param {number} params.validity - Number of seconds after which the key will be automatically removed (0 means no time limit for this key)
   * @param {number} params.maxQueriesPerIPPerHour - Number of API calls allowed from an IP address per hour
   * @param {number} params.maxHitsPerQuery - Number of hits this API key can retrieve in one call
   * @param {string[]} params.indexes - Allowed targeted indexes for this key
   * @param {string} params.description - A description for your key
   * @param {string[]} params.referers - A list of authorized referers
   * @param {Object} params.queryParameters - Force the key to use specific query parameters
   * @param {Function} callback - The result callback called with two arguments
   *   error: null or Error('message')
   *   content: the server answer with user keys list
   * @return {Promise|undefined} Returns a promise if no callback given
   * @example
   * client.updateUserKey('APIKEY', ['search'], {
   *   validity: 300,
   *   maxQueriesPerIPPerHour: 2000,
   *   maxHitsPerQuery: 3,
   *   indexes: ['fruits'],
   *   description: 'Eat three fruits',
   *   referers: ['*.algolia.com'],
   *   queryParameters: {
   *     tagFilters: ['public'],
   *   }
   * })
   * @see {@link https://www.algolia.com/doc/rest_api#UpdateIndexKey|Algolia REST API Documentation}
   */
  updateUserKey: function(key, acls, params, callback) {
    var isArray = require('lodash/lang/isArray');
    var usage = 'Usage: client.updateUserKey(key, arrayOfAcls[, params, callback])';

    if (!isArray(acls)) {
      throw new Error(usage);
    }

    if (arguments.length === 2 || typeof params === 'function') {
      callback = params;
      params = null;
    }

    var putObj = {
      acl: acls
    };

    if (params) {
      putObj.validity = params.validity;
      putObj.maxQueriesPerIPPerHour = params.maxQueriesPerIPPerHour;
      putObj.maxHitsPerQuery = params.maxHitsPerQuery;
      putObj.indexes = params.indexes;
      putObj.description = params.description;

      if (params.queryParameters) {
        putObj.queryParameters = this._getSearchParams(params.queryParameters, '');
      }

      putObj.referers = params.referers;
    }

    return this._jsonRequest({
      method: 'PUT',
      url: '/1/keys/' + key,
      body: putObj,
      hostType: 'write',
      callback: callback
    });
  },

  /**
   * Set the extra security tagFilters header
   * @param {string|array} tags The list of tags defining the current security filters
   */
  setSecurityTags: function(tags) {
    if (Object.prototype.toString.call(tags) === '[object Array]') {
      var strTags = [];
      for (var i = 0; i < tags.length; ++i) {
        if (Object.prototype.toString.call(tags[i]) === '[object Array]') {
          var oredTags = [];
          for (var j = 0; j < tags[i].length; ++j) {
            oredTags.push(tags[i][j]);
          }
          strTags.push('(' + oredTags.join(',') + ')');
        } else {
          strTags.push(tags[i]);
        }
      }
      tags = strTags.join(',');
    }

    this.securityTags = tags;
  },

  /**
   * Set the extra user token header
   * @param {string} userToken The token identifying a uniq user (used to apply rate limits)
   */
  setUserToken: function(userToken) {
    this.userToken = userToken;
  },

  /**
   * Initialize a new batch of search queries
   * @deprecated use client.search()
   */
  startQueriesBatch: deprecate(function startQueriesBatchDeprecated() {
    this._batch = [];
  }, deprecatedMessage('client.startQueriesBatch()', 'client.search()')),

  /**
   * Add a search query in the batch
   * @deprecated use client.search()
   */
  addQueryInBatch: deprecate(function addQueryInBatchDeprecated(indexName, query, args) {
    this._batch.push({
      indexName: indexName,
      query: query,
      params: args
    });
  }, deprecatedMessage('client.addQueryInBatch()', 'client.search()')),

  /**
   * Clear all queries in client's cache
   * @return undefined
   */
  clearCache: function() {
    this.cache = {};
  },

  /**
   * Launch the batch of queries using XMLHttpRequest.
   * @deprecated use client.search()
   */
  sendQueriesBatch: deprecate(function sendQueriesBatchDeprecated(callback) {
    return this.search(this._batch, callback);
  }, deprecatedMessage('client.sendQueriesBatch()', 'client.search()')),

  /**
  * Set the number of milliseconds a request can take before automatically being terminated.
  *
  * @param {Number} milliseconds
  */
  setRequestTimeout: function(milliseconds) {
    if (milliseconds) {
      this.requestTimeout = parseInt(milliseconds, 10);
    }
  },

  /**
   * Search through multiple indices at the same time
   * @param  {Object[]}   queries  An array of queries you want to run.
   * @param {string} queries[].indexName The index name you want to target
   * @param {string} [queries[].query] The query to issue on this index. Can also be passed into `params`
   * @param {Object} queries[].params Any search param like hitsPerPage, ..
   * @param  {Function} callback Callback to be called
   * @return {Promise|undefined} Returns a promise if no callback given
   */
  search: function(queries, callback) {
    var isArray = require('lodash/lang/isArray');
    var usage = 'Usage: client.search(arrayOfQueries[, callback])';

    if (!isArray(queries)) {
      throw new Error(usage);
    }

    var client = this;

    var postObj = {
      requests: map(queries, function prepareRequest(query) {
        var params = '';

        // allow query.query
        // so we are mimicing the index.search(query, params) method
        // {indexName:, query:, params:}
        if (query.query !== undefined) {
          params += 'query=' + encodeURIComponent(query.query);
        }

        return {
          indexName: query.indexName,
          params: client._getSearchParams(query.params, params)
        };
      })
    };

    return this._jsonRequest({
      cache: this.cache,
      method: 'POST',
      url: '/1/indexes/*/queries',
      body: postObj,
      hostType: 'read',
      callback: callback
    });
  },

  /**
   * Perform write operations accross multiple indexes.
   *
   * To reduce the amount of time spent on network round trips,
   * you can create, update, or delete several objects in one call,
   * using the batch endpoint (all operations are done in the given order).
   *
   * Available actions:
   *   - addObject
   *   - updateObject
   *   - partialUpdateObject
   *   - partialUpdateObjectNoCreate
   *   - deleteObject
   *
   * https://www.algolia.com/doc/rest_api#Indexes
   * @param  {Object[]} operations An array of operations to perform
   * @return {Promise|undefined} Returns a promise if no callback given
   * @example
   * client.batch([{
   *   action: 'addObject',
   *   indexName: 'clients',
   *   body: {
   *     name: 'Bill'
   *   }
   * }, {
   *   action: 'udpateObject',
   *   indexName: 'fruits',
   *   body: {
   *     objectID: '29138',
   *     name: 'banana'
   *   }
   * }], cb)
   */
  batch: function(operations, callback) {
    var isArray = require('lodash/lang/isArray');
    var usage = 'Usage: client.batch(operations[, callback])';

    if (!isArray(operations)) {
      throw new Error(usage);
    }

    return this._jsonRequest({
      method: 'POST',
      url: '/1/indexes/*/batch',
      body: {
        requests: operations
      },
      hostType: 'write',
      callback: callback
    });
  },

  // environment specific methods
  destroy: notImplemented,
  enableRateLimitForward: notImplemented,
  disableRateLimitForward: notImplemented,
  useSecuredAPIKey: notImplemented,
  disableSecuredAPIKey: notImplemented,
  generateSecuredApiKey: notImplemented,
  /*
   * Index class constructor.
   * You should not use this method directly but use initIndex() function
   */
  Index: function(algoliasearch, indexName) {
    this.indexName = indexName;
    this.as = algoliasearch;
    this.typeAheadArgs = null;
    this.typeAheadValueOption = null;

    // make sure every index instance has it's own cache
    this.cache = {};
  },
  /**
  * Add an extra field to the HTTP request
  *
  * @param name the header field name
  * @param value the header field value
  */
  setExtraHeader: function(name, value) {
    this.extraHeaders.push({
      name: name.toLowerCase(), value: value
    });
  },

  /**
  * Augment sent x-algolia-agent with more data, each agent part
  * is automatically separated from the others by a semicolon;
  *
  * @param algoliaAgent the agent to add
  */
  addAlgoliaAgent: function(algoliaAgent) {
    this._ua += ';' + algoliaAgent;
  },

  _sendQueriesBatch: function(params, callback) {
    function prepareParams() {
      var reqParams = '';
      for (var i = 0; i < params.requests.length; ++i) {
        var q = '/1/indexes/' +
          encodeURIComponent(params.requests[i].indexName) +
          '?' + params.requests[i].params;
        reqParams += i + '=' + encodeURIComponent(q) + '&';
      }
      return reqParams;
    }

    return this._jsonRequest({
      cache: this.cache,
      method: 'POST',
      url: '/1/indexes/*/queries',
      body: params,
      hostType: 'read',
      fallback: {
        method: 'GET',
        url: '/1/indexes/*',
        body: {
          params: prepareParams()
        }
      },
      callback: callback
    });
  },
  /*
   * Wrapper that try all hosts to maximize the quality of service
   */
  _jsonRequest: function(opts) {
    var requestDebug = require('debug')('algoliasearch:' + opts.url);

    var body;
    var cache = opts.cache;
    var client = this;
    var tries = 0;
    var usingFallback = false;

    if (opts.body !== undefined) {
      body = safeJSONStringify(opts.body);
    }

    requestDebug('request start');

    function doRequest(requester, reqOpts) {
      var cacheID;

      if (client._useCache) {
        cacheID = opts.url;
      }

      // as we sometime use POST requests to pass parameters (like query='aa'),
      // the cacheID must also include the body to be different between calls
      if (client._useCache && body) {
        cacheID += '_body_' + reqOpts.body;
      }

      // handle cache existence
      if (client._useCache && cache && cache[cacheID] !== undefined) {
        requestDebug('serving response from cache');
        return client._promise.resolve(JSON.parse(cache[cacheID]));
      }

      // if we reached max tries
      if (tries >= client.hosts[opts.hostType].length ||
        // or we need to switch to fallback
        client.useFallback && !usingFallback) {
        // and there's no fallback or we are already using a fallback
        if (!opts.fallback || !client._request.fallback || usingFallback) {
          requestDebug('could not get any response');
          // then stop
          return client._promise.reject(new errors.AlgoliaSearchError(
            'Cannot connect to the AlgoliaSearch API.' +
            ' Send an email to support@algolia.com to report and resolve the issue.' +
            ' Application id was: ' + client.applicationID
          ));
        }

        requestDebug('switching to fallback');

        // let's try the fallback starting from here
        tries = 0;

        // method, url and body are fallback dependent
        reqOpts.method = opts.fallback.method;
        reqOpts.url = opts.fallback.url;
        reqOpts.jsonBody = opts.fallback.body;
        if (reqOpts.jsonBody) {
          reqOpts.body = safeJSONStringify(reqOpts.jsonBody);
        }

        reqOpts.timeout = client.requestTimeout * (tries + 1);
        client.hostIndex[opts.hostType] = 0;
        usingFallback = true; // the current request is now using fallback
        return doRequest(client._request.fallback, reqOpts);
      }

      var url = client.hosts[opts.hostType][client.hostIndex[opts.hostType]] + reqOpts.url;
      var options = {
        body: body,
        jsonBody: opts.body,
        method: reqOpts.method,
        headers: client._computeRequestHeaders(),
        timeout: reqOpts.timeout,
        debug: requestDebug
      };

      requestDebug('method: %s, url: %s, headers: %j, timeout: %d',
        options.method, url, options.headers, options.timeout);

      if (requester === client._request.fallback) {
        requestDebug('using fallback');
      }

      // `requester` is any of this._request or this._request.fallback
      // thus it needs to be called using the client as context
      return requester.call(client, url, options).then(success, tryFallback);

      function success(httpResponse) {
        // compute the status of the response,
        //
        // When in browser mode, using XDR or JSONP, we have no statusCode available
        // So we rely on our API response `status` property.
        // But `waitTask` can set a `status` property which is not the statusCode (it's the task status)
        // So we check if there's a `message` along `status` and it means it's an error
        //
        // That's the only case where we have a response.status that's not the http statusCode
        var status = httpResponse && httpResponse.body && httpResponse.body.message && httpResponse.body.status ||

          // this is important to check the request statusCode AFTER the body eventual
          // statusCode because some implementations (jQuery XDomainRequest transport) may
          // send statusCode 200 while we had an error
          httpResponse.statusCode ||

          // When in browser mode, using XDR or JSONP
          // we default to success when no error (no response.status && response.message)
          // If there was a JSON.parse() error then body is null and it fails
          httpResponse && httpResponse.body && 200;

        requestDebug('received response: statusCode: %s, computed statusCode: %d, headers: %j',
          httpResponse.statusCode, status, httpResponse.headers);

        if (process && process.env.DEBUG && process.env.DEBUG.indexOf('debugBody') !== -1) {
          requestDebug('body: %j', httpResponse.body);
        }

        var ok = status === 200 || status === 201;
        var retry = !ok && Math.floor(status / 100) !== 4 && Math.floor(status / 100) !== 1;

        if (client._useCache && ok && cache) {
          cache[cacheID] = httpResponse.responseText;
        }

        if (ok) {
          return httpResponse.body;
        }

        if (retry) {
          tries += 1;
          return retryRequest();
        }

        var unrecoverableError = new errors.AlgoliaSearchError(
          httpResponse.body && httpResponse.body.message
        );

        return client._promise.reject(unrecoverableError);
      }

      function tryFallback(err) {
        // error cases:
        //  While not in fallback mode:
        //    - CORS not supported
        //    - network error
        //  While in fallback mode:
        //    - timeout
        //    - network error
        //    - badly formatted JSONP (script loaded, did not call our callback)
        //  In both cases:
        //    - uncaught exception occurs (TypeError)
        requestDebug('error: %s, stack: %s', err.message, err.stack);

        if (!(err instanceof errors.AlgoliaSearchError)) {
          err = new errors.Unknown(err && err.message, err);
        }

        tries += 1;

        // stop the request implementation when:
        if (
          // we did not generate this error,
          // it comes from a throw in some other piece of code
          err instanceof errors.Unknown ||

          // server sent unparsable JSON
          err instanceof errors.UnparsableJSON ||

          // max tries and already using fallback or no fallback
          tries >= client.hosts[opts.hostType].length &&
          (usingFallback || !opts.fallback || !client._request.fallback)) {
          // stop request implementation for this command
          return client._promise.reject(err);
        }

        client.hostIndex[opts.hostType] = ++client.hostIndex[opts.hostType] % client.hosts[opts.hostType].length;

        if (err instanceof errors.RequestTimeout) {
          return retryRequest();
        } else if (client._request.fallback && !client.useFallback) {
          // if any error occured but timeout, use fallback for the rest
          // of the session
          client.useFallback = true;
        }

        return doRequest(requester, reqOpts);
      }

      function retryRequest() {
        client.hostIndex[opts.hostType] = ++client.hostIndex[opts.hostType] % client.hosts[opts.hostType].length;
        reqOpts.timeout = client.requestTimeout * (tries + 1);
        return doRequest(requester, reqOpts);
      }
    }

    // we can use a fallback if forced AND fallback parameters are available
    var useFallback = client.useFallback && opts.fallback;
    var requestOptions = useFallback ? opts.fallback : opts;

    var promise = doRequest(
      // set the requester
      useFallback ? client._request.fallback : client._request, {
        url: requestOptions.url,
        method: requestOptions.method,
        body: body,
        jsonBody: opts.body,
        timeout: client.requestTimeout * (tries + 1)
      }
    );

    // either we have a callback
    // either we are using promises
    if (opts.callback) {
      promise.then(function okCb(content) {
        exitPromise(function() {
          opts.callback(null, content);
        }, client._setTimeout || setTimeout);
      }, function nookCb(err) {
        exitPromise(function() {
          opts.callback(err);
        }, client._setTimeout || setTimeout);
      });
    } else {
      return promise;
    }
  },

  /*
  * Transform search param object in query string
  */
  _getSearchParams: function(args, params) {
    if (this._isUndefined(args) || args === null) {
      return params;
    }
    for (var key in args) {
      if (key !== null && args[key] !== undefined && args.hasOwnProperty(key)) {
        params += params === '' ? '' : '&';
        params += key + '=' + encodeURIComponent(Object.prototype.toString.call(args[key]) === '[object Array]' ? safeJSONStringify(args[key]) : args[key]);
      }
    }
    return params;
  },

  _isUndefined: function(obj) {
    return obj === void 0;
  },

  _computeRequestHeaders: function() {
    var forEach = require('lodash/collection/forEach');

    var requestHeaders = {
      'x-algolia-api-key': this.apiKey,
      'x-algolia-application-id': this.applicationID,
      'x-algolia-agent': this._ua
    };

    if (this.userToken) {
      requestHeaders['x-algolia-usertoken'] = this.userToken;
    }

    if (this.securityTags) {
      requestHeaders['x-algolia-tagfilters'] = this.securityTags;
    }

    if (this.extraHeaders) {
      forEach(this.extraHeaders, function addToRequestHeaders(header) {
        requestHeaders[header.name] = header.value;
      });
    }

    return requestHeaders;
  }
};

/*
 * Contains all the functions related to one index
 * You should use AlgoliaSearch.initIndex(indexName) to retrieve this object
 */
AlgoliaSearch.prototype.Index.prototype = {
  /*
   * Clear all queries in cache
   */
  clearCache: function() {
    this.cache = {};
  },
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
  addObject: function(content, objectID, callback) {
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
  },
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
  },

  /*
   * Update partially an object (only update attributes passed in argument)
   *
   * @param partialObject contains the javascript attributes to override, the
   *  object must contains an objectID attribute
   * @param callback (optional) the result callback called with two arguments:
   *  error: null or Error('message')
   *  content: the server answer that contains 3 elements: createAt, taskId and objectID
   */
  partialUpdateObject: function(partialObject, callback) {
    var indexObj = this;
    return this.as._jsonRequest({
      method: 'POST',
      url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/' + encodeURIComponent(partialObject.objectID) + '/partial',
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
   * Delete all objects matching a query
   *
   * @param query the query string
   * @param params the optional query parameters
   * @param callback (optional) the result callback called with one argument
   *  error: null or Error('message')
   */
  deleteByQuery: function(query, params, callback) {
    var clone = require('lodash/lang/clone');

    var indexObj = this;
    var client = indexObj.as;

    if (arguments.length === 1 || typeof params === 'function') {
      callback = params;
      params = {};
    } else {
      params = clone(params);
    }

    params.attributesToRetrieve = 'objectID';
    params.hitsPerPage = 1000;
    params.distinct = false;

    // when deleting, we should never use cache to get the
    // search results
    this.clearCache();

    // there's a problem in how we use the promise chain,
    // see how waitTask is done
    var promise = this
      .search(query, params)
      .then(stopOrDelete);

    function stopOrDelete(searchContent) {
      // stop here
      if (searchContent.nbHits === 0) {
        // return indexObj.as._request.resolve();
        return searchContent;
      }

      // continue and do a recursive call
      var objectIDs = map(searchContent.hits, function getObjectID(object) {
        return object.objectID;
      });

      return indexObj
        .deleteObjects(objectIDs)
        .then(waitTask)
        .then(doDeleteByQuery);
    }

    function waitTask(deleteObjectsContent) {
      return indexObj.waitTask(deleteObjectsContent.taskID);
    }

    function doDeleteByQuery() {
      return indexObj.deleteByQuery(query, params);
    }

    if (!callback) {
      return promise;
    }

    promise.then(success, failure);

    function success() {
      exitPromise(function exit() {
        callback(null);
      }, client._setTimeout || setTimeout);
    }

    function failure(err) {
      exitPromise(function exit() {
        callback(err);
      }, client._setTimeout || setTimeout);
    }
  },

  /*
   * Search inside the index using XMLHttpRequest request (Using a POST query to
   * minimize number of OPTIONS queries: Cross-Origin Resource Sharing).
   *
   * @param query the full text query
   * @param args (optional) if set, contains an object with query parameters:
   * - page: (integer) Pagination parameter used to select the page to retrieve.
   *                   Page is zero-based and defaults to 0. Thus,
   *                   to retrieve the 10th page you need to set page=9
   * - hitsPerPage: (integer) Pagination parameter used to select the number of hits per page. Defaults to 20.
   * - attributesToRetrieve: a string that contains the list of object attributes
   * you want to retrieve (let you minimize the answer size).
   *   Attributes are separated with a comma (for example "name,address").
   *   You can also use an array (for example ["name","address"]).
   *   By default, all attributes are retrieved. You can also use '*' to retrieve all
   *   values when an attributesToRetrieve setting is specified for your index.
   * - attributesToHighlight: a string that contains the list of attributes you
   *   want to highlight according to the query.
   *   Attributes are separated by a comma. You can also use an array (for example ["name","address"]).
   *   If an attribute has no match for the query, the raw value is returned.
   *   By default all indexed text attributes are highlighted.
   *   You can use `*` if you want to highlight all textual attributes.
   *   Numerical attributes are not highlighted.
   *   A matchLevel is returned for each highlighted attribute and can contain:
   *      - full: if all the query terms were found in the attribute,
   *      - partial: if only some of the query terms were found,
   *      - none: if none of the query terms were found.
   * - attributesToSnippet: a string that contains the list of attributes to snippet alongside
   * the number of words to return (syntax is `attributeName:nbWords`).
   *    Attributes are separated by a comma (Example: attributesToSnippet=name:10,content:10).
   *    You can also use an array (Example: attributesToSnippet: ['name:10','content:10']).
   *    By default no snippet is computed.
   * - minWordSizefor1Typo: the minimum number of characters in a query word to accept one typo in this word.
   * Defaults to 3.
   * - minWordSizefor2Typos: the minimum number of characters in a query word
   * to accept two typos in this word. Defaults to 7.
   * - getRankingInfo: if set to 1, the result hits will contain ranking
   * information in _rankingInfo attribute.
   * - aroundLatLng: search for entries around a given
   * latitude/longitude (specified as two floats separated by a comma).
   *   For example aroundLatLng=47.316669,5.016670).
   *   You can specify the maximum distance in meters with the aroundRadius parameter (in meters)
   *   and the precision for ranking with aroundPrecision
   *   (for example if you set aroundPrecision=100, two objects that are distant of
   *   less than 100m will be considered as identical for "geo" ranking parameter).
   *   At indexing, you should specify geoloc of an object with the _geoloc attribute
   *   (in the form {"_geoloc":{"lat":48.853409, "lng":2.348800}})
   * - insideBoundingBox: search entries inside a given area defined by the two extreme points
   * of a rectangle (defined by 4 floats: p1Lat,p1Lng,p2Lat,p2Lng).
   *   For example insideBoundingBox=47.3165,4.9665,47.3424,5.0201).
   *   At indexing, you should specify geoloc of an object with the _geoloc attribute
   *   (in the form {"_geoloc":{"lat":48.853409, "lng":2.348800}})
   * - numericFilters: a string that contains the list of numeric filters you want to
   * apply separated by a comma.
   *   The syntax of one filter is `attributeName` followed by `operand` followed by `value`.
   *   Supported operands are `<`, `<=`, `=`, `>` and `>=`.
   *   You can have multiple conditions on one attribute like for example numericFilters=price>100,price<1000.
   *   You can also use an array (for example numericFilters: ["price>100","price<1000"]).
   * - tagFilters: filter the query by a set of tags. You can AND tags by separating them by commas.
   *   To OR tags, you must add parentheses. For example, tags=tag1,(tag2,tag3) means tag1 AND (tag2 OR tag3).
   *   You can also use an array, for example tagFilters: ["tag1",["tag2","tag3"]]
   *   means tag1 AND (tag2 OR tag3).
   *   At indexing, tags should be added in the _tags** attribute
   *   of objects (for example {"_tags":["tag1","tag2"]}).
   * - facetFilters: filter the query by a list of facets.
   *   Facets are separated by commas and each facet is encoded as `attributeName:value`.
   *   For example: `facetFilters=category:Book,author:John%20Doe`.
   *   You can also use an array (for example `["category:Book","author:John%20Doe"]`).
   * - facets: List of object attributes that you want to use for faceting.
   *   Comma separated list: `"category,author"` or array `['category','author']`
   *   Only attributes that have been added in **attributesForFaceting** index setting
   *   can be used in this parameter.
   *   You can also use `*` to perform faceting on all attributes specified in **attributesForFaceting**.
   * - queryType: select how the query words are interpreted, it can be one of the following value:
   *    - prefixAll: all query words are interpreted as prefixes,
   *    - prefixLast: only the last word is interpreted as a prefix (default behavior),
   *    - prefixNone: no query word is interpreted as a prefix. This option is not recommended.
   * - optionalWords: a string that contains the list of words that should
   * be considered as optional when found in the query.
   *   Comma separated and array are accepted.
   * - distinct: If set to 1, enable the distinct feature (disabled by default)
   * if the attributeForDistinct index setting is set.
   *   This feature is similar to the SQL "distinct" keyword: when enabled
   *   in a query with the distinct=1 parameter,
   *   all hits containing a duplicate value for the attributeForDistinct attribute are removed from results.
   *   For example, if the chosen attribute is show_name and several hits have
   *   the same value for show_name, then only the best
   *   one is kept and others are removed.
   * - restrictSearchableAttributes: List of attributes you want to use for
   * textual search (must be a subset of the attributesToIndex index setting)
   * either comma separated or as an array
   * @param callback the result callback called with two arguments:
   *  error: null or Error('message'). If false, the content contains the error.
   *  content: the server answer that contains the list of results.
   */
  search: buildSearchMethod('query'),

  /*
   * -- BETA --
   * Search a record similar to the query inside the index using XMLHttpRequest request (Using a POST query to
   * minimize number of OPTIONS queries: Cross-Origin Resource Sharing).
   *
   * @param query the similar query
   * @param args (optional) if set, contains an object with query parameters.
   *   All search parameters are supported (see search function), restrictSearchableAttributes and facetFilters
   *   are the two most useful to restrict the similar results and get more relevant content
   */
  similarSearch: buildSearchMethod('similarQuery'),

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
   * Browse all content from an index using events. Basically this will do
   * .browse() -> .browseFrom -> .browseFrom -> .. until all the results are returned
   *
   * @param {string} query - The full text query
   * @param {Object} [queryParameters] - Any search query parameter
   * @return {EventEmitter}
   * @example
   * var browser = index.browseAll('cool songs', {
   *   tagFilters: 'public,comments',
   *   hitsPerPage: 500
   * });
   *
   * browser.on('result', function resultCallback(content) {
   *   console.log(content.hits);
   * });
   *
   * // if any error occurs, you get it
   * browser.on('error', function(err) {
   *   throw err;
   * });
   *
   * // when you have browsed the whole index, you get this event
   * browser.on('end', function() {
   *   console.log('finished');
   * });
   *
   * // at any point if you want to stop the browsing process, you can stop it manually
   * // otherwise it will go on and on
   * browser.stop();
   *
   * @see {@link https://www.algolia.com/doc/rest_api#Browse|Algolia REST API Documentation}
   */
  browseAll: function(query, queryParameters) {
    if (typeof query === 'object') {
      queryParameters = query;
      query = undefined;
    }

    var merge = require('lodash/object/merge');

    var IndexBrowser = require('./IndexBrowser');

    var browser = new IndexBrowser();
    var client = this.as;
    var index = this;
    var params = client._getSearchParams(
      merge({}, queryParameters || {}, {
        query: query
      }), ''
    );

    // start browsing
    browseLoop();

    function browseLoop(cursor) {
      if (browser._stopped) {
        return;
      }

      var queryString;

      if (cursor !== undefined) {
        queryString = 'cursor=' + encodeURIComponent(cursor);
      } else {
        queryString = params;
      }

      client._jsonRequest({
        method: 'GET',
        url: '/1/indexes/' + encodeURIComponent(index.indexName) + '/browse?' + queryString,
        hostType: 'read',
        callback: browseCallback
      });
    }

    function browseCallback(err, content) {
      if (browser._stopped) {
        return;
      }

      if (err) {
        browser._error(err);
        return;
      }

      browser._result(content);

      // no cursor means we are finished browsing
      if (content.cursor === undefined) {
        browser._end();
        return;
      }

      browseLoop(content.cursor);
    }

    return browser;
  },

  /*
   * Get a Typeahead.js adapter
   * @param searchParams contains an object with query parameters (see search for details)
   */
  ttAdapter: function(params) {
    var self = this;
    return function ttAdapter(query, syncCb, asyncCb) {
      var cb;

      if (typeof asyncCb === 'function') {
        // typeahead 0.11
        cb = asyncCb;
      } else {
        // pre typeahead 0.11
        cb = syncCb;
      }

      self.search(query, params, function searchDone(err, content) {
        if (err) {
          cb(err);
          return;
        }

        cb(content.hits);
      });
    };
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
  /*
   * Get settings of this index
   *
   * @param callback (optional) the result callback called with two arguments
   *  error: null or Error('message')
   *  content: the settings object or the error message if a failure occured
   */
  getSettings: function(callback) {
    var indexObj = this;
    return this.as._jsonRequest({
      method: 'GET',
      url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/settings',
      hostType: 'read',
      callback: callback
    });
  },

  /*
   * Set settings for this index
   *
   * @param settigns the settings object that can contains :
   * - minWordSizefor1Typo: (integer) the minimum number of characters to accept one typo (default = 3).
   * - minWordSizefor2Typos: (integer) the minimum number of characters to accept two typos (default = 7).
   * - hitsPerPage: (integer) the number of hits per page (default = 10).
   * - attributesToRetrieve: (array of strings) default list of attributes to retrieve in objects.
   *   If set to null, all attributes are retrieved.
   * - attributesToHighlight: (array of strings) default list of attributes to highlight.
   *   If set to null, all indexed attributes are highlighted.
   * - attributesToSnippet**: (array of strings) default list of attributes to snippet alongside the number
   * of words to return (syntax is attributeName:nbWords).
   *   By default no snippet is computed. If set to null, no snippet is computed.
   * - attributesToIndex: (array of strings) the list of fields you want to index.
   *   If set to null, all textual and numerical attributes of your objects are indexed,
   *   but you should update it to get optimal results.
   *   This parameter has two important uses:
   *     - Limit the attributes to index: For example if you store a binary image in base64,
   *     you want to store it and be able to
   *       retrieve it but you don't want to search in the base64 string.
   *     - Control part of the ranking*: (see the ranking parameter for full explanation)
   *     Matches in attributes at the beginning of
   *       the list will be considered more important than matches in attributes further down the list.
   *       In one attribute, matching text at the beginning of the attribute will be
   *       considered more important than text after, you can disable
   *       this behavior if you add your attribute inside `unordered(AttributeName)`,
   *       for example attributesToIndex: ["title", "unordered(text)"].
   * - attributesForFaceting: (array of strings) The list of fields you want to use for faceting.
   *   All strings in the attribute selected for faceting are extracted and added as a facet.
   *   If set to null, no attribute is used for faceting.
   * - attributeForDistinct: (string) The attribute name used for the Distinct feature.
   * This feature is similar to the SQL "distinct" keyword: when enabled
   *   in query with the distinct=1 parameter, all hits containing a duplicate
   *   value for this attribute are removed from results.
   *   For example, if the chosen attribute is show_name and several hits have
   *   the same value for show_name, then only the best one is kept and others are removed.
   * - ranking: (array of strings) controls the way results are sorted.
   *   We have six available criteria:
   *    - typo: sort according to number of typos,
   *    - geo: sort according to decreassing distance when performing a geo-location based search,
   *    - proximity: sort according to the proximity of query words in hits,
   *    - attribute: sort according to the order of attributes defined by attributesToIndex,
   *    - exact:
   *        - if the user query contains one word: sort objects having an attribute
   *        that is exactly the query word before others.
   *          For example if you search for the "V" TV show, you want to find it
   *          with the "V" query and avoid to have all popular TV
   *          show starting by the v letter before it.
   *        - if the user query contains multiple words: sort according to the
   *        number of words that matched exactly (and not as a prefix).
   *    - custom: sort according to a user defined formula set in **customRanking** attribute.
   *   The standard order is ["typo", "geo", "proximity", "attribute", "exact", "custom"]
   * - customRanking: (array of strings) lets you specify part of the ranking.
   *   The syntax of this condition is an array of strings containing attributes
   *   prefixed by asc (ascending order) or desc (descending order) operator.
   *   For example `"customRanking" => ["desc(population)", "asc(name)"]`
   * - queryType: Select how the query words are interpreted, it can be one of the following value:
   *   - prefixAll: all query words are interpreted as prefixes,
   *   - prefixLast: only the last word is interpreted as a prefix (default behavior),
   *   - prefixNone: no query word is interpreted as a prefix. This option is not recommended.
   * - highlightPreTag: (string) Specify the string that is inserted before
   * the highlighted parts in the query result (default to "<em>").
   * - highlightPostTag: (string) Specify the string that is inserted after
   * the highlighted parts in the query result (default to "</em>").
   * - optionalWords: (array of strings) Specify a list of words that should
   * be considered as optional when found in the query.
   * @param callback (optional) the result callback called with two arguments
   *  error: null or Error('message')
   *  content: the server answer or the error message if a failure occured
   */
  setSettings: function(settings, callback) {
    var indexObj = this;
    return this.as._jsonRequest({
      method: 'PUT',
      url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/settings',
      hostType: 'write',
      body: settings,
      callback: callback
    });
  },
  /*
   * List all existing user keys associated to this index
   *
   * @param callback the result callback called with two arguments
   *  error: null or Error('message')
   *  content: the server answer with user keys list
   */
  listUserKeys: function(callback) {
    var indexObj = this;
    return this.as._jsonRequest({
      method: 'GET',
      url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/keys',
      hostType: 'read',
      callback: callback
    });
  },
  /*
   * Get ACL of a user key associated to this index
   *
   * @param key
   * @param callback the result callback called with two arguments
   *  error: null or Error('message')
   *  content: the server answer with user keys list
   */
  getUserKeyACL: function(key, callback) {
    var indexObj = this;
    return this.as._jsonRequest({
      method: 'GET',
      url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/keys/' + key,
      hostType: 'read',
      callback: callback
    });
  },
  /*
   * Delete an existing user key associated to this index
   *
   * @param key
   * @param callback the result callback called with two arguments
   *  error: null or Error('message')
   *  content: the server answer with user keys list
   */
  deleteUserKey: function(key, callback) {
    var indexObj = this;
    return this.as._jsonRequest({
      method: 'DELETE',
      url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/keys/' + key,
      hostType: 'write',
      callback: callback
    });
  },
  /*
   * Add a new API key to this index
   *
   * @param {string[]} acls - The list of ACL for this key. Defined by an array of strings that
   *   can contains the following values:
   *     - search: allow to search (https and http)
   *     - addObject: allows to add/update an object in the index (https only)
   *     - deleteObject : allows to delete an existing object (https only)
   *     - deleteIndex : allows to delete index content (https only)
   *     - settings : allows to get index settings (https only)
   *     - editSettings : allows to change index settings (https only)
   * @param {Object} [params] - Optionnal parameters to set for the key
   * @param {number} params.validity - Number of seconds after which the key will
   * be automatically removed (0 means no time limit for this key)
   * @param {number} params.maxQueriesPerIPPerHour - Number of API calls allowed from an IP address per hour
   * @param {number} params.maxHitsPerQuery - Number of hits this API key can retrieve in one call
   * @param {string} params.description - A description for your key
   * @param {string[]} params.referers - A list of authorized referers
   * @param {Object} params.queryParameters - Force the key to use specific query parameters
   * @param {Function} callback - The result callback called with two arguments
   *   error: null or Error('message')
   *   content: the server answer with user keys list
   * @return {Promise|undefined} Returns a promise if no callback given
   * @example
   * index.addUserKey(['search'], {
   *   validity: 300,
   *   maxQueriesPerIPPerHour: 2000,
   *   maxHitsPerQuery: 3,
   *   description: 'Eat three fruits',
   *   referers: ['*.algolia.com'],
   *   queryParameters: {
   *     tagFilters: ['public'],
   *   }
   * })
   * @see {@link https://www.algolia.com/doc/rest_api#AddIndexKey|Algolia REST API Documentation}
   */
  addUserKey: function(acls, params, callback) {
    var isArray = require('lodash/lang/isArray');
    var usage = 'Usage: index.addUserKey(arrayOfAcls[, params, callback])';

    if (!isArray(acls)) {
      throw new Error(usage);
    }

    if (arguments.length === 1 || typeof params === 'function') {
      callback = params;
      params = null;
    }

    var postObj = {
      acl: acls
    };

    if (params) {
      postObj.validity = params.validity;
      postObj.maxQueriesPerIPPerHour = params.maxQueriesPerIPPerHour;
      postObj.maxHitsPerQuery = params.maxHitsPerQuery;
      postObj.description = params.description;

      if (params.queryParameters) {
        postObj.queryParameters = this.as._getSearchParams(params.queryParameters, '');
      }

      postObj.referers = params.referers;
    }

    return this.as._jsonRequest({
      method: 'POST',
      url: '/1/indexes/' + encodeURIComponent(this.indexName) + '/keys',
      body: postObj,
      hostType: 'write',
      callback: callback
    });
  },

  /**
   * Add an existing user key associated to this index
   * @deprecated use index.addUserKey()
   */
  addUserKeyWithValidity: deprecate(function deprecatedAddUserKeyWithValidity(acls, params, callback) {
    return this.addUserKey(acls, params, callback);
  }, deprecatedMessage('index.addUserKeyWithValidity()', 'index.addUserKey()')),

  /**
   * Update an existing API key of this index
   * @param {string} key - The key to update
   * @param {string[]} acls - The list of ACL for this key. Defined by an array of strings that
   *   can contains the following values:
   *     - search: allow to search (https and http)
   *     - addObject: allows to add/update an object in the index (https only)
   *     - deleteObject : allows to delete an existing object (https only)
   *     - deleteIndex : allows to delete index content (https only)
   *     - settings : allows to get index settings (https only)
   *     - editSettings : allows to change index settings (https only)
   * @param {Object} [params] - Optionnal parameters to set for the key
   * @param {number} params.validity - Number of seconds after which the key will
   * be automatically removed (0 means no time limit for this key)
   * @param {number} params.maxQueriesPerIPPerHour - Number of API calls allowed from an IP address per hour
   * @param {number} params.maxHitsPerQuery - Number of hits this API key can retrieve in one call
   * @param {string} params.description - A description for your key
   * @param {string[]} params.referers - A list of authorized referers
   * @param {Object} params.queryParameters - Force the key to use specific query parameters
   * @param {Function} callback - The result callback called with two arguments
   *   error: null or Error('message')
   *   content: the server answer with user keys list
   * @return {Promise|undefined} Returns a promise if no callback given
   * @example
   * index.updateUserKey('APIKEY', ['search'], {
   *   validity: 300,
   *   maxQueriesPerIPPerHour: 2000,
   *   maxHitsPerQuery: 3,
   *   description: 'Eat three fruits',
   *   referers: ['*.algolia.com'],
   *   queryParameters: {
   *     tagFilters: ['public'],
   *   }
   * })
   * @see {@link https://www.algolia.com/doc/rest_api#UpdateIndexKey|Algolia REST API Documentation}
   */
  updateUserKey: function(key, acls, params, callback) {
    var isArray = require('lodash/lang/isArray');
    var usage = 'Usage: index.updateUserKey(key, arrayOfAcls[, params, callback])';

    if (!isArray(acls)) {
      throw new Error(usage);
    }

    if (arguments.length === 2 || typeof params === 'function') {
      callback = params;
      params = null;
    }

    var putObj = {
      acl: acls
    };

    if (params) {
      putObj.validity = params.validity;
      putObj.maxQueriesPerIPPerHour = params.maxQueriesPerIPPerHour;
      putObj.maxHitsPerQuery = params.maxHitsPerQuery;
      putObj.description = params.description;

      if (params.queryParameters) {
        putObj.queryParameters = this.as._getSearchParams(params.queryParameters, '');
      }

      putObj.referers = params.referers;
    }

    return this.as._jsonRequest({
      method: 'PUT',
      url: '/1/indexes/' + encodeURIComponent(this.indexName) + '/keys/' + key,
      body: putObj,
      hostType: 'write',
      callback: callback
    });
  },

  _search: function(params, callback) {
    return this.as._jsonRequest({
      cache: this.cache,
      method: 'POST',
      url: '/1/indexes/' + encodeURIComponent(this.indexName) + '/query',
      body: {params: params},
      hostType: 'read',
      fallback: {
        method: 'GET',
        url: '/1/indexes/' + encodeURIComponent(this.indexName),
        body: {params: params}
      },
      callback: callback
    });
  },

  as: null,
  indexName: null,
  typeAheadArgs: null,
  typeAheadValueOption: null
};

// extracted from https://github.com/component/map/blob/master/index.js
// without the crazy toFunction thing
function map(arr, fn) {
  var ret = [];
  for (var i = 0; i < arr.length; ++i) {
    ret.push(fn(arr[i], i));
  }
  return ret;
}

function prepareHost(protocol) {
  return function prepare(host) {
    return protocol + '//' + host.toLowerCase();
  };
}

function notImplemented() {
  var message = 'Not implemented in this environment.\n' +
    'If you feel this is a mistake, write to support@algolia.com';

  throw new errors.AlgoliaSearchError(message);
}

function deprecatedMessage(previousUsage, newUsage) {
  var githubAnchorLink = previousUsage.toLowerCase()
    .replace('.', '')
    .replace('()', '');

  return 'algoliasearch: `' + previousUsage + '` was replaced by `' + newUsage +
    '`. Please see https://github.com/algolia/algoliasearch-client-js/wiki/Deprecated#' + githubAnchorLink;
}

// Parse cloud does not supports setTimeout
// We do not store a setTimeout reference in the client everytime
// We only fallback to a fake setTimeout when not available
// setTimeout cannot be override globally sadly
function exitPromise(fn, _setTimeout) {
  _setTimeout(fn, 0);
}

function deprecate(fn, message) {
  var warned = false;

  function deprecated() {
    if (!warned) {
      /* eslint no-console:0 */
      console.log(message);
      warned = true;
    }

    return fn.apply(this, arguments);
  }

  return deprecated;
}

// Prototype.js < 1.7, a widely used library, defines a weird
// Array.prototype.toJSON function that will fail to stringify our content
// appropriately
// refs:
//   - https://groups.google.com/forum/#!topic/prototype-core/E-SAVvV_V9Q
//   - https://github.com/sstephenson/prototype/commit/038a2985a70593c1a86c230fadbdfe2e4898a48c
//   - http://stackoverflow.com/a/3148441/147079
function safeJSONStringify(obj) {
  /* eslint no-extend-native:0 */

  if (Array.prototype.toJSON === undefined) {
    return JSON.stringify(obj);
  }

  var toJSON = Array.prototype.toJSON;
  delete Array.prototype.toJSON;
  var out = JSON.stringify(obj);
  Array.prototype.toJSON = toJSON;

  return out;
}

function buildSearchMethod(queryParam) {
  return function search(query, args, callback) {
    // warn V2 users on how to search
    if (typeof query === 'function' && typeof args === 'object' ||
      typeof callback === 'object') {
      // .search(query, params, cb)
      // .search(cb, params)
      throw new errors.AlgoliaSearchError('index.search usage is index.search(query, params, cb)');
    }

    if (arguments.length === 0 || typeof query === 'function') {
      // .search(), .search(cb)
      callback = query;
      query = '';
    } else if (arguments.length === 1 || typeof args === 'function') {
      // .search(query/args), .search(query, cb)
      callback = args;
      args = undefined;
    }

    // .search(args), careful: typeof null === 'object'
    if (typeof query === 'object' && query !== null) {
      args = query;
      query = undefined;
    } else if (query === undefined || query === null) { // .search(undefined/null)
      query = '';
    }

    var params = '';

    if (query !== undefined) {
      params += queryParam + '=' + encodeURIComponent(query);
    }

    if (args !== undefined) {
      // `_getSearchParams` will augment params, do not be fooled by the = versus += from previous if
      params = this.as._getSearchParams(args, params);
    }

    return this._search(params, callback);
  };
}
