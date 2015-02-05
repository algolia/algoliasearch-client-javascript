/*
 * Copyright (c) 2013 Algolia
 * http://www.algolia.com/
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/*
 * Algolia Search library initialization
 * @param applicationID the application ID you have in your admin interface
 * @param apiKey a valid API key for the service
 * @param methodOrOptions the hash of parameters for initialization. It can contains:
 *        - method (optional) specify if the protocol used is http or https (http by default to make the first search query faster).
 *          You need to use https is you are doing something else than just search queries.
 *        - hosts (optional) the list of hosts that you have received for the service
 *        - dsn (optional) set to true if your account has the Distributed Search Option
 *        - dsnHost (optional) override the automatic computation of dsn hostname
 */
var AlgoliaSearch = function(applicationID, apiKey, methodOrOptions, resolveDNS, hosts) {
    var self = this;
    this.applicationID = applicationID;
    this.apiKey = apiKey;
    this.dsn = true;
    this.dsnHost = null;
    this.hosts = [];
    this.currentHostIndex = 0;
    this.requestTimeoutInMs = 2000;
    this.extraHeaders = [];
    this.jsonp = null;
    this.options = {};

    var method;
    var tld = 'net';
    if (typeof methodOrOptions === 'string') { // Old initialization
        method = methodOrOptions;
    } else {
        // Take all option from the hash
        var options = methodOrOptions || {};
        this.options = options;
        if (!this._isUndefined(options.method)) {
            method = options.method;
        }
        if (!this._isUndefined(options.tld)) {
            tld = options.tld;
        }
        if (!this._isUndefined(options.dsn)) {
            this.dsn = options.dsn;
        }
        if (!this._isUndefined(options.hosts)) {
            hosts = options.hosts;
        }
        if (!this._isUndefined(options.dsnHost)) {
            this.dsnHost = options.dsnHost;
        }
        if (!this._isUndefined(options.requestTimeoutInMs)) {
            this.requestTimeoutInMs = +options.requestTimeoutInMs;
        }
        if (!this._isUndefined(options.jsonp)) {
            this.jsonp = options.jsonp;
        }
    }
    // If hosts is undefined, initialize it with applicationID
    if (this._isUndefined(hosts)) {
        hosts = [
            this.applicationID + '-1.algolia.' + tld,
            this.applicationID + '-2.algolia.' + tld,
            this.applicationID + '-3.algolia.' + tld
        ];
    }
    // detect is we use http or https
    this.host_protocol = 'http://';
    if (this._isUndefined(method) || method === null) {
        this.host_protocol = ('https:' == document.location.protocol ? 'https' : 'http') + '://';
    } else if (method === 'https' || method === 'HTTPS') {
        this.host_protocol = 'https://';
    }
    // Add hosts in random order
    for (var i = 0; i < hosts.length; ++i) {
        if (Math.random() > 0.5) {
            this.hosts.reverse();
        }
        this.hosts.push(this.host_protocol + hosts[i]);
    }
    if (Math.random() > 0.5) {
        this.hosts.reverse();
    }
    // then add Distributed Search Network host if there is one
    if (this.dsn || this.dsnHost != null) {
        if (this.dsnHost) {
            this.hosts.unshift(this.host_protocol + this.dsnHost);
        } else {
            this.hosts.unshift(this.host_protocol + this.applicationID + '-dsn.algolia.' + tld);
        }
    }
    // angular dependencies injection
    if (this.options.angular) {
        this.options.angular.$injector.invoke(['$http', '$q', function ($http, $q) {
            self.options.angular.$q = $q;
            self.options.angular.$http = $http;
        }]);
    }
};

function AlgoliaExplainResults(hit, titleAttribute, otherAttributes) {

    function _getHitExplanationForOneAttr_recurse(obj, foundWords) {
        var res = [];
        if (typeof obj === 'object' && 'matchedWords' in obj && 'value' in obj) {
            var match = false;
            for (var j = 0; j < obj.matchedWords.length; ++j) {
                var word = obj.matchedWords[j];
                if (!(word in foundWords)) {
                    foundWords[word] = 1;
                    match = true;
                }
            }
            if (match) {
                res.push(obj.value);
            }
        } else if (Object.prototype.toString.call(obj) === '[object Array]') {
            for (var i = 0; i < obj.length; ++i) {
                var array = _getHitExplanationForOneAttr_recurse(obj[i], foundWords);
                res = res.concat(array);
            }
        } else if (typeof obj === 'object') {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)){
                    res = res.concat(_getHitExplanationForOneAttr_recurse(obj[prop], foundWords));
                }
            }
        }
        return res;
    }

    function _getHitExplanationForOneAttr(hit, foundWords, attr) {
        var base = hit._highlightResult || hit;
        if (attr.indexOf('.') === -1) {
            if (attr in base) {
                return _getHitExplanationForOneAttr_recurse(base[attr], foundWords);
            }
            return [];
        }
        var array = attr.split('.');
        var obj = base;
        for (var i = 0; i < array.length; ++i) {
            if (Object.prototype.toString.call(obj) === '[object Array]') {
                var res = [];
                for (var j = 0; j < obj.length; ++j) {
                    res = res.concat(_getHitExplanationForOneAttr(obj[j], foundWords, array.slice(i).join('.')));
                }
                return res;
            }
            if (array[i] in obj) {
                obj = obj[array[i]];
            } else {
                return [];
            }
        }
        return _getHitExplanationForOneAttr_recurse(obj, foundWords);
    }

    var res = {};
    var foundWords = {};
    var title = _getHitExplanationForOneAttr(hit, foundWords, titleAttribute);
    res.title = (title.length > 0) ? title[0] : '';
    res.subtitles = [];

    if (typeof otherAttributes !== 'undefined') {
        for (var i = 0; i < otherAttributes.length; ++i) {
            var attr = _getHitExplanationForOneAttr(hit, foundWords, otherAttributes[i]);
            for (var j = 0; j < attr.length; ++j) {
                res.subtitles.push({ attr: otherAttributes[i], value: attr[j] });
            }
        }
    }
    return res;
}


AlgoliaSearch.prototype = {
    /*
     * Delete an index
     *
     * @param indexName the name of index to delete
     * @param callback the result callback with two arguments
     *  success: boolean set to true if the request was successfull
     *  content: the server answer that contains the task ID
     */
    deleteIndex: function(indexName, callback) {
        return this._jsonRequest({ method: 'DELETE',
                            url: '/1/indexes/' + encodeURIComponent(indexName),
                            callback: callback });
    },
    /**
     * Move an existing index.
     * @param srcIndexName the name of index to copy.
     * @param dstIndexName the new index name that will contains a copy of srcIndexName (destination will be overriten if it already exist).
     * @param callback the result callback with two arguments
     *  success: boolean set to true if the request was successfull
     *  content: the server answer that contains the task ID
     */
    moveIndex: function(srcIndexName, dstIndexName, callback) {
        var postObj = {operation: 'move', destination: dstIndexName};
        return this._jsonRequest({ method: 'POST',
                            url: '/1/indexes/' + encodeURIComponent(srcIndexName) + '/operation',
                            body: postObj,
                            callback: callback });

    },
    /**
     * Copy an existing index.
     * @param srcIndexName the name of index to copy.
     * @param dstIndexName the new index name that will contains a copy of srcIndexName (destination will be overriten if it already exist).
     * @param callback the result callback with two arguments
     *  success: boolean set to true if the request was successfull
     *  content: the server answer that contains the task ID
     */
    copyIndex: function(srcIndexName, dstIndexName, callback) {
        var postObj = {operation: 'copy', destination: dstIndexName};
        return this._jsonRequest({ method: 'POST',
                            url: '/1/indexes/' + encodeURIComponent(srcIndexName) + '/operation',
                            body: postObj,
                            callback: callback });
    },
    /**
     * Return last log entries.
     * @param offset Specify the first entry to retrieve (0-based, 0 is the most recent log entry).
     * @param length Specify the maximum number of entries to retrieve starting at offset. Maximum allowed value: 1000.
     * @param callback the result callback with two arguments
     *  success: boolean set to true if the request was successfull
     *  content: the server answer that contains the task ID
     */
    getLogs: function(callback, offset, length) {
        if (this._isUndefined(offset)) {
            offset = 0;
        }
        if (this._isUndefined(length)) {
            length = 10;
        }

        return this._jsonRequest({ method: 'GET',
                            url: '/1/logs?offset=' + offset + '&length=' + length,
                            callback: callback });
    },
    /*
     * List all existing indexes (paginated)
     *
     * @param callback the result callback with two arguments
     *  success: boolean set to true if the request was successfull
     *  content: the server answer with index list or error description if success is false.
     * @param page The page to retrieve, starting at 0.
     */
    listIndexes: function(callback, page) {
        var params = typeof page !== 'undefined' ? '?page=' + page : '';
        return this._jsonRequest({ method: 'GET',
                            url: '/1/indexes' + params,
                            callback: callback });
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
     * @param callback the result callback with two arguments
     *  success: boolean set to true if the request was successfull
     *  content: the server answer with user keys list or error description if success is false.
     */
    listUserKeys: function(callback) {
        return this._jsonRequest({ method: 'GET',
                            url: '/1/keys',
                            callback: callback });
    },
    /*
     * Get ACL of a user key
     *
     * @param callback the result callback with two arguments
     *  success: boolean set to true if the request was successfull
     *  content: the server answer with user keys list or error description if success is false.
     */
    getUserKeyACL: function(key, callback) {
        return this._jsonRequest({ method: 'GET',
                            url: '/1/keys/' + key,
                            callback: callback });
    },
    /*
     * Delete an existing user key
     *
     * @param callback the result callback with two arguments
     *  success: boolean set to true if the request was successfull
     *  content: the server answer with user keys list or error description if success is false.
     */
    deleteUserKey: function(key, callback) {
        return this._jsonRequest({ method: 'DELETE',
                            url: '/1/keys/' + key,
                            callback: callback });
    },
    /*
     * Add an existing user key
     *
     * @param acls the list of ACL for this key. Defined by an array of strings that
     * can contains the following values:
     *   - search: allow to search (https and http)
     *   - addObject: allows to add/update an object in the index (https only)
     *   - deleteObject : allows to delete an existing object (https only)
     *   - deleteIndex : allows to delete index content (https only)
     *   - settings : allows to get index settings (https only)
     *   - editSettings : allows to change index settings (https only)
     * @param callback the result callback with two arguments
     *  success: boolean set to true if the request was successfull
     *  content: the server answer with user keys list or error description if success is false.
     */
    addUserKey: function(acls, callback) {
        var aclsObject = {};
        aclsObject.acl = acls;
        return this._jsonRequest({ method: 'POST',
                            url: '/1/keys',
                            body: aclsObject,
                            callback: callback });
    },
    /*
     * Add an existing user key
     *
     * @param acls the list of ACL for this key. Defined by an array of strings that
     * can contains the following values:
     *   - search: allow to search (https and http)
     *   - addObject: allows to add/update an object in the index (https only)
     *   - deleteObject : allows to delete an existing object (https only)
     *   - deleteIndex : allows to delete index content (https only)
     *   - settings : allows to get index settings (https only)
     *   - editSettings : allows to change index settings (https only)
     * @param validity the number of seconds after which the key will be automatically removed (0 means no time limit for this key)
     * @param maxQueriesPerIPPerHour Specify the maximum number of API calls allowed from an IP address per hour.
     * @param maxHitsPerQuery Specify the maximum number of hits this API key can retrieve in one call.
     * @param callback the result callback with two arguments
     *  success: boolean set to true if the request was successfull
     *  content: the server answer with user keys list or error description if success is false.
     */
    addUserKeyWithValidity: function(acls, validity, maxQueriesPerIPPerHour, maxHitsPerQuery, callback) {
        var indexObj = this;
        var aclsObject = {};
        aclsObject.acl = acls;
        aclsObject.validity = validity;
        aclsObject.maxQueriesPerIPPerHour = maxQueriesPerIPPerHour;
        aclsObject.maxHitsPerQuery = maxHitsPerQuery;
        return this._jsonRequest({ method: 'POST',
                            url: '/1/indexes/' + indexObj.indexName + '/keys',
                            body: aclsObject,
                            callback: callback });
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
        this.tagFilters = tags;
    },

    /**
     * Set the extra user token header
     * @param {string} userToken The token identifying a uniq user (used to apply rate limits)
     */
    setUserToken: function(userToken) {
        this.userToken = userToken;
    },

    /*
     * Initialize a new batch of search queries
     */
    startQueriesBatch: function() {
        this.batch = [];
    },
    /*
     * Add a search query in the batch
     *
     * @param query the full text query
     * @param args (optional) if set, contains an object with query parameters:
     *  - attributes: an array of object attribute names to retrieve
     *     (if not set all attributes are retrieve)
     *  - attributesToHighlight: an array of object attribute names to highlight
     *     (if not set indexed attributes are highlighted)
     *  - minWordSizefor1Typo: the minimum number of characters to accept one typo.
     *     Defaults to 3.
     *  - minWordSizefor2Typos: the minimum number of characters to accept two typos.
     *     Defaults to 7.
     *  - getRankingInfo: if set, the result hits will contain ranking information in
     *     _rankingInfo attribute
     *  - page: (pagination parameter) page to retrieve (zero base). Defaults to 0.
     *  - hitsPerPage: (pagination parameter) number of hits per page. Defaults to 10.
     */
    addQueryInBatch: function(indexName, query, args) {
        var params = 'query=' + encodeURIComponent(query);
        if (!this._isUndefined(args) && args !== null) {
            params = this._getSearchParams(args, params);
        }
        this.batch.push({ indexName: indexName, params: params });
    },
    /*
     * Clear all queries in cache
     */
    clearCache: function() {
        this.cache = {};
    },
    /*
     * Launch the batch of queries using XMLHttpRequest.
     * (Optimized for browser using a POST query to minimize number of OPTIONS queries)
     *
     * @param callback the function that will receive results
     * @param delay (optional) if set, wait for this delay (in ms) and only send the batch if there was no other in the meantime.
     */
    sendQueriesBatch: function(callback, delay) {
        var as = this;
        var params = {requests: []};
        for (var i = 0; i < as.batch.length; ++i) {
            params.requests.push(as.batch[i]);
        }
        window.clearTimeout(as.onDelayTrigger);
        if (!this._isUndefined(delay) && delay !== null && delay > 0) {
            var onDelayTrigger = window.setTimeout( function() {
                as._sendQueriesBatch(params, callback);
            }, delay);
            as.onDelayTrigger = onDelayTrigger;
        } else {
            return this._sendQueriesBatch(params, callback);
        }
    },

   /**
     * Set the number of milliseconds a request can take before automatically being terminated.
     *
     * @param {Number} milliseconds
     */
    setRequestTimeout: function(milliseconds)
    {
        if (milliseconds) {
            this.requestTimeoutInMs = parseInt(milliseconds, 10);
        }
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
    },
   /**
     * Add an extra field to the HTTP request
     *
     * @param key the header field name
     * @param value the header field value
     */
    setExtraHeader: function(key, value) {
        this.extraHeaders.push({ key: key, value: value});
    },

    _sendQueriesBatch: function(params, callback) {

       if (this.jsonp === null) {
            var self = this;
            return this._jsonRequest({ cache: this.cache,
                method: 'POST',
                url: '/1/indexes/*/queries',
                body: params,
                callback: function(success, content) {
                    if (!success) {
                        // retry first with JSONP
                        self.jsonp = true;
                        self._sendQueriesBatch(params, callback);
                    } else {
                        self.jsonp = false;
                        callback && callback(success, content);
                    }
                }
            });
        } else if (this.jsonp) {
            var jsonpParams = '';
            for (var i = 0; i < params.requests.length; ++i) {
                var q = '/1/indexes/' + encodeURIComponent(params.requests[i].indexName) + '?' + params.requests[i].params;
                jsonpParams += i + '=' + encodeURIComponent(q) + '&';
            }
            var pObj = {params: jsonpParams};
            return this._jsonRequest({ cache: this.cache,
                                   method: 'GET',
                                   url: '/1/indexes/*',
                                   body: pObj,
                                   callback: callback });
        } else {
            return this._jsonRequest({ cache: this.cache,
                                   method: 'POST',
                                   url: '/1/indexes/*/queries',
                                   body: params,
                                          callback: callback});
        }
    },
    /*
     * Wrapper that try all hosts to maximize the quality of service
     */
    _jsonRequest: function(opts) {
        var self = this;
        var callback = opts.callback;
        var cache = null;
        var cacheID = opts.url;
        var deferred = null;
        if (this.options.jQuery) {
            deferred = this.options.jQuery.$.Deferred();
            deferred.promise = deferred.promise(); // promise is a property in angular
        } else if (this.options.angular) {
            deferred = this.options.angular.$q.defer();
        }

        if (!this._isUndefined(opts.body)) {
            cacheID = opts.url + '_body_' + JSON.stringify(opts.body);
        }
        if (!this._isUndefined(opts.cache)) {
            cache = opts.cache;
            if (!this._isUndefined(cache[cacheID])) {
                if (!this._isUndefined(callback) && callback) {
                    setTimeout(function () { callback(true, cache[cacheID]); }, 1);
                }
                deferred && deferred.resolve(cache[cacheID]);
                return deferred && deferred.promise;
            }
        }

        opts.successiveRetryCount = 0;
        var impl = function() {
            if (opts.successiveRetryCount >= self.hosts.length) {
                var error = { message: 'Cannot connect the Algolia\'s Search API. Please send an email to support@algolia.com to report the issue.' };
                if (!self._isUndefined(callback) && callback) {
                    opts.successiveRetryCount = 0;
                    callback(false, error);
                }
                deferred && deferred.reject(error);
                return;
            }
            opts.callback = function(retry, success, obj, body) {
                if (success && !self._isUndefined(opts.cache)) {
                    cache[cacheID] = body;
                }
                if (!success && retry) {
                    self.currentHostIndex = ++self.currentHostIndex % self.hosts.length;
                    opts.successiveRetryCount += 1;
                    impl();
                } else {
                    opts.successiveRetryCount = 0;
                    deferred && (success ? deferred.resolve(body) : deferred.reject(body));
                    if (!self._isUndefined(callback) && callback) {
                        callback(success, body);
                    }
                }
            };
            opts.hostname = self.hosts[self.currentHostIndex];
            self._jsonRequestByHost(opts);
        };
        impl();

        return deferred && deferred.promise;
    },

    _jsonRequestByHost: function(opts) {
        var self = this;
        var url = opts.hostname + opts.url;

        if (this.jsonp) {
            this._makeJsonpRequestByHost(url, opts);
        } else if (this.options.jQuery) {
            this._makejQueryRequestByHost(url, opts);
        } else if (this.options.angular) {
            this._makeAngularRequestByHost(url, opts);
        } else {
            this._makeXmlHttpRequestByHost(url, opts);
        }
    },

    /**
     * Make a $http
     *
     * @param url request url (includes endpoint and path)
     * @param opts all request opts
     */
    _makeAngularRequestByHost: function(url, opts) {
        var self = this;
        var body = null;

        if (!this._isUndefined(opts.body)) {
            body = JSON.stringify(opts.body);
        }

        url += ((url.indexOf('?') === -1) ? '?' : '&') + 'X-Algolia-API-Key=' + this.apiKey;
        url += '&X-Algolia-Application-Id=' + this.applicationID;
        if (this.userToken) {
            url += '&X-Algolia-UserToken=' + encodeURIComponent(this.userToken);
        }
        if (this.tagFilters) {
            url += '&X-Algolia-TagFilters=' + encodeURIComponent(this.tagFilters);
        }
        for (var i = 0; i < this.extraHeaders.length; ++i) {
            url += '&' + this.extraHeaders[i].key + '=' + this.extraHeaders[i].value;
        }
        this.options.angular.$http({
            url: url,
            method: opts.method,
            data: body,
            cache: false,
            timeout: (this.requestTimeoutInMs * (opts.successiveRetryCount + 1))
        }).then(function(response) {
            opts.callback(false, true, null, response.data);
        }, function(response) {
            if (response.status === 0) {
                // xhr.timeout is not handled by Angular.js right now
                // let's retry
                opts.callback(true, false, null, response.data);
            } else if (response.status == 400 || response.status === 403 || response.status === 404) {
                opts.callback(false, false, null, response.data);
            } else {
                opts.callback(true, false, null, response.data);
            }
        });
    },

    /**
     * Make a $.ajax
     *
     * @param url request url (includes endpoint and path)
     * @param opts all request opts
     */
    _makejQueryRequestByHost: function(url, opts) {
        var self = this;
        var body = null;

        if (!this._isUndefined(opts.body)) {
            body = JSON.stringify(opts.body);
        }

        url += ((url.indexOf('?') === -1) ? '?' : '&') + 'X-Algolia-API-Key=' + this.apiKey;
        url += '&X-Algolia-Application-Id=' + this.applicationID;
        if (this.userToken) {
            url += '&X-Algolia-UserToken=' + encodeURIComponent(this.userToken);
        }
        if (this.tagFilters) {
            url += '&X-Algolia-TagFilters=' + encodeURIComponent(this.tagFilters);
        }
        for (var i = 0; i < this.extraHeaders.length; ++i) {
            url += '&' + this.extraHeaders[i].key + '=' + this.extraHeaders[i].value;
        }
        this.options.jQuery.$.ajax(url, {
            type: opts.method,
            timeout: (this.requestTimeoutInMs * (opts.successiveRetryCount + 1)),
            dataType: 'json',
            data: body,
            error: function(xhr, textStatus, error) {
                if (textStatus === 'timeout') {
                    opts.callback(true, false, null, { 'message': 'Timeout - Could not connect to endpoint ' + url } );
                } else if (xhr.status === 400 || xhr.status === 403 || xhr.status === 404) {
                    opts.callback(false, false, null, xhr.responseJSON );
                } else {
                    opts.callback(true, false, null, { 'message': error } );
                }
            },
            success: function(data, textStatus, xhr) {
                opts.callback(false, true, null, data);
            }
        });
    },

    /**
     * Make a JSONP request
     *
     * @param url request url (includes endpoint and path)
     * @param opts all request options
     */
    _makeJsonpRequestByHost: function(url, opts) {
        if (opts.method !== 'GET') {
            opts.callback(true, false, null, { 'message': 'Method ' + opts.method + ' ' + url + ' is not supported by JSONP.' });
            return;
        }

        this.jsonpCounter = this.jsonpCounter || 0;
        this.jsonpCounter += 1;
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        var cb = 'algoliaJSONP_' + this.jsonpCounter;
        var done = false;
        var ontimeout = null;

        window[cb] = function(data) {
            opts.callback(false, true, null, data);
            try { delete window[cb]; } catch (e) { window[cb] = undefined; }
        };

        script.type = 'text/javascript';
        script.src = url + '?callback=' + cb + '&X-Algolia-Application-Id=' + this.applicationID + '&X-Algolia-API-Key=' + this.apiKey;

        if (this.tagFilters) {
            script.src += '&X-Algolia-TagFilters=' + encodeURIComponent(this.tagFilters);
        }

        if (this.userToken) {
            script.src += '&X-Algolia-UserToken=' + encodeURIComponent(this.userToken);
        }
        for (var i = 0; i < this.extraHeaders.length; ++i) {
            script.src += '&' + this.extraHeaders[i].key + '=' + this.extraHeaders[i].value;
        }


        if (opts.body && opts.body.params) {
            script.src += '&' + opts.body.params;
        }

        ontimeout = setTimeout(function() {
            script.onload = script.onreadystatechange = script.onerror = null;
            window[cb] = function(data) {
                try { delete window[cb]; } catch (e) { window[cb] = undefined; }
            };

            opts.callback(true, false, null, { 'message': 'Timeout - Failed to load JSONP script.' });
            head.removeChild(script);

            clearTimeout(ontimeout);
            ontimeout = null;

        }, this.requestTimeoutInMs);

        script.onload = script.onreadystatechange = function() {
            clearTimeout(ontimeout);
            ontimeout = null;

            if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
                done = true;

                if (typeof window[cb + '_loaded'] === 'undefined') {
                    opts.callback(true, false, null, { 'message': 'Failed to load JSONP script.' });
                    try { delete window[cb]; } catch (e) { window[cb] = undefined; }
                } else {
                    try { delete window[cb + '_loaded']; } catch (e) { window[cb + '_loaded'] = undefined; }
                }
                script.onload = script.onreadystatechange = null; // Handle memory leak in IE
                head.removeChild(script);
            }
        };

        script.onerror = function() {
            clearTimeout(ontimeout);
            ontimeout = null;

            opts.callback(true, false, null, { 'message': 'Failed to load JSONP script.' });
            head.removeChild(script);
            try { delete window[cb]; } catch (e) { window[cb] = undefined; }
        };

        head.appendChild(script);
    },

    /**
     * Make a XmlHttpRequest
     *
     * @param url request url (includes endpoint and path)
     * @param opts all request opts
     */
    _makeXmlHttpRequestByHost: function(url, opts) {
        var self = this;
        var xmlHttp = window.XMLHttpRequest ? new XMLHttpRequest() : {};
        var body = null;
        var ontimeout = null;

        if (!this._isUndefined(opts.body)) {
            body = JSON.stringify(opts.body);
        }

        url += ((url.indexOf('?') === -1) ? '?' : '&') + 'X-Algolia-API-Key=' + this.apiKey;
        url += '&X-Algolia-Application-Id=' + this.applicationID;
        if (this.userToken) {
            url += '&X-Algolia-UserToken=' + encodeURIComponent(this.userToken);
        }
        if (this.tagFilters) {
            url += '&X-Algolia-TagFilters=' + encodeURIComponent(this.tagFilters);
        }
        for (var i = 0; i < this.extraHeaders.length; ++i) {
            url += '&' + this.extraHeaders[i].key + '=' + this.extraHeaders[i].value;
        }
        if ('withCredentials' in xmlHttp) {
            xmlHttp.open(opts.method, url, true);
            xmlHttp.timeout = this.requestTimeoutInMs * (opts.successiveRetryCount + 1);
            if (body !== null) {
                /* This content type is specified to follow CORS 'simple header' directive */
                xmlHttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            }
        } else if (typeof XDomainRequest !== 'undefined') {
            // Handle IE8/IE9
            // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
            xmlHttp = new XDomainRequest();
            xmlHttp.open(opts.method, url);
        } else {
            // very old browser, not supported
            opts.callback(false, false, null, { 'message': 'CORS not supported' });
            return;
        }

        ontimeout = setTimeout(function() {
            xmlHttp.abort();
            // Prevent Internet Explorer 9, JScript Error c00c023f
            if (xmlHttp.aborted === true) {
              stopLoadAnimation();
              return;
            }
            opts.callback(true, false, null, { 'message': 'Timeout - Could not connect to endpoint ' + url } );

            clearTimeout(ontimeout);
            ontimeout = null;

        }, this.requestTimeoutInMs * (opts.successiveRetryCount + 1));

        xmlHttp.onload = function(event) {
            clearTimeout(ontimeout);
            ontimeout = null;

            if (!self._isUndefined(event) && event.target !== null) {
                var success = false;
                var response = null;

                if (typeof XDomainRequest !== 'undefined') {
                    // Handle CORS requests IE8/IE9
                    response = event.target.responseText;
                    success = (response && response.length > 0);
                } else {
                    response = event.target.response;
                    success = (event.target.status === 200 || event.target.status === 201);
                }

                var retry = !success && event.target.status !== 400 && event.target.status !== 403 && event.target.status !== 404;
                opts.callback(retry, success, event.target, response ? JSON.parse(response) : null);
            } else {
                opts.callback(false, true, event, JSON.parse(xmlHttp.responseText));
            }
        };
        xmlHttp.ontimeout = function(event) { // stop the network call but rely on ontimeout to call opt.callback
        };
        xmlHttp.onerror = function(event) {
            clearTimeout(ontimeout);
            ontimeout = null;
            opts.callback(true, false, null, { 'message': 'Could not connect to host', 'error': event } );
        };

        xmlHttp.send(body);
    },

     /*
     * Transform search param object in query string
     */
    _getSearchParams: function(args, params) {
        if (this._isUndefined(args) || args === null) {
            return params;
        }
        for (var key in args) {
            if (key !== null && args.hasOwnProperty(key)) {
                params += (params.length === 0) ? '?' : '&';
                params += key + '=' + encodeURIComponent(Object.prototype.toString.call(args[key]) === '[object Array]' ? JSON.stringify(args[key]) : args[key]);
            }
        }
        return params;
    },
    _isUndefined: function(obj) {
        return obj === void 0;
    },

    /// internal attributes
    applicationID: null,
    apiKey: null,
    tagFilters: null,
    userToken: null,
    hosts: [],
    cache: {},
    extraHeaders: []
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
         * @param callback (optional) the result callback with two arguments:
         *  success: boolean set to true if the request was successfull
         *  content: the server answer that contains 3 elements: createAt, taskId and objectID
         * @param objectID (optional) an objectID you want to attribute to this object
         * (if the attribute already exist the old object will be overwrite)
         */
        addObject: function(content, callback, objectID) {
            var indexObj = this;
            if (this.as._isUndefined(objectID)) {
                return this.as._jsonRequest({ method: 'POST',
                                       url: '/1/indexes/' + encodeURIComponent(indexObj.indexName),
                                       body: content,
                                       callback: callback });
            } else {
                return this.as._jsonRequest({ method: 'PUT',
                                       url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/' + encodeURIComponent(objectID),
                                       body: content,
                                       callback: callback });
            }

        },
        /*
         * Add several objects
         *
         * @param objects contains an array of objects to add
         * @param callback (optional) the result callback with two arguments:
         *  success: boolean set to true if the request was successfull
         *  content: the server answer that updateAt and taskID
         */
        addObjects: function(objects, callback) {
            var indexObj = this;
            var postObj = {requests:[]};
            for (var i = 0; i < objects.length; ++i) {
                var request = { action: 'addObject',
                                body: objects[i] };
                postObj.requests.push(request);
            }
            return this.as._jsonRequest({ method: 'POST',
                                   url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/batch',
                                   body: postObj,
                                   callback: callback });
        },
        /*
         * Get an object from this index
         *
         * @param objectID the unique identifier of the object to retrieve
         * @param callback (optional) the result callback with two arguments
         *  success: boolean set to true if the request was successfull
         *  content: the object to retrieve or the error message if a failure occured
         * @param attributes (optional) if set, contains the array of attribute names to retrieve
         */
        getObject: function(objectID, callback, attributes) {
            if (Object.prototype.toString.call(callback) === '[object Array]' && !attributes) {
                attributes = callback;
                callback = null;
            }
            var indexObj = this;
            var params = '';
            if (!this.as._isUndefined(attributes)) {
                params = '?attributes=';
                for (var i = 0; i < attributes.length; ++i) {
                    if (i !== 0) {
                        params += ',';
                    }
                    params += attributes[i];
                }
            }
            if (this.as.jsonp === null) {
                return this.as._jsonRequest({ method: 'GET',
                                       url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/' + encodeURIComponent(objectID) + params,
                                       callback: callback });
            } else {
                var pObj = {params: params};
                return this.as._jsonRequest({ method: 'GET',
                                       url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/' + encodeURIComponent(objectID),
                                       callback: callback,
                                       body: pObj});
            }
        },

        /*
         * Update partially an object (only update attributes passed in argument)
         *
         * @param partialObject contains the javascript attributes to override, the
         *  object must contains an objectID attribute
         * @param callback (optional) the result callback with two arguments:
         *  success: boolean set to true if the request was successfull
         *  content: the server answer that contains 3 elements: createAt, taskId and objectID
         */
        partialUpdateObject: function(partialObject, callback) {
            var indexObj = this;
            return this.as._jsonRequest({ method: 'POST',
                                   url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/' + encodeURIComponent(partialObject.objectID) + '/partial',
                                   body: partialObject,
                                   callback:  callback });
        },
        /*
         * Partially Override the content of several objects
         *
         * @param objects contains an array of objects to update (each object must contains a objectID attribute)
         * @param callback (optional) the result callback with two arguments:
         *  success: boolean set to true if the request was successfull
         *  content: the server answer that updateAt and taskID
         */
        partialUpdateObjects: function(objects, callback) {
            var indexObj = this;
            var postObj = {requests:[]};
            for (var i = 0; i < objects.length; ++i) {
                var request = { action: 'partialUpdateObject',
                                objectID: objects[i].objectID,
                                body: objects[i] };
                postObj.requests.push(request);
            }
            return this.as._jsonRequest({ method: 'POST',
                                   url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/batch',
                                   body: postObj,
                                   callback: callback });
        },
        /*
         * Override the content of object
         *
         * @param object contains the javascript object to save, the object must contains an objectID attribute
         * @param callback (optional) the result callback with two arguments:
         *  success: boolean set to true if the request was successfull
         *  content: the server answer that updateAt and taskID
         */
        saveObject: function(object, callback) {
            var indexObj = this;
            return this.as._jsonRequest({ method: 'PUT',
                                   url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/' + encodeURIComponent(object.objectID),
                                   body: object,
                                   callback: callback });
        },
        /*
         * Override the content of several objects
         *
         * @param objects contains an array of objects to update (each object must contains a objectID attribute)
         * @param callback (optional) the result callback with two arguments:
         *  success: boolean set to true if the request was successfull
         *  content: the server answer that updateAt and taskID
         */
        saveObjects: function(objects, callback) {
            var indexObj = this;
            var postObj = {requests:[]};
            for (var i = 0; i < objects.length; ++i) {
                var request = { action: 'updateObject',
                                objectID: objects[i].objectID,
                                body: objects[i] };
                postObj.requests.push(request);
            }
            return this.as._jsonRequest({ method: 'POST',
                                   url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/batch',
                                   body: postObj,
                                   callback: callback });
        },
        /*
         * Delete an object from the index
         *
         * @param objectID the unique identifier of object to delete
         * @param callback (optional) the result callback with two arguments:
         *  success: boolean set to true if the request was successfull
         *  content: the server answer that contains 3 elements: createAt, taskId and objectID
         */
        deleteObject: function(objectID, callback) {
            if (objectID === null || objectID.length === 0) {
                callback(false, { message: 'empty objectID'});
                return;
            }
            var indexObj = this;
            return this.as._jsonRequest({ method: 'DELETE',
                                   url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/' + encodeURIComponent(objectID),
                                   callback: callback });
        },
        /*
         * Search inside the index using XMLHttpRequest request (Using a POST query to
         * minimize number of OPTIONS queries: Cross-Origin Resource Sharing).
         *
         * @param query the full text query
         * @param callback the result callback with two arguments:
         *  success: boolean set to true if the request was successfull. If false, the content contains the error.
         *  content: the server answer that contains the list of results.
         * @param args (optional) if set, contains an object with query parameters:
         * - page: (integer) Pagination parameter used to select the page to retrieve.
         *                   Page is zero-based and defaults to 0. Thus, to retrieve the 10th page you need to set page=9
         * - hitsPerPage: (integer) Pagination parameter used to select the number of hits per page. Defaults to 20.
         * - attributesToRetrieve: a string that contains the list of object attributes you want to retrieve (let you minimize the answer size).
         *   Attributes are separated with a comma (for example "name,address").
         *   You can also use a string array encoding (for example ["name","address"]).
         *   By default, all attributes are retrieved. You can also use '*' to retrieve all values when an attributesToRetrieve setting is specified for your index.
         * - attributesToHighlight: a string that contains the list of attributes you want to highlight according to the query.
         *   Attributes are separated by a comma. You can also use a string array encoding (for example ["name","address"]).
         *   If an attribute has no match for the query, the raw value is returned. By default all indexed text attributes are highlighted.
         *   You can use `*` if you want to highlight all textual attributes. Numerical attributes are not highlighted.
         *   A matchLevel is returned for each highlighted attribute and can contain:
         *      - full: if all the query terms were found in the attribute,
         *      - partial: if only some of the query terms were found,
         *      - none: if none of the query terms were found.
         * - attributesToSnippet: a string that contains the list of attributes to snippet alongside the number of words to return (syntax is `attributeName:nbWords`).
         *    Attributes are separated by a comma (Example: attributesToSnippet=name:10,content:10).
         *    You can also use a string array encoding (Example: attributesToSnippet: ["name:10","content:10"]). By default no snippet is computed.
         * - minWordSizefor1Typo: the minimum number of characters in a query word to accept one typo in this word. Defaults to 3.
         * - minWordSizefor2Typos: the minimum number of characters in a query word to accept two typos in this word. Defaults to 7.
         * - getRankingInfo: if set to 1, the result hits will contain ranking information in _rankingInfo attribute.
         * - aroundLatLng: search for entries around a given latitude/longitude (specified as two floats separated by a comma).
         *   For example aroundLatLng=47.316669,5.016670).
         *   You can specify the maximum distance in meters with the aroundRadius parameter (in meters) and the precision for ranking with aroundPrecision
         *   (for example if you set aroundPrecision=100, two objects that are distant of less than 100m will be considered as identical for "geo" ranking parameter).
         *   At indexing, you should specify geoloc of an object with the _geoloc attribute (in the form {"_geoloc":{"lat":48.853409, "lng":2.348800}})
         * - insideBoundingBox: search entries inside a given area defined by the two extreme points of a rectangle (defined by 4 floats: p1Lat,p1Lng,p2Lat,p2Lng).
         *   For example insideBoundingBox=47.3165,4.9665,47.3424,5.0201).
         *   At indexing, you should specify geoloc of an object with the _geoloc attribute (in the form {"_geoloc":{"lat":48.853409, "lng":2.348800}})
         * - numericFilters: a string that contains the list of numeric filters you want to apply separated by a comma.
         *   The syntax of one filter is `attributeName` followed by `operand` followed by `value`. Supported operands are `<`, `<=`, `=`, `>` and `>=`.
         *   You can have multiple conditions on one attribute like for example numericFilters=price>100,price<1000.
         *   You can also use a string array encoding (for example numericFilters: ["price>100","price<1000"]).
         * - tagFilters: filter the query by a set of tags. You can AND tags by separating them by commas.
         *   To OR tags, you must add parentheses. For example, tags=tag1,(tag2,tag3) means tag1 AND (tag2 OR tag3).
         *   You can also use a string array encoding, for example tagFilters: ["tag1",["tag2","tag3"]] means tag1 AND (tag2 OR tag3).
         *   At indexing, tags should be added in the _tags** attribute of objects (for example {"_tags":["tag1","tag2"]}).
         * - facetFilters: filter the query by a list of facets.
         *   Facets are separated by commas and each facet is encoded as `attributeName:value`.
         *   For example: `facetFilters=category:Book,author:John%20Doe`.
         *   You can also use a string array encoding (for example `["category:Book","author:John%20Doe"]`).
         * - facets: List of object attributes that you want to use for faceting.
         *   Attributes are separated with a comma (for example `"category,author"` ).
         *   You can also use a JSON string array encoding (for example ["category","author"]).
         *   Only attributes that have been added in **attributesForFaceting** index setting can be used in this parameter.
         *   You can also use `*` to perform faceting on all attributes specified in **attributesForFaceting**.
         * - queryType: select how the query words are interpreted, it can be one of the following value:
         *    - prefixAll: all query words are interpreted as prefixes,
         *    - prefixLast: only the last word is interpreted as a prefix (default behavior),
         *    - prefixNone: no query word is interpreted as a prefix. This option is not recommended.
         * - optionalWords: a string that contains the list of words that should be considered as optional when found in the query.
         *   The list of words is comma separated.
         * - distinct: If set to 1, enable the distinct feature (disabled by default) if the attributeForDistinct index setting is set.
         *   This feature is similar to the SQL "distinct" keyword: when enabled in a query with the distinct=1 parameter,
         *   all hits containing a duplicate value for the attributeForDistinct attribute are removed from results.
         *   For example, if the chosen attribute is show_name and several hits have the same value for show_name, then only the best
         *   one is kept and others are removed.
         * @param delay (optional) if set, wait for this delay (in ms) and only send the query if there was no other in the meantime.
         */
        search: function(query, callback, args, delay) {
            if (typeof callback === 'object' && (this.as._isUndefined(args) || !args)) {
                args = callback;
                callback = null;
            }
            var indexObj = this;
            var params = 'query=' + encodeURIComponent(query);
            if (!this.as._isUndefined(args) && args !== null) {
                params = this.as._getSearchParams(args, params);
            }
            window.clearTimeout(indexObj.onDelayTrigger);
            if (!this.as._isUndefined(delay) && delay !== null && delay > 0) {
                var onDelayTrigger = window.setTimeout( function() {
                    indexObj._search(params, callback);
                }, delay);
                indexObj.onDelayTrigger = onDelayTrigger;
            } else {
                return this._search(params, callback);
            }
        },

        /*
         * Browse all index content
         *
         * @param page Pagination parameter used to select the page to retrieve.
         *             Page is zero-based and defaults to 0. Thus, to retrieve the 10th page you need to set page=9
         * @param hitsPerPage: Pagination parameter used to select the number of hits per page. Defaults to 1000.
         */
        browse: function(page, callback, hitsPerPage) {
            if (+callback > 0 && (this.as._isUndefined(hitsPerPage) || !hitsPerPage)) {
                hitsPerPage = callback;
                callback = null;
            }
            var indexObj = this;
            var params = '?page=' + page;
            if (!this.as._isUndefined(hitsPerPage)) {
                params += '&hitsPerPage=' + hitsPerPage;
            }
            return this.as._jsonRequest({ method: 'GET',
                                   url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/browse' + params,
                                   callback: callback });
        },

        /*
         * Get a Typeahead.js adapter
         * @param searchParams contains an object with query parameters (see search for details)
         */
        ttAdapter: function(params) {
            var self = this;
            return function(query, cb) {
                self.search(query, function(success, content) {
                    if (success) {
                        cb(content.hits);
                    }
                }, params);
            };
        },

        /*
         * Wait the publication of a task on the server.
         * All server task are asynchronous and you can check with this method that the task is published.
         *
         * @param taskID the id of the task returned by server
         * @param callback the result callback with with two arguments:
         *  success: boolean set to true if the request was successfull
         *  content: the server answer that contains the list of results
         */
        waitTask: function(taskID, callback) {
            var indexObj = this;
            return this.as._jsonRequest({ method: 'GET',
                                   url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/task/' + taskID,
                                   callback: function(success, body) {
                if (success) {
                    if (body.status === 'published') {
                        callback(true, body);
                    } else {
                        setTimeout(function() { indexObj.waitTask(taskID, callback); }, 100);
                    }
                } else {
                    callback(false, body);
                }
            }});
        },

        /*
         * This function deletes the index content. Settings and index specific API keys are kept untouched.
         *
         * @param callback (optional) the result callback with two arguments
         *  success: boolean set to true if the request was successfull
         *  content: the settings object or the error message if a failure occured
         */
        clearIndex: function(callback) {
            var indexObj = this;
            return this.as._jsonRequest({ method: 'POST',
                                   url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/clear',
                                   callback: callback });
        },
        /*
         * Get settings of this index
         *
         * @param callback (optional) the result callback with two arguments
         *  success: boolean set to true if the request was successfull
         *  content: the settings object or the error message if a failure occured
         */
        getSettings: function(callback) {
            var indexObj = this;
            return this.as._jsonRequest({ method: 'GET',
                                   url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/settings',
                                   callback: callback });
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
         * - attributesToSnippet**: (array of strings) default list of attributes to snippet alongside the number of words to return (syntax is attributeName:nbWords).
         *   By default no snippet is computed. If set to null, no snippet is computed.
         * - attributesToIndex: (array of strings) the list of fields you want to index.
         *   If set to null, all textual and numerical attributes of your objects are indexed, but you should update it to get optimal results.
         *   This parameter has two important uses:
         *     - Limit the attributes to index: For example if you store a binary image in base64, you want to store it and be able to
         *       retrieve it but you don't want to search in the base64 string.
         *     - Control part of the ranking*: (see the ranking parameter for full explanation) Matches in attributes at the beginning of
         *       the list will be considered more important than matches in attributes further down the list.
         *       In one attribute, matching text at the beginning of the attribute will be considered more important than text after, you can disable
         *       this behavior if you add your attribute inside `unordered(AttributeName)`, for example attributesToIndex: ["title", "unordered(text)"].
         * - attributesForFaceting: (array of strings) The list of fields you want to use for faceting.
         *   All strings in the attribute selected for faceting are extracted and added as a facet. If set to null, no attribute is used for faceting.
         * - attributeForDistinct: (string) The attribute name used for the Distinct feature. This feature is similar to the SQL "distinct" keyword: when enabled
         *   in query with the distinct=1 parameter, all hits containing a duplicate value for this attribute are removed from results.
         *   For example, if the chosen attribute is show_name and several hits have the same value for show_name, then only the best one is kept and others are removed.
         * - ranking: (array of strings) controls the way results are sorted.
         *   We have six available criteria:
         *    - typo: sort according to number of typos,
         *    - geo: sort according to decreassing distance when performing a geo-location based search,
         *    - proximity: sort according to the proximity of query words in hits,
         *    - attribute: sort according to the order of attributes defined by attributesToIndex,
         *    - exact:
         *        - if the user query contains one word: sort objects having an attribute that is exactly the query word before others.
         *          For example if you search for the "V" TV show, you want to find it with the "V" query and avoid to have all popular TV
         *          show starting by the v letter before it.
         *        - if the user query contains multiple words: sort according to the number of words that matched exactly (and not as a prefix).
         *    - custom: sort according to a user defined formula set in **customRanking** attribute.
         *   The standard order is ["typo", "geo", "proximity", "attribute", "exact", "custom"]
         * - customRanking: (array of strings) lets you specify part of the ranking.
         *   The syntax of this condition is an array of strings containing attributes prefixed by asc (ascending order) or desc (descending order) operator.
         *   For example `"customRanking" => ["desc(population)", "asc(name)"]`
         * - queryType: Select how the query words are interpreted, it can be one of the following value:
         *   - prefixAll: all query words are interpreted as prefixes,
         *   - prefixLast: only the last word is interpreted as a prefix (default behavior),
         *   - prefixNone: no query word is interpreted as a prefix. This option is not recommended.
         * - highlightPreTag: (string) Specify the string that is inserted before the highlighted parts in the query result (default to "<em>").
         * - highlightPostTag: (string) Specify the string that is inserted after the highlighted parts in the query result (default to "</em>").
         * - optionalWords: (array of strings) Specify a list of words that should be considered as optional when found in the query.
         * @param callback (optional) the result callback with two arguments
         *  success: boolean set to true if the request was successfull
         *  content: the server answer or the error message if a failure occured
         */
        setSettings: function(settings, callback) {
            var indexObj = this;
            return this.as._jsonRequest({ method: 'PUT',
                                   url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/settings',
                                   body: settings,
                                   callback: callback });
        },
        /*
         * List all existing user keys associated to this index
         *
         * @param callback the result callback with two arguments
         *  success: boolean set to true if the request was successfull
         *  content: the server answer with user keys list or error description if success is false.
         */
        listUserKeys: function(callback) {
            var indexObj = this;
            return this.as._jsonRequest({ method: 'GET',
                                   url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/keys',
                                   callback: callback });
        },
        /*
         * Get ACL of a user key associated to this index
         *
         * @param callback the result callback with two arguments
         *  success: boolean set to true if the request was successfull
         *  content: the server answer with user keys list or error description if success is false.
         */
        getUserKeyACL: function(key, callback) {
            var indexObj = this;
            return this.as._jsonRequest({ method: 'GET',
                                   url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/keys/' + key,
                                   callback: callback });
        },
        /*
         * Delete an existing user key associated to this index
         *
         * @param callback the result callback with two arguments
         *  success: boolean set to true if the request was successfull
         *  content: the server answer with user keys list or error description if success is false.
         */
        deleteUserKey: function(key, callback) {
            var indexObj = this;
            return this.as._jsonRequest({ method: 'DELETE',
                                   url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/keys/' + key,
                                   callback: callback });
        },
        /*
         * Add an existing user key associated to this index
         *
         * @param acls the list of ACL for this key. Defined by an array of strings that
         * can contains the following values:
         *   - search: allow to search (https and http)
         *   - addObject: allows to add/update an object in the index (https only)
         *   - deleteObject : allows to delete an existing object (https only)
         *   - deleteIndex : allows to delete index content (https only)
         *   - settings : allows to get index settings (https only)
         *   - editSettings : allows to change index settings (https only)
         * @param callback the result callback with two arguments
         *  success: boolean set to true if the request was successfull
         *  content: the server answer with user keys list or error description if success is false.
         */
        addUserKey: function(acls, callback) {
            var indexObj = this;
            var aclsObject = {};
            aclsObject.acl = acls;
            return this.as._jsonRequest({ method: 'POST',
                                   url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/keys',
                                   body: aclsObject,
                                   callback: callback });
        },
        /*
         * Add an existing user key associated to this index
         *
         * @param acls the list of ACL for this key. Defined by an array of strings that
         * can contains the following values:
         *   - search: allow to search (https and http)
         *   - addObject: allows to add/update an object in the index (https only)
         *   - deleteObject : allows to delete an existing object (https only)
         *   - deleteIndex : allows to delete index content (https only)
         *   - settings : allows to get index settings (https only)
         *   - editSettings : allows to change index settings (https only)
         * @param validity the number of seconds after which the key will be automatically removed (0 means no time limit for this key)
         * @param maxQueriesPerIPPerHour Specify the maximum number of API calls allowed from an IP address per hour.
         * @param maxHitsPerQuery Specify the maximum number of hits this API key can retrieve in one call.
         * @param callback the result callback with two arguments
         *  success: boolean set to true if the request was successfull
         *  content: the server answer with user keys list or error description if success is false.
         */
        addUserKeyWithValidity: function(acls, validity, maxQueriesPerIPPerHour, maxHitsPerQuery, callback) {
            var indexObj = this;
            var aclsObject = {};
            aclsObject.acl = acls;
            aclsObject.validity = validity;
            aclsObject.maxQueriesPerIPPerHour = maxQueriesPerIPPerHour;
            aclsObject.maxHitsPerQuery = maxHitsPerQuery;
            return this.as._jsonRequest({ method: 'POST',
                                   url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/keys',
                                   body: aclsObject,
                                   callback: callback });
        },
        ///
        /// Internal methods only after this line
        ///
        _search: function(params, callback) {
            var pObj = {params: params};
            if (this.as.jsonp === null) {
                var self = this;
                return this.as._jsonRequest({ cache: this.cache,
                    method: 'POST',
                    url: '/1/indexes/' + encodeURIComponent(this.indexName) + '/query',
                    body: pObj,
                    callback: function(success, content) {
                        if (!success) {
                            // retry first with JSONP
                            self.as.jsonp = true;
                            self._search(params, callback);
                        } else {
                            self.as.jsonp = false;
                            callback && callback(success, content);
                        }
                    }
                });
            } else if (this.as.jsonp) {
                return this.as._jsonRequest({ cache: this.cache,
                                       method: 'GET',
                                       url: '/1/indexes/' + encodeURIComponent(this.indexName),
                                       body: pObj,
                                       callback: callback });
            } else {
                return this.as._jsonRequest({ cache: this.cache,
                                       method: 'POST',
                                       url: '/1/indexes/' + encodeURIComponent(this.indexName) + '/query',
                                       body: pObj,
                                       callback: callback});
            }
        },

        // internal attributes
        as: null,
        indexName: null,
        cache: {},
        typeAheadArgs: null,
        typeAheadValueOption: null
};
