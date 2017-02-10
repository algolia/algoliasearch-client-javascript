# Algolia Search API Client for JavaScript

[Algolia Search](https://www.algolia.com) is a hosted full-text, numerical, and faceted search engine capable of delivering realtime results from the first keystroke.
The **Algolia Search API Client for JavaScript** lets you easily use the [Algolia Search REST API](https://www.algolia.com/doc/rest-api/search) from your JavaScript code.

[![Version][version-svg]][package-url] [![Build Status][travis-svg]][travis-url] [![License][license-image]][license-url] [![Downloads][downloads-image]][downloads-url]

[![Browser tests][browser-test-matrix]][browser-test-url]

[travis-svg]: https://img.shields.io/travis/algolia/algoliasearch-client-javascript/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/algolia/algoliasearch-client-javascript
[license-image]: https://img.shields.io/badge/license-MIT-green.svg?style=flat-square
[license-url]: LICENSE.txt
[downloads-image]: https://img.shields.io/npm/dm/algoliasearch.svg?style=flat-square
[downloads-url]: http://npm-stat.com/charts.html?package=algoliasearch
[browser-test-matrix]: https://saucelabs.com/browser-matrix/algoliasearch-js.svg
[browser-test-url]: https://saucelabs.com/u/algoliasearch-js
[version-svg]: https://img.shields.io/npm/v/algoliasearch.svg?style=flat-square
[package-url]: https://npmjs.org/package/algoliasearch


The JavaScript client works both on the frontend (browsers) or on the backend (Node.js) with the same API.

The backend (Node.js) API can be used to index your data using your Algolia admin API keys.

Our JavaScript library is [UMD](https://github.com/umdjs/umd) compatible, you can
use it with any module loader.

When not using any module loader, it will export an `algoliasearch` function in the `window` object.



**Note:** An easier-to-read version of this documentation is available on
[Algolia's website](https://www.algolia.com/doc/api-client/javascript/).

# Table of Contents


**Getting Started**

1. [Install](#install)
1. [Init index - `initIndex`](#init-index---initindex)
1. [Quick Start](#quick-start)
1. [Getting Help](#getting-help)

**Search**

1. [Search an index - `search`](#search-an-index---search)
1. [Search Response Format](#search-response-format)
1. [Search Parameters](#search-parameters)
1. [Search multiple indices - `search`](#search-multiple-indices---search)
1. [Get Objects - `getObjects`](#get-objects---getobjects)
1. [Search for facet values - `searchForFacetValues`](#search-for-facet-values---searchforfacetvalues)

**Indexing**

1. [Add Objects - `addObjects`](#add-objects---addobjects)
1. [Update objects - `saveObjects`](#update-objects---saveobjects)
1. [Partial update objects - `partialUpdateObjects`](#partial-update-objects---partialupdateobjects)
1. [Delete objects - `deleteObjects`](#delete-objects---deleteobjects)
1. [Delete by query - `deleteByQuery`](#delete-by-query---deletebyquery)
1. [Wait for operations - `waitTask`](#wait-for-operations---waittask)

**Settings**

1. [Get settings - `getSettings`](#get-settings---getsettings)
1. [Set settings - `setSettings`](#set-settings---setsettings)
1. [Index settings parameters](#index-settings-parameters)

**Parameters**

1. [Overview](#overview)
1. [Search](#search)
1. [Attributes](#attributes)
1. [Ranking](#ranking)
1. [Filtering / Faceting](#filtering--faceting)
1. [Highlighting / Snippeting](#highlighting--snippeting)
1. [Pagination](#pagination)
1. [Typos](#typos)
1. [Geo-Search](#geo-search)
1. [Query Strategy](#query-strategy)
1. [Performance](#performance)
1. [Advanced](#advanced)

**Manage Indices**

1. [Create an index](#create-an-index)
1. [List indices - `listIndexes`](#list-indices---listindexes)
1. [Delete an index - `deleteIndex`](#delete-an-index---deleteindex)
1. [Clear an index - `clearIndex`](#clear-an-index---clearindex)
1. [Copy index - `copyIndex`](#copy-index---copyindex)
1. [Move index - `moveIndex`](#move-index---moveindex)

**Api keys**

1. [Overview](#overview)
1. [Generate key - `generateSecuredApiKey`](#generate-key---generatesecuredapikey)

**Synonyms**

1. [Overview](#overview)
1. [Save synonym - `saveSynonym`](#save-synonym---savesynonym)
1. [Batch synonyms - `batchSynonyms`](#batch-synonyms---batchsynonyms)
1. [Editing Synonyms](#editing-synonyms)
1. [Delete synonym - `deleteSynonym`](#delete-synonym---deletesynonym)
1. [Clear all synonyms - `clearSynonyms`](#clear-all-synonyms---clearsynonyms)
1. [Get synonym - `getSynonym`](#get-synonym---getsynonym)
1. [Search synonyms - `searchSynonyms`](#search-synonyms---searchsynonyms)

**Advanced**

1. [Custom batch - `batch`](#custom-batch---batch)
1. [Backup / Export an index - `browse`](#backup--export-an-index---browse)
1. [List user keys - `listUserKeys`](#list-user-keys---listuserkeys)
1. [Add user key - `addUserKey`](#add-user-key---adduserkey)
1. [Update user key - `updateUserKey`](#update-user-key---updateuserkey)
1. [Delete user key - `deleteUserKey`](#delete-user-key---deleteuserkey)
1. [Get key permissions - `getUserKeyACL`](#get-key-permissions---getuserkeyacl)
1. [Get latest logs - `getLogs`](#get-latest-logs---getlogs)
1. [REST API](#rest-api)


# Guides & Tutorials

Check our [online guides](https://www.algolia.com/doc):

* [Data Formatting](https://www.algolia.com/doc/indexing/formatting-your-data)
* [Import and Synchronize data](https://www.algolia.com/doc/indexing/import-synchronize-data/php)
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


# Getting Started



## Install

#### Frontend

You can either use a package manager like npm or include a `<script>` tag.

#### Node.js / React Native / Browserify / webpack

We are [browserify](http://browserify.org/)able and [webpack](http://webpack.github.io/) friendly.

```sh
npm install algoliasearch --save
```

#### TypeScript typings

For Typescript typings, we provide the definition file via [typings](https://github.com/typings/typings)

```sh
npm install --save @types/algoliasearch

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
- [unpkg](https://unpkg.com): https://unpkg.com/algoliasearch@3/dist/algoliasearch.min.js

#### Search only/lite client

We have a lightweight build available that can only do searches. Use it when filesize
is important to you or if you like to include only what you need.

Find it on jsDelivr:

```html
<script src="https://cdn.jsdelivr.net/algoliasearch/3/algoliasearchLite.min.js"></script>
```

## Init index - `initIndex` 

To initialize the client, you need your **Application ID** and **API Key**. You can find both of them on [your Algolia account](https://www.algolia.com/api-keys).

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

## Quick Start

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
  'searchableAttributes': [
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

### Client options

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

### Callback convention

Every API call takes a callback as last parameter. This callback will then be called with two arguments:

 1. **error**: null or an [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) object. More info on the error can be find in `error.message`.
 2. **content**: the object containing the answer from the server, it's a JavaScript object

### Promises

**If you do not provide a callback**, you will get a promise (but never both).

Promises are the [native Promise implementation](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise).

We use [jakearchibald/es6-promise](https://github.com/stefanpenner/es6-promise) as a polyfill when needed.

### Request strategy

The request strategy used by the JavaScript client includes:

- On the browser:
  + [CORS](https://en.wikipedia.org/wiki/Cross-Origin_Resource_Sharing#Browser_support) for modern browsers
  + [XDomainRequest](https://msdn.microsoft.com/en-us/library/ie/cc288060%28v=vs.85%29.aspx) for IE <= 10
  + [JSONP](https://en.wikipedia.org/wiki/JSONP) in any situation where Ajax requests are unavailabe or blocked.
- Node.js:
  + native [`http` module](https://nodejs.org/api/)

Connections are always `keep-alive`.

### Cache

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
provide the `index.clearCache()` (or `client.clearCache()` if you're using the
[Search multiple indices](#search-multiple-indices) method that you can call to reset it.

### Proxy support

**Node.js only**

If you are behind a proxy, just set `HTTP_PROXY` or `HTTPS_PROXY` environment variables before starting your Node.js program.

```sh
HTTP_PROXY=http://someproxy.com:9320 node main.js
```

### Keep-alive

**Node.js only**

Keep-alive is activated by default.

Because of the nature of keepalive connections, your process will hang even if you do not do any more command using the `client`.

To fix this, we expose a `client.destroy()` method that will terminate all remaining alive connections.

You should call this method when you are finished working with the AlgoliaSearch API. So that your process will exit gently.

**Note: keep-alive is still always activated in browsers, this is a native behavior of browsers.**

### Debugging

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

## Getting Help

- **Need help**? Ask a question to the [Algolia Community](https://discourse.algolia.com/) or on [Stack Overflow](http://stackoverflow.com/questions/tagged/algolia).
- **Found a bug?** You can open a [GitHub issue](https://github.com/algolia/algoliasearch-client-javascript/issues).


# Search



## Search an index - `search` 

To perform a search, you only need to initialize the index and perform a call to the search function.

The search query allows only to retrieve 1000 hits. If you need to retrieve more than 1000 hits (e.g. for SEO), you can use [Backup / Export an index](#backup--export-an-index).

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

## Search Response Format

### Sample

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

### Fields

- `hits` (array): The hits returned by the search, sorted according to the ranking formula.

    Hits are made of the JSON objects that you stored in the index; therefore, they are mostly schema-less. However, Algolia does enrich them with a few additional fields:

    - `_highlightResult` (object, optional): Highlighted attributes. *Note: Only returned when [attributesToHighlight](#attributestohighlight) is non-empty.*

        - `${attribute_name}` (object): Highlighting for one attribute.

            - `value` (string): Markup text with occurrences highlighted. The tags used for highlighting are specified via [highlightPreTag](#highlightpretag) and [highlightPostTag](#highlightposttag).

            - `matchLevel` (string, enum) = {`none` \| `partial` \| `full`}: Indicates how well the attribute matched the search query.

            - `matchedWords` (array): List of words *from the query* that matched the object.

            - `fullyHighlighted` (boolean): Whether the entire attribute value is highlighted.

    - `_snippetResult` (object, optional): Snippeted attributes. *Note: Only returned when [attributesToSnippet](#attributestosnippet) is non-empty.*

        - `${attribute_name}` (object): Snippeting for the corresponding attribute.

            - `value` (string): Markup text with occurrences highlighted and optional ellipsis indicators. The tags used for highlighting are specified via [highlightPreTag](#highlightpretag) and [highlightPostTag](#highlightposttag). The text used to indicate ellipsis is specified via [snippetEllipsisText](#snippetellipsistext).

            - `matchLevel` (string, enum) = {`none` \| `partial` \| `full`}: Indicates how well the attribute matched the search query.

    - `_rankingInfo` (object, optional): Ranking information. *Note: Only returned when [getRankingInfo](#getrankinginfo) is `true`.*

        - `nbTypos` (integer): Number of typos encountered when matching the record. Corresponds to the `typos` ranking criterion in the ranking formula.

        - `firstMatchedWord` (integer): Position of the most important matched attribute in the attributes to index list. Corresponds to the `attribute` ranking criterion in the ranking formula.

        - `proximityDistance` (integer): When the query contains more than one word, the sum of the distances between matched words. Corresponds to the `proximity` criterion in the ranking formula.

        - `userScore` (integer): Custom ranking for the object, expressed as a single numerical value. Conceptually, it's what the position of the object would be in the list of all objects sorted by custom ranking. Corresponds to the `custom` criterion in the ranking formula.

        - `geoDistance` (integer): Distance between the geo location in the search query and the best matching geo location in the record, divided by the geo precision.

        - `geoPrecision` (integer): Precision used when computed the geo distance, in meters. All distances will be floored to a multiple of this precision.

        - `nbExactWords` (integer): Number of exactly matched words. If `alternativeAsExact` is set, it may include plurals and/or synonyms.

        - `words` (integer): Number of matched words, including prefixes and typos.

        - `filters` (integer): *This field is reserved for advanced usage.* It will be zero in most cases.

        - `matchedGeoLocation` (object): Geo location that matched the query. *Note: Only returned for a geo search.*

            - `lat` (float): Latitude of the matched location.

            - `lng` (float): Longitude of the matched location.

            - `distance` (integer): Distance between the matched location and the search location (in meters). **Caution:** Contrary to `geoDistance`, this value is *not* divided by the geo precision.

    - `_distinctSeqID` (integer): *Note: Only returned when [distinct](#distinct) is non-zero.* When two consecutive results have the same value for the attribute used for "distinct", this field is used to distinguish between them.

- `nbHits` (integer): Number of hits that the search query matched.

- `page` (integer): Index of the current page (zero-based). See the [page](#page) search parameter. *Note: Not returned if you use `offset`/`length` for pagination.*

- `hitsPerPage` (integer): Maximum number of hits returned per page. See the [hitsPerPage](#hitsperpage) search parameter. *Note: Not returned if you use `offset`/`length` for pagination.*

- `nbPages` (integer): Number of pages corresponding to the number of hits. Basically, `ceil(nbHits / hitsPerPage)`. *Note: Not returned if you use `offset`/`length` for pagination.*

- `processingTimeMS` (integer): Time that the server took to process the request, in milliseconds. *Note: This does not include network time.*

- `query` (string): An echo of the query text. See the [query](#query) search parameter.

- `queryAfterRemoval` (string, optional): *Note: Only returned when [removeWordsIfNoResults](#removewordsifnoresults) is set to `lastWords` or `firstWords`.* A markup text indicating which parts of the original query have been removed in order to retrieve a non-empty result set. The removed parts are surrounded by `<em>` tags.

- `params` (string, URL-encoded): An echo of all search parameters.

- `message` (string, optional): Used to return warnings about the query.

- `aroundLatLng` (string, optional): *Note: Only returned when [aroundLatLngViaIP](#aroundlatlngviaip) is set.* The computed geo location. **Warning: for legacy reasons, this parameter is a string and not an object.** Format: `${lat},${lng}`, where the latitude and longitude are expressed as decimal floating point numbers.

- `automaticRadius` (integer, optional): *Note: Only returned for geo queries without an explicitly specified radius (see `aroundRadius`).* The automatically computed radius. **Warning: for legacy reasons, this parameter is a string and not an integer.**

When [getRankingInfo](#getrankinginfo) is set to `true`, the following additional fields are returned:

- `serverUsed` (string): Actual host name of the server that processed the request. (Our DNS supports automatic failover and load balancing, so this may differ from the host name used in the request.)

- `parsedQuery` (string): The query string that will be searched, after normalization. Normalization includes removing stop words (if [removeStopWords](#removestopwords) is enabled), and transforming portions of the query string into phrase queries (see [advancedSyntax](#advancedsyntax)).

- `timeoutCounts` (boolean) - DEPRECATED: Please use `exhaustiveFacetsCount` in remplacement.

- `timeoutHits` (boolean) - DEPRECATED: Please use `exhaustiveFacetsCount` in remplacement.

... and ranking information is also added to each of the hits (see above).

When [facets](#facets) is non-empty, the following additional fields are returned:

- `facets` (object): Maps each facet name to the corresponding facet counts:

    - `${facet_name}` (object): Facet counts for the corresponding facet name:

        - `${facet_value}` (integer): Count for this facet value.

- `facets_stats` (object, optional): *Note: Only returned when at least one of the returned facets contains numerical values.* Statistics for numerical facets:

    - `${facet_name}` (object): The statistics for a given facet:

        - `min` (integer | float): The minimum value in the result set.

        - `max` (integer | float): The maximum value in the result set.

        - `avg` (integer | float): The average facet value in the result set.

        - `sum` (integer | float): The sum of all values in the result set.

- `exhaustiveFacetsCount` (boolean): Whether the counts are exhaustive (`true`) or approximate (`false`). *Note: In some conditions when [distinct](#distinct) is greater than 1 and an empty query without refinement is sent, the facet counts may not always be exhaustive.*

## Search Parameters

You can see the full list of search parameters here:
[https://www.algolia.com/doc/api-client/javascript/parameters/](https://www.algolia.com/doc/api-client/javascript/parameters/)

## Search multiple indices - `search` 

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

You can specify a `strategy` parameter to optimize your multiple queries:

- `none`: Execute the sequence of queries until the end.
- `stopIfEnoughMatches`: Execute the sequence of queries until the number of hits is reached by the sum of hits.

### Response

The resulting JSON contains the following fields:

- `results` (array): The results for each request, in the order they were submitted. The contents are the same as in [Search an index](#search-an-index).
    Each result also includes the following additional fields:

    - `index` (string): The name of the targeted index.
    - `processed` (boolean, optional): *Note: Only returned when `strategy` is `stopIfEnoughmatches`.* Whether the query was processed.

## Get Objects - `getObjects` 

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

## Search for facet values - `searchForFacetValues` 

When there are many facet values for a given facet, it may be useful to search within them. For example, you may have dozens of 'brands' for a given index of 'clothes'. Rather than displaying all of the brands, it is often best to only display the most popular and add a search input to allow the user to search for the brand that they are looking for.

Searching on facet values is different than a regular search because you are searching only on *facet values*, not *objects*.

The results are sorted by decreasing count. By default, maximum 10 results are returned. This can be adjusted via [maxFacetHits](#maxfacethits). No pagination is possible.

The facet search can optionally take regular search query parameters.
In that case, it will return only facet values that both:

1. match the facet query
2. are contained in objects matching the regular search query.

**Warning:** For a facet to be searchable, it must have been declared with the `searchable()` modifier in the [attributesForFaceting](#attributesforfaceting) index setting.

#### Example

Let's imagine we have objects similar to this one:

```json
{
    "name": "iPhone 7 Plus",
    "brand": "Apple",
    "category": [
        "Mobile phones",
        "Electronics"
    ]
}
```

Then:

```js
// Search the "category" facet for values matching "phone" in records
index.searchForFacetValues({
  facetName: 'category',
  facetQuery: 'phone'
}, function(err, content) {
  if (err) {
    console.error(err);
    return;
  }

  console.log(content.facetHits);
});
```

... could return:

```json
{
    "facetHits": [
        {
            "value": "Mobile phones",
            "highlighted": "Mobile <em>phone</em>s",
            "count": 507
        },
        {
            "value": "Phone cases",
            "highlighted": "<em>Phone</em> cases",
            "count": 63
        }
    ]
}
```

Let's filter with an additional, regular search query:

```js
// Search the "category" facet for values matching "phone" in records
// having "Apple" in their "brand" facet.
index.searchForFacetValues({
  facetName: 'category',
  facetQuery: 'phone',
  filters: 'brand:apple'
}, function(err, content) {
  if (err) {
    console.error(err);
    return;
  }

  console.log(content.facetHits);
});
```

... could return:

```json
{
    "facetHits": [
        {
            "value": "Mobile phones",
            "highlighted": "Mobile <em>phone</em>s",
            "count": 41
        }
    ]
}
```


# Indexing



## Add Objects - `addObjects` 

Each entry in an index has a unique identifier called `objectID`. There are two ways to add an entry to the index:

 1. Supplying your own `objectID`.
 2. Using automatic `objectID` assignment. You will be able to access it in the response.

Using your own unique IDs when creating records is a good way to make future updates easier without having to keep track of Algolia's generated IDs.
The value you provide for objectIDs can be an integer or a string.

You don't need to explicitly create an index, it will be automatically created the first time you add an object.
Objects are schema less so you don't need any configuration to start indexing.
If you wish to configure things, the settings section provides details about advanced settings.

Example with automatic `objectID` assignments:

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

Example with manual `objectID` assignments:

```js
var objects = [{
  objectID: '1',
  firstname: 'Jimmie',
  lastname: 'Barninger'
}, {
  objectID: '2',
  firstname: 'Warren',
  lastname: 'Speach'
}];

index.addObjects(objects, function(err, content) {
  console.log(content);
});
```

To add a single object, use the following method:

```js
index.addObject({
  firstname: 'Jimmie',
  lastname: 'Barninger'
}, 'myID', function(err, content) {
  console.log('objectID=' + content.objectID);
});
```

## Update objects - `saveObjects` 

You have three options when updating an existing object:

 1. Replace all its attributes.
 2. Replace only some attributes.
 3. Apply an operation to some attributes.

Example on how to replace all attributes existing objects:

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

To update a single object, you can use the following method:

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

## Partial update objects - `partialUpdateObjects` 

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

To partial update multiple objects using one API call, you can use the following method:

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

## Delete objects - `deleteObjects` 

You can delete objects using their `objectID`:

```js
index.deleteObjects(['myID1', 'myID2'], function(err, content) {
  console.log(content);
});
```

To delete a single object, you can use the following method:

```js
index.deleteObject('myID', function(err) {
  if (!err) {
    console.log('success');
  }
});
```

## Delete by query - `deleteByQuery` 

The "delete by query" helper deletes all objects matching a query. Internally, the API client will browse the index (as in [Backup / Export an index](#backup--export-an-index)), delete all matching hits, and wait until all deletion tasks have been applied.

**Warning:** Be careful when using this method. Calling it with an empty query will result in cleaning the index of all its records.

```js
// no query parameters: will clear the whole index!
index.deleteByQuery('John', function(err) {
  if (!err) {
    console.log('success');
  }
});

// with query parameters
index.deleteByQuery('John', {
  // any browse-compatible query parameters
}, function(err) {
  if (!err) {
    console.log('success');
  }
});
```

## Wait for operations - `waitTask` 

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
  index.waitTask(content.taskID, function(err) {
    if (!err) {
      console.log('object ' + content.objectID + ' indexed');
    }
  });
});
```

If you want to ensure multiple objects have been indexed, you only need to check
the biggest `taskID`.


# Settings



## Get settings - `getSettings` 

You can retrieve settings:

```js
index.getSettings(function(err, content) {
  console.log(content);
});
```

## Set settings - `setSettings` 

```js
index.setSettings({'customRanking': ['desc(followers)']}, function(err) {
  if (!err) {
    console.log('success');
  }
});
```

You can find the list of parameters you can set in the [Settings Parameters](#index-settings-parameters) section

**Warning**

Performance wise, it's better to do a `setSettings` before pushing the data

### Replica settings

You can forward all settings updates to the replicas of an index by using the `forwardToReplicas` option:

```js
index.setSettings({'customRanking': ['desc(followers)']}, {forwardToReplicas: true}, function(err) {
  if (!err) {
    console.log('success');
  }
});
```

## Index settings parameters

You can see the full list of settings parameters here:
[https://www.algolia.com/doc/api-client/javascript/parameters/](https://www.algolia.com/doc/api-client/javascript/parameters/)


# Manage Indices



## Create an index

To create an index, you need to perform any indexing operation like:
- set settings
- add object

## List indices - `listIndexes` 

You can list all your indices along with their associated information (number of entries, disk size, etc.) with the `listIndexes` method:

```js
client.listIndexes(function(err, content) {
  console.log(content);
});
```

## Delete an index - `deleteIndex` 

You can delete an index using its name:

```js
client.deleteIndex('contacts', function(err) {
  if (!err) {
    console.log('success');
  }
});
```

## Clear an index - `clearIndex` 

You can delete the index contents without removing settings and index specific API keys by using the `clearIndex` command:

```js
index.clearIndex(function(err, content) {
  console.log(content);
});
```

## Copy index - `copyIndex` 

You can copy an existing index using the `copy` command.

**Warning**: The copy command will overwrite the destination index.

```js
// Copy MyIndex in MyIndexCopy
client.copyIndex('MyIndex', 'MyIndexCopy', function(err, content) {
  console.log(content);
});
```

## Move index - `moveIndex` 

In some cases, you may want to totally reindex all your data. In order to keep your existing service
running while re-importing your data we recommend the usage of a temporary index plus an atomical
move using the `moveIndex` method.

```js
// Rename MyNewIndex in MyIndex (and overwrite it)
client.moveIndex('MyNewIndex', 'MyIndex', function(err, content) {
  console.log(content);
});
```

**Note:** The moveIndex method overrides the destination index, and deletes the temporary one.
  In other words, there is no need to call the `clearIndex` or `deleteIndex` methods to clean the temporary index.
It also overrides all the settings of the destination index (except the [replicas](#replicas) parameter that need to not be part of the temporary index settings).

**Recommended steps**
If you want to fully update your index `MyIndex` every night, we recommend the following process:

 1. Get settings and synonyms from the old index using [Get settings](#get-settings)
  and [Get synonym](#get-synonym).
 1. Apply settings and synonyms to the temporary index `MyTmpIndex`, (this will create the `MyTmpIndex` index)
  using [Set settings](#set-settings) and [Batch synonyms](#batch-synonyms) ([!] Make sure to remove the [replicas](#replicas) parameter from the settings if it exists.
 1. Import your records into a new index using [Add Objects](#add-objects)).
 1. Atomically replace the index `MyIndex` with the content and settings of the index `MyTmpIndex`
 using the [Move index](#move-index) method.
 This will automatically override the old index without any downtime on the search.
 
 You'll end up with only one index called `MyIndex`, that contains the records and settings pushed to `MyTmpIndex`
 and the replica-indices that were initially attached to `MyIndex` will be in sync with the new data.


# Api keys



## Overview

When creating your Algolia Account, you'll notice there are 3 different API Keys:

- **Admin API Key** - it provides full control of all your indices.
*The admin API key should always be kept secure;
do NOT give it to anybody; do NOT use it from outside your back-end as it will
allow the person who has it to query/change/delete data*

- **Search-Only API Key** - It allows you to search on every indices.

- **Monitoring API Key** - It allows you to access the [Monitoring API](https://www.algolia.com/doc/rest-api/monitoring)

### Other types of API keys

The *Admin API Key* and *Search-Only API Key* both have really large scope and sometimes you want to give a key to
someone that have restricted permissions, can it be an index, a rate limit, a validity limit, ...

To address those use-cases we have two different type of keys:

- **Secured API Keys**

When you need to restrict the scope of the *Search Key*, we recommend to use *Secured API Key*.
You can generate them on the fly (without any call to the API)
from the *Search Only API Key* or any search *User Key* using the [Generate key](#generate-key) method

- **User API Keys**

If *Secured API Keys* does not meet your requirements, you can make use of *User keys*.
Managing and especially creating those keys requires a call to the API.

We have several methods to manage them:

- [Add user key](#add-user-key)
- [Update user key](#update-user-key)
- [Delete user key](#delete-user-key)
- [List user keys](#list-user-keys)
- [Get key permissions](#get-key-permissions)

## Generate key - `generateSecuredApiKey` 

When you need to restrict the scope of the *Search Key*, we recommend to use *Secured API Key*.
You can generate a *Secured API Key* from the *Search Only API Key* or any search *User API Key*

There is a few things to know about *Secured API Keys*
- They always need to be generated **on your backend** using one of our API Client
- You can generate them on the fly (without any call to the API)
- They will not appear on the dashboard as they are generated without any call to the API
- The key you use to generate it **needs to become private** and you should not use it in your frontend.
- The generated secured API key **will inherit any restriction from the search key it has been generated from**

You can then use the key in your frontend code

```js
var client = algoliasearch('YourApplicationID', 'YourPublicAPIKey');

var index = client.initIndex('indexName')

index.search('something', function(err, content) {
  if (err) {
    console.error(err);
    return;
  }

  console.log(content);
});
```

#### Filters

Every filter set in the API key will always be applied. On top of that [filters](#filters) can be applied
in the query parameters.

```js
// generate a public API key for user 42. Here, records are tagged with:
//  - 'user_XXXX' if they are visible by user XXXX
var public_key = client.generateSecuredApiKey('YourSearchOnlyApiKey', {filters: '_tags:user_42'});
```

**Warning**:

If you set filters in the key `groups:admin`, and `groups:press OR groups:visitors` in the query parameters,
this will be equivalent to `groups:admin AND (groups:press OR groups:visitors)`

##### Having one API Key per User

One of the usage of secured API keys, is to have allow users to see only part of an index, when this index
contains the data of all users.
In that case, you can tag all records with their associated `user_id` in order to add a `user_id=42` filter when
generating the *Secured API Key* to retrieve only what a user is tagged in.

**Warning**

If you're generating *Secured API Keys* using the [JavaScript client](http://github.com/algolia/algoliasearch-client-javascript) in your frontend,
it will result in a security breach since the user is able to modify the filters you've set
by modifying the code from the browser.

#### Valid Until

You can set a Unix timestamp used to define the expiration date of the API key

```js
# generate a public API key that is valid for 1 hour:
var valid_until = Math.floor(Date.now() / 1000) + 3600
var public_key = client.generateSecuredApiKey('YourSearchOnlyApiKey', {validUntil: valid_until});
```

#### Index Restriction

You can restrict the key to a list of index names allowed for the secured API key

```js
# generate a public API key that is restricted to 'index1' and 'index2':
var public_key = client.generateSecuredApiKey('YourSearchOnlyApiKey', {restrictIndices: 'index1,index2'});
```

#### Rate Limiting

If you want to rate limit a secured API Key, the API key you generate the secured api key from need to be rate-limited.
You can do that either via the dashboard or via the API using the
[Add user key](#add-user-key) or [Update user key](#update-user-key) method

##### User Rate Limiting

By default the rate limits will only use the `IP`.

This can be an issue when several of your end users are using the same IP.
To avoid that, you can set a `userToken` query parameter when generating the key.

When set, a unique user will be identified by his `IP + user_token` instead of only by his `IP`.

This allows you to restrict a single user to performing a maximum of `N` API calls per hour,
even if he shares his `IP` with another user.

```js
// generate a public API key for user 42. Here, records are tagged with:
//  - 'user_XXXX' if they are visible by user XXXX
var public_key = client.generateSecuredApiKey('YourSearchOnlyApiKey', {filters: '_tags:user_42', userToken: 'user_42'});
```

#### Network restriction

For more protection against API key leaking and reuse you can restrict the key to be valid only from specific IPv4 networks

```js
# generate a public API key that is restricted to '192.168.1.0/24':
var public_key = client.generateSecuredApiKey('YourSearchOnlyApiKey', {restrictSources: '192.168.1.0/24'});
```


# Synonyms



## Overview

Synonyms tell the engine about sets of words and expressions that should be considered equal with regard to textual relevance.

All synonym records have a type attribute. The two most used types are:

- (Regular) Synonyms - `synonym`: Regular synonyms are the most common, all words or expressions are considered equals

  ```json
  {
     "objectID": "NAME",
     "type": "synonym",
     "synonyms":[
        "tv",
        "television",
        "tv set"
     ]
  }
  ```

- One-way Synonym - `oneWaySynonym`: When the `input` is searched all words or expressions in synonyms are considered equals to the input

  ```json
  {
     "objectID": "NAME",
     "type": "oneWaySynonym",
     "input": "tablet",
     "synonyms":[
        "ipad",
        "galaxy note"
     ]
  }
  ```

If you're looking for other types of synonyms or want more details you can have a look at our [synonyms guide](https://www.algolia.com/doc/guides/relevance/synonyms)

## Save synonym - `saveSynonym` 

This method saves a single synonym record into the index.

In this example, we specify true to forward the creation to replica indices.
By default the behavior is to save only on the specified index.

```js
index.saveSynonym({
  objectID: 'a-unique-identifier',
  type: 'synonym',
  synonyms: ['car', 'vehicle', 'auto']
}, { forwardToReplicas: true }, function(err, content) {
  if(err)
  {
    console.error(err);
  }
});
```

## Batch synonyms - `batchSynonyms` 

Use the batch method to create a large number of synonyms at once,
forward them to replica indices if desired,
and optionally replace all existing synonyms
on the index with the content of the batch using the replaceExistingSynonyms parameter.

You should always use replaceExistingSynonyms to atomically replace all synonyms
on a production index. This is the only way to ensure the index always
has a full list of synonyms to use during the indexing of the new list.

```js
// Batch synonyms, with replica forwarding and atomic replacement of existing synonyms
index.batchSynonyms([{
  objectID: 'a-unique-identifier',
  type: 'synonym',
  synonyms: ['car', 'vehicle', 'auto']
}, {
  objectID: 'another-unique-identifier',
  type: 'synonym',
  synonyms: ['street', 'st']
}], { forwardToReplicas: true, replaceExistingSynonyms: true }, function(err, content) {
  if(err)
  {
    console.error(err);
  }
});
```

## Editing Synonyms

Updating the value of a specific synonym record is the same as creating one.
Make sure you specify the same objectID used to create the record and the synonyms
will be updated.
When updating multiple synonyms in a batch call (but not all synonyms),
make sure you set replaceExistingSynonyms to false (or leave it out,
false is the default value).
Otherwise, the entire synonym list will be replaced only partially with the records
in the batch update.

## Delete synonym - `deleteSynonym` 

Use the normal index delete method to delete synonyms,
specifying the objectID of the synonym record you want to delete.
Forward the deletion to replica indices by setting the forwardToReplicas parameter to true.

```js
// Delete and forward to replicas
index.deleteSynonym('a-unique-identifier', { forwardToReplicas: true }, function(err, content) {
  if(err)
  {
    console.error(err);
  }
});
```

## Clear all synonyms - `clearSynonyms` 

This is a convenience method to delete all synonyms at once.
It should not be used on a production index to then push a new list of synonyms:
there would be a short period of time during which the index would have no synonyms
at all.

To atomically replace all synonyms of an index,
use the batch method with the replaceExistingSynonyms parameter set to true.

```js
// Clear synonyms and forward to replicas
index.clearSynonyms({ forwardToReplicas: true }, function(err, content) {
  if(err)
  {
    console.error(err);
  }
});
```

## Get synonym - `getSynonym` 

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

## Search synonyms - `searchSynonyms` 

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


# Advanced



## Custom batch - `batch` 

You may want to perform multiple operations with one API call to reduce latency.

If you have one index per user, you may want to perform a batch operations across several indices.
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

## Backup / Export an index - `browse` 

The `search` method cannot return more than 1,000 results. If you need to
retrieve all the content of your index (for backup, SEO purposes or for running
a script on it), you should use the `browse` method instead. This method lets
you retrieve objects beyond the 1,000 limit.

This method is optimized for speed. To make it fast, distinct, typo-tolerance,
word proximity, geo distance and number of matched words are disabled. Results
are still returned ranked by attributes and custom ranking.

#### Response Format

##### Sample

```json
{
  "hits": [
    {
      "firstname": "Jimmie",
      "lastname": "Barninger",
      "objectID": "433"
    }
  ],
  "processingTimeMS": 7,
  "query": "",
  "params": "filters=level%3D20",
  "cursor": "ARJmaWx0ZXJzPWxldmVsJTNEMjABARoGODA4OTIzvwgAgICAgICAgICAAQ=="
}
```

##### Fields

- `cursor` (string, optional): A cursor to retrieve the next chunk of data. If absent, it means that the end of the index has been reached.
- `query` (string): Query text used to filter the results.
- `params` (string, URL-encoded): Search parameters used to filter the results.
- `processingTimeMS` (integer): Time that the server took to process the request, in milliseconds. *Note: This does not include network time.*

The following fields are provided for convenience purposes, and **only when the browse is not filtered**:

- `nbHits` (integer): Number of objects in the index.
- `page` (integer): Index of the current page (zero-based).
- `hitsPerPage` (integer): Maximum number of hits returned per page.
- `nbPages` (integer): Number of pages corresponding to the number of hits. Basically, `ceil(nbHits / hitsPerPage)`.

#### Example

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

## List user keys - `listUserKeys` 

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

## Add user key - `addUserKey` 

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

##### validity

Add a validity period. The key will be valid for a specific period of time (in seconds).

##### maxQueriesPerIPPerHour

Specify the maximum number of API calls allowed from an IP address per hour. Each time an API call is performed with this key, a check is performed. If the IP at the source of the call did more than this number of calls in the last hour, a 403 code is returned. Defaults to 0 (no rate limit). This parameter can be used to protect you from attempts at retrieving your entire index contents by massively querying the index.

##### maxHitsPerQuery

Specify the maximum number of hits this API key can retrieve in one call. Defaults to 0 (unlimited). This parameter can be used to protect you from attempts at retrieving your entire index contents by massively querying the index.

##### indexes

Specify the list of targeted indices. You can target all indices starting with a prefix or ending with a suffix using the '\*' character. For example, "dev\_\*" matches all indices starting with "dev\_" and "\*\_dev" matches all indices ending with "\_dev". Defaults to all indices if empty or blank.

##### referers

Specify the list of referers. You can target all referers starting with a prefix, ending with a suffix using the '\*' character. For example, "https://algolia.com/\*" matches all referers starting with "https://algolia.com/" and "\*.algolia.com" matches all referers ending with ".algolia.com". If you want to allow the domain algolia.com you can use "\*algolia.com/\*". Defaults to all referers if empty or blank.

##### queryParameters

Specify the list of query parameters. You can force the query parameters for a query using the url string format (param1=X&param2=Y...).

##### description

Specify a description to describe where the key is used.

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

## Update user key - `updateUserKey` 

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

## Delete user key - `deleteUserKey` 

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

## Get key permissions - `getUserKeyACL` 

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

## Get latest logs - `getLogs` 

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

#### offset

Specify the first entry to retrieve (0-based, 0 is the most recent log entry). Defaults to 0.

#### length

Specify the maximum number of entries to retrieve starting at the offset. Defaults to 10. Maximum allowed value: 1,000.

#### onlyErrors

Retrieve only logs with an HTTP code different than 200 or 201. (deprecated)

#### type

Specify the type of logs to retrieve:

* `query`: Retrieve only the queries.
* `build`: Retrieve only the build operations.
* `error`: Retrieve only the errors (same as `onlyErrors` parameters).

```js
client.getLogs({
  offset: 100, // where to start from, default to 0
  length: 100, // how much lines do you want, default to 10
  type: 'error' // which logs do you want, default to no value (all)
}, function(err, content) {
  console.log(content);
});
```

## REST API

We've developed API clients for the most common programming languages and platforms.
These clients are advanced wrappers on top of our REST API itself and have been made
in order to help you integrating the service within your apps:
for both indexing and search.

Everything that can be done using the REST API can be done using those clients.

The REST API lets your interact directly with Algolia platforms from anything that can send an HTTP request
[Go to the REST API doc](https://algolia.com/doc/rest)


