<!--NO_HTML-->

# Algolia Search API Client for JavaScript

<!--/NO_HTML-->





<!--NO_HTML-->

[Algolia Search](https://www.algolia.com) is a hosted full-text, numerical, and faceted search engine capable of delivering realtime results from the first keystroke.

<!--/NO_HTML-->




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




<!--NO_HTML-->

Table of Contents
-----------------
**Getting Started**

1. [Setup](#setup)
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
1. [Guides & Tutorials](#guides-tutorials)
1. [Old JavaScript clients](#old-javascript-clients)

**Commands Reference**

1. [Add a new object](#add-a-new-object-to-the-index)
1. [Update an object](#update-an-existing-object-in-the-index)
1. [Search](#search)
1. [Multiple queries](#multiple-queries)
1. [Get an object](#get-an-object)
1. [Delete an object](#delete-an-object)
1. [Delete by query](#delete-by-query)
1. [Index settings](#index-settings)
1. [List indices](#list-indices)
1. [Delete an index](#delete-an-index)
1. [Clear an index](#clear-an-index)
1. [Wait indexing](#wait-indexing)
1. [Batch writes](#batch-writes)
1. [Copy / Move an index](#copy--move-an-index)
1. [Backup / Export an index](#backup--export-an-index)
1. [API Keys](#api-keys)
1. [Logs](#logs)


<!--/NO_HTML-->



Setup
============
To setup your project, follow these steps:




### Frontend

You can either use a package manager like npm or include a `<script>` tag.

#### npm

```sh
npm install algoliasearch --save
```

We are [browserify](http://browserify.org/)able and [webpack](http://webpack.github.io/) friendly.

#### Bower

```sh
bower install algoliasearch -S
```

#### &lt;script&gt; tag using CDNS

##### Recommended: jsDelivr.com

[jsDelivr](http://www.jsdelivr.com/about.php) is a global CDN delivery for JavaScript libraries.

To include the latest releases and all upcoming features and patches, use this:

```html
<script src="//cdn.jsdelivr.net/algoliasearch/3/algoliasearch.min.js"></script>
```

##### Other CDNS

We recommend using jsDelivr, but `algoliasearch` is also available at:
- [CDNJS](https://cdnjs.com/libraries/algoliasearch)
- [npmcdn](https://npmcdn.com): https://npmcdn.com/algoliasearch@3/dist/algoliasearch.min.js

#### Browserify, webpack

```sh
npm install algoliasearch --save
```

```js
var algoliasearch = require('algoliasearch');
var client = algoliasearch('applicationID', 'apiKey');
var index = client.initIndex('indexName');
index.search('something', function searchDone(err, content) {
  console.log(err, content);
});
```

### Node.js

```sh
npm install algoliasearch --save
```

```js
var algoliasearch = require('algoliasearch');
var client = algoliasearch('applicationID', 'apiKey');
var index = client.initIndex('indexName');
index.search('something', function searchDone(err, content) {
  console.log(err, content);
});
```

### Parse.com

```sh
curl https://raw.githubusercontent.com/algolia/algoliasearch-client-js/master/dist/algoliasearch.parse.js -o /your/parse/project/cloud/algoliasearch.parse.js
```

In `cloud/main.js` for example:

```js
var algoliasearch = require('cloud/algoliasearch.parse.js');
var client = algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76');
var index = client.initIndex('contacts');

Parse.Cloud.define("hello", function(request, response) {
  index.search('Atlenta', function(err, results) {
    if (err) {
      throw err;
    }

    response.success('We got ' + results.nbHits + ' results');
  });
});
```

### React Native

```sh
npm install algoliasearch --save
```

```js
var algoliasearch = require('algoliasearch/reactnative');
var client = algoliasearch('applicationID', 'apiKey');
var index = client.initIndex('indexName');
index.search('something', function searchDone(err, content) {
  console.log(err, content);
});
```

### Search only/lite client

We have a lightweight build available that can only do searches. Use it when filesize
is important to you or if you like to include only what you need.

Find it on jsDelivr:

```html
<script src="//cdn.jsdelivr.net/algoliasearch/3/algoliasearchLite.min.js"></script>
```

You can also use it with npm like so:

```js
var algoliasearch = require('algoliasearch/lite');
var client = algoliasearch('applicationID', 'apiKey');
var index = client.initIndex('indexName');
index.search('something', function searchDone(err, content) {
  console.log(err, content);
});
```




Quick Start
-------------

### Frontend

The JavaScript API client gives you access to low level methods to search and
receive results. This is all you need for building your front-end but will
require custom code on your side for displaying the results. Reading
our [guides](https://www.algolia.com/doc#search) will help you in that.

We've also released two JavaScript libraries to ease the building of the most
common kind of UI:

#### [autocomplete.js](https://github.com/algolia/autocomplete.js)

[autocomplete.js](https://github.com/algolia/autocomplete.js) helps you build 
**dropdown** menus.

![autocomplete.js example](https://raw.githubusercontent.com/algolia/algoliasearch-client-js/master/examples/autocomplete.gif)

#### [instantsearch.js](https://community.algolia.com/instantsearch.js/)

[instantsearch.js](https://community.algolia.com/instantsearch.js/) is for **full
page** search.

![instantsearch.js example](https://raw.githubusercontent.com/algolia/algoliasearch-client-js/master/examples/instantsearch.gif)

We strongly encourage you to have a look at those libraries because they are
packaged with a lot of options that will cover most of your needs without
requiring you to do all the plumbing.

To build your frontend search experience, also check out our [examples](./examples/) and [guides](https://www.algolia.com/doc#search).

#### Vanilla JavaScript
```html
<script src="//cdn.jsdelivr.net/algoliasearch/3/algoliasearch.min.js"></script>
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

#### jQuery module
We provide a specific [jQuery](http://jquery.com/) build that will use [jQuery.ajax](http://api.jquery.com/jquery.ajax/).

It can be used with callbacks or [jQuery promises](https://api.jquery.com/promise/).

```html
<script src="//cdn.jsdelivr.net/jquery/2.1.3/jquery.min.js"></script>
<script src="//cdn.jsdelivr.net/algoliasearch/3/algoliasearch.jquery.min.js"></script>
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

#### AngularJS module
We provide a specific [AngularJS](https://angularjs.org/) build that is using the [$http service](https://docs.angularjs.org/api/ng/service/$http).

It can be used with callbacks or [AngularJS promises](https://docs.angularjs.org/api/ng/service/$q).

```html
<script src="//cdn.jsdelivr.net/angularjs/1.3.14/angular.min.js"></script>
<script src="//cdn.jsdelivr.net/algoliasearch/3/algoliasearch.angular.min.js"></script>
<script>
  angular
    .module('myapp', ['algoliasearch'])
    .controller('SearchCtrl', ['$scope', 'algolia', function($scope, algolia) {
      $scope.algolia = {
        'query' : '',
        'hits' : []
      };
      var client = algolia.Client('ApplicationID', 'apiKey');
      var index = client.initIndex('indexName');
      $scope.$watch('algolia.query', function() {
        index.search($scope.algolia.query)
          .then(function searchSuccess(content) {
            console.log(content);
            // add content of search results to scope for display in view
            $scope.algolia.hits = content.hits;
          }, function searchFailure(err) {
            console.log(err);
        });
      });
    }]);
</script>
```
You can see the full [Angular example
here](https://github.com/algolia/algoliasearch-client-js/blob/master/examples/angular.html)

### Backend (Node.js)

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




Client options
-------------

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

Callback convention
-------------

Every API call takes a callback as last parameter. This callback will then be called with two arguments:

 1. **error**: null or an [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) object. More info on the error can be find in `error.message`.
 2. **content**: the object containing the answer from the server, it's a JavaScript object

Promises
-------------

**If you do not provide a callback**, you will get a promise (but never both).

Promises are the [native Promise implementation](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise).

We use [jakearchibald/es6-promise](https://github.com/stefanpenner/es6-promise) as a polyfill when needed.

Request strategy
-------------

The request strategy used by the JavaScript client includes:

- On the browser:
  + [CORS](https://en.wikipedia.org/wiki/Cross-Origin_Resource_Sharing#Browser_support) for modern browsers
  + [XDomainRequest](https://msdn.microsoft.com/en-us/library/ie/cc288060%28v=vs.85%29.aspx) for IE <= 10
  + [JSONP](https://en.wikipedia.org/wiki/JSONP) in any situation where Ajax requests are unavailabe or blocked.
- Node.js:
  + native [`http` module](https://nodejs.org/api/)

Connections are always `keep-alive`.

Cache
-------------

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

Proxy support
------------

**Node.js only**

If you are behind a proxy, just set `HTTP_PROXY` or `HTTPS_PROXY` environment variables before starting your Node.js program.

```sh
HTTP_PROXY=http://someproxy.com:9320 node main.js
```

Keep-alive
-------------

**Node.js only**

Keep-alive is activated by default.

Because of the nature of keepalive connections, your process will hang even if you do not do any more command using the `client`.

To fix this, we expose a `client.destroy()` method that will terminate all remaining alive connections.

You should call this method when you are finished working with the AlgoliaSearch API. So that your process will exit gently.

**Note: keep-alive is still always activated in browsers, this is a native behavior of browsers.**

Debugging
-------------

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





<!--NO_HTML-->

Guides & Tutorials
================
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


<!--/NO_HTML-->



Old JavaScript clients
======================

In April 2015, we released the V3 of our JavaScript client (the one you are looking at) able to work in Node.js and the browser.

If you were using our browser version (V2), [read the migration guide](https://github.com/algolia/algoliasearch-client-js/wiki/Migration-guide-from-2.x.x-to-3.x.x)

If you were using our Node.js version (V1, npm `algolia-search`), [read the migration guide](https://github.com/algolia/algoliasearch-client-js/wiki/Node.js-v1.x.x-migration-guide)



Add a new object to the Index
==================

Each entry in an index has a unique identifier called `objectID`. There are two ways to add en entry to the index:

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

Update an existing object in the Index
==================

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

Search
==================



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

## Full Text Search Parameters
<table><tbody>

  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>query</code></div>
            <div class="client-readme-param-meta"><div><em>Type: <strong>string</strong></em></div></div>
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>The instant search query string, used to set the string you want to search in your index. If no query parameter is set, the textual search will match with all the objects.</p>

      </td>
    </tr>
    

  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>queryType</code></div>
            <div class="client-readme-param-meta"><div><em>Default: <strong>prefixLast</strong></em></div></div>
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>Selects how the query words are interpreted. It can be one of the following values:</p>

<ul>
<li><code>prefixAll</code>: All query words are interpreted as prefixes. This option is not recommended.</li>
<li><code>prefixLast</code>: Only the last word is interpreted as a prefix (default behavior).</li>
<li><code>prefixNone</code>: No query word is interpreted as a prefix. This option is not recommended.</li>
</ul>

      </td>
    </tr>
    

  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>removeWordsIfNoResults</code></div>
            <div class="client-readme-param-meta"><div><em>Default: <strong>none</strong></em></div></div>
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>This option is used to select a strategy in order to avoid having an empty result page. There are three different options:</p>

<ul>
<li><code>lastWords</code>: When a query does not return any results, the last word will be added as optional. The process is repeated with n-1 word, n-2 word, ... until there are results.</li>
<li><code>firstWords</code>: When a query does not return any results, the first word will be added as optional. The process is repeated with second word, third word, ... until there are results.</li>
<li><code>allOptional</code>: When a query does not return any results, a second trial will be made with all words as optional. This is equivalent to transforming the AND operand between query terms to an OR operand.</li>
<li><code>none</code>: No specific processing is done when a query does not return any results (default behavior).</li>
</ul>

      </td>
    </tr>
    

  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>minWordSizefor1Typo</code></div>
            <div class="client-readme-param-meta"><div><em>Type: <strong>number</strong></em></div><div><em>Default: <strong>4</strong></em></div></div>
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>The minimum number of characters in a query word to accept one typo in this word.<br/>Defaults to 4.</p>

      </td>
    </tr>
    

  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>minWordSizefor2Typos</code></div>
            <div class="client-readme-param-meta"><div><em>Type: <strong>number</strong></em></div><div><em>Default: <strong>8</strong></em></div></div>
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>The minimum number of characters in a query word to accept two typos in this word.<br/>Defaults to 8.</p>

      </td>
    </tr>
    

  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>typoTolerance</code></div>
            <div class="client-readme-param-meta"><div><em>Default: <strong>true</strong></em></div></div>
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>This option allows you to control the number of typos allowed in the result set:</p>

<ul>
<li><code>true</code>: The typo tolerance is enabled and all matching hits are retrieved (default behavior).</li>
<li><code>false</code>: The typo tolerance is disabled. All results with typos will be hidden.</li>
<li><code>min</code>: Only keep results with the minimum number of typos. For example, if one result matches without typos, then all results with typos will be hidden.</li>
<li><code>strict</code>: Hits matching with 2 typos are not retrieved if there are some matching without typos.</li>
</ul>

      </td>
    </tr>
    

  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>allowTyposOnNumericTokens</code></div>
            <div class="client-readme-param-meta"><div><em>Default: <strong>true</strong></em></div></div>
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>If set to false, disables typo tolerance on numeric tokens (numbers). Defaults to true.</p>

      </td>
    </tr>
    

  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>ignorePlural</code></div>
            <div class="client-readme-param-meta"><div><em>Default: <strong>false</strong></em></div></div>
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>If set to true, plural won&#39;t be considered as a typo. For example, car and cars, or foot and feet will be considered as equivalent. Defaults to false.</p>

      </td>
    </tr>
    

  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>disableTypoToleranceOnAttributes</code></div>
            <div class="client-readme-param-meta"><div><em>Default: <strong>[]</strong></em></div></div>
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>List of attributes on which you want to disable typo tolerance (must be a subset of the <code>attributesToIndex</code> index setting). Attributes are separated with a comma such as <code>&quot;name,address&quot;</code>. You can also use JSON string array encoding such as <code>encodeURIComponent(&quot;[\&quot;name\&quot;,\&quot;address\&quot;]&quot;)</code>. By default, this list is empty.</p>

      </td>
    </tr>
    

  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>restrictSearchableAttributes</code></div>
            <div class="client-readme-param-meta"><div><em>Default: <strong>attributesToIndex</strong></em></div></div>
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>List of attributes you want to use for textual search (must be a subset of the <code>attributesToIndex</code> index setting). Attributes are separated with a comma such as <code>&quot;name,address&quot;</code>. You can also use JSON string array encoding such as <code>encodeURIComponent(&quot;[\&quot;name\&quot;,\&quot;address\&quot;]&quot;)</code>. By default, all attributes specified in the <code>attributesToIndex</code> settings are used to search.</p>

      </td>
    </tr>
    

  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>removeStopWords</code></div>
            <div class="client-readme-param-meta"><div><em>Default: <strong>false</strong></em></div></div>
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>Remove the stop words from query before executing it. Defaults to false. Contains a list of stop words from 41 languages (Arabic, Armenian, Basque, Bengali, Brazilian, Bulgarian, Catalan, Chinese, Czech, Danish, Dutch, English, Finnish, French, Galician, German, Greek, Hindi, Hungarian, Indonesian, Irish, Italian, Japanese, Korean, Kurdish, Latvian, Lithuanian, Marathi, Norwegian, Persian, Polish, Portugese, Romanian, Russian, Slovak, Spanish, Swedish, Thai, Turkish, Ukranian, Urdu). In most use-cases, we don&#39;t recommend enabling this option.</p>

      </td>
    </tr>
    

  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>advancedSyntax</code></div>
            <div class="client-readme-param-meta"><div><em>Default: <strong>0 (false)</strong></em></div></div>
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>Enables the advanced query syntax. Defaults to 0 (false).</p>

<ul>
<li><strong>Phrase query</strong>: A phrase query defines a particular sequence of terms. A phrase query is built by Algolia&#39;s query parser for words surrounded by <code>&quot;</code>. For example, <code>&quot;search engine&quot;</code> will retrieve records having <code>search</code> next to <code>engine</code> only. Typo tolerance is <em>disabled</em> on phrase queries.</li>
<li><strong>Prohibit operator</strong>: The prohibit operator excludes records that contain the term after the <code>-</code> symbol. For example, <code>search -engine</code> will retrieve records containing <code>search</code> but not <code>engine</code>.</li>
</ul>

      </td>
    </tr>
    

  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>analytics</code></div>
            <div class="client-readme-param-meta"><div><em>Default: <strong>true</strong></em></div></div>
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>If set to false, this query will not be taken into account in the analytics feature. Defaults to true.</p>

      </td>
    </tr>
    

  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>synonyms</code></div>
            <div class="client-readme-param-meta"><div><em>Default: <strong>true</strong></em></div></div>
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>If set to false, this query will not use synonyms defined in the configuration. Defaults to true.</p>

      </td>
    </tr>
    

  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>replaceSynonymsInHighlight</code></div>
            <div class="client-readme-param-meta"><div><em>Default: <strong>true</strong></em></div></div>
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>If set to false, words matched via synonym expansion will not be replaced by the matched synonym in the highlight results. Defaults to true.</p>

      </td>
    </tr>
    

      
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>optionalWords</code></div>
            <div class="client-readme-param-meta"><div><em>Default: <strong>[]</strong></em></div></div>
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>A string that contains the comma separated list of words that should be considered as optional when found in the query.</p>

      </td>
    </tr>
    
  
</tbody></table>

## Pagination Parameters

<table><tbody>

  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>page</code></div>
            <div class="client-readme-param-meta"><div><em>Type: <strong>integer</strong></em></div><div><em>Default: <strong>0</strong></em></div></div>
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>Pagination parameter used to select the page to retrieve.<br/>Page is zero based and defaults to 0. Thus, to retrieve the 10th page you need to set <code>page=9</code>.</p>

      </td>
    </tr>
    

  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>hitsPerPage</code></div>
            <div class="client-readme-param-meta"><div><em>Type: <strong>integer</strong></em></div><div><em>Default: <strong>20</strong></em></div></div>
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>Pagination parameter used to select the number of hits per page. Defaults to 20.</p>

      </td>
    </tr>
    

</tbody></table>


## Geo-search Parameters
<table><tbody>
  

    
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>aroundLatLng</code></div>
            
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>Search for entries around a given latitude/longitude (specified as two floats separated by a comma).<br/>For example, <code>aroundLatLng=47.316669,5.016670</code>.</p>

<p>By default the maximum distance is automatically guessed based on the density of the area but you can specify it manually in meters with the <strong>aroundRadius</strong> parameter. The precision for ranking can be set with <strong>aroundPrecision</strong> parameter. For example, if you set aroundPrecision=100, the distances will be considered by ranges of 100m, for example all distances 0 and 100m will be considered as identical for the &quot;geo&quot; ranking parameter.<br/><br/>When <strong>aroundRadius</strong> is not set, the radius is computed automatically using the density of the area, you can retrieve the computed radius in the <strong>automaticRadius</strong> attribute of the answer, you can also use the <strong>minimumAroundRadius</strong> query parameter to specify a minimum radius in meters for the automatic computation of <strong>aroundRadius</strong>.</p>

<p>At indexing, you should specify geoloc of an object with the _geoloc attribute (in the form <code>&quot;_geoloc&quot;:{&quot;lat&quot;:48.853409, &quot;lng&quot;:2.348800}</code> or <code>&quot;_geoloc&quot;:[{&quot;lat&quot;:48.853409, &quot;lng&quot;:2.348800},{&quot;lat&quot;:48.547456, &quot;lng&quot;:2.972075}]</code> if you have several geo-locations in your record).</p>

      </td>
    </tr>
    

  

  
    
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>aroundLatLngViaIP</code></div>
            
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>Search for entries around a given latitude/longitude automatically computed from user IP address.<br/>To enable it, use <code>aroundLatLngViaIP=true</code>.</p>

<p>You can specify the maximum distance in meters with the <code>aroundRadius</code> parameter and the precision for ranking with <code>aroundPrecision</code>. For example, if you set aroundPrecision=100, two objects that are in the range 0-99m will be considered as identical in the ranking for the &quot;geo&quot; ranking parameter (same for 100-199, 200-299, ... ranges).</p>

<p>At indexing, you should specify the geo location of an object with the <code>_geoloc</code> attribute in the form <code>{&quot;_geoloc&quot;:{&quot;lat&quot;:48.853409, &quot;lng&quot;:2.348800}}</code>.</p>

      </td>
    </tr>
    

  

  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>insideBoundingBox</code></div>
            
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>Search entries inside a given area defined by the two extreme points of a rectangle (defined by 4 floats: p1Lat,p1Lng,p2Lat,p2Lng).<br/>For example, <code>insideBoundingBox=47.3165,4.9665,47.3424,5.0201</code>).<br/>At indexing, you should specify geoloc of an object with the _geoloc attribute (in the form <code>&quot;_geoloc&quot;:{&quot;lat&quot;:48.853409, &quot;lng&quot;:2.348800}</code> or <code>&quot;_geoloc&quot;:[{&quot;lat&quot;:48.853409, &quot;lng&quot;:2.348800},{&quot;lat&quot;:48.547456, &quot;lng&quot;:2.972075}]</code> if you have several geo-locations in your record). You can use several bounding boxes (OR) by passing more than 4 values. For example instead of having 4 values you can pass 8 to search inside the UNION of two bounding boxes.</p>

      </td>
    </tr>
    

  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>insidePolygon</code></div>
            
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>Search entries inside a given area defined by a set of points (defined by a minimum of 6 floats: p1Lat,p1Lng,p2Lat,p2Lng,p3Lat,p3Long).<br/>For example <code>InsidePolygon=47.3165,4.9665,47.3424,5.0201,47.32,4.98</code>).<br/>At indexing, you should specify geoloc of an object with the _geoloc attribute (in the form <code>&quot;_geoloc&quot;:{&quot;lat&quot;:48.853409, &quot;lng&quot;:2.348800}</code> or <code>&quot;_geoloc&quot;:[{&quot;lat&quot;:48.853409, &quot;lng&quot;:2.348800},{&quot;lat&quot;:48.547456, &quot;lng&quot;:2.972075}]</code> if you have several geo-locations in your record).</p>

      </td>
    </tr>
    

</tbody></table>


## Parameters to Control Results Content

<table><tbody>
  
    
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>attributesToRetrieve</code></div>
            
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>A string that contains the list of attributes you want to retrieve in order to minimize the size of the JSON answer.</p>

<p>Attributes are separated with a comma (for example <code>&quot;name,address&quot;</code>). You can also use a string array encoding (for example <code>[&quot;name&quot;,&quot;address&quot;]</code> ). By default, all attributes are retrieved. You can also use <code>*</code> to retrieve all values when an <strong>attributesToRetrieve</strong> setting is specified for your index.</p>

<p><code>objectID</code> is always retrieved even when not specified.</p>

      </td>
    </tr>
    

    
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>attributesToHighlight</code></div>
            
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>A string that contains the list of attributes you want to highlight according to the query. Attributes are separated by commas. You can also use a string array encoding (for example <code>[&quot;name&quot;,&quot;address&quot;]</code>). If an attribute has no match for the query, the raw value is returned. By default, all indexed attributes are highlighted. You can use <code>*</code> if you want to highlight all attributes. A matchLevel is returned for each highlighted attribute and can contain:</p>

<ul>
<li><strong>full</strong>: If all the query terms were found in the attribute.</li>
<li><strong>partial</strong>: If only some of the query terms were found.</li>
<li><strong>none</strong>: If none of the query terms were found.</li>
</ul>

      </td>
    </tr>
    

    
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>attributesToSnippet</code></div>
            
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>A string that contains the list of attributes to snippet alongside the number of words to return (syntax is <code>attributeName:nbWords</code>). Attributes are separated by commas (Example: <code>attributesToSnippet=name:10,content:10</code>).</p>

<p>You can also use a string array encoding (Example: <code>attributesToSnippet: [&quot;name:10&quot;,&quot;content:10&quot;]</code>). By default, no snippet is computed.</p>

      </td>
    </tr>
    

    
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>getRankingInfo</code></div>
            
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>If set to 1, the result hits will contain ranking information in the <code>_rankingInfo</code> attribute.</p>

      </td>
    </tr>
    

    
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>highlightPreTag</code></div>
            <div class="client-readme-param-meta"><div><em>Type: <strong>string</strong></em></div><div><em>Default: <strong>&lt;em&gt;</strong></em></div></div>
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>Specify the string that is inserted before the highlighted parts in the query result (defaults to <code>&lt;em&gt;</code>).</p>

      </td>
    </tr>
    

    
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>highlightPostTag</code></div>
            <div class="client-readme-param-meta"><div><em>Type: <strong>string</strong></em></div><div><em>Default: <strong>&lt;/em&gt;</strong></em></div></div>
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>Specify the string that is inserted after the highlighted parts in the query result (defaults to <code>&lt;/em&gt;</code>)</p>

      </td>
    </tr>
    

    
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>snippetEllipsisText</code></div>
            <div class="client-readme-param-meta"><div><em>Type: <strong>string</strong></em></div><div><em>Default: <strong>''</strong></em></div></div>
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>String used as an ellipsis indicator when a snippet is truncated. Defaults to an empty string for all accounts created before 10/2/2016, and to <code>…</code> (UTF-8 U+2026) for accounts created after that date.</p>

      </td>
    </tr>
    




  

</tbody></table>

## Numeric Search Parameters

<table><tbody>
  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>numericFilters</code></div>
            
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>A string that contains the comma separated list of numeric filters you want to apply. The filter syntax is <code>attributeName</code> followed by <code>operand</code> followed by <code>value</code>. Supported operands are <code>&lt;</code>, <code>&lt;=</code>, <code>=</code>, <code>&gt;</code> and <code>&gt;=</code>.</p>

      </td>
    </tr>
    
</tbody></table>

You can easily perform range queries via the `:` operator. This is equivalent to combining a `>=` and `<=` operand. For example, `numericFilters=price:10 to 1000`.

You can also mix OR and AND operators. The OR operator is defined with a parenthesis syntax. For example, `(code=1 AND (price:[0-100] OR price:[1000-2000]))` translates to `encodeURIComponent("code=1,(price:0 to 100,price:1000 to 2000)")`.

You can also use a string array encoding (for example `numericFilters: ["price>100","price<1000"]`).

## Category Search Parameters

<table><tbody>
  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>tagFilters</code></div>
            
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>Filter the query by a set of tags. You can AND tags by separating them with commas. To OR tags, you must add parentheses. For example, <code>tags=tag1,(tag2,tag3)</code> means <em>tag1 AND (tag2 OR tag3)</em>. You can also use a string array encoding. For example, <code>tagFilters: [&quot;tag1&quot;,[&quot;tag2&quot;,&quot;tag3&quot;]]</code> means <em>tag1 AND (tag2 OR tag3)</em>.</p>

<p>At indexing, tags should be added in the <strong>_tags</strong> attribute of objects. For example <code>{&quot;_tags&quot;:[&quot;tag1&quot;,&quot;tag2&quot;]}</code>.</p>

      </td>
    </tr>
    
</tbody></table>

## Faceting Parameters

<table><tbody>

  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>facetFilters</code></div>
            
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>Filter the query with a list of facets. Facets are separated by commas and is encoded as <code>attributeName:value</code>. To OR facets, you must add parentheses. For example: <code>facetFilters=(category:Book,category:Movie),author:John%20Doe</code>. You can also use a string array encoding. For example, <code>[[&quot;category:Book&quot;,&quot;category:Movie&quot;],&quot;author:John%20Doe&quot;]</code>.</p>

      </td>
    </tr>
    

  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>facets</code></div>
            
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>List of object attributes that you want to use for faceting. For each of the declared attributes, you&#39;ll be able to retrieve a list of the most relevant facet values, and their associated count for the current query.</p>

<p>Attributes are separated by a comma. For example, <code>&quot;category,author&quot;</code>. You can also use JSON string array encoding. For example, <code>[&quot;category&quot;,&quot;author&quot;]</code>. Only the attributes that have been added in <strong>attributesForFaceting</strong> index setting can be used in this parameter. You can also use <code>*</code> to perform faceting on all attributes specified in <code>attributesForFaceting</code>. If the number of results is important, the count can be approximate, the attribute <code>exhaustiveFacetsCount</code> in the response is true when the count is exact.</p>

      </td>
    </tr>
    

  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>maxValuesPerFacet</code></div>
            
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>Limit the number of facet values returned for each facet. For example, <code>maxValuesPerFacet=10</code> will retrieve a maximum of 10 values per facet.</p>

      </td>
    </tr>
    

</tbody></table>

## Unified Filter Parameter (SQL - like)

<table><tbody>

  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>filters</code></div>
            
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>Filter the query with numeric, facet or/and tag filters. The syntax is a SQL like syntax, you can use the OR and AND keywords. The syntax for the underlying numeric, facet and tag filters is the same than in the other filters:
<code>available=1 AND (category:Book OR NOT category:Ebook) AND _tags:public</code>
<code>date: 1441745506 TO 1441755506 AND inStock &gt; 0 AND author:&quot;John Doe&quot;</code></p>

<p>If no attribute name is specified, the filter applies to <code>_tags</code>. For example: <code>public OR user_42</code> will translate to <code>_tags:public OR _tags:user_42</code>.</p>

<p>The list of keywords is:</p>

<ul>
<li><code>OR</code>: create a disjunctive filter between two filters.</li>
<li><code>AND</code>: create a conjunctive filter between two filters.</li>
<li><code>TO</code>: used to specify a range for a numeric filter.</li>
<li><code>NOT</code>: used to negate a filter. The syntax with the <code>-</code> isn’t allowed.</li>
</ul>

      </td>
    </tr>
    
</tbody></table>
*Note*: To specify a value with spaces or with a value equal to a keyword, it's possible to add quotes.

**Warning:**

* Like for the other filters (for performance reasons), it's not possible to have FILTER1 OR (FILTER2 AND FILTER3).
* It's not possible to mix different categories of filters inside an OR like: num=3 OR tag1 OR facet:value
* It's not possible to negate a group, it's only possible to negate a filter:  NOT(FILTER1 OR (FILTER2) is not allowed.


## Distinct Parameter

<table><tbody>

  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>distinct</code></div>
            
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>If set to 1, enables the distinct feature, disabled by default, if the <code>attributeForDistinct</code> index setting is set. This feature is similar to the SQL &quot;distinct&quot; keyword. When enabled in a query with the <code>distinct=1</code> parameter, all hits containing a duplicate value for the attributeForDistinct attribute are removed from results. For example, if the chosen attribute is <code>show_name</code> and several hits have the same value for <code>show_name</code>, then only the best one is kept and the others are removed.</p>

      </td>
    </tr>
    

</tbody></table>

To get a full understanding of how `Distinct` works, you can have a look at our [guide on distinct](https://www.algolia.com/doc/search/distinct).





Multiple queries
==================

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



Get an object
==================

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

Delete an object
==================

You can delete an object using its `objectID`:

```js
index.deleteObject('myID', function(error) {
  if (!err) {
    console.log('success');
  }
});
```


Delete by query
==================

You can delete all objects matching a single query with the following code. Internally, the API client performs the query, deletes all matching hits, and waits until the deletions have been applied.

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


Index Settings
==================

You can easily retrieve or update settings:

```js
index.getSettings(function(err, content) {
  console.log(content);
});
```

```js
index.setSettings({'customRanking': ['desc(followers)']}, function(err) {
  if (!err) {
    console.log('success');
  }
});
```


## Indexing parameters

<table><tbody>

  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>attributesToIndex</code></div>
            <div class="client-readme-param-meta"><div><em>Type: <strong>array of strings</strong></em></div></div>
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>The list of attributes you want index (i.e. to make searchable).</p>

<p>If set to null, all textual and numerical attributes of your objects are indexed. Make sure you updated this setting to get optimal results.</p>

<p>This parameter has two important uses:</p>

<ul>
<li><em>Limit the attributes to index</em>.<br/>For example, if you store the URL of a picture, you want to store it and be able to retrieve it, but you probably don&#39;t want to search in the URL.</li>
<li><em>Control part of the ranking</em>.<br/> Matches in attributes at the beginning of the list will be considered more important than matches in attributes further down the list. In one attribute, matching text at the beginning of the attribute will be considered more important than text after. You can disable this behavior if you add your attribute inside <code>unordered(AttributeName)</code>. For example, <code>attributesToIndex: [&quot;title&quot;, &quot;unordered(text)&quot;]</code>.
You can decide to have the same priority for two attributes by passing them in the same string using a comma as a separator. For example <code>title</code> and <code>alternative_title</code> have the same priority in this example, which is different than text priority: <code>attributesToIndex:[&quot;title,alternative_title&quot;, &quot;text&quot;]</code>.
To get a full description of how the Ranking works, you can have a look at our <a href="https://www.algolia.com/doc/relevance/ranking">Ranking guide</a>.</li>
<li><strong>numericAttributesToIndex</strong>: (array of strings) All numerical attributes are automatically indexed as numerical filters (allowing filtering operations like <code>&lt;</code> and <code>&lt;=</code>). If you don&#39;t need filtering on some of your numerical attributes, you can specify this list to speed up the indexing.<br/> If you only need to filter on a numeric value with the operator &#39;=&#39;, you can speed up the indexing by specifying the attribute with <code>equalOnly(AttributeName)</code>. The other operators will be disabled.</li>
</ul>

      </td>
    </tr>
    

  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>attributesForFaceting</code></div>
            <div class="client-readme-param-meta"><div><em>Type: <strong>array of strings</strong></em></div></div>
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>The list of fields you want to use for faceting. All strings in the attribute selected for faceting are extracted and added as a facet. If set to null, no attribute is used for faceting.</p>

      </td>
    </tr>
    

  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>attributeForDistinct</code></div>
            <div class="client-readme-param-meta"><div><em>Type: <strong>string</strong></em></div></div>
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>The name of the attribute used for the <code>Distinct</code> feature. This feature is similar to the SQL &quot;distinct&quot; keyword. When enabled in queries with the <code>distinct=1</code> parameter, all hits containing a duplicate value for this attribute are removed from the results. For example, if the chosen attribute is <code>show_name</code> and several hits have the same value for <code>show_name</code>, then only the first one is kept and the others are removed from the results. To get a full understanding of how <code>Distinct</code> works, you can have a look at our <a href="https://www.algolia.com/doc/search/distinct">guide on distinct</a>.</p>

      </td>
    </tr>
    

  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>ranking</code></div>
            <div class="client-readme-param-meta"><div><em>Type: <strong>array of strings</strong></em></div></div>
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>Controls the way results are sorted.</p>

<p>We have nine available criteria:</p>

<ul>
<li><code>typo</code>: Sort according to number of typos.</li>
<li><code>geo</code>: Sort according to decreasing distance when performing a geo location based search.</li>
<li><code>words</code>: Sort according to the number of query words matched by decreasing order. This parameter is useful when you use the <code>optionalWords</code> query parameter to have results with the most matched words first.</li>
<li><code>proximity</code>: Sort according to the proximity of the query words in hits.</li>
<li><code>attribute</code>: Sort according to the order of attributes defined by attributesToIndex.</li>
<li><code>exact</code>:

<ul>
<li>If the user query contains one word: sort objects having an attribute that is exactly the query word before others. For example, if you search for the TV show &quot;V&quot;, you want to find it with the &quot;V&quot; query and avoid getting all popular TV shows starting by the letter V before it.</li>
<li>If the user query contains multiple words: sort according to the number of words that matched exactly (not as a prefix).</li>
</ul></li>
<li><code>custom</code>: Sort according to a user defined formula set in the <code>customRanking</code> attribute.</li>
<li><code>asc(attributeName)</code>: Sort according to a numeric attribute using ascending order. <code>attributeName</code> can be the name of any numeric attribute in your records (integer, double or boolean).</li>
<li><code>desc(attributeName)</code>: Sort according to a numeric attribute using descending order. <code>attributeName</code> can be the name of any numeric attribute in your records (integer, double or boolean). <br/>The standard order is <code>[&quot;typo&quot;, &quot;geo&quot;, &quot;words&quot;, &quot;proximity&quot;, &quot;attribute&quot;, &quot;exact&quot;, &quot;custom&quot;]</code>.
To get a full description of how the Ranking works, you can have a look at our <a href="https://www.algolia.com/doc/relevance/ranking">Ranking guide</a>.</li>
</ul>

      </td>
    </tr>
    

  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>customRanking</code></div>
            <div class="client-readme-param-meta"><div><em>Type: <strong>array of strings</strong></em></div></div>
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>Lets you specify part of the ranking.</p>

<p>The syntax of this condition is an array of strings containing attributes prefixed by the asc (ascending order) or desc (descending order) operator. For example, <code>&quot;customRanking&quot; =&gt; [&quot;desc(population)&quot;, &quot;asc(name)&quot;]</code>.</p>

<p>To get a full description of how the Custom Ranking works, you can have a look at our <a href="https://www.algolia.com/doc/relevance/ranking">Ranking guide</a>.</p>

      </td>
    </tr>
    

  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>queryType</code></div>
            <div class="client-readme-param-meta"><div><em>Default: <strong>prefixLast</strong></em></div></div>
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>Select how the query words are interpreted. It can be one of the following values:</p>

<ul>
<li><code>prefixAll</code>: All query words are interpreted as prefixes.</li>
<li><code>prefixLast</code>: Only the last word is interpreted as a prefix (default behavior).</li>
<li><code>prefixNone</code>: No query word is interpreted as a prefix. This option is not recommended.</li>
</ul>

      </td>
    </tr>
    

  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>separatorsToIndex</code></div>
            <div class="client-readme-param-meta"><div><em>Default: <strong>empty</strong></em></div></div>
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>Specify the separators (punctuation characters) to index. By default, separators are not indexed. Use <code>+#</code> to be able to search Google+ or C#.</p>

      </td>
    </tr>
    

  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>slaves</code></div>
            
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>The list of indices on which you want to replicate all write operations. In order to get response times in milliseconds, we pre-compute part of the ranking during indexing. If you want to use different ranking configurations depending of the use case, you need to create one index per ranking configuration. This option enables you to perform write operations only on this index and automatically update slave indices with the same operations.</p>

      </td>
    </tr>
    

  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>unretrievableAttributes</code></div>
            <div class="client-readme-param-meta"><div><em>Default: <strong>empty</strong></em></div></div>
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>The list of attributes that cannot be retrieved at query time. This feature allows you to have attributes that are used for indexing and/or ranking but cannot be retrieved. Defaults to null. Warning: for testing purposes, this setting is ignored when you&#39;re using the ADMIN API Key.</p>

      </td>
    </tr>
    

  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>allowCompressionOfIntegerArray</code></div>
            <div class="client-readme-param-meta"><div><em>Default: <strong>false</strong></em></div></div>
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>Allows compression of big integer arrays. In data-intensive use-cases, we recommended enabling this feature and then storing the list of user IDs or rights as an integer array. When enabled, the integer array is reordered to reach a better compression ratio. Defaults to false.</p>

      </td>
    </tr>
    

</tbody></table>

## Query expansion

<table><tbody>
  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>synonyms</code></div>
            <div class="client-readme-param-meta"><div><em>Type: <strong>array of array of string considered as equals</strong></em></div></div>
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>For example, you may want to retrieve the <strong>black ipad</strong> record when your users are searching for <strong>dark ipad</strong>, even if the word <strong>dark</strong> is not part of the record. To do this, you need to configure <strong>black</strong> as a synonym of <strong>dark</strong>. For example, <code>&quot;synomyms&quot;: [ [ &quot;black&quot;, &quot;dark&quot; ], [ &quot;small&quot;, &quot;little&quot;, &quot;mini&quot; ], ... ]</code>. The Synonym feature also supports multi-words expressions like <code>&quot;synonyms&quot;: [ [&quot;NYC&quot;, &quot;New York City&quot;] ]</code></p>

      </td>
    </tr>
    
  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>placeholders</code></div>
            <div class="client-readme-param-meta"><div><em>Type: <strong>hash of array of words</strong></em></div></div>
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>This is an advanced use-case to define a token substitutable by a list of words without having the original token searchable. It is defined by a hash associating placeholders to lists of substitutable words. For example, <code>&quot;placeholders&quot;: { &quot;&lt;streetnumber&gt;&quot;: [&quot;1&quot;, &quot;2&quot;, &quot;3&quot;, ..., &quot;9999&quot;]}</code> would allow it to be able to match all street numbers. We use the <code>&lt; &gt;</code> tag syntax to define placeholders in an attribute. For example:</p>

<ul>
<li>Push a record with the placeholder: <code>{ &quot;name&quot; : &quot;Apple Store&quot;, &quot;address&quot; : &quot;&amp;lt;streetnumber&amp;gt; Opera street, Paris&quot; }</code>.</li>
<li>Configure the placeholder in your index settings: <code>&quot;placeholders&quot;: { &quot;&lt;streetnumber&gt;&quot; : [&quot;1&quot;, &quot;2&quot;, &quot;3&quot;, &quot;4&quot;, &quot;5&quot;, ... ], ... }</code>.</li>
</ul>

      </td>
    </tr>
    
  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>disableTypoToleranceOnWords</code></div>
            <div class="client-readme-param-meta"><div><em>Type: <strong>string array</strong></em></div></div>
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>Specify a list of words on which automatic typo tolerance will be disabled.</p>

      </td>
    </tr>
    
  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>disableTypoToleranceOnAttributes</code></div>
            <div class="client-readme-param-meta"><div><em>Type: <strong>string array</strong></em></div></div>
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>List of attributes on which you want to disable typo tolerance (must be a subset of the <code>attributesToIndex</code> index setting). By default the list is empty.</p>

      </td>
    </tr>
    
  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>altCorrections</code></div>
            <div class="client-readme-param-meta"><div><em>Type: <strong>object array</strong></em></div></div>
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>Specify alternative corrections that you want to consider. Each alternative correction is described by an object containing three attributes:</p>

<ul>
<li><strong>word</strong>: The word to correct.</li>
<li><strong>correction</strong>: The corrected word.</li>
<li><strong>nbTypos</strong> The number of typos (1 or 2) that will be considered for the ranking algorithm (1 typo is better than 2 typos).</li>
</ul>

<p>For example <code>&quot;altCorrections&quot;: [ { &quot;word&quot; : &quot;foot&quot;, &quot;correction&quot;: &quot;feet&quot;, &quot;nbTypos&quot;: 1 }, { &quot;word&quot;: &quot;feet&quot;, &quot;correction&quot;: &quot;foot&quot;, &quot;nbTypos&quot;: 1 } ]</code>.</p>

      </td>
    </tr>
    

</tbody></table>

## Default query parameters (can be overwritten by queries)

<table><tbody>
  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>minWordSizefor1Typo</code></div>
            <div class="client-readme-param-meta"><div><em>Type: <strong>integer</strong></em></div><div><em>Default: <strong>4</strong></em></div></div>
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>The minimum number of characters needed to accept one typo (default = 4).</p>

      </td>
    </tr>
    
  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>minWordSizefor2Typos</code></div>
            <div class="client-readme-param-meta"><div><em>Type: <strong>integer</strong></em></div><div><em>Default: <strong>8</strong></em></div></div>
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>The minimum number of characters needed to accept two typos (default = 8).</p>

      </td>
    </tr>
    
  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>hitsPerPage</code></div>
            <div class="client-readme-param-meta"><div><em>Type: <strong>integer</strong></em></div><div><em>Default: <strong>10</strong></em></div></div>
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>The number of hits per page (default = 10).</p>

      </td>
    </tr>
    
  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>attributesToRetrieve</code></div>
            <div class="client-readme-param-meta"><div><em>Type: <strong>array of strings</strong></em></div></div>
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>Default list of attributes to retrieve in objects. If set to null, all attributes are retrieved.</p>

      </td>
    </tr>
    
  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>attributesToHighlight</code></div>
            <div class="client-readme-param-meta"><div><em>Type: <strong>array of strings</strong></em></div></div>
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>Default list of attributes to highlight. If set to null, all indexed attributes are highlighted.</p>

      </td>
    </tr>
    
  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>attributesToSnippet</code></div>
            <div class="client-readme-param-meta"><div><em>Type: <strong>array of strings</strong></em></div></div>
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>Default list of attributes to snippet alongside the number of words to return (syntax is <code>attributeName:nbWords</code>).<br/>By default, no snippet is computed. If set to null, no snippet is computed.</p>

      </td>
    </tr>
    
  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>highlightPreTag</code></div>
            <div class="client-readme-param-meta"><div><em>Type: <strong>string</strong></em></div></div>
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>Specify the string that is inserted before the highlighted parts in the query result (defaults to <code>&lt;em&gt;</code>).</p>

      </td>
    </tr>
    
  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>highlightPostTag</code></div>
            <div class="client-readme-param-meta"><div><em>Type: <strong>string</strong></em></div></div>
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>Specify the string that is inserted after the highlighted parts in the query result (defaults to <code>&lt;/em&gt;</code>).</p>

      </td>
    </tr>
    
  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>optionalWords</code></div>
            <div class="client-readme-param-meta"><div><em>Type: <strong>array of strings</strong></em></div></div>
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>Specify a list of words that should be considered optional when found in the query.</p>

      </td>
    </tr>
    
  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>allowTyposOnNumericTokens</code></div>
            <div class="client-readme-param-meta"><div><em>Type: <strong>boolean</strong></em></div><div><em>Default: <strong>false</strong></em></div></div>
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>If set to false, disable typo-tolerance on numeric tokens (=numbers) in the query word. For example the query <code>&quot;304&quot;</code> will match with <code>&quot;30450&quot;</code>, but not with <code>&quot;40450&quot;</code> that would have been the case with typo-tolerance enabled. Can be very useful on serial numbers and zip codes searches. Defaults to false.</p>

      </td>
    </tr>
    
  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>ignorePlurals</code></div>
            <div class="client-readme-param-meta"><div><em>Type: <strong>boolean</strong></em></div><div><em>Default: <strong>false</strong></em></div></div>
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>If set to true, singular/plural forms won’t be considered as typos (for example car/cars and foot/feet will be considered as equivalent). Defaults to false.</p>

      </td>
    </tr>
    
  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>advancedSyntax</code></div>
            <div class="client-readme-param-meta"><div><em>Type: <strong>integer (0 or 1)</strong></em></div><div><em>Default: <strong>0</strong></em></div></div>
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>Enable the advanced query syntax. Defaults to 0 (false).</p>

<ul>
<li><p><strong>Phrase query:</strong> a phrase query defines a particular sequence of terms. A phrase query is build by Algolia&#39;s query parser for words surrounded by <code>&quot;</code>. For example, <code>&quot;search engine&quot;</code> will retrieve records having <code>search</code> next to <code>engine</code> only. Typo-tolerance is disabled on phrase queries.</p></li>
<li><p><strong>Prohibit operator:</strong> The prohibit operator excludes records that contain the term after the <code>-</code> symbol. For example <code>search -engine</code> will retrieve records containing <code>search</code> but not <code>engine</code>.</p></li>
</ul>

      </td>
    </tr>
    
    
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>replaceSynonymsInHighlight</code></div>
            <div class="client-readme-param-meta"><div><em>Type: <strong>boolean</strong></em></div><div><em>Default: <strong>true</strong></em></div></div>
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>If set to false, words matched via synonyms expansion will not be replaced by the matched synonym in the highlighted result. Defaults to true.</p>

      </td>
    </tr>
    
    
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>maxValuesPerFacet</code></div>
            <div class="client-readme-param-meta"><div><em>Type: <strong>integer</strong></em></div></div>
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>Limit the number of facet values returned for each facet. For example: <code>maxValuesPerFacet=10</code> will retrieve max 10 values per facet.</p>

      </td>
    </tr>
    
  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>distinct</code></div>
            <div class="client-readme-param-meta"><div><em>Type: <strong>integer (0 or 1)</strong></em></div><div><em>Default: <strong>0</strong></em></div></div>
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>Enable the distinct feature (disabled by default) if the <code>attributeForDistinct</code> index setting is set. This feature is similar to the SQL &quot;distinct&quot; keyword: when enabled in a query with the <code>distinct=1</code> parameter, all hits containing a duplicate value for the<code>attributeForDistinct</code> attribute are removed from results. For example, if the chosen attribute is <code>show_name</code> and several hits have the same value for <code>show_name</code>, then only the best one is kept and others are removed.</p>

<p>To get a full understanding of how <code>Distinct</code> works, you can have a look at our <a href="https://www.algolia.com/doc/search/distinct">guide on distinct</a>.</p>

      </td>
    </tr>
    
  
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>typoTolerance</code></div>
            <div class="client-readme-param-meta"><div><em>Type: <strong>string</strong></em></div><div><em>Default: <strong>true</strong></em></div></div>
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>This setting has four different options:</p>

<ul>
<li><p><code>true:</code> activate the typo-tolerance (default value).</p></li>
<li><p><code>false:</code> disable the typo-tolerance</p></li>
<li><p><code>min:</code> keep only results with the lowest number of typos. For example if one result matches without typos, then all results with typos will be hidden.</p></li>
<li><p><code>strict:</code> if there is a match without typo, then all results with 2 typos or more will be removed.</p></li>
</ul>

      </td>
    </tr>
    
    
    <tr>
      <td valign='top'>
        <div class='client-readme-param-container'>
          <div class='client-readme-param-container-inner'>
            <div class='client-readme-param-name'><code>removeStopWords</code></div>
            <div class="client-readme-param-meta"><div><em>Type: <strong>boolean</strong></em></div><div><em>Default: <strong>false</strong></em></div></div>
          </div>
        </div>
      </td>
      <td class='client-readme-param-content'>
        <p>Remove stop words from query before executing it. Defaults to false. Contains stop words for 41 languages (Arabic, Armenian, Basque, Bengali, Brazilian, Bulgarian, Catalan, Chinese, Czech, Danish, Dutch, English, Finnish, French, Galician, German, Greek, Hindi, Hungarian, Indonesian, Irish, Italian, Japanese, Korean, Kurdish, Latvian, Lithuanian, Marathi, Norwegian, Persian, Polish, Portugese, Romanian, Russian, Slovak, Spanish, Swedish, Thai, Turkish, Ukranian, Urdu)</p>

      </td>
    </tr>
    
  </tbody></table>




List indices
==================
You can list all your indices along with their associated information (number of entries, disk size, etc.) with the `listIndexes` method:

```js
client.listIndexes(function(err, content) {
  console.log(content);
});
```





Delete an index
==================
You can delete an index using its name:

```js
client.deleteIndex('contacts', function(error) {
  if (!err) {
    console.log('success');
  }
});
```





Clear an index
==================
You can delete the index contents without removing settings and index specific API keys by using the clearIndex command:

```js
index.clearIndex(function(err, content) {
  console.log(content);
});
```

Wait indexing
==================

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

Batch writes
==================

You may want to perform multiple operations with one API call to reduce latency.
We expose four methods to perform batch operations:
 * `addObjects`: Add an array of objects using automatic `objectID` assignment.
 * `saveObjects`: Add or update an array of objects that contains an `objectID` attribute.
 * `deleteObjects`: Delete an array of objectIDs.
 * `partialUpdateObjects`: Partially update an array of objects that contain an `objectID` attribute (only specified attributes will be updated).

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

Copy / Move an index
==================

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

The move command is particularly useful if you want to update a big index atomically from one version to another. For example, if you recreate your index `MyIndex` each night from a database by batch, you only need to:
 1. Import your database into a new index using [batches](#batch-writes). Let's call this new index `MyNewIndex`.
 1. Rename `MyNewIndex` to `MyIndex` using the move command. This will automatically override the old index and new queries will be served on the new one.

```js
// Rename MyNewIndex in MyIndex (and overwrite it)
client.moveIndex('MyNewIndex', 'MyIndex', function(err, content) {
  console.log(content);
});
```

Backup / Export an index
==================

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





API Keys
==================

The **admin** API key provides full control of all your indices. *The admin API key should always be kept secure; do NOT use it from outside your back-end.*

You can also generate user API keys to control security.
These API keys can be restricted to a set of operations or/and restricted to a given index.

## List API keys

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

## Create API keys

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

## Update API keys

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

## Delete API keys

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



## Secured API keys (frontend)

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




Logs
==================

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
// Get last 10 log entries (default)
client.getLogs(function(err, content) {
  console.log(content);
});

// Get last 100 log entries
client.getLogs(0, 100, function(err, content) {
  console.log(content);
});
```






