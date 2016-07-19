<!--NO_HTML-->

# Algolia Search API Client for JavaScript







[Algolia Search](https://www.algolia.com) is a hosted full-text, numerical, and faceted search engine capable of delivering realtime results from the first keystroke.





[![Version][version-svg]][package-url] [![Build Status][travis-svg]][travis-url] [![License][license-image]][license-url] [![Downloads][downloads-image]][downloads-url]

[![Browser tests][browser-test-matrix]][browser-test-url]

[travis-svg]: https://img.shields.io/travis/algolia/algoliasearch-client-js/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/algolia/algoliasearch-client-js
[license-image]: https://img.shields.io/badge/license-MIT-green.svg?style=flat-square
[license-url]: LICENSE.txt
[downloads-image]: https://img.shields.io/npm/dm/algoliasearch.svg?style=flat-square
[downloads-url]: http://npm-stat.com/charts.html?package=algoliasearch
[browser-test-matrix]: https://saucelabs.com/browser-matrix/algoliasearch-js.svg
[browser-test-url]: https://saucelabs.com/u/algoliasearch-js
[version-svg]: https://img.shields.io/npm/v/algoliasearch.svg?style=flat-square
[package-url]: https://npmjs.org/package/algoliasearch


The JavaScript client lets you use the [Algolia Search API](https://www.algolia.com/doc/rest) on the frontend (browsers) or on the backend (Node.js) with the same API.

The backend (Node.js) API can be used to index your data using your Algolia admin API keys.

Our JavaScript library is [UMD](https://github.com/umdjs/umd) compatible, you can
use it with any module loader.

When not using any module loader, it will export an `algoliasearch` function in the `window` object.





## Table of Contents

**Getting Started**

1. [Getting started](#getting-started)
  - [Frontend](#frontend)
  - [Node.js](#nodejs)
  - [Parse.com](#parsecom-)
  - [React Native](#react-native)
1. [Quick Start](#quick-start)
  - [Frontend](#frontend-1)
    - [Vanilla JavaScript](#vanilla-javascript)
    - [jQuery module](#jquery-module)
    - [AngularJS module](#angularjs-module)
  - [Backend (Node.js)](#backend-nodejs)
1. [Client options](#client-options)
1. [Callback convention](#callback-convention)
1. [Promises](#promises)
1. [Request strategy](#request-strategy)
1. [Cache](#cache)
1. [Proxy support](#proxy-support)
1. [Keep-alive](#keep-alive)
1. [Debugging](#debugging)
1. [Guides & Tutorials](#guides--tutorials)
1. [Old JavaScript clients](#old-javascript-clients)

**Commands Reference**

Getting started

1. [Install](#install)
1. [Init index](#init-index---initindex)

Search

1. [Search in an index](#search-in-an-index---search)
1. [Find by IDs](#find-by-ids---getobjects)

Indexing

1. [Add objects](#add-objects---addobjects)
1. [Update objects](#update-objects---saveobjects)
1. [Partial update](#partial-update---partialupdateobjects)
1. [Delete objects](#delete-objects---deleteobjects)

Settings

1. [Get settings](#get-settings---getsettings)
1. [Set settings](#set-settings---setsettings)

Manage Indices

1. [List indices](#list-indices---listindexes)
1. [Delete index](#delete-index---deleteindex)
1. [Clear index](#clear-index---clearindex)
1. [Copy index](#copy-index---copyindex)
1. [Move index](#move-index---moveindex)

Api Keys

1. [Generate key](#generate-key---generatesecuredapikey)


Synonyms

1. [Save synonym](#save-synonym---savesynonym)
1. [Batch synonyms](#batch-synonyms---batchsynonyms)
1. [Editing Synonyms](#editing-synonyms)
1. [Delete Synonyms](#delete-synonyms---delete_synonyms)
1. [Clear all synonyms](#clear-all-synonyms---clearsynonyms)
1. [Get synonym](#get-synonym---getsynonym)
1. [Search synonyms](#search-synonyms---searchsynonyms)


Advanced

1. [Custom batch](#custom-batch---batch)
1. [Wait for operations](#wait-for-operations---waittask)
1. [Multiple queries](#multiple-queries---multiplequeries)
1. [Delete by query](#delete-by-query---deletebyquery)
1. [Backup / Export an index](#backup--export-an-index---browse)
1. [List api keys](#list-api-keys---listapikeys)
1. [Add user key](#add-user-key---adduserkey)
1. [Update user key](#update-user-key---updateuserkey)
1. [Delete user key](#delete-user-key---deleteuserkey)
1. [Get key permissions](#get-key-permissions---getuserkeyacl)
1. [Get Logs](#get-logs---getlogs)



## Guides & Tutorials

Check our [online guides](https://www.algolia.com/doc):
 * [Data Formatting](https://www.algolia.com/doc/indexing/formatting-your-data)
 * [Import and Synchronize data](https://www.algolia.com/doc/indexing/import-synchronize-data/node)
 * [Autocomplete](https://www.algolia.com/doc/search/auto-complete)
 * [Instant search page](https://www.algolia.com/doc/search/instant-search)
 * [Filtering and Faceting](https://www.algolia.com/doc/search/filtering-faceting)
 * [Sorting](https://www.algolia.com/doc/relevance/sorting)
 * [Ranking Formula](https://www.algolia.com/doc/relevance/ranking)
 * [Typo-Tolerance](https://www.algolia.com/doc/relevance/typo-tolerance)
 * [Geo-Search](https://www.algolia.com/doc/geo-search/geo-search-overview)
 * [Security](https://www.algolia.com/doc/security/best-security-practices)
 * [API-Keys](https://www.algolia.com/doc/security/api-keys)
 * [REST API](https://www.algolia.com/doc/rest)






Old JavaScript clients
======================

In April 2015, we released the V3 of our JavaScript client (the one you are looking at) able to work in Node.js and the browser.

If you were using our browser version (V2), [read the migration guide](https://github.com/algolia/algoliasearch-client-js/wiki/Migration-guide-from-2.x.x-to-3.x.x)

If you were using our Node.js version (V1, npm `algolia-search`), [read the migration guide](https://github.com/algolia/algoliasearch-client-js/wiki/Node.js-v1.x.x-migration-guide)



<!--/NO_HTML-->



## Getting Started

### Install




### Frontend

You can either use a package manager like npm or include a `<script>` tag.

#### Node.js / React Native / Browserify / webpack

We are [browserify](http://browserify.org/)able and [webpack](http://webpack.github.io/) friendly.

```sh
npm install algoliasearch --save
```

#### Bower

```sh
bower install algoliasearch -S
```

#### &lt;script&gt; tag using CDNS

##### Recommended: jsDelivr.com

[jsDelivr](http://www.jsdelivr.com/about.php) is a global CDN delivery for JavaScript libraries.

To include the latest releases and all upcoming features and patches, use this:

```html
<script src="https://cdn.jsdelivr.net/algoliasearch/3/algoliasearch.min.js"></script>
```

##### Other CDNS

We recommend using jsDelivr, but `algoliasearch` is also available at:
- [CDNJS](https://cdnjs.com/libraries/algoliasearch)
- [npmcdn](https://npmcdn.com): https://npmcdn.com/algoliasearch@3/dist/algoliasearch.min.js

### Search only/lite client

We have a lightweight build available that can only do searches. Use it when filesize
is important to you or if you like to include only what you need.

Find it on jsDelivr:

```html
<script src="https://cdn.jsdelivr.net/algoliasearch/3/algoliasearchLite.min.js"></script>
```


### Init index - `initIndex`

To initialize the client you need your ApplicationID and API-Key. You can find all of them on [your Algolia account](http://www.algolia.com/users/edit)

```js
// var algoliasearch = require('algoliasearch');
// var algoliasearch = require('algoliasearch/reactnative');
// var algoliasearch = require('algoliasearch/lite');
// or just use algoliasearch if you are using a <script> tag
// if you are using AMD module loader, algoliasearch will not be defined in window,
// but in the AMD modules of the page

var client = algoliasearch('applicationID', 'apiKey');
var index = client.initIndex('indexName');
index.search('something', function searchDone(err, content) {
  console.log(err, content);
});
```



### Quick Start

#### Frontend

The JavaScript API client gives you access to low level methods to search and
receive results. This is all you need for building your front-end but will
require custom code on your side for displaying the results. Reading
our [guides](https://www.algolia.com/doc#search) will help you in that.

We've also released two JavaScript libraries to ease the building of the most
common kind of UI:

##### [autocomplete.js](https://github.com/algolia/autocomplete.js)

[autocomplete.js](https://github.com/algolia/autocomplete.js) helps you build
**dropdown** menus.

![autocomplete.js example](https://raw.githubusercontent.com/algolia/algoliasearch-client-js/master/examples/autocomplete.gif)

##### [instantsearch.js](https://community.algolia.com/instantsearch.js/)

[instantsearch.js](https://community.algolia.com/instantsearch.js/) is for **full
page** search.

![instantsearch.js example](https://raw.githubusercontent.com/algolia/algoliasearch-client-js/master/examples/instantsearch.gif)

We strongly encourage you to have a look at those libraries because they are
packaged with a lot of options that will cover most of your needs without
requiring you to do all the plumbing.

To build your frontend search experience, also check out our [guides](https://www.algolia.com/doc#search).

##### Vanilla JavaScript
```html
<script src="https://cdn.jsdelivr.net/algoliasearch/3/algoliasearch.min.js"></script>
<script>
  var client = algoliasearch('ApplicationID', 'apiKey');
  var index = client.initIndex('indexName');

  index.search('an example', function searchDone(err, content) {
    console.log(err, content)
  });

  index.search('another example')
    .then(function searchSuccess(content) {
      console.log(content);
    })
    .catch(function searchFailure(err) {
      console.error(err);
    });
</script>
```
You can see the full [Vanilla JavaScript example
here](https://github.com/algolia/algoliasearch-client-js/blob/master/examples/javascript.html)

##### jQuery module
We provide a specific [jQuery](http://jquery.com/) build that will use [jQuery.ajax](http://api.jquery.com/jquery.ajax/).

It can be used with callbacks or [jQuery promises](https://api.jquery.com/promise/).

```html
<script src="https://cdn.jsdelivr.net/jquery/2.1.3/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/algoliasearch/3/algoliasearch.jquery.min.js"></script>
<script>
  var client = $.algolia.Client('ApplicationID', 'apiKey');
  var index = client.initIndex('indexName');
  index.search('something', function searchDone(err, content) {
    console.log(err, content)
  });
</script>
```
You can see the full [jQuery example
here](https://github.com/algolia/algoliasearch-client-js/blob/master/examples/jquery.html)

##### AngularJS module
We provide a specific [AngularJS](https://angularjs.org/) build that is using the [$http service](https://docs.angularjs.org/api/ng/service/$http).

It can be used with callbacks or [AngularJS promises](https://docs.angularjs.org/api/ng/service/$q).

Also see our [AngularJS example](https://github.com/algolia/algoliasearch-client-js/blob/master/examples/angular.html)
on github.

```html
<script src="https://cdn.jsdelivr.net/angularjs/1/angular.min.js"></script>
<script src="https://cdn.jsdelivr.net/algoliasearch/3/algoliasearch.angular.min.js"></script>
<script>
  angular
    .module('myapp', ['algoliasearch'])
    .controller('SearchCtrl', ['$scope', 'algolia', function($scope, algolia) {
      $scope.search = {
        query: '',
        hits: []
      };
      var client = algolia.Client('ApplicationID', 'apiKey');
      var index = client.initIndex('indexName');

      $scope.$watch('search.query', function() {
        index.search($scope.search.query)
          .then(function searchSuccess(content) {
            console.log(content);
            // add content of search results to scope for display in view
            $scope.search.hits = content.hits;
          }, function searchFailure(err) {
            console.log(err);
        });
      });
    }]);
</script>
```
You can see the full [Angular example
here](https://github.com/algolia/algoliasearch-client-js/blob/master/examples/angular.html)

#### Backend (Node.js)

In 30 seconds, this quick start tutorial will show you how to index and search objects.

Without any prior configuration, you can start indexing [500 contacts](https://github.com/algolia/algoliasearch-client-csharp/blob/master/contacts.json) in the `contacts` index using the following code:

```js
var index = client.initIndex('contacts');
var contactsJSON = require('./contacts.json');

index.addObjects(contactsJSON, function(err, content) {
  if (err) {
    console.error(err);
  }
});
```

You can now search for contacts using firstname, lastname, company, etc. (even with typos):
```js
// firstname
index.search('jimmie', function(err, content) {
  console.log(content.hits);
});

// firstname with typo
index.search('jimie', function(err, content) {
  console.log(content.hits);
});

// a company
index.search('california paint', function(err, content) {
  console.log(content.hits);
});

// a firstname & company
index.search('jimmie paint', function(err, content) {
  console.log(content.hits);
});
```

Settings can be customized to tune the search behavior. For example, you can add a custom sort by number of followers to the already great built-in relevance:
```js
index.setSettings({
  'customRanking': ['desc(followers)']
}, function(err, content) {
  console.log(content);
});
```

You can also configure the list of attributes you want to index by order of importance (first = most important):
```js
index.setSettings({
  'attributesToIndex': [
    'lastname',
    'firstname',
    'company',
    'email',
    'city',
    'address'
  ]
}, function(err, content) {
  console.log(content);
});
```

Since the engine is designed to suggest results as you type, you'll generally search by prefix. In this case the order of attributes is very important to decide which hit is the best:
```js
index.search('or', function(err, content) {
  console.log(content.hits);
});

index.search('jim', function(err, content) {
  console.log(content.hits);
});
```





#### Client options

In most situations, there is no need to tune the options. We provide this list to be
transparent with our users.

- `timeout` (Number) timeout for requests to our servers, in milliseconds
  + in Node.js this is an inactivity timeout. Defaults to 15s
  + in the browser, this is a global timeout. Defaults to 2s (incremental)
- `protocol` (String) protocol to use when communicating with algolia
  + in the browser, we use the page protocol by default
  + in Node.js it's https by default
  + possible values: 'http:', 'https:'
- `hosts.read` ([String]) array of read hosts to use to call Algolia servers, computed automatically
- `hosts.write` ([String]) array of write hosts to use to call Algolia servers, computed automatically
- `httpAgent` ([HttpAgent](https://nodejs.org/api/http.html#http_class_http_agent)) <sup>node-only</sup> Node.js httpAgent instance to use when communicating with Algolia servers.

To pass an option, use:

```js
var client = algoliasearch(applicationId, apiKey, {
  timeout: 4000
})
```

#### Callback convention

Every API call takes a callback as last parameter. This callback will then be called with two arguments:

 1. **error**: null or an [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) object. More info on the error can be find in `error.message`.
 2. **content**: the object containing the answer from the server, it's a JavaScript object

#### Promises

**If you do not provide a callback**, you will get a promise (but never both).

Promises are the [native Promise implementation](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise).

We use [jakearchibald/es6-promise](https://github.com/stefanpenner/es6-promise) as a polyfill when needed.

#### Request strategy

The request strategy used by the JavaScript client includes:

- On the browser:
  + [CORS](https://en.wikipedia.org/wiki/Cross-Origin_Resource_Sharing#Browser_support) for modern browsers
  + [XDomainRequest](https://msdn.microsoft.com/en-us/library/ie/cc288060%28v=vs.85%29.aspx) for IE <= 10
  + [JSONP](https://en.wikipedia.org/wiki/JSONP) in any situation where Ajax requests are unavailabe or blocked.
- Node.js:
  + native [`http` module](https://nodejs.org/api/)

Connections are always `keep-alive`.

#### Cache

**Browser only**

To avoid performing the same API calls twice **search** results will be stored
in a `cache` that will be tied to your JavaScript `client` and `index` objects.
Whenever a call for a specific query (and filters) is made, we store the results
in a local cache. If you ever call the exact same query again, we read the
results from the cache instead of doing an API call.

This is particularly useful when your users are deleting characters from their
current query, to avoid useless API calls. Because it is stored as a simple
JavaScript object in memory, the cache is automatically reset whenever you
reload the page.

It is never automatically purged, nor can it be completely disabled. Instead, we
provide the `index.clearCache()` (or `client.clearCache()` if you're doing
[multiple queries](#multiple-queries)) method that you can call to reset it.

#### Proxy support

**Node.js only**

If you are behind a proxy, just set `HTTP_PROXY` or `HTTPS_PROXY` environment variables before starting your Node.js program.

```sh
HTTP_PROXY=http://someproxy.com:9320 node main.js
```

#### Keep-alive

**Node.js only**

Keep-alive is activated by default.

Because of the nature of keepalive connections, your process will hang even if you do not do any more command using the `client`.

To fix this, we expose a `client.destroy()` method that will terminate all remaining alive connections.

You should call this method when you are finished working with the AlgoliaSearch API. So that your process will exit gently.

**Note: keep-alive is still always activated in browsers, this is a native behavior of browsers.**

#### Debugging

The client will send you errors when a method call fails for some reasons.

You can get detailed debugging information:

```js
index.search('something', function searchDone(err) {
  if (err) {
    console.log(err.message);
    console.log(err.debugData);
    return;
  }
});
```

`err.debugData` contains the array of requests parameters that were used to issue requests.







## Search

### Search in an index - `search`



To perform a search, you only need to initialize the index and perform a call to the search function.

The search query allows only to retrieve 1000 hits, if you need to retrieve more than 1000 hits for seo, you can use [Backup / Retrieve all index content](#backup--export-an-index)

```javascript
var client = algoliasearch('ApplicationID', 'Search-Only-API-Key');
var index = client.initIndex('indexName');

// only query string
index.search('query string', function searchDone(err, content) {
  if (err) {
    console.error(err);
    return;
  }

  for (var h in content.hits) {
    console.log('Hit(' + content.hits[h].objectID + '): ' + content.hits[h].toString());
  }
});

// with params
index.search('query string', {
  attributesToRetrieve: ['firstname', 'lastname'],
  hitsPerPage: 50
}, function searchDone(err, content) {
  if (err) {
    console.error(err);
    return;
  }

  for (var h in content.hits) {
    console.log('Hit(' + content.hits[h].objectID + '): ' + content.hits[h].toString());
  }
});
```

The server response will look like:

```json
{
  "hits": [
    {
      "firstname": "Jimmie",
      "lastname": "Barninger",
      "objectID": "433",
      "_highlightResult": {
        "firstname": {
          "value": "<em>Jimmie</em>",
          "matchLevel": "partial"
        },
        "lastname": {
          "value": "Barninger",
          "matchLevel": "none"
        },
        "company": {
          "value": "California <em>Paint</em> & Wlpaper Str",
          "matchLevel": "partial"
        }
      }
    }
  ],
  "page": 0,
  "nbHits": 1,
  "nbPages": 1,
  "hitsPerPage": 20,
  "processingTimeMS": 1,
  "query": "jimmie paint",
  "params": "query=jimmie+paint&attributesToRetrieve=firstname,lastname&hitsPerPage=50"
}
```

You can use the following optional arguments:

### Search Parameters

<!--PARAMETERS_LINK-->
Here is the list of parameters you can use with the search method (`search` [scope](#scope)):
Parameters that can also be used in a setSettings also have the `indexing` [scope](#scope)

**Search**
- [query](#query) `search`

**Attributes**
- [attributesToRetrieve](#attributestoretrieve) `settings`, `search`

**Filtering / Faceting**
- [filters](#filters) `search`
- [facets](#facets) `search`
- [maxValuesPerFacet](#maxvaluesperfacet) `settings`, `search`

**Highlighting / Snippeting**
- [attributesToHighlight](#attributestohighlight) `settings`, `search`
- [attributesToSnippet](#attributestosnippet) `settings`, `search`
- [highlightPreTag](#highlightpretag) `settings`, `search`
- [highlightPostTag](#highlightposttag) `settings`, `search`
- [snippetEllipsisText](#snippetellipsistext) `settings`, `search`

**Pagination**
- [page](#page) `search`
- [hitsPerPage](#hitsperpage) `settings`, `search`

**Typos**
- [minWordSizefor1Typo](#minwordsizefor1typo) `settings`, `search`
- [minWordSizefor2Typos](#minwordsizefor2typos) `settings`, `search`
- [typoTolerance](#typotolerance) `settings`, `search`
- [allowTyposOnNumericTokens](#allowtyposonnumerictokens) `settings`, `search`
- [ignorePlurals](#ignoreplurals) `settings`, `search`
- [disableTypoToleranceOnAttributes](#disabletypotoleranceonattributes) `settings`, `search`

**Geo-Search**
- [aroundLatLng](#aroundlatlng) `search`
- [aroundLatLngViaIP](#aroundlatlngviaip) `search`
- [insideBoundingBox](#insideboundingbox) `search`
- [insidePolygon](#insidepolygon) `search`


**Query Strategy**
- [queryType](#querytype) `settings`, `search`
- [removeWordsIfNoResults](#removewordsifnoresults) `settings`, `search`
- [advancedSyntax](#advancedsyntax) `settings`, `search`
- [optionalWords](#optionalwords) `settings`, `search`
- [removeStopWords](#removestopwords) `settings`, `search`
- [exactOnSingleWordQuery](#exactonsinglewordquery) `settings`, `search`
- [alternativesAsExact](#alternativesasexact) `settings`, `search`

**Advanced**
- [distinct](#distinct) `settings`, `search`
- [rankingInfo](#rankinginfo) `search`
- [numericFilters (deprecated)](#numericfilters-deprecated) `search`
- [tagFilters (deprecated)](#tagfilters-deprecated) `search`
- [facetFilters (deprecated)](#facetfilters-deprecated) `search`
- [analytics](#analytics) `settings`, `search`

<!--/PARAMETERS_LINK-->

### Find by IDs - `getObjects`

You can easily retrieve an object using its `objectID` and optionally specify a comma separated list of attributes you want:

```js
// Retrieves all attributes
index.getObject('myID', function(err, content) {
  console.log(content.objectID + ": " + content.toString());
});

// Retrieves firstname and lastname attributes
index.getObject('myID', ['firstname', 'lastname'], function(err, content) {
  console.log(content.objectID + ": " + content.toString());
});
```

You can also retrieve a set of objects:

```js
index.getObjects(['myObj1', 'myObj2'], function(err, content) {
  console.log(content);
});
```




## Indexing

### Add objects - `addObjects`

Each entry in an index has a unique identifier called `objectID`. There are two ways to add an entry to the index:

 1. Using automatic `objectID` assignment. You will be able to access it in the answer.
 2. Supplying your own `objectID`.

You don't need to explicitly create an index, it will be automatically created the first time you add an object.
Objects are schema less so you don't need any configuration to start indexing. If you wish to configure things, the settings section provides details about advanced settings.

Example with automatic `objectID` assignment:

```js
index.addObject({
  firstname: 'Jimmie',
  lastname: 'Barninger'
}, function(err, content) {
  console.log('objectID=' + content.objectID);
});
```

Example with manual `objectID` assignment:

```js
index.addObject({
  firstname: 'Jimmie',
  lastname: 'Barninger'
}, 'myID', function(err, content) {
  console.log('objectID=' + content.objectID);
});
```


### Update objects - `saveObjects`

You have three options when updating an existing object:

 1. Replace all its attributes.
 2. Replace only some attributes.
 3. Apply an operation to some attributes.

Example on how to replace all attributes of an existing object:

```js
index.saveObject({
  firstname: 'Jimmie',
  lastname: 'Barninger',
  city: 'New York',
  objectID: 'myID'
}, function(err, content) {
  console.log(content);
});
```

### Partial update - `partialUpdateObjects`

You have many ways to update an object's attributes:

 1. Set the attribute value
 2. Add a string or number element to an array
 3. Remove an element from an array
 4. Add a string or number element to an array if it doesn't exist
 5. Increment an attribute
 6. Decrement an attribute

Example to update only the city attribute of an existing object:

```js
index.partialUpdateObject({
  city: 'San Francisco',
  objectID: 'myID'
}, function(err, content) {
  console.log(content);
});
```

Example to add a tag:

```js
index.partialUpdateObject({
  _tags: {
    value: 'MyTag',
    _operation: 'Add'
  },
  objectID: 'myID'
}, function(err, content) {
  console.log(content);
});
```

Example to remove a tag:

```js
index.partialUpdateObject({
  _tags: {
    value: 'MyTag',
    _operation:'Remove'
  },
  objectID: 'myID'
}, function(err, content) {
  console.log(content);
});
```

Example to add a tag if it doesn't exist:

```js
index.partialUpdateObject({
  _tags: {
    value: 'MyTag',
    _operation: 'AddUnique'
  },
  objectID: 'myID'
}, function(err, content) {
  console.log(content);
});
```

Example to increment a numeric value:

```js
index.partialUpdateObject({
  price: {
    value: 42,
    _operation: 'Increment'
  },
  objectID: 'myID'
}, function(err, content) {
  console.log(content);
});
```

Note: Here we are incrementing the value by `42`. To increment just by one, put
`value:1`.

Example to decrement a numeric value:

```js
index.partialUpdateObject({
  price: {
    value: 42,
    _operation: 'Decrement'
  },
  objectID: 'myID'
}, function(err, content) {
  console.log(content);
});
```

Note: Here we are decrementing the value by `42`. To decrement just by one, put
`value:1`.


### Delete objects - `deleteObjects`

You can delete an object using its `objectID`:

```js
index.deleteObject('myID', function(error) {
  if (!err) {
    console.log('success');
  }
});
```

### Delete by query - `deleteByQuery`

You can delete all objects matching a single query with the following code. Internally, the API client performs the query, deletes all matching hits, and waits until the deletions have been applied.


Take your precautions when using this method. Calling it with an empty query will result in cleaning the index of all its records.

```js
// no query parameters
index.deleteByQuery('John', function(error) {
  if (!err) {
    console.log('success');
  }
});

// with query parameters
index.deleteByQuery('John', {
  some: 'query',
  param: 'eters'
}, function(error) {
  if (!err) {
    console.log('success');
  }
});
```

### Wait for operations - `waitTask`

All write operations in Algolia are asynchronous by design.

It means that when you add or update an object to your index, our servers will
reply to your request with a `taskID` as soon as they understood the write
operation.

The actual insert and indexing will be done after replying to your code.

You can wait for a task to complete using the `waitTask` method on the `taskID` returned by a write operation.

For example, to wait for indexing of a new object:
```js
var object = {
  firstname: 'Jimmie',
  lastname: 'Barninger'
};

index.addObject(object, function(err, content) {
  index.waitTask(content.taskID, function() {
    console.log('object ' + content.objectID + ' indexed');
  });
});
```

If you want to ensure multiple objects have been indexed, you only need to check
the biggest `taskID`.

## Settings

### Get settings - `getSettings`

You can retrieve settings:

```js
index.getSettings(function(err, content) {
  console.log(content);
});
```

### Set settings - `setSettings`

```js
index.setSettings({'customRanking': ['desc(followers)']}, function(err) {
  if (!err) {
    console.log('success');
  }
});
```

#### Slave settings

You can forward all settings updates to the slaves of an index by using the `forwardToSlaves` option:

```js
index.setSettings({'customRanking': ['desc(followers)']}, {forwardToSlaves: true}, function(err) {
  if (!err) {
    console.log('success');
  }
});
```



### Index settings parameters

<!--PARAMETERS_LINK-->

Here is the list of parameters you can use with the set settings method (`indexing` [scope](#scope))


Parameters that can be override at search time also have the `indexing` [scope](#scope)

**Attributes**
- [attributesToIndex](#attributestoindex) `settings`
- [attributesForFaceting](#attributesforfaceting) `settings`
- [attributesToRetrieve](#attributestoretrieve) `settings`, `search`
- [unretrievableAttributes](#unretrievableattributes) `settings`

**Ranking**
- [ranking](#ranking) `settings`
- [customRanking](#customranking) `settings`
- [slaves](#slaves) `settings`

**Filtering / Faceting**
- [maxValuesPerFacet](#maxvaluesperfacet) `settings`, `search`

**Highlighting / Snippeting**
- [attributesToHighlight](#attributestohighlight) `settings`, `search`
- [attributesToSnippet](#attributestosnippet) `settings`, `search`
- [highlightPreTag](#highlightpretag) `settings`, `search`
- [highlightPostTag](#highlightposttag) `settings`, `search`
- [snippetEllipsisText](#snippetellipsistext) `settings`, `search`

**Pagination**
- [hitsPerPage](#hitsperpage) `settings`, `search`

**Typos**
- [minWordSizefor1Typo](#minwordsizefor1typo) `settings`, `search`
- [minWordSizefor2Typos](#minwordsizefor2typos) `settings`, `search`
- [typoTolerance](#typotolerance) `settings`, `search`
- [allowTyposOnNumericTokens](#allowtyposonnumerictokens) `settings`, `search`
- [ignorePlurals](#ignoreplurals) `settings`, `search`
- [disableTypoToleranceOnAttributes](#disabletypotoleranceonattributes) `settings`, `search`
- [separatorsToIndex](#separatorstoindex) `settings`

**Query Strategy**
- [queryType](#querytype) `settings`, `search`
- [removeWordsIfNoResults](#removewordsifnoresults) `settings`, `search`
- [advancedSyntax](#advancedsyntax) `settings`, `search`
- [optionalWords](#optionalwords) `settings`, `search`
- [removeStopWords](#removestopwords) `settings`, `search`
- [disablePrefixOnAttributes](#disableprefixonattributes) `settings`
- [disableExactOnAttributes](#disableexactonattributes) `settings`
- [exactOnSingleWordQuery](#exactonsinglewordquery) `settings`, `search`
- [alternativesAsExact](#alternativesasexact) `settings`, `search`

**Advanced**
- [attributeForDistinct](#attributefordistinct) `settings`
- [distinct](#distinct) `settings`, `search`
- [numericAttributesToIndex](#numericattributestoindex) `settings`
- [allowCompressionOfIntegerArray](#allowcompressionofintegerarray) `settings`
- [altCorrections](#altcorrections) `settings`
- [placeholders](#placeholders) `settings`

<!--/PARAMETERS_LINK-->


## Parameters

### Overview

#### Scope

Each parameter in this page has a scope. Depending on the scope, you can use the parameter within the `setSettings`
and/or the `search` method

They are three scopes:
- `settings`: The setting can only be used in the `setSettings` method
- `search`: The setting can only be used in the `search` method
- `settings` `search`: The setting can be used in the `setSettings` method and be override in the`search` method


#### Parameters List

**Search**
- [query](#query) `search`

**Attributes**
- [attributesForFaceting](#attributesforfaceting) `settings`
- [attributesToIndex](#attributestoindex) `settings`
- [attributesToRetrieve](#attributestoretrieve) `settings`, `search`
- [unretrievableAttributes](#unretrievableattributes) `settings`


**Ranking**
- [ranking](#ranking) `settings`
- [customRanking](#customranking) `settings`
- [slaves](#slaves) `settings`

**Filtering / Faceting**
- [filters](#filters) `search`
- [facets](#facets) `search`
- [maxValuesPerFacet](#maxvaluesperfacet) `settings`, `search`

**Highlighting / Snippeting**
- [attributesToHighlight](#attributestohighlight) `settings`, `search`
- [attributesToSnippet](#attributestosnippet) `settings`, `search`
- [highlightPreTag](#highlightpretag) `settings`, `search`
- [highlightPostTag](#highlightposttag) `settings`, `search`
- [snippetEllipsisText](#snippetellipsistext) `settings`, `search`

**Pagination**
- [page](#page) `search`
- [hitsPerPage](#hitsperpage) `settings`, `search`

**Typos**
- [minWordSizefor1Typo](#minwordsizefor1typo) `settings`, `search`
- [minWordSizefor2Typos](#minwordsizefor2typos) `settings`, `search`
- [typoTolerance](#typotolerance) `settings`, `search`
- [allowTyposOnNumericTokens](#allowtyposonnumerictokens) `settings`, `search`
- [ignorePlurals](#ignoreplurals) `settings`, `search`
- [disableTypoToleranceOnAttributes](#disabletypotoleranceonattributes) `settings`, `search`
- [separatorsToIndex](#separatorstoindex) `settings`

**Geo-Search**

- [aroundLatLng](#aroundlatlng) `search`
- [aroundLatLngViaIP](#aroundlatlngviaip) `search`
- [insideBoundingBox](#insideboundingbox) `search`
- [insidePolygon](#insidepolygon) `search`


**Query Strategy**
- [queryType](#querytype) `settings`, `search`
- [removeWordsIfNoResults](#removewordsifnoresults) `settings`, `search`
- [advancedSyntax](#advancedsyntax) `settings`, `search`
- [optionalWords](#optionalwords) `settings`, `search`
- [removeStopWords](#removestopwords) `settings`, `search`
- [disablePrefixOnAttributes](#disableprefixonattributes) `settings`
- [disableExactOnAttributes](#disableexactonattributes) `settings`
- [exactOnSingleWordQuery](#exactonsinglewordquery) `settings`, `search`
- [alternativesAsExact](#alternativesasexact) `settings`, `search`

**Advanced**
- [attributeForDistinct](#attributefordistinct) `settings`
- [distinct](#distinct) `settings`, `search`
- [rankingInfo](#rankinginfo) `search`
- [numericAttributesToIndex](#numericattributestoindex) `settings`
- [allowCompressionOfIntegerArray](#allowcompressionofintegerarray) `settings`
- [numericFilters (deprecated)](#numericfilters-deprecated) `search`
- [tagFilters (deprecated)](#tagfilters-deprecated) `search`
- [facetFilters (deprecated)](#facetfilters-deprecated) `search`
- [analytics](#analytics) `settings`, `search`
- [altCorrections](#altcorrections) `settings`
- [placeholders](#placeholders) `settings`

### Search

#### query

- scope: `search`
- type: `string`
- default: `""`


The instant search query string, used to set the string you want to search in your index. If no query parameter is set, the textual search will match with all the objects.

### Attributes

#### attributesToIndex

- scope: `settings`
- type: `array of strings`
- default: `*`


The list of attributes you want index (i.e. to make searchable).

If set to null, all textual and numerical attributes of your objects are indexed.
Make sure you updated this setting to get optimal results.

This parameter has two important uses:
* **Limit the attributes to index**.
<br/>For example, if you store the URL of a picture, you want to store it and be able to retrieve it,
but you probably don't want to search in the URL.
* **Control part of the ranking**.
<br/> Matches in attributes at the beginning of the list will be considered more important than matches in attributes
further down the list.
In one attribute, matching text at the beginning of the attribute will be considered more important than text after.
You can disable this behavior if you add your attribute inside `unordered(AttributeName)`.
For example, `attributesToIndex: ["title", "unordered(text)"]`.
You can decide to have the same priority for two attributes
by passing them in the same string using a comma as a separator.
For example `title` and `alternative_title` have the same priority in this example,
which is different than text priority: `attributesToIndex:["title,alternative_title", "text"]`.
To get a full description of how the Ranking works, you can have a look at our
[Ranking guide](https://www.algolia.com/doc/relevance/ranking).


#### attributesForFaceting

- scope: `settings`
- type: `array of strings`
- default: `null`


The list of fields you want to use for faceting.
All strings in the attribute selected for faceting are extracted and added as a facet.
If set to null, no attribute is used for faceting.


#### unretrievableAttributes

- scope: `settings`
- type: `array of strings`
- default: `null`


The list of attributes that cannot be retrieved at query time.
This feature allows you to have attributes that are used for indexing
and/or ranking but cannot be retrieved

**Warning**: for testing purposes, this setting is ignored when you're using the ADMIN API Key.

#### attributesToRetrieve

- scope: `settings`, `search`
- type: `array of strings`
- default: `*`


A string that contains the list of attributes you want to retrieve in order to minimize the size of the JSON answer.

Attributes are separated with a comma (for example `"name,address"`).
You can also use a string array encoding (for example `["name","address"]` ).
By default, all attributes are retrieved.
You can also use `*` to retrieve all values when an **attributesToRetrieve** setting is specified for your index.

`objectID` is always retrieved even when not specified.


#### restrictSearchableAttributes

- scope: `search`
- type: `array of strings`
- default: `attributesToIndex`


List of attributes you want to use for textual search (must be a subset of the `attributesToIndex` index setting).
Attributes are separated with a comma such as `"name,address"`.
You can also use JSON string array encoding such as `encodeURIComponent("[\"name\",\"address\"]")`.
By default, all attributes specified in the `attributesToIndex` settings are used to search.


### Ranking

#### ranking

- scope: `settings`
- type: `array of strings`
- default: `['typo', 'geo', 'words', 'filters', 'proximity', 'attribute', 'exact', 'custom']`


Controls the way results are sorted.

We have nine available criterion:

* `typo`: Sort according to number of typos.
* `geo`: Sort according to decreasing distance when performing a geo location based search.
* `words`: Sort according to the number of query words matched by decreasing order. This parameter is useful when you use the `optionalWords` query parameter to have results with the most matched words first.
* `proximity`: Sort according to the proximity of the query words in hits.
* `attribute`: Sort according to the order of attributes defined by attributesToIndex.
* `exact`:
  * If the user query contains one word: sort objects having an attribute that is exactly the query word before others. For example, if you search for the TV show "V", you want to find it with the "V" query and avoid getting all popular TV shows starting by the letter V before it.
  * If the user query contains multiple words: sort according to the number of words that matched exactly (not as a prefix).
* `custom`: Sort according to a user defined formula set in the `customRanking` attribute.
* `asc(attributeName)`: Sort according to a numeric attribute using ascending order. `attributeName` can be the name of any numeric attribute in your records (integer, double or boolean).
* `desc(attributeName)`: Sort according to a numeric attribute using descending order. `attributeName` can be the name of any numeric attribute in your records (integer, double or boolean).

<br/>To get a full description of how the Ranking works,
you can have a look at our [Ranking guide](https://www.algolia.com/doc/relevance/ranking).

#### customRanking

- scope: `settings`
- type: `array of strings`
- default: `[]`


Lets you specify part of the ranking.

The syntax of this condition is an array of strings containing attributes
prefixed by the asc (ascending order) or desc (descending order) operator.

For example, `"customRanking" => ["desc(population)", "asc(name)"]`.

To get a full description of how the Custom Ranking works,
you can have a look at our [Ranking guide](https://www.algolia.com/doc/relevance/ranking).

#### slaves

- scope: `settings`
- type: `array of strings`
- default: `[]`


The list of indices on which you want to replicate all write operations.

In order to get response times in milliseconds, we pre-compute part of the ranking during indexing.

If you want to use different ranking configurations depending of the use case,
you need to create one index per ranking configuration.

This option enables you to perform write operations only on this index and automatically
update slave indices with the same operations.

### Filtering / Faceting

#### filters

- scope: `search`
- type: `string`
- default: `""`


Filter the query with numeric, facet or/and tag filters.

The syntax is a SQL like syntax, you can use the OR and AND keywords.
The syntax for the underlying numeric, facet and tag filters is the same than in the other filters:

`available=1 AND (category:Book OR NOT category:Ebook) AND _tags:public`
`date: 1441745506 TO 1441755506 AND inStock > 0 AND author:"John Doe"`

If no attribute name is specified,
the filter applies to `_tags`.

For example: `public OR user_42` will translate to `_tags:public OR _tags:user_42`.

The list of keywords is:
* `OR`: create a disjunctive filter between two filters.
* `AND`: create a conjunctive filter between two filters.
* `TO`: used to specify a range for a numeric filter.
* `NOT`: used to negate a filter. The syntax with the `-` isn’t allowed.

*Note*: To specify a value with spaces or with a value equal to a keyword, it's possible to add quotes.

**Warning:**

* Like for the other filters (for performance reasons), it's not possible to have FILTER1 OR (FILTER2 AND FILTER3).
* It's not possible to mix different categories of filters inside an OR like: num=3 OR tag1 OR facet:value
* It's not possible to negate a group, it's only possible to negate a filter:  NOT(FILTER1 OR (FILTER2) is not allowed.


#### facets

- scope: `search`
- type: `string`
- default: `""`


List of object attributes that you want to use for faceting.

For each of the declared attributes, you'll be able to retrieve a list of the most relevant facet values,
and their associated count for the current query.

Attributes are separated by a comma.

For example, `"category,author"`.

You can also use JSON string array encoding.

For example, `["category","author"]`.

Only the attributes that have been added in **attributesForFaceting** index setting can be used in this parameter.
You can also use `*` to perform faceting on all attributes specified in `attributesForFaceting`.
If the number of results is important, the count can be approximate,
the attribute `exhaustiveFacetsCount` in the response is true when the count is exact.

#### maxValuesPerFacet

- scope: `settings`, `search`
- type: `integer`
- default: `""`


Limit the number of facet values returned for each facet.

For example, `maxValuesPerFacet=10` will retrieve a maximum of 10 values per facet.

### Highlighting / Snippeting

#### attributesToHighlight

- scope: `settings`, `search`
- type: `array of strings`
- default: `null`


Default list of attributes to highlight.
If set to null, all indexed attributes are highlighted.

A string that contains the list of attributes you want to highlight according to the query.
Attributes are separated by commas.
You can also use a string array encoding (for example `["name","address"]`).
If an attribute has no match for the query, the raw value is returned.
By default, all indexed attributes are highlighted (as long as they are strings).
You can use `*` if you want to highlight all attributes.

A matchLevel is returned for each highlighted attribute and can contain:
* `full`: If all the query terms were found in the attribute.
* `partial`: If only some of the query terms were found.
* `none`: If none of the query terms were found.

#### attributesToSnippet

- scope: `settings`, `search`
- type: `array of strings`
- default: `null`


Default list of attributes to snippet alongside the number of words to return (syntax is `attributeName:nbWords`).
If set to null, no snippet is computed.

#### highlightPreTag

- scope: `settings`, `search`
- type: `string`
- default: `<em>`


Specify the string that is inserted before the highlighted parts in the query result (defaults to `<em>`).



#### highlightPostTag

- scope: `settings`, `search`
- type: `string`
- default: `</em>`


Specify the string that is inserted after the highlighted parts in the query result (defaults to `</em>`).



#### snippetEllipsisText

- scope: `settings`, `search`
- type: `string`
- default: `…`


String used as an ellipsis indicator when a snippet is truncated.
Defaults to an empty string for all accounts created before 10/2/2016, and to … (UTF-8 U+2026) for accounts created after that date.

### Pagination

#### page

- scope: `search`
- type: `integer`
- default: `0`


Pagination parameter used to select the page to retrieve.
<br>
Page is zero based and defaults to 0. Thus, to retrieve the 10th page you need to set `page=9`.

#### hitsPerPage

- scope: `settings`, `search`
- type: `integer`
- default: `20`


Pagination parameter used to select the number of hits per page. Defaults to 20.

### Typos

#### minWordSizefor1Typo

- scope: `settings`, `search`
- type: `integer`
- default: `4`


The minimum number of characters needed to accept one typo.

#### minWordSizefor2Typos

- scope: `settings`, `search`
- type: `integer`
- default: `8`


The minimum number of characters needed to accept two typos.

#### typoTolerance

- scope: `settings`, `search`
- type: `boolean`
- default: `true`


This option allows you to control the number of typos allowed in the result set:

* `true`: The typo tolerance is enabled and all matching hits are retrieved (default behavior).
* `false`: The typo tolerance is disabled. All results with typos will be hidden.
* `min`: Only keep results with the minimum number of typos. For example, if one result matches without typos, then all results with typos will be hidden.
* `strict`: Hits matching with 2 typos are not retrieved if there are some matching without typos.


#### allowTyposOnNumericTokens

- scope: `settings`, `search`
- type: `boolean`
- default: `true`


If set to false, disables typo tolerance on numeric tokens (numbers).

#### ignorePlurals

- scope: `settings`, `search`
- type: `boolean`
- default: `false`


If set to true, plural won't be considered as a typo. For example, car and cars, or foot and feet will be considered as equivalent. Defaults to false.

#### disableTypoToleranceOnAttributes

- scope: `settings`, `search`
- type: `string`
- default: `""`


List of attributes on which you want to disable typo tolerance
(must be a subset of the `attributesToIndex` index setting).

Attributes are separated with a comma such as `"name,address"`.
You can also use JSON string array encoding such as `encodeURIComponent("[\"name\",\"address\"]")`.

#### separatorsToIndex

- scope: `settings`
- type: `string`
- default: `""`


Specify the separators (punctuation characters) to index.

By default, separators are not indexed.

Use `+#` to be able to search Google+ or C#.



### Geo-Search



#### aroundLatLng

- scope: `search`
- type: `string`
- default: ``


Search for entries around a given latitude/longitude (specified as two floats separated by a comma).

For example, `aroundLatLng=47.316669,5.016670`.

- By default the maximum distance is automatically guessed based on the density of the area
but you can specify it manually in meters with the **aroundRadius** parameter.
The precision for ranking can be set with **aroundPrecision** parameter.
- If you set aroundPrecision=100, the distances will be considered by ranges of 100m.
- For example all distances 0 and 100m will be considered as identical for the "geo" ranking parameter.

When **aroundRadius** is not set, the radius is computed automatically using the density of the area,
you can retrieve the computed radius in the **automaticRadius** attribute of the answer,
you can also use the **minimumAroundRadius** query parameter to specify a minimum radius in meters
for the automatic computation of **aroundRadius**.

At indexing, you should specify geoloc of an object with the _geoloc attribute
(in the form `"_geoloc":{"lat":48.853409, "lng":2.348800}`
or `"_geoloc":[{"lat":48.853409, "lng":2.348800},{"lat":48.547456, "lng":2.972075}]`
if you have several geo-locations in your record).




#### aroundLatLngViaIP

- scope: `search`
- type: `string`
- default: `false`


Search for entries around a given latitude/longitude automatically computed from user IP address.

To enable it, use `aroundLatLngViaIP=true`.

You can specify the maximum distance in meters with the `aroundRadius` parameter
and the precision for ranking with `aroundPrecision`.

For example:
- if you set aroundPrecision=100,
two objects that are in the range 0-99m
will be considered as identical in the ranking for the "geo" ranking parameter (same for 100-199, 200-299, ... ranges).

When indexing, you should specify the geo location of an object with the `_geoloc` attribute
in the form `{"_geoloc":{"lat":48.853409, "lng":2.348800}}`.



#### insideBoundingBox

- scope: `search`
- type: `boolean`
- default: `false`


Search entries inside a given area defined by the two extreme points of a rectangle
(defined by 4 floats: p1Lat,p1Lng,p2Lat,p2Lng).
For example:
- `insideBoundingBox=47.3165,4.9665,47.3424,5.0201`


At indexing, you should specify geoloc of an object with the _geoloc attribute
(in the form `"_geoloc":{"lat":48.853409, "lng":2.348800}`
or `"_geoloc":[{"lat":48.853409, "lng":2.348800},{"lat":48.547456, "lng":2.972075}]`
if you have several geo-locations in your record).


You can use several bounding boxes (OR) by passing more than 4 values.
For example: instead of having 4 values you can pass 8 to search inside the UNION of two bounding boxes.

#### insidePolygon

- scope: `search`
- type: `string`
- default: ``


Search entries inside a given area defined by a set of points
(defined by a minimum of 6 floats: p1Lat,p1Lng,p2Lat,p2Lng,p3Lat,p3Long).

For example:
`InsidePolygon=47.3165,4.9665,47.3424,5.0201,47.32,4.98`).


At indexing, you should specify geoloc of an object with the _geoloc attribute
(in the form `"_geoloc":{"lat":48.853409, "lng":2.348800}`
or `"_geoloc":[{"lat":48.853409, "lng":2.348800},{"lat":48.547456, "lng":2.972075}]`
if you have several geo-locations in your record).


### Query Strategy

#### queryType

- scope: `settings`, `search`
- type: `enum`
- default: `'prefixLast'`


Selects how the query words are interpreted. It can be one of the following values:
* `prefixAll`:
All query words are interpreted as prefixes. This option is not recommended.
* `prefixLast`:
Only the last word is interpreted as a prefix (default behavior).
* `prefixNone`:
No query word is interpreted as a prefix. This option is not recommended.

#### removeWordsIfNoResults

- scope: `settings`, `search`
- type: `string`
- default: `'none'`


This option is used to select a strategy in order to avoid having an empty result page.
There are four different options:
- `lastWords`:
When a query does not return any results, the last word will be added as optional.
The process is repeated with n-1 word, n-2 word, ... until there are results.
- `firstWords`:
When a query does not return any results, the first word will be added as optional.
The process is repeated with second word, third word, ... until there are results.
- `allOptional`:
When a query does not return any results, a second trial will be made with all words as optional.
This is equivalent to transforming the AND operand between query terms to an OR operand.
- `none`:
No specific processing is done when a query does not return any results (default behavior).


#### advancedSyntax

- scope: `settings`, `search`
- type: `boolean`
- default: `false`


Enables the advanced query syntax.

This syntax allow to do two things:
* **Phrase query**: A phrase query defines a particular sequence of terms. A phrase query is built by Algolia's query parser for words surrounded by `"`. For example, `"search engine"` will retrieve records having `search` next to `engine` only. Typo tolerance is _disabled_ on phrase queries.
* **Prohibit operator**: The prohibit operator excludes records that contain the term after the `-` symbol. For example, `search -engine` will retrieve records containing `search` but not `engine`.


#### optionalWords

- scope: `settings`, `search`
- type: `array of strings`
- default: `[]`


A string that contains the comma separated list of words that should be considered as optional when found in the query.

#### removeStopWords

- scope: `settings`, `search`
- type: `boolean`
- default: `false`


Remove stop words from the query **before** executing it. Defaults to `false`.
Use a boolean to enable/disable all 41 supported languages and a comma separated list
of iso codes of the languages you want to use consider to enable the stopwords removal
on a subset of them (select the one you have in your records).

In most use-cases, **you shouldn't need to enable this option**.

List of 41 supported languages with their associated iso code: Arabic=ar, Armenian=hy, Basque=eu, Bengali=bn, Brazilian=pt-br, Bulgarian=bg, Catalan=ca, Chinese=zh, Czech=cs, Danish=da, Dutch=nl, English=en, Finnish=fi, French=fr, Galician=gl, German=de, Greek=el, Hindi=hi, Hungarian=hu, Indonesian=id, Irish=ga, Italian=it, Japanese=ja, Korean=ko, Kurdish=ku, Latvian=lv, Lithuanian=lt, Marathi=mr, Norwegian=no, Persian (Farsi)=fa, Polish=pl, Portugese=pt, Romanian=ro, Russian=ru, Slovak=sk, Spanish=es, Swedish=sv, Thai=th, Turkish=tr, Ukranian=uk, Urdu=ur

Stop words removal is applied on query words that are not interpreted as a prefix. The behavior depends of the queryType parameter:

* `queryType=prefixLast` means the last query word is a prefix and it won’t be considered for stop words removal
* `queryType=prefixNone` means no query word are prefix, stop words removal will be applied on all query words
* `queryType=prefixAll` means all query terms are prefix, stop words won’t be removed

This parameter is useful when you have a query in natural language like “what is a record?”.
In this case, before executing the query, we will remove “what”, “is” and “a” in order to just search for “record”.
This removal will remove false positive because of stop words, especially when combined with optional words.
For most use cases, it is better to not use this feature as people search by keywords on search engines.




#### disablePrefixOnAttributes

- scope: `settings`
- type: `array of strings`
- default: `[]`


List of attributes on which you want to disable prefix matching
(must be a subset of the `attributesToIndex` index setting).

This setting is useful on attributes that contain string that should not be matched as a prefix
(for example a product SKU).


#### disableExactOnAttributes

- scope: `settings`
- type: `array of strings`
- default: `[]`


List of attributes on which you want to disable the computation of `exact` criteria
(must be a subset of the `attributesToIndex` index setting).

#### exactOnSingleWordQuery

- scope: `settings`, `search`
- type: `string`
- default: `attribute`


This parameter control how the `exact` ranking criterion is computed when the query contains one word. There is three different values:
* `none`: no exact on single word query
* `word`: exact set to 1 if the query word is found in the record. The query word needs to have at least 3 chars and not be part of our stop words dictionary
* `attribute` (default): exact set to 1 if there is an attribute containing a string equals to the query

#### alternativesAsExact

- scope: `settings`, `search`
- type: `string`
- default: `['ignorePlurals', 'singleWordSynonym']`


Specify the list of approximation that should be considered as an exact match in the ranking formula:

* `ignorePlurals`: alternative words added by the ignorePlurals feature
* `singleWordSynonym`: single-word synonym (For example "NY" = "NYC")
* `multiWordsSynonym`: multiple-words synonym (For example "NY" = "New York")

### Advanced

#### attributeForDistinct

- scope: `settings`
- type: `string`
- default: `null`


The name of the attribute used for the `Distinct` feature.

This feature is similar to the SQL "distinct" keyword.
When enabled in queries with the `distinct=1` parameter,
all hits containing a duplicate value for this attribute are removed from the results.

For example, if the chosen attribute is `show_name` and several hits have the same value for `show_name`,
then only the first one is kept and the others are removed from the results.

To get a full understanding of how `Distinct` works,
you can have a look at our [guide on distinct](https://www.algolia.com/doc/search/distinct).

#### distinct

- scope: `settings`, `search`
- type: `integer`
- default: `0`


If set to 1,
enables the distinct feature, disabled by default, if the `attributeForDistinct` index setting is set.

This feature is similar to the SQL "distinct" keyword.
When enabled in a query with the `distinct=1` parameter,
all hits containing a duplicate value for the attributeForDistinct attribute are removed from results.

For example, if the chosen attribute is `show_name` and several hits have the same value for `show_name`,
then only the best one is kept and the others are removed.

To get a full understanding of how `Distinct` works,
you can have a look at our [guide on distinct](https://www.algolia.com/doc/search/distinct).


#### rankingInfo

- scope: `search`
- type: `boolean`
- default: `false`


If set to true,
the result hits will contain ranking information in the **_rankingInfo** attribute.

#### numericAttributesToIndex

- scope: `settings`
- type: `array of strings`
- default: ``


All numerical attributes are automatically indexed as numerical filters
(allowing filtering operations like `<` and `<=`).
If you don't need filtering on some of your numerical attributes,
you can specify this list to speed up the indexing.
<br/> If you only need to filter on a numeric value with the operator '=',
you can speed up the indexing by specifying the attribute with `equalOnly(AttributeName)`.
The other operators will be disabled.

#### allowCompressionOfIntegerArray

- scope: `settings`
- type: `boolean`
- default: `false`


Allows compression of big integer arrays.

In data-intensive use-cases,
we recommended enabling this feature and then storing the list of user IDs or rights as an integer array.
When enabled, the integer array is reordered to reach a better compression ratio.

#### numericFilters (deprecated)

- scope: `search`
- type: `array of strings`
- default: `[]`


A string that contains the comma separated list of numeric filters you want to apply.
The filter syntax is `attributeName` followed by `operand` followed by `value`.
Supported operands are `<`, `<=`, `=`, `>` and `>=`.

You can easily perform range queries via the `:` operator.
This is equivalent to combining a `>=` and `<=` operand.

For example, `numericFilters=price:10 to 1000`.

You can also mix OR and AND operators.
The OR operator is defined with a parenthesis syntax.

For example, `(code=1 AND (price:[0-100] OR price:[1000-2000]))`
translates to `encodeURIComponent("code=1,(price:0 to 100,price:1000 to 2000)")`.

You can also use a string array encoding (for example `numericFilters: ["price>100","price<1000"]`).

#### tagFilters (deprecated)

- scope: `search`
- type: `string`
- default: `""`


Filter the query by a set of tags.

You can AND tags by separating them with commas.
To OR tags, you must add parentheses.

For example, `tagFilters=tag1,(tag2,tag3)` means *tag1 AND (tag2 OR tag3)*.

You can also use a string array encoding.

For example, `tagFilters: ["tag1",["tag2","tag3"]]` means *tag1 AND (tag2 OR tag3)*.

Negations are supported via the `-` operator, prefixing the value.

For example: `tagFilters=tag1,-tag2`.

At indexing, tags should be added in the **_tags** attribute of objects.

For example `{"_tags":["tag1","tag2"]}`.

#### facetFilters (deprecated)

- scope: `search`
- type: `string`
- default: `""`


Filter the query with a list of facets. Facets are separated by commas and is encoded as `attributeName:value`.
To OR facets, you must add parentheses.

For example: `facetFilters=(category:Book,category:Movie),author:John%20Doe`.

You can also use a string array encoding.

For example, `[["category:Book","category:Movie"],"author:John%20Doe"]`.

#### analytics

- scope: `settings`, `search`
- type: `string`
- default: `['ignorePlurals', 'singleWordSynonym']`


If set to false, this query will not be taken into account in the analytics feature.

#### placeholders

- scope: `settings`
- type: `hash of array of words`
- default: ``


This is an advanced use-case to define a token substitutable by a list of words
without having the original token searchable.

It is defined by a hash associating placeholders to lists of substitutable words.

For example, `"placeholders": { "<streetnumber>": ["1", "2", "3", ..., "9999"]}`
would allow it to be able to match all street numbers. We use the `< >` tag syntax
to define placeholders in an attribute.

For example:
* Push a record with the placeholder:
`{ "name" : "Apple Store", "address" : "&lt;streetnumber&gt; Opera street, Paris" }`.
* Configure the placeholder in your index settings:
`"placeholders": { "<streetnumber>" : ["1", "2", "3", "4", "5", ... ], ... }`.

#### altCorrections

- scope: `settings`
- type: `array of objects`
- default: `[]`


Specify alternative corrections that you want to consider.

Each alternative correction is described by an object containing three attributes:
* **word**: The word to correct.
* **correction**: The corrected word.
* **nbTypos** The number of typos (1 or 2) that will be considered for the ranking algorithm (1 typo is better than 2 typos).

For example:

`"altCorrections": [ { "word" : "foot", "correction": "feet", "nbTypos": 1 }, { "word": "feet", "correction": "foot", "nbTypos": 1 } ]`.


## Manage Indices

### Create an index

To create an index, you need to perform any indexing operation like:
- set settings
- add object

### List indices - `listIndexes`

You can list all your indices along with their associated information (number of entries, disk size, etc.) with the `listIndexes` method:

```js
client.listIndexes(function(err, content) {
  console.log(content);
});
```




### Delete index - `deleteIndex`

You can delete an index using its name:

```js
client.deleteIndex('contacts', function(error) {
  if (!err) {
    console.log('success');
  }
});
```


### Clear index - `clearIndex`
You can delete the index contents without removing settings and index specific API keys by using the clearIndex command:

```js
index.clearIndex(function(err, content) {
  console.log(content);
});
```


### Copy index - `copyIndex`

You can easily copy or rename an existing index using the `copy` and `move` commands.
**Note**: Move and copy commands overwrite the destination index.

```js
// Rename MyIndex in MyIndexNewName
client.moveIndex('MyIndex', 'MyIndexNewName', function(err, content) {
  console.log(content);
});

// Copy MyIndex in MyIndexCopy
client.copyIndex('MyIndex', 'MyIndexCopy', function(err, content) {
  console.log(content);
});
```


### Move index - `moveIndex`

The move command is particularly useful if you want to update a big index atomically from one version to another. For example, if you recreate your index `MyIndex` each night from a database by batch, you only need to:
 1. Import your database into a new index using [batches](#batch-writes). Let's call this new index `MyNewIndex`.
 1. Rename `MyNewIndex` to `MyIndex` using the move command. This will automatically override the old index and new queries will be served on the new one.

```js
// Rename MyNewIndex in MyIndex (and overwrite it)
client.moveIndex('MyNewIndex', 'MyIndex', function(err, content) {
  console.log(content);
});
```






## Api Keys

The **admin** API key provides full control of all your indices. *The admin API key should always be kept secure; do NOT use it from outside your back-end.*

You can also generate user API keys to control security.
These API keys can be restricted to a set of operations or/and restricted to a given index.

### Generate key - `generateSecuredApiKey`

You may have a single index containing **per user** data. In that case, all records should be tagged with their associated `user_id` in order to add a `tagFilters=user_42` filter at query time to retrieve only what a user has access to. If you're using the [JavaScript client](http://github.com/algolia/algoliasearch-client-js), it will result in a security breach since the user is able to modify the `tagFilters` you've set by modifying the code from the browser. To keep using the JavaScript client (recommended for optimal latency) and target secured records, you can generate a secured API key from your backend:

```js
// generate a public API key for user 42. Here, records are tagged with:
//  - 'user_XXXX' if they are visible by user XXXX
var public_key = client.generateSecuredApiKey('YourSearchOnlyApiKey', {filters: '_tags:user_42'});
```

This public API key can then be used in your JavaScript code as follow:

```js
var client = algoliasearch('YourApplicationID', '<%= public_api_key %>');

var index = client.initIndex('indexName')

index.search('something', function(err, content) {
  if (err) {
    console.error(err);
    return;
  }

  console.log(content);
});
```

You can mix rate limits and secured API keys by setting a `userToken` query parameter at API key generation time. When set, a unique user will be identified by her `IP + user_token` instead of only by her `IP`. This allows you to restrict a single user to performing a maximum of `N` API calls per hour, even if she shares her `IP` with another user.

```js
// generate a public API key for user 42. Here, records are tagged with:
//  - 'user_XXXX' if they are visible by user XXXX
var public_key = client.generateSecuredApiKey('YourSearchOnlyApiKey', {filters: '_tags:user_42', userToken: 'user_42'});
```

This public API key can then be used in your JavaScript code as follow:

```js
var client = algoliasearch('YourApplicationID', '<%= public_api_key %>');

var index = client.initIndex('indexName')

index.search('another query', function(err, content) {
  if (err) {
    console.error(err);
    return;
  }

  console.log(content);
});
```





## Synonyms

### Save synonym - `saveSynonym`

This method saves a single synonym record into the index.

In this example, we specify true to forward the creation to slave indices.
By default the behavior is to save only on the specified index.

```js
index.saveSynonym({
  objectID: 'a-unique-identifier',
  type: 'synonym',
  synonyms: ['car', 'vehicle', 'auto']
}, { forwardToSlaves: true }, function(err, content) {
  if(err)
  {
    console.error(err);
  }
});
```

### Batch synonyms - `batchSynonyms`

Use the batch method to create a large number of synonyms at once,
forward them to slave indices if desired,
and optionally replace all existing synonyms
on the index with the content of the batch using the replaceExistingSynonyms parameter.

You should always use replaceExistingSynonyms to atomically replace all synonyms
on a production index. This is the only way to ensure the index always
has a full list of synonyms to use during the indexing of the new list.

```js
// Batch synonyms, with slave forwarding and atomic replacement of existing synonyms
index.batchSynonyms([{
  objectID: 'a-unique-identifier',
  type: 'synonym',
  synonyms: ['car', 'vehicle', 'auto']
}, {
  objectID: 'another-unique-identifier',
  type: 'synonym',
  synonyms: ['street', 'st']
}], { forwardToSlaves: true, replaceExistingSynonyms: true }, function(err, content) {
  if(err)
  {
    console.error(err);
  }
});
```

### Editing Synonyms

Updating the value of a specific synonym record is the same as creating one.
Make sure you specify the same objectID used to create the record and the synonyms
will be updated.
When updating multiple synonyms in a batch call (but not all synonyms),
make sure you set replaceExistingSynonyms to false (or leave it out,
false is the default value).
Otherwise, the entire synonym list will be replaced only partially with the records
in the batch update.

### Delete Synonyms - `delete_synonyms`

Use the normal index delete method to delete synonyms,
specifying the objectID of the synonym record you want to delete.
Forward the deletion to slave indices by setting the forwardToSlaves parameter to true.

```js
// Delete and forward to slaves
index.deleteSynonym('a-unique-identifier', { forwardToSlaves: true }, function(err, content) {
  if(err)
  {
    console.error(err);
  }
});
```

### Clear all synonyms - `clearSynonyms`

This is a convenience method to delete all synonyms at once.
It should not be used on a production index to then push a new list of synonyms:
there would be a short period of time during which the index would have no synonyms
at all.

To atomically replace all synonyms of an index,
use the batch method with the replaceExistingSynonyms parameter set to true.

```js
// Clear synonyms and forward to slaves
index.clearSynonyms({ forwardToSlaves: true }, function(err, content) {
  if(err)
  {
    console.error(err);
  }
});
```

### Get synonym - `getSynonym`

Search for synonym records by their objectID or by the text they contain.
Both methods are covered here.

```js
index.getSynonym('a-unique-identifier', function(err, content) {
  if(err)
  {
    console.error(err);
  }

  var synonym = content;
});
```

### Search synonyms - `searchSynonyms`

Search for synonym records similar to how you’d search normally.

Accepted search parameters:
- query: the actual search query to find synonyms. Use an empty query to browse all the synonyms of an index.
- type: restrict the search to a specific type of synonym. Use an empty string to search all types (default behavior). Multiple types can be specified using a comma-separated list or an array.
- page: the page to fetch when browsing through several pages of results. This value is zero-based.
hitsPerPage: the number of synonyms to return for each call. The default value is 100.

```js
// Searching for "street" in synonyms and one-way synonyms; fetch the second page with 10 hits per page
index.searchSynonyms({
  query: 'street',
  type: 'synonym,oneWaySynonym',
  page: 1,
  hitsPerPage: 10
}, function(err, content) {
  if(err)
  {
    console.error(err);
  }

  console.log(content.hits);
});
```



## Advanced

### Custom batch - `batch`

You may want to perform multiple operations with one API call to reduce latency.
We expose four methods to perform batch operations:
 * Add objects - `addObjects`: Add an array of objects using automatic `objectID` assignment.
 * Update objects - `saveObjects`: Add or update an array of objects that contains an `objectID` attribute.
 * Delete objects - `deleteObjects`: Delete an array of objectIDs.
 * Partial update - `partialUpdateObjects`: Partially update an array of objects that contain an `objectID` attribute (only specified attributes will be updated).

Example using automatic `objectID` assignment:
```js
var objects = [{
  firstname: 'Jimmie',
  lastname: 'Barninger'
}, {
  firstname: 'Warren',
  lastname: 'Speach'
}];

index.addObjects(objects, function(err, content) {
  console.log(content);
});
```

Example with user defined `objectID` (add or update):
```js
var objects = [{
  firstname: 'Jimmie',
  lastname: 'Barninger',
  objectID: 'myID1'
}, {
  firstname: 'Warren',
  lastname: 'Speach',
  objectID: 'myID2'
}];

index.saveObjects(objects, function(err, content) {
  console.log(content);
});
```

Example that deletes a set of records:
```js
index.deleteObjects(['myID1', 'myID2'], function(err, content) {
  console.log(content);
});
```

Example that updates only the `firstname` attribute:
```js
var objects = [{
  firstname: 'Jimmie',
  objectID: 'myID1'
}, {
  firstname: 'Warren',
  objectID: 'myID2'
}];

index.partialUpdateObjects(objects, function(err, content) {
  console.log(content);
});
```



If you have one index per user, you may want to perform a batch operations across severals indexes.
We expose a method to perform this type of batch:
```js
client.batch([{
  action: 'addObject',
  indexName: 'clients',
  body: {
    name: 'Bill'
  }
}, {
  action: 'udpateObject',
  indexName: 'fruits',
  body: {
    objectID: '29138',
    name: 'banana'
  }
}], cb)
```

The attribute **action** can have these values:
- addObject
- updateObject
- partialUpdateObject
- partialUpdateObjectNoCreate
- deleteObject

### Backup / Export an index - `browse`

The `search` method cannot return more than 1,000 results. If you need to
retrieve all the content of your index (for backup, SEO purposes or for running
a script on it), you should use the `browse` method instead. This method lets
you retrieve objects beyond the 1,000 limit.

This method is optimized for speed. To make it fast, distinct, typo-tolerance,
word proximity, geo distance and number of matched words are disabled. Results
are still returned ranked by attributes and custom ranking.


It will return a `cursor` alongside your data, that you can then use to retrieve
the next chunk of your records.

You can specify custom parameters (like `page` or `hitsPerPage`) on your first
`browse` call, and these parameters will then be included in the `cursor`. Note
that it is not possible to access records beyond the 1,000th on the first call.

Example:

```js
index.browse('jazz', function browseDone(err, content) {
  if (err) {
    throw err;
  }

  console.log('We are at page %d on a total of %d pages, with %d hits.', content.page, content.nbPages, content.hits.length);

  if (content.cursor) {
    index.browseFrom(content.cursor, function browseFromDone(err, content) {
      if (err) {
        throw err;
      }

      console.log('We are at page %d on a total of %d pages, with %d hits.', content.page, content.nbPages, content.hits.length);
    });
  }
});
```

You can also use the `browseAll` method that will crawl the whole index and emit
events whenever a new chunk of records is fetched.

```js
var browser = index.browseAll();
var hits = [];

browser.on('result', function onResult(content) {
  hits = hits.concat(content.hits);
});

browser.on('end', function onEnd() {
  console.log('Finished!');
  console.log('We got %d hits', hits.length);
});

browser.on('error', function onError(err) {
  throw err;
});

// You can stop the process at any point with
// browser.stop();
```




### List api keys - `listApiKeys`

To list existing keys, you can use:

```js
// Lists global API Keys
client.listUserKeys(function(err, content) {
  console.log(content);
});

// Lists API Keys that can access only to this index
index.listUserKeys(function(err, content) {
  console.log(content);
});
```

Each key is defined by a set of permissions that specify the authorized actions. The different permissions are:
 * **search**: Allowed to search.
 * **browse**: Allowed to retrieve all index contents via the browse API.
 * **addObject**: Allowed to add/update an object in the index.
 * **deleteObject**: Allowed to delete an existing object.
 * **deleteIndex**: Allowed to delete index content.
 * **settings**: allows to get index settings.
 * **editSettings**: Allowed to change index settings.
 * **analytics**: Allowed to retrieve analytics through the analytics API.
 * **listIndexes**: Allowed to list all accessible indexes.

### Add user key - `addUserKey`

To create API keys:

```js
// Creates a new global API key that can only perform search actions
client.addUserKey(['search'], function(err, content) {
  console.log('Key:' + content['key']);
});

// Creates a new API key that can only perform search action on this index
index.addUserKey(['search'], function(err, content) {
  console.log('Key:' + content['key']);
});
```

You can also create an API Key with advanced settings:

<table><tbody>
  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>validity</code></div>
            
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>Add a validity period. The key will be valid for a specific period of time (in seconds).</p>

      </td>
    </tr>
    
  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>maxQueriesPerIPPerHour</code></div>
            
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>Specify the maximum number of API calls allowed from an IP address per hour. Each time an API call is performed with this key, a check is performed. If the IP at the source of the call did more than this number of calls in the last hour, a 403 code is returned. Defaults to 0 (no rate limit). This parameter can be used to protect you from attempts at retrieving your entire index contents by massively querying the index.</p>

<p>Note: If you are sending the query through your servers, you must use the <code>enableRateLimitForward(&quot;TheAdminAPIKey&quot;, &quot;EndUserIP&quot;, &quot;APIKeyWithRateLimit&quot;)</code> function to enable rate-limit.</p>

      </td>
    </tr>
    
  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>maxHitsPerQuery</code></div>
            
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>Specify the maximum number of hits this API key can retrieve in one call. Defaults to 0 (unlimited). This parameter can be used to protect you from attempts at retrieving your entire index contents by massively querying the index.</p>

      </td>
    </tr>
    
  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>indexes</code></div>
            
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>Specify the list of targeted indices. You can target all indices starting with a prefix or ending with a suffix using the &#39;*&#39; character. For example, &quot;dev_*&quot; matches all indices starting with &quot;dev_&quot; and &quot;*_dev&quot; matches all indices ending with &quot;_dev&quot;. Defaults to all indices if empty or blank.</p>

      </td>
    </tr>
    
  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>referers</code></div>
            
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>Specify the list of referers. You can target all referers starting with a prefix or ending with a suffix using the &#39;*&#39; character. For example, &quot;algolia.com/*&quot; matches all referers starting with &quot;algolia.com/&quot; and &quot;*.algolia.com&quot; matches all referers ending with &quot;.algolia.com&quot;. Defaults to all referers if empty or blank.</p>

      </td>
    </tr>
    
  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>queryParameters</code></div>
            
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>Specify the list of query parameters. You can force the query parameters for a query using the url string format (param1=X&amp;param2=Y...).</p>

      </td>
    </tr>
    
  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>description</code></div>
            
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>Specify a description to describe where the key is used.</p>

      </td>
    </tr>
    

</tbody></table>

```js
// Creates a new global API key that is valid for 300 seconds
client.addUserKey(['search'], {
  validity: 300
}, function(err, content) {
  console.log('Key:' + content['key']);
});

// Creates a new index specific API key:
// - valid for 300 seconds
// - with a rate limit of 100 calls per hour per IP
// - and a maximum of 20 hits
index.addUserKey(['search'], {
  validity: 300,
  maxQueriesPerIPPerHour: 100,
  maxHitsPerQuery: 20
}, function(err, content) {
  console.log('Key:' + content['key']);
});
```

### Update user key - `updateUserKey`

To update the permissions of an existing key:
```js
// Update an existing global API key that is valid for 300 seconds
client.updateUserKey(
  'myAPIKey',
  ['search'], {
    validity: 300
  }, function(err, content) {
    console.log('Key:' + content['key']);
  }
);

// Update an index specific API key:
// - valid for 300 seconds
// - with a rate limit of 100 calls per hour per IP
// - and a maximum of 20 hits
index.updateUserKey(
  'myAPIKey',
  ['search'], {
    validity: 300,
    maxQueriesPerIPPerHour: 100,
    maxHitsPerQuery: 20
  }, function(err, content) {
    console.log('Key:' + content['key']);
  }
);
```
To get the permissions of a given key:
```js
// Gets the rights of a global key
client.getUserKeyACL('7f2615414bc619352459e09895d2ebda', function(err, content) {
  console.log(content);
});

// Gets the rights of an index specific key
index.getUserKeyACL('9b9335cb7235d43f75b5398c36faabcd', function(err, content) {
  console.log(content);
});
```

### Delete user key - `deleteUserKey`
To delete an existing key:
```js
// Deletes a global key
client.deleteUserKey('7f2615414bc619352459e09895d2ebda', function(err, content) {
  console.log(content);
});

// Deletes an index specific key
index.deleteUserKey('9b9335cb7235d43f75b5398c36faabcd', function(err, content) {
  console.log(content);
});
```

### Get key permissions - `getUserKeyACL`



To get the permissions of a given key:
```js
// Gets the rights of a global key
client.getUserKeyACL('7f2615414bc619352459e09895d2ebda', function(err, content) {
  console.log(content);
});

// Gets the rights of an index specific key
index.getUserKeyACL('9b9335cb7235d43f75b5398c36faabcd', function(err, content) {
  console.log(content);
});
```

### Multiple queries - `multipleQueries`

You can send multiple queries with a single API call using a batch of queries:

```js
var client = algoliasearch('ApplicationID', 'apiKey');

var queries = [{
  indexName: 'categories',
  query: 'search in categories index',
  params: {
    hitsPerPage: 3
  }
}, {
  indexName: 'products',
  query: 'first search in products',
  params: {
    hitsPerPage: 3,
    filters: '_tags:promotion'
  }
}, {
  indexName: 'products',
  query: 'another search in products',
  params: {
    hitsPerPage: 10
  }
}];

function searchCallback(err, content) {
  if (err) {
    console.error(err);
    return;
  }

  var categories = content.results[0];
  for (var i = 0; i < categories.hits.length; ++i) {
    console.log(categories.hits[i]);
  }

  var products_promotion = content.results[1];
  for (var i = 0; i < products_promotion.hits.length; ++i) {
    console.log(products_promotion.hits[i]);
  }

  var products = content.results[2];
  for (var i = 0; i < products.hits.length; ++i) {
    console.log(products.hits[i]);
  }
}

// perform 3 queries in a single API call:
//  - 1st query targets index `categories`
//  - 2nd and 3rd queries target index `products`
client.search(queries, searchCallback);
```

The resulting JSON answer contains a ```results``` array storing the underlying queries answers. The answers order is the same than the requests order.

You can specify a `strategy` parameter to optimize your multiple queries:
- `none`: Execute the sequence of queries until the end.
- `stopIfEnoughMatches`: Execute the sequence of queries until the number of hits is reached by the sum of hits.



### Get Logs - `getLogs`

You can retrieve the latest logs via this API. Each log entry contains:
 * Timestamp in ISO-8601 format
 * Client IP
 * Request Headers (API Key is obfuscated)
 * Request URL
 * Request method
 * Request body
 * Answer HTTP code
 * Answer body
 * SHA1 ID of entry

You can retrieve the logs of your last 1,000 API calls and browse them using the offset/length parameters:

<table><tbody>
  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>offset</code></div>
            
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>Specify the first entry to retrieve (0-based, 0 is the most recent log entry). Defaults to 0.</p>

      </td>
    </tr>
    
  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>length</code></div>
            
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>Specify the maximum number of entries to retrieve starting at the offset. Defaults to 10. Maximum allowed value: 1,000.</p>

      </td>
    </tr>
    
  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>onlyErrors</code></div>
            
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>Retrieve only logs with an HTTP code different than 200 or 201. (deprecated)</p>

      </td>
    </tr>
    
  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>type</code></div>
            
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>Specify the type of logs to retrieve:</p>

<ul>
<li><code>query</code>: Retrieve only the queries.</li>
<li><code>build</code>: Retrieve only the build operations.</li>
<li><code>error</code>: Retrieve only the errors (same as <code>onlyErrors</code> parameters).</li>
</ul>

      </td>
    </tr>
    
</tbody></table>

```js
client.getLogs({
  offset: 100, // where to start from, default to 0
  length: 100, // how much lines do you want, default to 10
  type: 'error' // which logs do you want, default to no value (all)
}, function(err, content) {
  console.log(content);
});
```


### REST API

We've developed API clients for the most common programming languages and platforms.
These clients are advanced wrappers on top of our REST API itself and have been made
in order to help you integrating the service within your apps:
for both indexing and search.

Everything that can be done using the REST API can be done using those clients.

The REST API lets your interact directly with Algolia platforms from anything that can send an HTTP request
[Go to the REST API doc](https://algolia.com/doc/rest)



