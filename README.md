# Algolia Search API Client for JavaScript

**We recently (March 2015) released a new version (V3) of our JavaScript client,
if you were using our previous version (V2), [read the migration guide](https://github.com/algolia/algoliasearch-client-js/wiki/Migration-guide-from-2.x.x-to-3.x.x)**



[Algolia Search](http://www.algolia.com) is a hosted full-text, numerical, and faceted search engine capable of delivering realtime results from the first keystroke.



[![Version][version-svg]][package-url] [![Build Status][travis-svg]][travis-url] [![License][license-image]][license-url] [![Downloads][downloads-image]][downloads-url] [![Libscore][libscore-svg]][libscore-url]

[![Browser tests][browser-test-matrix]][browser-test-url]

[travis-svg]: https://img.shields.io/travis/algolia/algoliasearch-client-js/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/algolia/algoliasearch-client-js
[license-image]: http://img.shields.io/badge/license-MIT-green.svg?style=flat-square
[license-url]: LICENSE.txt
[downloads-image]: https://img.shields.io/npm/dm/algoliasearch.svg?style=flat-square
[downloads-url]: http://npm-stat.com/charts.html?package=algoliasearch
[browser-test-matrix]: https://saucelabs.com/browser-matrix/algoliasearch-js.svg
[browser-test-url]: https://saucelabs.com/u/algoliasearch-js
[libscore-svg]: https://img.shields.io/libscore/s/AlgoliaSearch.svg?style=flat-square
[libscore-url]: http://libscore.com/#AlgoliaSearch
[version-svg]: https://img.shields.io/npm/v/algoliasearch.svg?style=flat-square
[package-url]: https://npmjs.org/package/algoliasearch

The JavaScript client lets you easily use the [Algolia Search API](https://www.algolia.com/doc/rest_api) in a browser.

It is dedicated to web apps searching directly from the browser.
To add, remove or delete your objects please consider using [a backend API client](https://www.algolia.com/doc).

Our JavaScript library is [UMD](https://github.com/umdjs/umd) compatible, you can
use it with any module loader.

When not using any module loader, it will export an `alogliasearch` method in the `window` object.

If you are using the V2 of our JavaScript client and want to upgrade, please read [our migration guide](https://github.com/algolia/algoliasearch-client-js/wiki/Migration-guide-from-2.x.x-to-3.x.x).



Table of Contents
=================
**Getting Started**

1. [Setup](#setup)
1. [Quick Start](#quick-start)
1. [Callback convention](#callback-convention)
1. [Promises](#promises)
1. [Request strategy](#request-strategy)
1. [Cache](#cache)
1. [Online documentation](#documentation)
1. [Tutorials](#tutorials)

**Commands Reference**


1. [Search](#search)
1. [Multiple queries](#multiple-queries)
1. [Get an object](#get-an-object)
1. [Security](#security)




Setup
-------------
To setup your project, follow these steps:




#### npm

```sh
npm install alogliasearch --save
```

We are [browserify](http://browserify.org/)able.

#### Bower

```sh
bower install algoliasearch -S
```

#### jsDelivr

[jsDelivr](http://www.jsdelivr.com/about.php) is a global CDN delivery for JavaScript libraries.

You can always get the latest, backward compatible version by including:

```html
<script src="//cdn.jsdelivr.net/algoliasearch/3/algoliasearch.min.js"></script>
```

### Example

```html
<script src="//cdn.jsdelivr.net/algoliasearch/3/algoliasearch.min.js"></script>
<script>
  var client = algoliasearch('ApplicationID', 'Search-Only-API-Key');
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

Have a look at our [callback convention](#callback-convention), read about [our promises](#promises).

#### jQuery

We provide a specific [jQuery](http://jquery.com/) build that will use [jQuery.ajax](http://api.jquery.com/jquery.ajax/).

It can be used with callbacks or [jQuery promises](https://api.jquery.com/promise/).

```html
<script src="//cdn.jsdelivr.net/jquery/2.1.3/jquery.min.js"></script>
<script src="//cdn.jsdelivr.net/algoliasearch/3/algoliasearch.jquery.min.js"></script>
<script>
  var client = $.algolia.Client('ApplicationID', 'Search-Only-API-Key');
  var index = client.initIndex('indexName');
  index.search('something', function searchDone(err, content) {
    console.log(err, content)
  });
</script>
```

#### Angular.js

We provide a specific [AngularJS](https://angularjs.org/) build that is using the [$http service](https://docs.angularjs.org/api/ng/service/$http).

It can be used with callbacks or [AngularJS promises](https://docs.angularjs.org/api/ng/service/$q).

```html
<script src="//cdn.jsdelivr.net/angularjs/1.3.14/angular.min.js"></script>
<script src="//cdn.jsdelivr.net/algoliasearch/3/algoliasearch.angular.min.js"></script>
<script>
  angular
    .module('myapp', ['algoliasearch'])
    .controller('SearchCtrl', ['$scope', 'algolia', function($scope, algolia) {
      $scope.query = '';
      $scope.hits = [];
      var client = algolia.Client('ApplicationID', 'Search-Only-API-Key');
      var index = client.initIndex('indexName');
      index.search('something')
        .then(function searchSuccess(content) {
          console.log(content);
        }, function searchFailure(err) {
          console.log(err);
        });
    }]);
</script>
```

#### Browserify

```sh
npm install algoliasearch --save
```

```js
var algoliasearch = require('algoliasearch');
var client = algoliasearch('applicationID', 'Search-Only-API-Key');
var index = client.initIndex('indexName');
index.search('something', function searchDone(err, content) {
  console.log(err, content);
});
```

We also provide [runnable examples](#quick-start) for you to try.










Quick Start
-------------

We have easy to run [examples](./examples/) for you to try. First, setup the repository:

```sh
  git clone https://github.com/algolia/algoliasearch-client-js.git
  cd algoliasearch-client-js
  npm install
  npm run examples
```

Then open either:
- http://127.0.0.1:8080/examples/ to see a list of examples
- http://127.0.0.1:8080/examples/autocomplete.html
- http://127.0.0.1:8080/examples/instantsearch.html

To hack and use your own indexes and data, open one of the example file and replace:

```js
var client = algoliasearch('ApplicationID', 'Search-Only-API-Key');
var index = client.initIndex(indexName);
```





Callback convention
-------------

All API calls will return the result in a callback that takes two arguments:

 1. **error**: null or an [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) object. More info on the error can be find in `error.message`.
 2. **content**: the object containing the answer

We follow the [error-first callback](http://thenodeway.io/posts/understanding-error-first-callbacks/).

Promises
-------------

If **you do not provide a callback**, you will get a promise (but never both).

Promises are the [native Promise implementation](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise).

We use [jakearchibald/es6-promise](https://github.com/jakearchibald/es6-promise/) as a polyfill when needed.

Request strategy
-------------

The request strategy used by the JavaScript client includes:
- [CORS](http://en.wikipedia.org/wiki/Cross-Origin_Resource_Sharing#Browser_support) for modern browsers
- [XDomainRequest](https://msdn.microsoft.com/en-us/library/ie/cc288060%28v=vs.85%29.aspx) for IE <= 10
- [JSONP](http://en.wikipedia.org/wiki/JSONP) in any situation where Ajax requests are unavailabe or blocked.

Cache
-------------

Queries will be stored in a ```cache``` inside your JavaScript ```Index``` and ```AlgoliaSearch``` objects to avoid performing the same API calls twice. It's particularly useful when your users are deleting characters or words from the current query but has a chance of ending up with outdated results if the page isn't refreshed for some time.

To address this issue, be sure to clear the cache every X minutes to ensure you have up to date results:
```js
// clear the queries cache
index.clearCache();

// if you're performing multi-queries using the API client instead of the index
// you'll need to use the following code
client.clearCache();
```


Documentation
================

Check our [online documentation](http://www.algolia.com/doc/):
 * [Initial Import](http://www.algolia.com/doc/#InitialImport)
 * [Ranking &amp; Relevance](http://www.algolia.com/doc/#RankingRelevance)
 * [Indexing](http://www.algolia.com/doc/#Indexing)
 * [Search](http://www.algolia.com/doc/#Search)
 * [Sorting](http://www.algolia.com/doc/#Sorting)
 * [Filtering](http://www.algolia.com/doc/#Filtering)
 * [Faceting](http://www.algolia.com/doc/#Faceting)
 * [Geo-Search](http://www.algolia.com/doc/#Geo-Search)
 * [Security](http://www.algolia.com/doc/#Security)
 * [REST API](http://www.algolia.com/doc/rest)


Tutorials
================

Check out our [tutorials](http://www.algolia.com/doc/tutorials):
 * [Search bar with autocomplete menu](http://www.algolia.com/doc/tutorials/auto-complete)
 * [Search bar with multi category autocomplete menu](http://www.algolia.com/doc/tutorials/multi-auto-complete)
 * [Instant search result pages](http://www.algolia.com/doc/tutorials/instant-search)



Commands Reference
==================



Search
-------------


To perform a search, you only need to initialize the index and perform a call to the search function.

You can use the following optional arguments:

### Query Parameters

#### Full Text Search Parameters

 * **query**: (string) The instant search query string. All words of the query are interpreted as prefixes (for example "John Mc" will match "John Mccamey" and "Johnathan Mccamey"). If no query parameter is set all objects are retrieved.
 * **queryType**: Selects how the query words are interpreted. It can be one of the following values:
  * **prefixAll**: All query words are interpreted as prefixes.
  * **prefixLast**: Only the last word is interpreted as a prefix (default behavior).
  * **prefixNone**: No query word is interpreted as a prefix. This option is not recommended.
 * **removeWordsIfNoResults**: This option is used to select a strategy in order to avoid having an empty result page. There are three different options:
  * **lastWords**: When a query does not return any results, the last word will be added as optional. The process is repeated with n-1 word, n-2 word, ... until there are results.
  * **firstWords**: When a query does not return any results, the first word will be added as optional. The process is repeated with second word, third word, ... until there are results.
  * **allOptional**: When a query does not return any results, a second trial will be made with all words as optional. This is equivalent to transforming the AND operand between query terms to an OR operand. 
  * **none**: No specific processing is done when a query does not return any results (default behavior).
 * **minWordSizefor1Typo**: The minimum number of characters in a query word to accept one typo in this word.<br/>Defaults to 4.
 * **minWordSizefor2Typos**: The minimum number of characters in a query word to accept two typos in this word.<br/>Defaults to 8.
 * **allowTyposOnNumericTokens**: If set to false, it disables typo tolerance on numeric tokens (numbers). Defaults to false.
 * **typoTolerance**: This option allows you to control the number of typos in the result set:
  * **true**: The typo tolerance is enabled and all matching hits are retrieved (default behavior).
  * **false**: The typo tolerance is disabled. For example, if one result matches without typos, then all results with typos will be hidden.
  * **min**: Only keep results with the minimum number of typos.
  * **strict**: Hits matching with 2 typos are not retrieved if there are some matching without typos. This option is useful if you want to avoid false positives as much as possible.
 * **allowTyposOnNumericTokens**: If set to false, disables typo tolerance on numeric tokens (numbers). Defaults to true.
 * **ignorePlural**: If set to true, plural won't be considered as a typo. For example, car and cars will be considered as equals. Defaults to false.
 * **restrictSearchableAttributes** List of attributes you want to use for textual search (must be a subset of the `attributesToIndex` index setting). Attributes are separated with a comma such as `"name,address"`. You can also use JSON string array encoding such as `encodeURIComponent("[\"name\",\"address\"]")`. By default, all attributes specified in `attributesToIndex` settings are used to search.
 * **advancedSyntax**: Enables the advanced query syntax. Defaults to 0 (false).
    * **Phrase query**: A phrase query defines a particular sequence of terms. A phrase query is built by Algolia's query parser for words surrounded by `"`. For example, `"search engine"` will retrieve records having `search` next to `engine` only. Typo tolerance is _disabled_ on phrase queries.
    * **Prohibit operator**: The prohibit operator excludes records that contain the term after the `-` symbol. For example, `search -engine` will retrieve records containing `search` but not `engine`.
 * **analytics**: If set to false, this query will not be taken into account in the analytics feature. Defaults to true.
 * **synonyms**: If set to false, this query will not use synonyms defined in the configuration. Defaults to true.
 * **replaceSynonymsInHighlight**: If set to false, words matched via synonym expansion will not be replaced by the matched synonym in the highlight results. Defaults to true.
 * **optionalWords**: A string that contains the comma separated list of words that should be considered as optional when found in the query.

#### Pagination Parameters

 * **page**: (integer) Pagination parameter used to select the page to retrieve.<br/>Page is zero based and defaults to 0. Thus, to retrieve the 10th page you need to set `page=9`.
 * **hitsPerPage**: (integer) Pagination parameter used to select the number of hits per page. Defaults to 20.

#### Geo-search Parameters

 * **aroundLatLng**: Search for entries around a given latitude/longitude (specified as two floats separated by a comma).<br/>For example, `aroundLatLng=47.316669,5.016670`.<br/>You can specify the maximum distance in meters with the **aroundRadius** parameter and the precision for ranking with **aroundPrecision**. For example, if you set aroundPrecision=100, two objects that are a distance of less than 100 meters will be considered as identical for the "geo" ranking parameter).<br/>At indexing, you should specify the geo location of an object with the `_geoloc` attribute in the form `{"_geoloc":{"lat":48.853409, "lng":2.348800}}`.

 * **aroundLatLngViaIP**: Search for entries around a given latitude/longitude automatically computed from user IP address.<br/>For example, `aroundLatLng=47.316669,5.016670`.<br/>You can specify the maximum distance in meters with the **aroundRadius** parameter and the precision for ranking with **aroundPrecision**. For example, if you set aroundPrecision=100, two objects that are a distance of less than 100 meters will be considered as identical for the "geo" ranking parameter.<br/>At indexing, you should specify the geo location of an object with the `_geoloc` attribute in the form `{"_geoloc":{"lat":48.853409, "lng":2.348800}}`.


 * **insideBoundingBox**: Search entries inside a given area defined by the two extreme points of a rectangle (defined by 4 floats: p1Lat,p1Lng,p2Lat,p2Lng).<br/>For example, `insideBoundingBox=47.3165,4.9665,47.3424,5.0201`).<br/>At indexing, you should specify the geo location of an object with the _geoloc attribute in the form `{"_geoloc":{"lat":48.853409, "lng":2.348800}}`.

#### Parameters to Control Results Content

 * **attributesToRetrieve**: A string that contains the list of object attributes you want to retrieve in order to minimize the answer size.<br/> Attributes are separated with a comma (for example `"name,address"`). You can also use a string array encoding (for example `["name","address"]` ). By default, all attributes are retrieved. You can also use `*` to retrieve all values when an **attributesToRetrieve** setting is specified for your index.
 * **attributesToHighlight**: A string that contains the list of attributes you want to highlight according to the query. Attributes are separated by commas. You can also use a string array encoding (for example `["name","address"]`). If an attribute has no match for the query, the raw value is returned. By default all indexed text attributes are highlighted. You can use `*` if you want to highlight all textual attributes. Numerical attributes are not highlighted. A matchLevel is returned for each highlighted attribute and can contain:
  * **full**: If all the query terms were found in the attribute.
  * **partial**: If only some of the query terms were found.
  * **none**: If none of the query terms were found.
 * **attributesToSnippet**: A string that contains the list of attributes to snippet alongside the number of words to return (syntax is `attributeName:nbWords`). Attributes are separated by commas (Example: `attributesToSnippet=name:10,content:10`). <br/>You can also use a string array encoding (Example: `attributesToSnippet: ["name:10","content:10"]`). By default, no snippet is computed.
 * **getRankingInfo**: If set to 1, the result hits will contain ranking information in the **_rankingInfo** attribute.
 

#### Numeric Search Parameters
 * **numericFilters**: A string that contains the comma separated list of numeric filters you want to apply. The filter syntax is `attributeName` followed by `operand` followed by `value`. Supported operands are `<`, `<=`, `=`, `>` and `>=`.

You can easily perform range queries via the `:` operator. This is equivalent to combining a `>=` and `<=` operand. For example, `numericFilters=price:10 to 1000`.

You can also mix OR and AND operators. The OR operator is defined with a parenthesis syntax. For example, `(code=1 AND (price:[0-100] OR price:[1000-2000]))` translates to `encodeURIComponent("code=1,(price:0 to 10,price:1000 to 2000)")`.

You can also use a string array encoding (for example `numericFilters: ["price>100","price<1000"]`).

#### Category Search Parameters
 * **tagFilters**: Filter the query by a set of tags. You can AND tags by separating them with commas. To OR tags, you must add parentheses. For example, `tags=tag1,(tag2,tag3)` means *tag1 AND (tag2 OR tag3)*. You can also use a string array encoding. For example, `tagFilters: ["tag1",["tag2","tag3"]]` means *tag1 AND (tag2 OR tag3)*.<br/>At indexing, tags should be added in the **_tags** attribute of objects. For example `{"_tags":["tag1","tag2"]}`.

#### Faceting Parameters
 * **facetFilters**: Filter the query with a list of facets. Facets are separated by commas and is encoded as `attributeName:value`. To OR facets, you must add parentheses. For example: `facetFilters=(category:Book,category:Movie),author:John%20Doe`. You can also use a string array encoding. For example, `[["category:Book","category:Movie"],"author:John%20Doe"]`.
 * **facets**: List of object attributes that you want to use for faceting. <br/>Attributes are separated with a comma. For example, `"category,author"`. You can also use JSON string array encoding. For example, `["category","author"]`. Only the attributes that have been added in **attributesForFaceting** index setting can be used in this parameter. You can also use `*` to perform faceting on all attributes specified in **attributesForFaceting**.
 * **maxValuesPerFacet**: Limit the number of facet values returned for each facet. For example, `maxValuesPerFacet=10` will retrieve a maximum of 10 values per facet.

#### Distinct Parameter
 * **distinct**: If set to 1, enables the distinct feature, disabled by default, if the `attributeForDistinct` index setting is set. This feature is similar to the SQL "distinct" keyword. When enabled in a query with the `distinct=1` parameter, all hits containing a duplicate value for the attributeForDistinct attribute are removed from results. For example, if the chosen attribute is `show_name` and several hits have the same value for `show_name`, then only the best one is kept and the others are removed.
**Note**: This feature is disabled if the query string is empty and there aren't any `tagFilters`, `facetFilters`, nor `numericFilters` parameters.

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
index.search(
  'query string', {
    attributesToRetrieve: ['firstname', 'lastname'],
    hitsPerPage: 50
  },
  function searchDone(err, content) {
    if (err) {
      console.error(err);
      return;
    }

    for (var h in content.hits) {
      console.log('Hit(' + content.hits[h].objectID + '): ' + content.hits[h].toString());
    }
  }
);
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


Multiple queries
--------------

You can send multiple queries with a single API call using a batch of queries:

```javascript
var client = algoliasearch('ApplicationID', 'Search-Only-API-Key');

// perform 3 queries in a single API call:
//  - 1st query targets index `categories`
//  - 2nd and 3rd queries target index `products`
client.startQueriesBatch();

client.addQueryInBatch(
  'categories', // index name
  'search in categories index', {
    hitsPerPage: 3
  }
);

client.addQueryInBatch(
  'products',
  'first search in products', {
    hitsPerPage: 3,
    tagFilters: 'promotion'
  }
);

client.addQueryInBatch(
  'products',
  'another search in products', {
    hitsPerPage: 10
  }
);

client.sendQueriesBatch(searchMultiCallback);

function searchMultiCallback(err, content) {
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
```



Get an object
-------------

You can easily retrieve an object using its `objectID` and optionally specify a comma separated list of attributes you want:

```javascript
var client = algoliasearch('ApplicationID', 'Search-Only-API-Key');
var index = client.initIndex('indexName');

// Retrieves all attributes
index.getObject('myID', function searchDone(err, content) {
  if (err) {
    console.error(err);
    return;
  }

  console.log(content.objectID + ": ", content);
});

// Retrieves firstname and lastname attributes
index.getObject('myID', ['firstname', 'lastname'], function searchDone(err, content) {
  if (err) {
    console.error(err);
    return;
  }

  console.log(content.objectID + ": ", content);
});
```

You can also retrieve a set of objects:





Security
---------

If you're using [Per-User security](https://www.algolia.com/doc#SecurityUser) keys, you need to set the associated `tags`:

```javascript
var client = algoliasearch('ApplicationID', 'YourPublicSecuredAPIKey');

// must be the same than those used at generation-time
client.setSecurityTags('(public,user_42)');
```

// If you've specified a `userToken` while generating your secured API key, you must also specified it at query-time:

```javascript
var client = algoliasearch('ApplicationID', 'YourPublicSecuredAPIKey');

// must be the same as the ones used at generation-time
client.setSecurityTags('(public,user_42)');

// must be the same as the one used at generation-time
client.setUserToken('user_42');
```





Updating the index
-------------

In some use cases, such as an HTML5 mobile application, it may be necessary to perform updates to the index directly in JavaScript.

Therefore, just like other languages, the JavaScript client is able to add, update, delete objects and modify index settings.

If you use the JavaScript client to update the index and if you are not on an `https:` website already, you must force the client to use `https:`:

```javascript
  <script src="//cdn.jsdelivr.net/algoliasearch/3/algoliasearch.min.js"></script>
  <script>
    var client = algoliasearch('ApplicationID', 'API-Key', {protocol: 'https:'});
  </script>
```




