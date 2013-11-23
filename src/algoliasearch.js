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
 * @param method specify if the protocol used is http or https (http by default to make the first search query faster).
 *        You need to use https is you are doing something else than just search queries.
 * @param resolveDNS let you disable first empty query that is launch to warmup the service
 * @param hostsArray (optionnal) the list of hosts that you have received for the service
 */
var AlgoliaSearch = function(applicationID, apiKey, method, resolveDNS, hostsArray) {
    this.applicationID = applicationID;
    this.apiKey = apiKey;
    if (this._isUndefined(hostsArray)) {
        hostsArray = [applicationID + '-1.algolia.io',
                      applicationID + '-2.algolia.io',
                      applicationID + '-3.algolia.io'];
    }
    this.hosts = [];
    // Add hosts in random order
    for (var i = 0; i < hostsArray.length; ++i) {
        if (Math.random() > 0.5) {
            this.hosts.reverse();
        }
        if (this._isUndefined(method) || method == null) {
            this.hosts.push(('https:' == document.location.protocol ? 'https' : 'http') + '://' + hostsArray[i]);
        } else if (method === 'https' || method === 'HTTPS') {
            this.hosts.push('https://' + hostsArray[i]);
        } else {
            this.hosts.push('http://' + hostsArray[i]);
        }
    }
    if (Math.random() > 0.5) {
        this.hosts.reverse();
    }
    if (this._isUndefined(resolveDNS) || resolveDNS) {
        // Perform a call to solve DNS (avoid to slow down the first user query)
        this._jsonRequest({ method: 'GET',
                            url: '/1/isalive' });
    }
};

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
        this._jsonRequest({ method: 'DELETE',
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
        this._jsonRequest({ method: 'POST',
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
        this._jsonRequest({ method: 'POST',
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

        this._jsonRequest({ method: 'GET',
                            url: '/1/logs?offset=' + offset + '&length=' + length,
                            callback: callback });
    },
    /*
     * List all existing indexes
     *
     * @param callback the result callback with two arguments
     *  success: boolean set to true if the request was successfull
     *  content: the server answer with index list or error description if success is false.
     */
    listIndexes: function(callback) {
        this._jsonRequest({ method: 'GET',
                            url: '/1/indexes/',
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
        this._jsonRequest({ method: 'GET',
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
        this._jsonRequest({ method: 'GET',
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
        this._jsonRequest({ method: 'DELETE',
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
        this._jsonRequest({ method: 'POST',
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
        this._jsonRequest({ method: 'POST',
                            url: '/1/indexes/' + indexObj.indexName + '/keys',
                            body: aclsObject,
                            callback: callback });
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
        var params = 'query=' + query;
        if (!this._isUndefined(args) && args != null) {
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
        var params = {requests: [], apiKey: this.apiKey, appID: this.applicationID};
        for (var i = 0; i < as.batch.length; ++i) {
            params.requests.push(as.batch[i]);
        }
        window.clearTimeout(as.onDelayTrigger);
        if (!this._isUndefined(delay) && delay != null && delay > 0) {
            var onDelayTrigger = window.setTimeout( function() {
                as._sendQueriesBatch(params, callback);
            }, delay);
            as.onDelayTrigger = onDelayTrigger;
        } else {
            this._sendQueriesBatch(params, callback);
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

    _sendQueriesBatch: function(params, callback) {
        this._jsonRequest({ cache: this.cache,
                               method: 'POST',
                               url: '/1/indexes/*/queries',
                               body: params,
                               callback: callback });
    },
    /*
     * Wrapper that try all hosts to maximize the quality of service
     */
    _jsonRequest: function(opts) {
        var self = this;
        var callback = opts.callback;
        var cache = null;
        var cacheID = opts.url;
        if (!this._isUndefined(opts.body)) {
            cacheID = opts.url + '_body_' + JSON.stringify(opts.body);
        }
        if (!this._isUndefined(opts.cache)) {
            cache = opts.cache;
            if (!this._isUndefined(cache[cacheID])) {
                if (!this._isUndefined(callback)) {
                    callback(true, cache[cacheID]);
                }
                return;
            }
        }

        var impl = function(position) {
            var idx = 0;
            if (!self._isUndefined(position)) {
                idx = position;
            }
            if (self.hosts.length <= idx) {
                if (!self._isUndefined(callback)) {
                    callback(false, { message: 'Cannot contact server'});
                }
                return;
            }
            opts.callback = function(retry, success, res, body) {
                if (!success && !self._isUndefined(body)) {
                    console.log('Error: ' + body.message);
                }
                if (success && !self._isUndefined(opts.cache)) {
                    cache[cacheID] = body;
                }
                if (!success && retry && (idx + 1) < self.hosts.length) {
                    impl(idx + 1);
                } else {
                    if (!self._isUndefined(callback)) {
                        callback(success, body);
                    }
                }
            };
            opts.hostname = self.hosts[idx];
            self._jsonRequestByHost(opts);
        };
        impl();
    },

    _jsonRequestByHost: function(opts) {
        var body = null;
        var self = this;
        if (!this._isUndefined(opts.body)) {
            body = JSON.stringify(opts.body);
        }
        var url = opts.hostname + opts.url;
        var xmlHttp = null;

        xmlHttp = new XMLHttpRequest();
        if ('withCredentials' in xmlHttp) {
            xmlHttp.open(opts.method, url , true);
            xmlHttp.setRequestHeader('X-Algolia-API-Key', this.apiKey);
            xmlHttp.setRequestHeader('X-Algolia-Application-Id', this.applicationID);
            if (body != null) {
                xmlHttp.setRequestHeader('Content-type', 'application/json');
            }
        } else if (typeof XDomainRequest != 'undefined') {
            // Handle IE8/IE9
            // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
            xmlHttp = new XDomainRequest();
            xmlHttp.open(opts.method, url);
        } else {
            // very old browser, not supported
            console.log('your browser is too old to support CORS requests');
        }
        xmlHttp.send(body);
        xmlHttp.onload = function(event) {
            if (!self._isUndefined(event)) {
                var retry = (event.target.status === 0 || event.target.status === 503);
                var success = (event.target.status === 200 || event.target.status === 201);
                opts.callback(retry, success, event.target, event.target.response != null ? JSON.parse(event.target.response) : null);
            } else {
                opts.callback(false, true, event, JSON.parse(xmlHttp.responseText));
            }
        };
        xmlHttp.onerror = function() {
            opts.callback(true, false, null, { 'message': 'Could not connect to Host'} );
        };
    },

     /*
     * Transform search param object in query string
     */
    _getSearchParams: function(args, params) {
        if (this._isUndefined(args) || args == null) {
            return params;
        }
        for (var key in args) {
            if (key != null && args.hasOwnProperty(key)) {
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
    hosts: [],
    cache: {}
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
                this.as._jsonRequest({ method: 'POST',
                                       url: '/1/indexes/' + encodeURIComponent(indexObj.indexName),
                                       body: content,
                                       callback: callback });
            } else {
                this.as._jsonRequest({ method: 'PUT',
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
            this.as._jsonRequest({ method: 'POST',
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
            this.as._jsonRequest({ method: 'GET',
                                   url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/' + encodeURIComponent(objectID) + params,
                                   callback: callback });
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
            this.as._jsonRequest({ method: 'POST',
                                   url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/' + encodeURIComponent(partialObject.objectID) + '/partial',
                                   body: partialObject,
                                   callback:  callback });
        },

        /*
         * Override the content of object
         *
         * @param object contains the javascript object to save, the object must contains an objectID attribute
         * @param callback (optional) the result callback with two arguments:
         *  success: boolean set to true if the request was successfull
         *  content: the server answer that updateAt and taskID
         */
        saveObject: function(object, callback) {
            var indexObj = this;
            this.as._jsonRequest({ method: 'PUT',
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
                                objectID: encodeURIComponent(objects[i].objectID),
                                body: objects[i] };
                postObj.requests.push(request);
            }
            this.as._jsonRequest({ method: 'POST',
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
            if (objectID == null || objectID.length === 0) {
                callback(false, { message: 'empty objectID'});
                return;
            }
            var indexObj = this;
            this.as._jsonRequest({ method: 'DELETE',
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
         * @param delay (optional) if set, wait for this delay (in ms) and only send the query if there was no other in the meantime.
         */
        search: function(query, callback, args, delay) {
            var indexObj = this;
            var params = 'query=' + encodeURIComponent(query);
            if (!this.as._isUndefined(args) && args != null) {
                params = this.as._getSearchParams(args, params);
            }
            window.clearTimeout(indexObj.onDelayTrigger);
            if (!this.as._isUndefined(delay) && delay != null && delay > 0) {
                var onDelayTrigger = window.setTimeout( function() {
                    indexObj._search(params, callback);
                }, delay);
                indexObj.onDelayTrigger = onDelayTrigger;
            } else {
                this._search(params, callback);
            }
        },
        /*
         * Get transport layer for Typeahead.js
         * @param args (optional) if set, contains an object with query parameters (see search for details)
         * @param propertyName(optional) if set, contains the name of property that will be used for 
         */
        getTypeaheadTransport: function(args, valueOption) {
            this.typeAheadArgs = args;
            if (typeof valueOption !== 'undefined') {
                this.typeAheadValueOption = valueOption;
            }
            return this;
        },
        // Method used by Typeahead.js.
        get: function(query, processRemoteData, that, cb, suggestions) {
            self = this;
            this.search(query, function(success, content) {
                if (success) {
                    for (var i = 0; i < content.hits.length; ++i) {
                        // Add an attribute value with the first string
                        var obj = content.hits[i],
                            found = false;

                        if (typeof obj.value === 'undefined') {
                            if (self.typeAheadValueOption != null) {
                                if (typeof self.typeAheadValueOption === "function") {
                                    obj.value = self.typeAheadValueOption(obj);
                                    found = true;
                                } else if (typeof obj[self.typeAheadValueOption] !== 'undefined') {
                                    obj.value = obj[self.typeAheadValueOption];
                                    found = true;
                                }
                            }
                            if (! found) {
                                for (var propertyName in obj) {
                                    if (!found && obj.hasOwnProperty(propertyName) && typeof obj[propertyName] === 'string') {
                                        obj.value = obj[propertyName];
                                        found = true;
                                    }
                                }
                            }
                        }
                        suggestions.push(that._transformDatum(obj));
                    }
                    cb && cb(suggestions);
                }
            }, self.typeAheadArgs);
            return true;
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
            this.as._jsonRequest({ method: 'GET',
                                   url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/task/' + taskID,
                                   callback: function(success, body) {
                if (success && body.status === 'published') {
                    callback(true, body);
                } else if (success && body.pendingTask) {
                    return indexObj.waitTask(taskID, callback);
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
            this.as._jsonRequest({ method: 'POST',
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
            this.as._jsonRequest({ method: 'GET',
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
         * - ranking: (array of strings) controls the way results are sorted.
         *   We have six available criteria: 
         *    - typo: sort according to number of typos,
         *    - geo: sort according to decreassing distance when performing a geo-location based search,
         *    - proximity: sort according to the proximity of query words in hits,
         *    - attribute: sort according to the order of attributes defined by attributesToIndex,
         *    - exact: sort according to the number of words that are matched identical to query word (and not as a prefix),
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
            this.as._jsonRequest({ method: 'PUT',
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
            this.as._jsonRequest({ method: 'GET',
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
            this.as._jsonRequest({ method: 'GET',
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
            this.as._jsonRequest({ method: 'DELETE',
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
            this.as._jsonRequest({ method: 'POST',
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
            this.as._jsonRequest({ method: 'POST',
                                   url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/keys',
                                   body: aclsObject,
                                   callback: callback });
        },
        ///
        /// Internal methods only after this line
        ///
        _search: function(params, callback) {
            this.as._jsonRequest({ cache: this.cache,
                                   method: 'POST',
                                   url: '/1/indexes/' + encodeURIComponent(this.indexName) + '/query',
                                   body: {params: params, apiKey: this.as.apiKey, appID: this.as.applicationID},
                                   callback: callback });
        },

        // internal attributes
        as: null,
        indexName: null,
        cache: {},
        typeAheadArgs: null,
        typeAheadValueOption: null,
        emptyConstructor: function() {}
};
