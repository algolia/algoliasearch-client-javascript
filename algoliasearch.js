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
 * This library depends of Underscore Javascript library. 
 * You should include it if you are not using algoliasearch-min.js
 */

/*
 * Algolia Search library initialization
 * @param applicationID the application ID you have in your admin interface
 * @param apiKey a valid API key for the service
 * @param hostsArray the list of hosts that you have received for the service
 */
var AlgoliaSearch = function(applicationID, apiKey, hostsArray, method) {
    this.applicationID = applicationID;
    this.apiKey = apiKey;
    // Add hosts in random order
    for (var i = 0; i < hostsArray.length; ++i) {
        if (Math.random() > 0.5)
            this.hosts.reverse();
        if (!_.isUndefined(method) && (method === "https" || method === "HTTPS"))
            this.hosts.push("https://" + hostsArray[i]);
        else
            this.hosts.push("http://" + hostsArray[i]);
    }
    if (Math.random() > 0.5)
        this.hosts.reverse();
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
        var indexObj = this;
        this._jsonRequest({ method: 'DELETE',
                            url: '/1/indexes/' + encodeURIComponent(indexName), 
                            callback: function(success, res, body) {
            if (!_.isUndefined(callback))
                callback(success, body);
        }});
    },

    /*
     * List all existing indexes
     *
     * @param callback the result callback with two arguments
     *  success: boolean set to true if the request was successfull
     *  content: the server answer with index list or error description if success is false.
     */
    listIndexes: function(callback) {
        var indexObj = this;
        this._jsonRequest({ method: 'GET',
                            url: '/1/indexes/', 
                            callback: function(success, res, body) {
            if (!_.isUndefined(callback))
                callback(success, body);
        }});
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
        var indexObj = this;
        this._jsonRequest({ method: 'GET',
                            url: '/1/keys', 
                            callback: function(success, res, body) {
            if (!_.isUndefined(callback))
                callback(success, body);
        }});
    },
    /*
     * Get ACL of a user key
     *
     * @param callback the result callback with two arguments
     *  success: boolean set to true if the request was successfull
     *  content: the server answer with user keys list or error description if success is false.
     */
    getUserKeyACL: function(key, callback) {
        var indexObj = this;
        this._jsonRequest({ method: 'GET',
                            url: '/1/keys/' + key, 
                            callback: function(success, res, body) {
            if (!_.isUndefined(callback))
                callback(success, body);
        }});
    },
    /*
     * Delete an existing user key
     *
     * @param callback the result callback with two arguments
     *  success: boolean set to true if the request was successfull
     *  content: the server answer with user keys list or error description if success is false.
     */
    deleteUserKey: function(key, callback) {
        var indexObj = this;
        this._jsonRequest({ method: 'DELETE',
                            url: '/1/keys/' + key, 
                            callback: function(success, res, body) {
            if (!_.isUndefined(callback))
                callback(success, body);
        }});
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
        var indexObj = this;
        var aclsObject = new Object();
        aclsObject.acl = acls;
        this._jsonRequest({ method: 'POST',
                            url: '/1/keys', 
                            body: aclsObject,
                            callback: function(success, res, body) {
            if (!_.isUndefined(callback))
                callback(success, body);
        }});
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
     * @param callback the result callback with two arguments
     *  success: boolean set to true if the request was successfull
     *  content: the server answer with user keys list or error description if success is false.
     */
    addUserKeyWithValidity: function(acls, validity, callback) {
        var indexObj = this;
        var aclsObject = new Object();
        aclsObject.acl = acls;
        this._jsonRequest({ method: 'POST',
                            url: '/1/indexes/' + indexObj.indexName + '/keys', 
                            body: aclsObject,
                            callback: function(success, res, body) {
            if (!_.isUndefined(callback))
                callback(success, body);
        }});
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
     *  - minWordSizeForApprox1: the minimum number of characters to accept one typo.
     *     Defaults to 3.
     *  - minWordSizeForApprox2: the minimum number of characters to accept two typos.
     *     Defaults to 7.
     *  - getRankingInfo: if set, the result hits will contain ranking information in 
     *     _rankingInfo attribute
     *  - page: (pagination parameter) page to retrieve (zero base). Defaults to 0.
     *  - hitsPerPage: (pagination parameter) number of hits per page. Defaults to 10.
     */
    addQueryInBatch: function(indexName, query, args) {
        var params = "query=" + query;
        if (!_.isUndefined(args) && args != null) {
            params = this._getSearchParams(args, params);
        }
        this.batch.push({ indexName: indexName, params: params });
    },
    /*
     * Launch the batch of queries using XMLHttpRequest.
     * (Optimized for browser using a POST query to minimize number of OPTIONS queries)
     *
     * @param callback the function that will receive results
     * @param delay (optional) if set, wait for this delay (in ms) and only send the batch if there was no other in the meantime.
     * @param classToDerive (optional) if set, hits will be an instance of this class
     */
    sendQueriesBatch: function(callback, delay, classToDerive) {
        var as = this;
        var params = {requests: [], apiKey: this.apiKey, appID: this.applicationID};
        for (var i = 0; i < as.batch.length; ++i) {
            params.requests.push(as.batch[i]);
        }
        window.clearTimeout(as.onDelayTrigger);
        if (!_.isUndefined(delay) && delay != null && delay > 0) {
            var onDelayTrigger = window.setTimeout( function() {
                as._sendQueriesBatch(params, callback, classToDerive);
            }, delay);
            as.onDelayTrigger = onDelayTrigger;
        } else {
            this._sendQueriesBatch(params, callback, classToDerive);
        }
    },
    /*
     * Index class constructor.
     * You should not use this method directly but use initIndex() function
     */
    Index: function(algoliasearch, indexName) {
        this.indexName = indexName;
        this.as = algoliasearch;
    },

    _sendQueriesBatch: function(params, callback, classToDerive) {
        this._jsonRequest({ cache: this.cache,
                               method: 'POST',
                               url: '/1/indexes/*/queries',
                               body: params,
                               callback: function(success, res, body) {
            if (success && !_.isUndefined(classToDerive) && classToDerive != null) {
                for (var i in body.results) { 
                    for (var j in body.results[i].hits) {
                        var obj = new classToDerive();
                        _.extend(obj, body.results[i].hits[j]);
                        body.results[i].hits[j] = obj;
                    }
                }
            }
            if (!_.isUndefined(callback)) {
                callback(success, body);
            }
        }});
    },
    /*
     * Wrapper that try all hosts to maximize the quality of service
     */
    _jsonRequest: function(opts) {
        var self = this;
        var callback = opts.callback;
        var cache = null;
        var cacheID = opts.url;
        if (!_.isUndefined(opts.body)) {
            cacheID = opts.url + "_body_" + JSON.stringify(opts.body);
        }
        //console.log(cacheID);
        if (!_.isUndefined(opts.cache)) {
            cache = opts.cache;
            if (!_.isUndefined(cache[cacheID])) {
                callback(true, cache[cacheID], cache[cacheID]);
                return;
            }
        }

        var impl = function(position) {
            var idx = 0;
            if (!_.isUndefined(position))
                idx = position;
            if (self.hosts.length <= idx) {
                callback(false, null, { message: "Cannot contact server"});
                return;
            }
            opts.callback = function(success, res, body) {
                if (!_.isUndefined(opts.cache))
                    cache[cacheID] = body;
                if (!success && (idx + 1) < self.hosts.length) {
                    impl(idx + 1);
                } else {
                    callback(success, res, body);
                }
            };
            opts.hostname = self.hosts[idx];
            self._jsonRequestByHost(opts)
        };
        impl();
    },

    _jsonRequestByHost: function(opts) {
        var body = null;
        if (!_.isUndefined(opts.body)) {
            body = JSON.stringify(opts.body);
        }
        var url = opts.hostname + opts.url;
        var xmlHttp = null;

        xmlHttp = new XMLHttpRequest();
        if ("withCredentials" in xmlHttp) {
            xmlHttp.open(opts.method, url , true);
            xmlHttp.setRequestHeader('X-Algolia-API-Key', this.apiKey);
            xmlHttp.setRequestHeader('X-Algolia-Application-Id', this.applicationID);
            if (body != null) {
                xmlHttp.setRequestHeader("Content-type", "application/json");
            }
        } else if (typeof XDomainRequest != "undefined") {
            // Handle IE8/IE9
            // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
            xmlHttp = new XDomainRequest();
            xmlHttp.open(opts.method, url);
        } else {
            // very old browser, not supported
            console.log("your browser is too old to support CORS requests");
        }
        xmlHttp.send(body);
        xmlHttp.onload = function(event) {
            if (!_.isUndefined(event)) {
                var success = (event.target.status === 200 || event.target.status === 201);
                opts.callback(success, event.target, event.target.response != null ? JSON.parse(event.target.response) : null);
            } else {
                opts.callback(true, event, JSON.parse(xmlHttp.responseText));
            }
        };
    },

     /*
     * Transform search param object in query string
     *
     * Attributes are:
     *  - attributes: an array of object attribute names to retrieve
     *     (if not set all attributes are retrieve)
     *  - attributesToHighlight: an array of object attribute names to highlight 
     *     (if not set indexed attributes are highlighted)
     *  - minWordSizeForApprox1: the minimum number of characters to accept one typo.
     *     Defaults to 3.
     *  - minWordSizeForApprox2: the minimum number of characters to accept two typos.
     *     Defaults to 7.
     *  - getRankingInfo: if set, the result hits will contain ranking information in 
     *     _rankingInfo attribute
     *  - page: (pagination parameter) page to retrieve (zero base). Defaults to 0.
     *  - hitsPerPage: (pagination parameter) number of hits per page. Defaults to 10.
     */
    _getSearchParams: function(args, params) {
        if (_.isUndefined(args) || args == null) {
            return params;
        }
        for (var key in args) {
            if (key != null && args.hasOwnProperty(key)) {
                params += (params.length == 0) ? '?' : '&';
                params += key + "=" + encodeURIComponent(args[key]);
            }
        }
        return params;
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
            if (_.isUndefined(objectID)) {
                this.as._jsonRequest({ action: 'addObject',
                                       url: '/1/indexes/' + encodeURIComponent(indexObj.indexName), 
                                       body: content,
                                       callback: function(success, res, body) {
                    if (!_.isUndefined(callback))
                        callback(success, body);
                }});
            } else {
                this.as._jsonRequest({ method: 'PUT',
                                       url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + "/" + objectID, 
                                       body: content,
                                       callback: function(success, res, body) {
                    if (!_.isUndefined(callback))
                        callback(success, body);
                }});
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
                                   url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + "/batch", 
                                   body: postObj,
                                   callback: function(success, res, body) {
                if (!_.isUndefined(callback))
                    callback(success, body);
            }});
        },
        /*
         * Get an object from this index
         * 
         * @param objectID the unique identifier of the object to retrieve
         * @param callback (optional) the result callback with two arguments
         *  success: boolean set to true if the request was successfull
         *  content: the object to retrieve or the error message if a failure occured
         * @param classToDerive (optional) if set, hits will be an instance of this class
         * @param attributes (optional) if set, contains the array of attribute names to retrieve
         */
        getObject: function(objectID, callback, attributes, classToDerive) {
            var indexObj = this;
            var params = "";
            if (!_.isUndefined(attributes)) {
                params = "?attributes=";
                for (var i = 0; i < attributes.length; ++i) {
                    if (i != 0)
                        params += ',';
                    params += attributes[i];
                }
            }
            this.as._jsonRequest({ method: 'GET',
                                   url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + "/" + encodeURIComponent(objectID) + params, 
                                   callback: function(success, res, body) {
                if (!_.isUndefined(classToDerive) && classToDerive != null) {
                    var obj = new classToDerive();
                    _.extend(obj, body);
                    body = obj;
                }
                if (!_.isUndefined(callback))
                    callback(success, body);
            }});
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
                                   url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + "/" + encodeURIComponent(partialObject.objectID) + "/partial", 
                                   body: partialObject,
                                   callback: function(success, res, body) {
                if (!_.isUndefined(callback))
                    callback(success, body);
            }});
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
                                   url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + "/" + encodeURIComponent(object.objectID), 
                                   body: object,
                                   callback: function(success, res, body) {
                if (!_.isUndefined(callback))
                    callback(success, body);
            }});
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
                                   url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + "/batch", 
                                   body: postObj,
                                   callback: function(success, res, body) {
                if (!_.isUndefined(callback))
                    callback(success, body);
            }});
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
            var indexObj = this;
            this.as._jsonRequest({ method: 'DELETE',
                                   url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + "/" + encodeURIComponent(objectID), 
                                   callback: function(success, res, body) {
                if (!_.isUndefined(callback))
                    callback(success, body);
            }});
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
         *  - attributes: a string that contains attribute names to retrieve separated by a comma. 
         *    By default all attributes are retrieved.
         *  - attributesToHighlight: a string that contains attribute names to highlight separated by a comma. 
         *    By default all indexed attributes are highlighted.
         *  - attributesToSnippet: a string that contains the names of attributes to snippet alongside 
         *    the number of words to return (syntax is 'attributeName:nbWords'). 
         *    Attributes are separated by a comma (Example: "attributesToSnippet=name:10,content:10").
         *    By default no snippet is computed.
         *  - minWordSizeForApprox1: the minimum number of characters to accept one typo.
         *     Defaults to 3.
         *  - minWordSizeForApprox2: the minimum number of characters to accept two typos.
         *     Defaults to 7.
         *  - getRankingInfo: if set, the result hits will contain ranking information in 
         *     _rankingInfo attribute
         *  - page: (pagination parameter) page to retrieve (zero base). Defaults to 0.
         *  - hitsPerPage: (pagination parameter) number of hits per page. Defaults to 10.
         *  - aroundLatLng let you search for entries around a given latitude/longitude (two float separated 
         *    by a ',' for example aroundLatLng=47.316669,5.016670). 
         *    You can specify the maximum distance in meters with aroundRadius parameter (in meters).
         *    At indexing, geoloc of an object should be set with _geoloc attribute containing lat and lng attributes (for example {"_geoloc":{"lat":48.853409, "lng":2.348800}})
         *  - insideBoundingBox let you search entries inside a given area defined by the two extreme points of 
         *    a rectangle (defined by 4 floats: p1Lat,p1Lng,p2Lat, p2Lng.
         *    For example insideBoundingBox=47.3165,4.9665,47.3424,5.0201).
         *  - queryType: select how the query words are interpreted:
         *      - prefixAll: all query words are interpreted as prefixes (default behavior).
         *      - prefixLast: only the last word is interpreted as a prefix. This option is recommended if you have a lot of content to speedup the processing.
         *      - prefixNone: no query word is interpreted as a prefix. This option is not recommended.
         *    At indexing, geoloc of an object should be set with _geoloc attribute containing lat and lng attributes (for example {"_geoloc":{"lat":48.853409, "lng":2.348800}})
         *  - tags filter the query by a set of tags. You can AND tags by separating them by commas. To OR tags, you must add parentheses. For example, tags=tag1,(tag2,tag3) means tag1 AND (tag2 OR tag3).
         *    At indexing, tags should be added in the _tags attribute of objects (for example {"_tags":["tag1","tag2"]} )
         * @param delay (optional) if set, wait for this delay (in ms) and only send the query if there was no other in the meantime.
         * @param classToDerive (optional) if set, hits will be an instance of this class.
         */
        search: function(query, callback, args, delay, classToDerive) {
            var indexObj = this;
            var params = "query=" + encodeURIComponent(query);
            if (!_.isUndefined(args) && args != null) {
                params = this.as._getSearchParams(args, params);
            }
            window.clearTimeout(indexObj.onDelayTrigger);
            if (!_.isUndefined(delay) && delay != null && delay > 0) {
                var onDelayTrigger = window.setTimeout( function() {
                    indexObj._search(params, callback, classToDerive);
                }, delay);
                indexObj.onDelayTrigger = onDelayTrigger;
            } else {
                this._search(params, callback, classToDerive);
            }
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
                                   url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + "/task/" + taskID,
                                   callback: function(success, res, body) {
                if (success && body.status === "published") {
                    callback(true, body);
                } else if (success && body.pendingTask) {
                    return indexObj.waitTask(taskID, callback);
                } else {
                    callback(false, body);
                }
            }});
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
                                   url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + "/settings", 
                                   callback: function(success, res, body) {
                if (!_.isUndefined(callback))
                    callback(success, body);
            }});
        },

        /*
         * Set settings for this index
         * 
         * @param settigns the settings object that can contains :
         *  - minWordSizeForApprox1 (integer) the minimum number of characters to accept one typo (default = 3)
         *  - minWordSizeForApprox2: (integer) the minimum number of characters to accept two typos (default = 7)
         *  - hitsPerPage: (integer) the number of hits per page (default = 10)
         *  - attributesToRetrieve: (array of strings) default list of attributes to retrieve for objects
         *  - attributesToHighlight: (array of strings) default list of attributes to highlight.
         *  -  attributesToSnippet:  (array of strings) default list of attributes to snippet alongside the number of words to return (syntax is 'attributeName:nbWords'). Attributes are separated by a comma (Example: "attributesToSnippet=name:10,content:10").<br/>By default no snippet is computed.
         *  - attributesToIndex: (array of strings) the list of fields you want to index. 
         *    By default all textual attributes of your objects are indexed, but you should update it to get optimal 
         *    results. This parameter has two important uses:
         *       - Limit the attributes to index. 
         *         For example if you store a binary image in base64, you want to store it in the index but you 
         *         don't want to use the base64 string for search.
         *       - Control part of the ranking (see the ranking parameter for full explanation). 
         *         Matches in attributes at the beginning of the list will be considered more important than matches 
         *         in attributes further down the list.
         *  - ranking: (array of strings) controls the way results are sorted. 
         *     We have three available criteria: 
         *       - typo (sort according to number of typos), 
         *       - position (sort according to the matching attribute), 
         *       - custom which is user defined
         *     (the standard order is ["typo", "position", "custom"])
         *  - customRanking: (array of strings) lets you specify part of the ranking. 
         *    The syntax of this condition is an array of strings containing attributes prefixed 
         *    by asc (ascending order) or desc (descending order) operator.
         *  - queryType: select how the query words are interpreted:
         *      - prefixAll: all query words are interpreted as prefixes (default behavior).
         *      - prefixLast: only the last word is interpreted as a prefix. This option is recommended if you have a lot of content to speedup the processing.
         *      - prefixNone: no query word is interpreted as a prefix. This option is not recommended.
         * @param callback (optional) the result callback with two arguments
         *  success: boolean set to true if the request was successfull
         *  content: the server answer or the error message if a failure occured
         */
        setSettings: function(settings, callback) {
            var indexObj = this;
            this.as._jsonRequest({ method: 'PUT',
                                   url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + "/settings",
                                   body: settings, 
                                   callback: function(success, res, body) {
                if (!_.isUndefined(callback))
                    callback(success, body);
            }});
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
                                   callback: function(success, res, body) {
                if (!_.isUndefined(callback))
                    callback(success, body);
            }});
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
                                   callback: function(success, res, body) {
                if (!_.isUndefined(callback))
                    callback(success, body);
            }});
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
                                   callback: function(success, res, body) {
                if (!_.isUndefined(callback))
                    callback(success, body);
            }});
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
            var aclsObject = new Object();
            aclsObject.acl = acls;
            this.as._jsonRequest({ method: 'POST',
                                   url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/keys',
                                   body: aclsObject,
                                   callback: function(success, res, body) {
                if (!_.isUndefined(callback))
                    callback(success, body);
            }});
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
         * @param callback the result callback with two arguments
         *  success: boolean set to true if the request was successfull
         *  content: the server answer with user keys list or error description if success is false.
         */
        addUserKeyWithValidity: function(acls, validity, callback) {
            var indexObj = this;
            var aclsObject = new Object();
            aclsObject.acl = acls;
            aclsObject.validity = validity;
            this.as._jsonRequest({ method: 'POST',
                                   url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/keys',
                                   body: aclsObject,
                                   callback: function(success, res, body) {
                if (!_.isUndefined(callback))
                    callback(success, body);
            }});
        },
        ///
        /// Internal methods only after this line
        ///
        _search: function(params, callback, classToDerive) {
            this.as._jsonRequest({ cache: this.cache,
                                   method: 'POST',
                                   url: '/1/indexes/' + encodeURIComponent(this.indexName) + "/query",
                                   body: {params: params, apiKey: this.as.apiKey, appID: this.as.applicationID},
                                   callback: function(success, res, body) {
                if (success && !_.isUndefined(classToDerive) && classToDerive != null) {
                    for (var i in body.hits) {
                        var obj = new classToDerive();
                        _.extend(obj, body.hits[i]);
                        body.hits[i] = obj;
                    }
                }
                if (!_.isUndefined(callback)) {
                    callback(success, body);
                }
            }});
        },

        // internal attributes
        as: null,
        indexName: null,
        cache: {},
        emptyConstructor: function() {}
};
