'use strict';

module.exports = AlgoliaSearch;

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

  var clone = require('lodash-compat/lang/clone');
  var isArray = require('lodash-compat/lang/isArray');

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
    read: []
  };

  this.hostIndex = {
    read: 0
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
  } else if (isArray(opts.hosts)) {
    this.hosts.read = clone(opts.hosts);
  } else {
    this.hosts.read = clone(opts.hosts.read);
  }

  // add protocol and lowercase hosts
  this.hosts.read = map(this.hosts.read, prepareHost(protocol));
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
   * Get the index object initialized
   *
   * @param indexName the name of index
   * @param callback the result callback with one argument (the Index instance)
   */
  initIndex: function(indexName) {
    return new this.Index(this, indexName);
  },

  /**
   * Clear all queries in client's cache
   * @return undefined
   */
  clearCache: function() {
    this.cache = {};
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
      body = JSON.stringify(opts.body);
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
        return client._promise.resolve(JSON.parse(JSON.stringify(cache[cacheID])));
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
          reqOpts.body = JSON.stringify(reqOpts.jsonBody);
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

        var ok = status === 200 || status === 201;
        var retry = !ok && Math.floor(status / 100) !== 4 && Math.floor(status / 100) !== 1;

        if (client._useCache && ok && cache) {
          cache[cacheID] = httpResponse.body;
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

          // no fallback and a network error occured (No CORS, bad APPID)
          !requester.fallback && err instanceof errors.Network ||

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
    if (args === undefined || args === null) {
      return params;
    }
    for (var key in args) {
      if (key !== null && args[key] !== undefined && args.hasOwnProperty(key)) {
        params += params === '' ? '' : '&';
        params += key + '=' + encodeURIComponent(Object.prototype.toString.call(args[key]) === '[object Array]' ? JSON.stringify(args[key]) : args[key]);
      }
    }
    return params;
  },

  _computeRequestHeaders: function() {
    var forEach = require('lodash-compat/collection/forEach');

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
   *D efaults to 3.
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
  search: function(query, args, callback) {
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
      params += 'query=' + encodeURIComponent(query);
    }

    if (args !== undefined) {
      // `_getSearchParams` will augment params, do not be fooled by the = versus += from previous if
      params = this.as._getSearchParams(args, params);
    }

    return this._search(params, callback);
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

// Parse cloud does not supports setTimeout
// We do not store a setTimeout reference in the client everytime
// We only fallback to a fake setTimeout when not available
// setTimeout cannot be override globally sadly
function exitPromise(fn, _setTimeout) {
  _setTimeout(fn, 0);
}
