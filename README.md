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
1. [List api keys - `listApiKeys`](#list-api-keys---listapikeys)
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

Here is the list of parameters you can use with the search method (`search` [scope](#scope)):
Parameters that can also be used in a setSettings also have the `indexing` [scope](#scope)

**Search**

- [query](#query) `search`

**Attributes**

- [attributesToRetrieve](#attributestoretrieve) `settings`, `search`
- [restrictSearchableAttributes](#restrictsearchableattributes) `search`

**Filtering / Faceting**

- [filters](#filters) `search`
- [facets](#facets) `search`
- [maxValuesPerFacet](#maxvaluesperfacet) `settings`, `search`
- [facetFilters](#facetfilters) `search`

**Highlighting / Snippeting**

- [attributesToHighlight](#attributestohighlight) `settings`, `search`
- [attributesToSnippet](#attributestosnippet) `settings`, `search`
- [highlightPreTag](#highlightpretag) `settings`, `search`
- [highlightPostTag](#highlightposttag) `settings`, `search`
- [snippetEllipsisText](#snippetellipsistext) `settings`, `search`
- [restrictHighlightAndSnippetArrays](#restricthighlightandsnippetarrays) `settings`, `search`

**Pagination**

- [page](#page) `search`
- [hitsPerPage](#hitsperpage) `settings`, `search`
- [offset](#offset) `search`
- [length](#length) `search`

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
- [aroundRadius](#aroundradius) `search`
- [aroundPrecision](#aroundprecision) `search`
- [minimumAroundRadius](#minimumaroundradius) `search`
- [insideBoundingBox](#insideboundingbox) `search`
- [insidePolygon](#insidepolygon) `search`

**Query Strategy**

- [queryType](#querytype) `search`, `settings`
- [removeWordsIfNoResults](#removewordsifnoresults) `settings`, `search`
- [advancedSyntax](#advancedsyntax) `settings`, `search`
- [optionalWords](#optionalwords) `settings`, `search`
- [removeStopWords](#removestopwords) `settings`, `search`
- [exactOnSingleWordQuery](#exactonsinglewordquery) `settings`, `search`
- [alternativesAsExact](#alternativesasexact) `setting`, `search`

**Advanced**

- [distinct](#distinct) `settings`, `search`
- [getRankingInfo](#getrankinginfo) `search`
- [numericFilters](#numericfilters) `search`
- [tagFilters](#tagfilters) `search`
- [analytics](#analytics) `search`
- [analyticsTags](#analyticstags) `search`
- [synonyms](#synonyms) `search`
- [replaceSynonymsInHighlight](#replacesynonymsinhighlight) `settings`, `search`
- [minProximity](#minproximity) `settings`, `search`
- [responseFields](#responsefields) `settings`, `search`

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

When a facet can take many different values, it can be useful to search within them. The typical use case is to build
an autocomplete menu for facet refinements, but of course other use cases may apply as well.

The facet search is different from a regular search in the sense that it retrieves *facet values*, not *objects*.
In other words, a value will only be returned once, even if it matches many different objects. How many objects it
matches is indicated by a count.

The results are sorted by decreasing count. Maximum 10 results are returned. No pagination is possible.

The facet search can optionally be restricted by a regular search query. In that case, it will return only facet values
that both:

1. match the facet query; and
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
 2. Using automatic `objectID` assignment. You will be able to access it in the answer.

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

To add a single object, use the [Add Objects](#add-objects) method:

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

To partial update multiple objects using one API call, you can use the `[Partial update objects](#partial-update-objects)` method:

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

To delete a single object, you can use the `[Delete objects](#delete-objects)` method:

```js
index.deleteObject('myID', function(err) {
  if (!err) {
    console.log('success');
  }
});
```

## Delete by query - `deleteByQuery` 

You can delete all objects matching a single query with the following code. Internally, the API client performs the query, deletes all matching hits, and waits until the deletions have been applied.

Take your precautions when using this method. Calling it with an empty query will result in cleaning the index of all its records.

```js
// no query parameters
index.deleteByQuery('John', function(err) {
  if (!err) {
    console.log('success');
  }
});

// with query parameters
index.deleteByQuery('John', {
  some: 'query',
  param: 'eters'
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

Here is the list of parameters you can use with the set settings method (`settings` [scope](#scope)).

Parameters that can be overridden at search time also have the `search` [scope](#scope).

**Attributes**

- [searchableAttributes](#searchableattributes) `settings`
- [attributesForFaceting](#attributesforfaceting) `settings`
- [unretrievableAttributes](#unretrievableattributes) `settings`
- [attributesToRetrieve](#attributestoretrieve) `settings`, `search`

**Ranking**

- [ranking](#ranking) `settings`
- [customRanking](#customranking) `settings`
- [replicas](#replicas) `settings`

**Filtering / Faceting**

- [maxValuesPerFacet](#maxvaluesperfacet) `settings`, `search`

**Highlighting / Snippeting**

- [attributesToHighlight](#attributestohighlight) `settings`, `search`
- [attributesToSnippet](#attributestosnippet) `settings`, `search`
- [highlightPreTag](#highlightpretag) `settings`, `search`
- [highlightPostTag](#highlightposttag) `settings`, `search`
- [snippetEllipsisText](#snippetellipsistext) `settings`, `search`
- [restrictHighlightAndSnippetArrays](#restricthighlightandsnippetarrays) `settings`, `search`

**Pagination**

- [hitsPerPage](#hitsperpage) `settings`, `search`
- [paginationLimitedTo](#paginationlimitedto) `settings`

**Typos**

- [minWordSizefor1Typo](#minwordsizefor1typo) `settings`, `search`
- [minWordSizefor2Typos](#minwordsizefor2typos) `settings`, `search`
- [typoTolerance](#typotolerance) `settings`, `search`
- [allowTyposOnNumericTokens](#allowtyposonnumerictokens) `settings`, `search`
- [ignorePlurals](#ignoreplurals) `settings`, `search`
- [disableTypoToleranceOnAttributes](#disabletypotoleranceonattributes) `settings`, `search`
- [disableTypoToleranceOnWords](#disabletypotoleranceonwords) `settings`
- [separatorsToIndex](#separatorstoindex) `settings`

**Query Strategy**

- [queryType](#querytype) `search`, `settings`
- [removeWordsIfNoResults](#removewordsifnoresults) `settings`, `search`
- [advancedSyntax](#advancedsyntax) `settings`, `search`
- [optionalWords](#optionalwords) `settings`, `search`
- [removeStopWords](#removestopwords) `settings`, `search`
- [disablePrefixOnAttributes](#disableprefixonattributes) `settings`
- [disableExactOnAttributes](#disableexactonattributes) `settings`
- [exactOnSingleWordQuery](#exactonsinglewordquery) `settings`, `search`

**Performance**

- [numericAttributesForFiltering](#numericattributesforfiltering) `settings`
- [allowCompressionOfIntegerArray](#allowcompressionofintegerarray) `settings`

**Advanced**

- [attributeForDistinct](#attributefordistinct) `settings`
- [distinct](#distinct) `settings`, `search`
- [replaceSynonymsInHighlight](#replacesynonymsinhighlight) `settings`, `search`
- [placeholders](#placeholders) `settings`
- [altCorrections](#altcorrections) `settings`
- [minProximity](#minproximity) `settings`, `search`
- [responseFields](#responsefields) `settings`, `search`


# Parameters



<section id="api-client-parameters-overview">

## Overview

### Scope

Each parameter in this page has a scope. Depending on the scope, you can use the parameter within the `setSettings`
and/or the `search` method.

There are three scopes:

- `settings`: The setting can only be used in the `setSettings` method.
- `search`: The setting can only be used in the `search` method.
- `settings` `search`: The setting can be used in the `setSettings` method and be overridden in the`search` method.

### Parameters List

**Search**

- [query](#query) `search`

**Attributes**

- [searchableAttributes](#searchableattributes) `settings`
- [attributesForFaceting](#attributesforfaceting) `settings`
- [unretrievableAttributes](#unretrievableattributes) `settings`
- [attributesToRetrieve](#attributestoretrieve) `settings`, `search`
- [restrictSearchableAttributes](#restrictsearchableattributes) `search`

**Ranking**

- [ranking](#ranking) `settings`
- [customRanking](#customranking) `settings`
- [replicas](#replicas) `settings`

**Filtering / Faceting**

- [filters](#filters) `search`
- [facets](#facets) `search`
- [maxValuesPerFacet](#maxvaluesperfacet) `settings`, `search`
- [facetFilters](#facetfilters) `search`

**Highlighting / Snippeting**

- [attributesToHighlight](#attributestohighlight) `settings`, `search`
- [attributesToSnippet](#attributestosnippet) `settings`, `search`
- [highlightPreTag](#highlightpretag) `settings`, `search`
- [highlightPostTag](#highlightposttag) `settings`, `search`
- [snippetEllipsisText](#snippetellipsistext) `settings`, `search`
- [restrictHighlightAndSnippetArrays](#restricthighlightandsnippetarrays) `settings`, `search`

**Pagination**

- [page](#page) `search`
- [hitsPerPage](#hitsperpage) `settings`, `search`
- [offset](#offset) `search`
- [length](#length) `search`
- [paginationLimitedTo](#paginationlimitedto) `settings`

**Typos**

- [minWordSizefor1Typo](#minwordsizefor1typo) `settings`, `search`
- [minWordSizefor2Typos](#minwordsizefor2typos) `settings`, `search`
- [typoTolerance](#typotolerance) `settings`, `search`
- [allowTyposOnNumericTokens](#allowtyposonnumerictokens) `settings`, `search`
- [ignorePlurals](#ignoreplurals) `settings`, `search`
- [disableTypoToleranceOnAttributes](#disabletypotoleranceonattributes) `settings`, `search`
- [disableTypoToleranceOnWords](#disabletypotoleranceonwords) `settings`
- [separatorsToIndex](#separatorstoindex) `settings`

**Geo-Search**

- [aroundLatLng](#aroundlatlng) `search`
- [aroundLatLngViaIP](#aroundlatlngviaip) `search`
- [aroundRadius](#aroundradius) `search`
- [aroundPrecision](#aroundprecision) `search`
- [minimumAroundRadius](#minimumaroundradius) `search`
- [insideBoundingBox](#insideboundingbox) `search`
- [insidePolygon](#insidepolygon) `search`

**Query Strategy**

- [queryType](#querytype) `search`, `settings`
- [removeWordsIfNoResults](#removewordsifnoresults) `settings`, `search`
- [advancedSyntax](#advancedsyntax) `settings`, `search`
- [optionalWords](#optionalwords) `settings`, `search`
- [removeStopWords](#removestopwords) `settings`, `search`
- [disablePrefixOnAttributes](#disableprefixonattributes) `settings`
- [disableExactOnAttributes](#disableexactonattributes) `settings`
- [exactOnSingleWordQuery](#exactonsinglewordquery) `settings`, `search`
- [alternativesAsExact](#alternativesasexact) `setting`, `search`

**Performance**

- [numericAttributesForFiltering](#numericattributesforfiltering) `settings`
- [allowCompressionOfIntegerArray](#allowcompressionofintegerarray) `settings`

**Advanced**

- [attributeForDistinct](#attributefordistinct) `settings`
- [distinct](#distinct) `settings`, `search`
- [getRankingInfo](#getrankinginfo) `search`
- [numericFilters](#numericfilters) `search`
- [tagFilters](#tagfilters) `search`
- [analytics](#analytics) `search`
- [analyticsTags](#analyticstags) `search`
- [synonyms](#synonyms) `search`
- [replaceSynonymsInHighlight](#replacesynonymsinhighlight) `settings`, `search`
- [placeholders](#placeholders) `settings`
- [altCorrections](#altcorrections) `settings`
- [minProximity](#minproximity) `settings`, `search`
- [responseFields](#responsefields) `settings`, `search`

## Search

#### query

- scope: `search`
- type: string
- default: `""`

The text to search for in the index. If empty or absent, the textual search will match any object.

## Attributes

#### searchableAttributes

- scope: `settings`
- type: array of strings
- default: `*` (all string attributes)
- formerly known as: `attributesToIndex`

The list of attributes you want index (i.e. to make searchable).

If set to null, all textual and numerical attributes of your objects are indexed.
Make sure you updated this setting to get optimal results.

This parameter has two important uses:

1. **Limit the attributes to index.** For example, if you store the URL of a picture, you want to store it and be able to retrieve it,
    but you probably don't want to search in the URL.

2. **Control part of the ranking.** The contents of the `searchableAttributes` parameter impacts ranking in two complementary ways:
    First, the order in which attributes are listed defines their ranking priority: matches in attributes at the beginning of the
    list will be considered more important than matches in attributes further down the list. To assign the same priority to several attributes,
    pass them within the same string, separated by commas. For example, by specifying `["title,"alternative_title", "text"]`,
    `title` and `alternative_title` will have the same priority, but a higher priority than `text`.

    Then, within the same attribute, matches near the beginning of the text will be considered more important than matches near the end.
    You can disable this behavior by wrapping your attribute name inside an `unordered()` modifier. For example, `["title", "unordered(text)"]`
    will consider all positions inside the `text` attribute as equal, but positions inside the `title` attribute will still matter.

    You can decide to have the same priority for several attributes by passing them in the same string using comma as separator.
    For example:
    `title` and `alternative_title` have the same priority in this example: `searchableAttributes:["title,alternative_title", "text"]`

**Note:** To get a full description of how the ranking works, you can have a look at our [Ranking guide](https://www.algolia.com/doc/guides/relevance/ranking).

#### attributesForFaceting

- scope: `settings`
- type: array of strings
- default: `[]`

List of attributes you want to use for faceting.

All strings within these attributes will be extracted and added as facets.
If not specified or empty, no attribute will be faceted.

If you only need to filter on a given facet, but are not interested in value counts for this facet,
you can improve performances by specifying `filterOnly(${attributeName})`. This decreases the size of the index
and the time required to build it.

If you want to search inside values of a given facet (using the [Search for facet values](#search-for-facet-values) method)
you need to specify `searchable(${attributeName})`.

**Note:** The `filterOnly()` and `searchable()` modifiers are mutually exclusive.

#### unretrievableAttributes

- scope: `settings`
- type: array of strings
- default: `[]`

List of attributes that cannot be retrieved at query time.

These attributes can still be used for indexing and/or ranking.

**Note:** This setting is bypassed when the query is authenticated with the **admin API key**.

#### attributesToRetrieve

- scope: `settings` `search`
- type: array of strings
- default: `*` (all attributes)
- formerly known as: `attributes`

List of object attributes you want to retrieve.
This can be used to minimize the size of the response.

You can use `*` to retrieve all values.

**Note:** `objectID` is always retrieved, even when not specified.

**Note:** Attributes listed in [unretrievableAttributes](#unretrievableattributes) will not be retrieved even if requested,
unless the request is authenticated with the admin API key.

#### restrictSearchableAttributes

- scope: `search`
- type: array of strings
- default: all attributes in `searchableAttributes`

List of attributes to be considered for textual search.

**Note:** It must be a subset of the [searchableAttributes](#searchableattributes) index setting.
Consequently, `searchableAttributes` must not be empty nor null for `restrictSearchableAttributes` to be allowed.

## Ranking

#### ranking

- scope: `settings`
- type: array of strings
- default: `["typo", "geo", "words", "filters", "proximity", "attribute", "exact", "custom"]`

Controls the way results are sorted.

You must specify a list of ranking criteria. They will be applied in sequence by the tie-breaking algorithm
in the order they are specified.

The following ranking criteria are available:

* `typo`: Sort by increasing number of typos.
* `geo`: Sort by decreasing geo distance when performing a geo search.
This criterion is ignored when not performing a geo search.
* `words`: Sort by decreasing number of matched query words.
This parameter is useful when you use the [optionalWords](#optionalwords) query parameter to rank hits with the most matched words first.
* `proximity`: Sort by increasing proximity of query words in hits.
* `attribute`: Sort according to the order of attributes defined by [searchableAttributes](#searchableattributes).
* `exact`:
    - **If the query contains only one word:** The behavior depends on the value of [exactOnSingleWordQuery](#exactonsinglewordquery).
    - **If the query contains multiple words:** Sort by decreasing number of words that matched exactly.
  What is considered to be an exact match depends on the value of [alternativesAsExact](#alternativesasexact).
* `custom`: Sort according to a user-defined formula specified via the [customRanking](#customranking) setting.
* Sort by value of a numeric attribute. Here, `${attributeName}` can be the name of any numeric attribute in your objects (integer, floating-point or boolean).
    * `asc(${attributeName})`: sort by increasing value of the attribute
    * `desc(${attributeName})`: sort by decreasing value of the attribute

**Note:** To get a full description of how the ranking works, you can have a look at our [Ranking guide](https://www.algolia.com/doc/guides/relevance/ranking).

#### customRanking

- scope: `settings`
- type: array of strings
- default: `[]`

Specifies the `custom` ranking criterion.

Each string must conform to the syntax `asc(${attributeName})` or `desc(${attributeName})` and specifies a
(respectively) increasing or decreasing sort on an attribute. All sorts are applied in sequence by the tie-breaking
algorithm in the order they are specified.

**Example:** `["desc(population)", "asc(name)"]` will sort by decreasing value of the `population` attribute,
then *in case of equality* by increasing value of the `name` attribute.

**Note:** To get a full description of how custom ranking works,
you can have a look at our [Ranking guide](https://www.algolia.com/doc/guides/relevance/ranking).

#### replicas

- scope: `settings`
- type: array of strings
- default: `[]`
- formerly known as: `slaves`

List of indices to which you want to replicate all write operations.

In order to get relevant results in milliseconds, we pre-compute part of the ranking during indexing.
Consequently, if you want to use different ranking formulas depending on the use case,
you need to create one index per ranking formula.

This option allows you to perform write operations on a single, master index and automatically
perform the same operations on all of its replicas.

**Note:** A master index can have as many replicas as needed. However, a replica can only have one master; in other words,
two master indices cannot have the same replica. Furthermore, a replica cannot have its own replicas
(i.e. you cannot "chain" replicas).

## Filtering / Faceting

#### filters

- scope: `search`
- type: string
- default: `""`

Filter the query with numeric, facet and/or tag filters.

This parameter uses a SQL-like expression syntax, where you can use boolean operators and parentheses to combine individual filters.

The following **individual filters** are supported:

- **Numeric filter**:

    - **Comparison**: `${attributeName} ${operator} ${operand}` matches all objects where the specified numeric attribute satisfies the numeric condition expressed by the operator and the operand. The operand must be a numeric value. Supported operators are `<`, `<=`, `=`, `!=`, `>=` and `>`, with the same semantics as in virtually all programming languages.
    Example: `inStock > 0`.

    - **Range**: `${attributeName}:${lowerBound} TO ${upperBound}` matches all objects where the specified numeric
    attribute is within the range [`${lowerBound}`, `${upperBound}`] (inclusive on both ends).
    Example: `publication_date: 1441745506 TO 1441755506`.

- **Facet filter**: `${facetName}:${facetValue}` matches all objects containing exactly the specified value in the specified facet attribute. *Facet matching is case sensitive*. Example: `category:Book`.

- **Tag filter**: `_tags:${value}` (or, alternatively, just `${value}`) matches all objects containing exactly the specified value in their `_tags` attribute. *Tag matching is case sensitive*. Example: `_tags:published`.

Individual filters can be combined via **boolean operators**. The following operators are supported:

- `OR`: must match any of the combined conditions (disjunction)
- `AND`: must match all of the combined conditions (conjunction)
- `NOT`: negate a filter

Finally, **parentheses** (`(` and `)`) can be used for grouping.

Putting it all together, an example is:

```
available = 1 AND (category:Book OR NOT category:Ebook) AND _tags:published AND publication_date:1441745506 TO 1441755506 AND inStock > 0 AND author:"John Doe"
```

**Warning:** Keywords are case-sensitive.

**Note:** If no attribute name is specified, the filter applies to `_tags`.
For example: `public OR user_42` will translate into `_tags:public OR _tags:user_42`.

**Note:** If a value contains spaces, or conflicts with a keyword, you can use double quotes.

**Note:** If a filtered attribute contains an array of values, any matching value will cause the filter to match.

**Warning:** For performance reasons, filter expressions are limited to a disjunction of conjunctions.
In other words, you can have ANDs of ORs (e.g. `filter1 AND (filter2 OR filter3)`),
but not ORs of ANDs (e.g. `filter1 OR (filter2 AND filter3)`.

**Warning:** You cannot mix different filter categories inside a disjunction (OR).
For example, `num=3 OR tag1 OR facet:value` is not allowed.

**Warning:** You cannot negate a group of filters, only an individual filter.
For example, `NOT(filter1 OR filter2)` is not allowed.

#### facets

- scope: `search`
- type: array of strings
- default: `[]`

Facets to retrieve.
If not specified or empty, no facets are retrieved.
The special value `*` may be used to retrieve all facets.

**Warning:** Facets must have been declared beforehand in the [attributesForFaceting](#attributesforfaceting) index setting.

For each of the retrieved facets, the response will contain a list of the most frequent facet values in objects
matching the current query. Each value will be returned with its associated count (number of matched objects containing that value).

**Warning:** Faceting does **not** filter your results. If you want to filter results, you should use [filters](#filters).

**Example**:

If your settings contain:

```
{
  "attributesForFaceting": ["category", "author", "nb_views", "nb_downloads"]
}
```

... but, for the current search, you want to retrieve facet values only for `category` and `author`, then you can specify:

```
"facets": ["category", "author"]
```

**Warning:** If the number of hits is high, facet counts may be approximate.
The response field `exhaustiveFacetsCount` is true when the count is exact.

#### maxValuesPerFacet

- scope: `settings` `search`
- type: integer
- default: `100`

Maximum number of facet values returned for each facet.

**Warning:** The API enforces a hard limit of 1000 on `maxValuesPerFacet`.
Any value above that limit will be interpreted as 1000.

#### facetFilters

- scope: `search`
- type: array of strings
- default: `[]`

Filter hits by facet value.

**Note:** The [filters](#filters) parameter provides an easier to use, SQL-like syntax.
We recommend using it instead of `facetFilters`.

Each string represents a filter on a given facet value. It must follow the syntax `${attributeName}:${value}`.

If you specify multiple filters, they are interpreted as a conjunction (AND). If you want to use a disjunction (OR),
use a nested array.

Examples:

- `["category:Book", "author:John Doe"]` translates as `category:Book AND author:"John Doe"`
- `[["category:Book", "category:Movie"], "author:John Doe"]` translates as `(category:Book OR category:Movie) AND author:"John Doe"`

Negation is supported by prefixing the value with a minus sign (`-`, a.k.a. dash).
For example: `["category:Book", "category:-Movie"]` translates as `category:Book AND NOT category:Movie`.

## Highlighting / Snippeting

#### attributesToHighlight

- scope: `settings` `search`
- type: array of strings
- default: all searchable attributes

List of attributes to highlight.
If set to null, all **searchable** attributes are highlighted (see [searchableAttributes](#searchableattributes)).
The special value `*` may be used to highlight all attributes.

**Note:** Only string values can be highlighted. Numerics will be ignored.

When highlighting is enabled, each hit in the response will contain an additional `_highlightResult` object
(provided that at least one of its attributes is highlighted) with the following fields:

<!-- TODO: Factorize the following with the "Search Response Format" section in the API Client doc. -->

- `value` (string): Markup text with occurrences highlighted.
  The tags used for highlighting are specified via [highlightPreTag](#highlightpretag) and [highlightPostTag](#highlightposttag).

- `matchLevel` (string, enum) = {`none` \| `partial` \| `full`}: Indicates how well the attribute matched the search query.

- `matchedWords` (array): List of words *from the query* that matched the object.

- `fullyHighlighted` (boolean): Whether the entire attribute value is highlighted.

#### attributesToSnippet

- scope: `settings` `search`
- type: array of strings
- default: `[]` (no attribute is snippeted)

List of attributes to snippet, with an optional maximum number of words to snippet.
If set to null, no attributes are snippeted.
The special value `*` may be used to snippet all attributes.

The syntax for each attribute is `${attributeName}:${nbWords}`.
The number of words can be omitted, and defaults to 10.

**Note:** Only string values can be snippeted. Numerics will be ignored.

When snippeting is enabled, each hit in the response will contain an additional `_snippetResult` object
(provided that at least one of its attributes is snippeted) with the following fields:

<!-- TODO: Factorize the following with the "Search Response Format" section in the API Client doc. -->

- `value` (string): Markup text with occurrences highlighted and optional ellipsis indicators.
  The tags used for highlighting are specified via [highlightPreTag](#highlightpretag) and [highlightPostTag](#highlightposttag).
  The text used to indicate ellipsis is specified via [snippetEllipsisText](#snippetellipsistext).

- `matchLevel` (string, enum) = {`none` \| `partial` \| `full`}: Indicates how well the attribute matched the search query.

#### highlightPreTag

- scope: `settings` `search`
- type: string
- default: `"<em>"`

String inserted before highlighted parts in highlight and snippet results.

#### highlightPostTag

- scope: `settings` `search`
- type: string
- default: `"</em>"`

String inserted after highlighted parts in highlight and snippet results.

#### snippetEllipsisText

- scope: `settings` `search`
- type: string
- default: `…` (U+2026)

String used as an ellipsis indicator when a snippet is truncated.

**Warning:** Defaults to an empty string for all accounts created before February 10th, 2016.
Defaults to `…` (U+2026, HORIZONTAL ELLIPSIS) for accounts created after that date.

#### restrictHighlightAndSnippetArrays

- scope: `settings` `search`
- type: boolean
- default: `false`

When true, restrict arrays in highlight and snippet results to items that matched the query at least partially.
When false, return all array items in highlight and snippet results.

## Pagination

#### page

- scope: `search`
- type: integer
- default: `0`

Number of the page to retrieve.

**Warning:** Page numbers are zero-based. Therefore, in order to retrieve the 10th page, you need to set `page=9`.

#### hitsPerPage

- scope: `settings` `search`
- type: integer
- default: `20`

Maximum number of hits per page.

#### offset

- scope: `search`
- type: integer
- default: `null`

Offset of the first hit to return (zero-based).

**Note:** In most cases, [page](#page)/[hitsPerPage](#hitsperpage) is the recommended method for pagination.

#### length

- scope: `search`
- type: integer
- default: `null`

Maximum number of hits to return.

**Note:** In most cases, [page](#page)/[hitsPerPage](#hitsperpage) is the recommended method for pagination.

#### paginationLimitedTo

- scope: `settings`
- type: integer
- default: `1000`

Maximum number of hits accessible via pagination.
By default, this parameter is set to 1000 to guarantee good performance.

**Caution:** We recommend keeping the default value to guarantee excellent performance.
Increasing the pagination limit will have a direct impact on the performance of search queries.
A too high value will also make it very easy for anyone to retrieve ("scrape") your entire dataset.

## Typos

#### minWordSizefor1Typo

- scope: `settings` `search`
- type: integer
- default: `4`

Minimum number of characters a word in the query string must contain to accept matches with one typo.

#### minWordSizefor2Typos

- scope: `settings` `search`
- type: integer
- default: `8`

Minimum number of characters a word in the query string must contain to accept matches with two typos.

#### typoTolerance

- scope: `settings` `search`
- type: string \| boolean
- default: `true`

Controls whether typo tolerance is enabled and how it is applied:

* `true`:
  Typo tolerance is enabled and all matching hits are retrieved (default behavior).

* `false`:
  Typo tolerance is entirely disabled. Hits matching with only typos are not retrieved.

* `min`:
  Only keep results with the minimum number of typos. For example, if just one hit matches without typos, then all hits with only typos are not retrieved.

* `strict`:
  Hits matching with 2 typos or more are not retrieved if there are some hits matching without typos.
  This option is useful to avoid "false positives" as much as possible.

#### allowTyposOnNumericTokens

- scope: `settings` `search`
- type: boolean
- default: `true`

Whether to allow typos on numbers ("numeric tokens") in the query string.

When false, typo tolerance is disabled on numeric tokens.
For example, the query `304` will match `30450` but not `40450`
(which would have been the case with typo tolerance enabled).

**Note:** This option can be very useful on serial numbers and zip codes searches.

#### ignorePlurals

- scope: `settings` `search`
- type: boolean \| array of strings
- default: `false`

Consider singular and plurals forms a match without typo.
For example, "car" and "cars", or "foot" and "feet" will be considered equivalent.

This parameter may be:

- a **boolean**: enable or disable plurals for all supported languages;
- a **list of language ISO codes** for which plurals should be enabled.

This option is set to `false` by default.

List of supported languages with their associated ISO code:

Afrikaans=`af`, Arabic=`ar`, Azeri=`az`, Bulgarian=`bg`, Catalan=`ca`,
Czech=`cs`, Welsh=`cy`, Danis=`da`, German=`de`, English=`en`,
Esperanto=`eo`, Spanish=`es`, Estonian=`et`, Basque=`eu`, Finnish=`fi`,
Faroese=`fo`, French=`fr`, Galician=`gl`, Hebrew=`he`, Hindi=`hi`,
Hungarian=`hu`, Armenian=`hy`, Indonesian=`id`, Icelandic=`is`, Italian=`it`,
Japanese=`ja`, Georgian=`ka`, Kazakh=`kk`, Korean=`ko`, Kyrgyz=`ky`,
Lithuanian=`lt`, Maori=`mi`, Mongolian=`mn`, Marathi=`mr`, Malay=`ms`,
Maltese=`mt`, Norwegian=`nb`, Dutch=`nl`, Northern Sotho=`ns`, Polish=`pl`,
Pashto=`ps`, Portuguese=`pt`, Quechua=`qu`, Romanian=`ro`, Russian=`ru`,
Slovak=`sk`, Albanian=`sq`, Swedish=`sv`, Swahili=`sw`, Tamil=`ta`,
Telugu=`te`, Tagalog=`tl`, Tswana=`tn`, Turkish=`tr`, Tatar=`tt`

#### disableTypoToleranceOnAttributes

- scope: `settings` `search`
- type: array of strings
- default: `[]`

List of attributes on which you want to disable typo tolerance
(must be a subset of the [searchableAttributes](#searchableattributes) index setting).

#### disableTypoToleranceOnWords

- scope: `settings`
- type: array of strings
- default: `[]`

List of words on which typo tolerance will be disabled.

#### separatorsToIndex

- scope: `settings`
- type: string
- default: `""`

Separators (punctuation characters) to index.

By default, separators are not indexed.

**Example:** Use `+#` to be able to search for "Google+" or "C#".

## Geo-Search

Geo search requires that you provide at least one geo location in each record at indexing time, under the `_geoloc` attribute. Each location must be an object with two numeric `lat` and `lng` attributes. You may specify either one location:

```json
{
  "_geoloc": {
    "lat": 48.853409,
    "lng": 2.348800
  }
}
```

... or an array of locations:

```json
{
  "_geoloc": [
    {
      "lat": 48.853409,
      "lng": 2.348800
    },
    {
      "lat": 48.547456,
      "lng": 2.972075
    }
  ]
}
```

When performing a geo search (either via <%= parameter_link('aroundLatLng') -%> or <%= parameter_link('aroundLatLngViaIP') -%>),
the maximum distance is automatically guessed based on the density of the searched area.
You may explicitly specify a maximum distance, however, via <%= parameter_link('aroundRadius') -%>.

The precision for the ranking is set via <%= parameter_link('aroundPrecision') -%>.

#### aroundLatLng

- scope: `search`
- type: (latitude, longitude) pair
- default: `null`

Search for entries around a given location (specified as two floats separated by a comma).

For example, `aroundLatLng=47.316669,5.016670`.

<!-- TODO: Only document serialization format for the REST API. -->

#### aroundLatLngViaIP

- scope: `search`
- type: boolean
- default: `false`

Search for entries around a given location automatically computed from the requester's IP address.

**Warning:** If you are sending the request from your servers, you must set the `X-Forwarded-For` HTTP header with the client's IP
address for it to be used as the basis for the computation of the search location.

#### aroundRadius

- scope: `search`
- type: integer \| `"all"`
- default: `null`

Maximum radius for geo search (in meters).

If set, only hits within the specified radius from the searched location will be returned.

If not set, the radius is automatically computed from the density of the searched area.
You can retrieve the computed radius in the `automaticRadius` response field.
You may also specify a minimum value for the automatic radius via [minimumAroundRadius](#minimumaroundradius).

The special value `all` causes the geo distance to be computed and taken into account for ranking, but without filtering;
this option is faster than specifying a high integer value.

#### aroundPrecision

- scope: `search`
- type: integer
- default: `1`

Precision of geo search (in meters).

When ranking hits, geo distances are grouped into ranges of `aroundPrecision` size. All hits within the same range
are considered equal with respect to the `geo` ranking parameter.

For example, if you set `aroundPrecision` to `100`, any two objects lying in the range `[0, 99m]` from the searched
location will be considered equal; same for `[100, 199]`, `[200, 299]`, etc.

#### minimumAroundRadius

- scope: `search`
- type: integer
- default: `null`

Minimum radius used for a geo search when [aroundRadius](#aroundradius) is not set.

**Note:** This parameter is ignored when `aroundRadius` is set.

#### insideBoundingBox

- scope: `search`
- type: geo rectangle(s)
- default: `null`

Search inside a rectangular area (in geo coordinates).

The rectange is defined by two diagonally opposite points (hereafter `p1` and `p2`),
hence by 4 floats: `p1Lat`, `p1Lng`, `p2Lat`, `p2Lng`.

For example:

`insideBoundingBox=47.3165,4.9665,47.3424,5.0201`

You may specify multiple bounding boxes, in which case the search will use the **union** (OR) of the rectangles.
To specify multiple rectangles, pass either:

- more than 4 values (must be a multiple of 4: 8, 12...);
  example: `47.3165,4.9665,47.3424,5.0201,40.9234,2.1185,38.6430,1.9916`; or
- an array of arrays of floats (each inner array must contain exactly 4 values);
  example: `[[47.3165, 4.9665, 47.3424, 5.0201], [40.9234, 2.1185, 38.6430, 1.9916]`.

#### insidePolygon

- scope: `search`
- type: geo polygon(s)
- default: `null`

Search inside a polygon (in geo coordinates).

The polygon is defined by a set of points (minimum 3), each defined by its latitude and longitude.
You therefore need an even number of floats, with a minimum of 6: `p1Lat`, `p1Lng`, `p2Lat`, `p2Lng`, `p3Lat`, `p3Long`.

For example:

`insidePolygon=47.3165,4.9665,47.3424,5.0201,47.32,4.98`

You may specify multiple polygons, in which case the search will use the **union** (OR) of the polygons.
To specify multiple polygons, pass an array of arrays of floats (each inner array must contain an even number of
values, with a minimum of 6);
example: `[[47.3165, 4.9665, 47.3424, 5.0201, 47.32, 4.9], [40.9234, 2.1185, 38.6430, 1.9916, 39.2587, 2.0104]]`.

## Query Strategy

#### queryType

- scope: `search` `settings`
- type: string
- default: `"prefixLast"`

Controls if and how query words are interpreted as prefixes.

It may be one of the following values:

* `prefixLast`:
  Only the last word is interpreted as a prefix (default behavior).

* `prefixAll`:
  All query words are interpreted as prefixes. This option is not recommended.

* `prefixNone`:
  No query word is interpreted as a prefix. This option is not recommended.

#### removeWordsIfNoResults

- scope: `settings` `search`
- type: string
- default: `"none"`

Selects a strategy to remove words from the query when it doesn't match any hits.

The goal is to avoid empty results by progressively loosening the query until hits are matched.

There are four different options:

- `none`:
  No specific processing is done when a query does not return any results (default behavior).

- `lastWords`:
  When a query does not return any results, treat the last word as optional.
  The process is repeated with words N-1, N-2, etc. until there are results, or the beginning of the query string has been reached.

- `firstWords`:
  When a query does not return any results, treat the first word as optional.
  The process is repeated with words 2, 3, etc. until there are results, or the end of the query string has been reached.

- `allOptional`:
  When a query does not return any results, make a second attempt treating all words as optional.
  This is equivalent to transforming the implicit AND operator applied between query words to an OR.

#### advancedSyntax

- scope: `settings` `search`
- type: boolean
- default: `false`

Enables the advanced query syntax.

This advanced syntax brings two additional features:

- **Phrase query**: a specific sequence of terms that must be matched next to one another.
  A phrase query needs to be surrounded by double quotes (`"`).
  For example, `"search engine"` will only match records having `search` next to `engine`.

  Typo tolerance is disabled inside the phrase (i.e. within the quotes).
  

- **Prohibit operator**: excludes records that contain a specific term.
  This term has to be prefixed by a minus (`-`, a.k.a dash).
  For example, `search -engine` will only match records containing `search` but not `engine`.

#### optionalWords

- scope: `settings` `search`
- type: string \| array of strings
- default: `[]`

List of words that should be considered as optional when found in the query.

**Note:** You don't need to put commas between words.
Each string will automatically be tokenized into words, all of which will be considered as optional.

#### removeStopWords

- scope: `settings` `search`
- type: boolean \| array of strings
- default: `false`

Remove stop words from the query **before** executing it.

This parameter may be:

- a **boolean**: enable or disable stop words for all supported languages; or
- a **list of language ISO codes** for which stop word removal should be enabled.

**Warning:** In most use-cases, **we don't recommend enabling stop word removal**.

Stop word removal is useful when you have a query in natural language, e.g. "what is a record?".
In that case, the engine will remove "what", "is" and "a" before executing the query, and therefore just search for "record".
This will remove false positives caused by stop words, especially when combined with optional words
(see [optionalWords](#optionalwords) and [removeWordsIfNoResults](#removewordsifnoresults)).
For most use cases, however, it is better not to use this feature, as people tend to search by keywords on search engines
(i.e. they naturally omit stop words).

**Note:** Stop words removal is only applied on query words that are *not* interpreted as prefixes.

As a consequence, the behavior of `removeStopWords` also depends on the [queryType](#querytype) parameter:

* `queryType=prefixLast` means the last query word is a prefix and won't be considered for stop word removal;
* `queryType=prefixNone` means no query word is a prefix, therefore stop word removal will be applied to all query words;
* `queryType=prefixAll` means all query words are prefixes, therefore no stop words will be removed.

List of supported languages with their associated ISO code:

Arabic=`ar`, Armenian=`hy`, Basque=`eu`, Bengali=`bn`, Brazilian=`pt-br`, Bulgarian=`bg`, Catalan=`ca`, Chinese=`zh`, Czech=`cs`, Danish=`da`, Dutch=`nl`, English=`en`, Finnish=`fi`, French=`fr`, Galician=`gl`, German=`de`, Greek=`el`, Hindi=`hi`, Hungarian=`hu`, Indonesian=`id`, Irish=`ga`, Italian=`it`, Japanese=`ja`, Korean=`ko`, Kurdish=`ku`, Latvian=`lv`, Lithuanian=`lt`, Marathi=`mr`, Norwegian=`no`, Persian (Farsi)=`fa`, Polish=`pl`, Portugese=`pt`, Romanian=`ro`, Russian=`ru`, Slovak=`sk`, Spanish=`es`, Swedish=`sv`, Thai=`th`, Turkish=`tr`, Ukranian=`uk`, Urdu=`ur`.

#### disablePrefixOnAttributes

- scope: `settings`
- type: array of strings
- default: `[]`

List of attributes on which you want to disable prefix matching
(must be a subset of the `searchableAttributes` index setting).

This setting is useful on attributes that contain string that should not be matched as a prefix
(for example a product SKU).

#### disableExactOnAttributes

- scope: `settings`
- type: search
- default: `[]`

List of attributes on which you want to disable computation of the `exact` ranking criterion
(must be a subset of the `searchableAttributes` index setting).

#### exactOnSingleWordQuery

- scope: `settings` `search`
- type: string
- default: `attribute`

Controls how the `exact` ranking criterion is computed when the query contains only one word.

The following values are allowed:

* `none`: the `exact` ranking criterion is ignored on single word queries;
* `word`: the `exact` ranking criterion is set to 1 if the query word is found in the record.
  The query word must be at least 3 characters long and must not be a stop word in any supported language.
* `attribute` (default): the `exact` ranking criterion is set to 1 if the query string exactly matches an entire attribute value.
  For example, if you search for the TV show "V", you want it to match the query "V" *before* all popular TV shows starting with the letter V.

#### alternativesAsExact

- scope: `setting` `search`
- type: array of strings
- default: `["ignorePlurals", "singleWordSynonym"]`

List of alternatives that should be considered an exact match by the `exact` ranking criterion.

The following values are allowed:

* `ignorePlurals`: alternative words added by the [ignorePlurals](#ignoreplurals) feature;
* `singleWordSynonym`: single-word synonyms (example: "NY" = "NYC");
* `multiWordsSynonym`: multiple-words synonyms (example: "NY" = "New York").

## Performance

#### numericAttributesForFiltering

- scope: `settings`
- type: array of strings
- default: all numeric attributes
- formerly known as: `numericAttributesToIndex`

All numerical attributes are automatically indexed as numerical filters
(allowing filtering operations like `<` and `<=`).
If you don't need filtering on some of your numerical attributes,
you can specify this list to speed up the indexing.

**Note:** If you only need to filter on a numeric value with the operator `=` or `!=`,
you can speed up the indexing by specifying the attribute with `equalOnly(AttributeName)`.
The other operators will be disabled.

#### allowCompressionOfIntegerArray

- scope: `settings`
- type: boolean
- default: `false`

Enables compression of large integer arrays.

In data-intensive use-cases, we recommended enabling this feature to reach a better compression ratio on arrays
exclusively containing integers (as is typical of lists of user IDs or ACLs).

**Note:** When enabled, integer arrays may be reordered.

## Advanced

#### attributeForDistinct

- scope: `settings`
- type: string
- default: `null`

Name of the de-duplication attribute for the [distinct](#distinct) feature.

#### distinct

- scope: `settings` `search`
- type: integer \| boolean
- default: `0`

Controls de-duplication of results.

A non-zero value enables de-duplication; a zero value disables it.
Booleans are also accepted (though not recommended): false is treated as 0, and true is treated as 1.

**Note:** De-duplication requires a **de-duplication attribute** to be configured via the [attributeForDistinct](#attributefordistinct) index setting.
If not configured, `distinct` will be accepted at query time but silently ignored.

This feature is similar to the SQL `distinct` keyword. When set to N (where N > 0), at most N hits will be returned
with the same value for the de-duplication attribute.

**Example:** If the de-duplication attribute is `show_name` and `distinct` is set to 1, then if several hits have the
same value for `show_name`, only the most relevant one is kept (with respect to the ranking formula); the others are removed.

To get a full understanding of how `distinct` works,
you can have a look at our [Guides](https://www.algolia.com/doc/guides/search/distinct).

#### getRankingInfo

- scope: `search`
- type: boolean
- default: `false`

Enables detailed ranking information.

When true, each hit in the response contains an additional `_rankingInfo` object containing the following fields:

<!-- TODO: Factorize this list with the Search Response Format section. -->

- `nbTypos` (integer): Number of typos encountered when matching the record. Corresponds to the `typos` ranking criterion in the ranking formula.

- `firstMatchedWord` (integer): Position of the most important matched attribute in the attributes to index list. Corresponds to the `attribute` ranking criterion in the ranking formula.

- `proximityDistance` (integer): When the query contains more than one word, the sum of the distances between matched words. Corresponds to the `proximity` criterion in the ranking formula.

- `userScore` (integer): Custom ranking for the object, expressed as a single numerical value. Conceptually, it's what the position of the object would be in the list of all objects sorted by custom ranking. Corresponds to the `custom` criterion in the ranking formula.

- `geoDistance` (integer): Distance between the geo location in the search query and the best matching geo location in the record, divided by the geo precision.

- `geoPrecision` (integer): Precision used when computed the geo distance, in meters. All distances will be floored to a multiple of this precision.

- `nbExactWords` (integer): Number of exactly matched words. If `alternativeAsExact` is set, it may include plurals and/or synonyms.

- `words` (integer): Number of matched words, including prefixes and typos.

- `filters` (integer): *This field is reserved for advanced usage.* It will be zero in most cases.

In addition, the response contains the following additional top-level fields:

- `serverUsed` (string): Actual host name of the server that processed the request. (Our DNS supports automatic failover and load balancing, so this may differ from the host name used in the request.)

- `parsedQuery` (string): The query string that will be searched, after normalization. Normalization includes removing stop words (if [removeStopWords](#removestopwords) is enabled), and transforming portions of the query string into phrase queries (see [advancedSyntax](#advancedsyntax)).

- `timeoutCounts` (boolean): Whether a timeout was hit when computing the facet counts. When `true`, the counts will be interpolated (i.e. approximate). See also `exhaustiveFacetsCount`.

- `timeoutHits` (boolean): Whether a timeout was hit when retrieving the hits. When true, some results may be missing.

#### numericFilters

- scope: `search`
- type: array of strings
- default: `[]`

Filter hits based on values of numeric attributes.

**Note:** The [filters](#filters) parameter provides an easier to use, SQL-like syntax.
We recommend using it instead of `numericFilters`.

Each string represents a filter on a numeric attribute. Two forms are supported:

- **Comparison**: `${attributeName} ${operator} ${operand}` matches all objects where the specified numeric attribute satisfies the numeric condition expressed by the operator and the operand. The operand must be a numeric value. Supported operators are `<`, `<=`, `=`, `!=`, `>=` and `>`, with the same semantics as in virtually all programming languages.
Example: `inStock > 0`.

- **Range**: `${attributeName}:${lowerBound} TO ${upperBound}` matches all objects where the specified numeric
attribute is within the range [`${lowerBound}`, `${upperBound}`] (inclusive on both ends).
Example: `price: 0 TO 1000`.

If you specify multiple filters, they are interpreted as a conjunction (AND). If you want to use a disjunction (OR),
use a nested array.

Examples:

- `["inStock > 0", "price < 1000"]` translates as `inStock > 0 AND price < 1000`
- `[["inStock > 0", "deliveryDate < 1441755506"], "price < 1000"]` translates as `(inStock > 0 OR deliveryDate < 1441755506) AND price < 1000`

#### tagFilters

- scope: `search`
- type: array of strings
- default: `[]`

Filter hits by tags.

Tags must be contained in a top-level `_tags` attribute of your objects at indexing time.

**Note:** Tags are essentially an implicit facet on the `_tags` attribute.
We therefore recommend that you use facets instead.
See [attributesForFaceting](#attributesforfaceting) and [facets](#facets).

**Note:** The [filters](#filters) parameter provides an easier to use, SQL-like syntax.
We recommend using it instead of `tagFilters`.

Each string represents a given tag value that must be matched.

If you specify multiple tags, they are interpreted as a conjunction (AND). If you want to use a disjunction (OR),
use a nested array.

Examples:

- `["Book", "Movie"]` translates as `Book AND Movie`
- `[["Book", "Movie"], "SciFi"]` translates as `(Book OR Movie) AND SciFi"`

Negation is supported by prefixing the tag value with a minus sign (`-`, a.k.a. dash).
For example: `["tag1", "-tag2"]` translates as `tag1 AND NOT tag2`.

#### analytics

- scope: `search`
- type: boolean
- default: `true`

Whether the current query will be taken into account in the Analytics.

#### analyticsTags

- scope: `search`
- type: array of strings
- default: `[]`

List of tags to apply to the query in the Analytics.

Tags can be used in the Analytics to filter searches.

#### synonyms

- scope: `search`
- type: boolean
- default: `true`

Whether to take into account synonyms defined for the targeted index.

#### replaceSynonymsInHighlight

- scope: `settings` `search`
- type: boolean
- default: `true`

Whether to replace words matched via synonym expansion by the matched synonym in highlight and snippet results.

When true, highlighting and snippeting will use words from the query rather than the original words from the objects.
When false, highlighting and snippeting will always display the original words from the objects.

**Note:** Multiple words can be replaced by a one-word synonym, but not the other way round.
For example, if "NYC" and "New York City" are synonyms, searching for "NYC" will replace "New York City" with "NYC"
in highlights and snippets, but searching for "New York City" will *not* replace "NYC" with "New York City" in
highlights and snippets.

#### placeholders

- scope: `settings`
- type: object of array of words
- default: `{}`

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
- type: array of objects
- default: `[]`

Specify alternative corrections that you want to consider.

Each alternative correction is described by an object containing three attributes:

* `word` (string): The word to correct.
* `correction` (string): The corrected word.
* `nbTypos` (integer): The number of typos (1 or 2) that will be considered for the ranking algorithm (1 typo is better than 2 typos).

For example:

```
"altCorrections": [
  { "word" : "foot", "correction": "feet", "nbTypos": 1 },
  { "word": "feet", "correction": "foot", "nbTypos": 1 }
]
```

#### minProximity

- scope: `settings` `search`
- type: integer
- default: `1`

Precision of the `proximity` ranking criterion.

By default, the minimum (and best) proximity value between two matching words is 1.

Setting it to 2 (respectively N) would allow 1 (respectively N-1) additional word(s) to be found between two matching words without degrading the proximity ranking value.

**Example:** considering the query *"javascript framework"*, if you set `minProximity` to 2,
two records containing respectively *"JavaScript framework"* and *"JavaScript charting framework"*
will get the same proximity score, even if the latter contains an additional word between the two matching words.

**Note:** The maximum value for `minProximity` is 7. Any higher value will **disable** the `proximity` criterion in the ranking formula.

#### responseFields

- scope: `settings` `search`
- type: array of strings
- default: `*` (all fields)

Choose which fields the response will contain. Applies to search and browse queries.

By default, all fields are returned. If this parameter is specified, only the fields explicitly
listed will be returned, unless `*` is used, in which case all fields are returned.
Specifying an empty list or unknown field names is an error.

This parameter is mainly intended to limit the response size.
For example, in complex queries, echoing of request parameters in the response's `params` field can be undesirable.

List of fields that can be filtered out:

- `aroundLatLng`
- `automaticRadius`
- `exhaustiveFacetsCount`
- `facets`
- `facets_stats`
- `hits`
- `hitsPerPage`
- `index`
- `length`
- `nbHits`
- `nbPages`
- `offset`
- `page`
- `params`
- `processingTimeMS`
- `query`
- `queryAfterRemoval`

List of fields that *cannot* be filtered out:

- `message`
- `warning`
- `cursor`
- `serverUsed`
- `timeoutCounts` (deprecated, please use `exhaustiveFacetsCount` instead)
- `timeoutHits` (deprecated, please use `exhaustiveFacetsCount` instead)
- `parsedQuery`
- all fields triggered by [getRankingInfo](#getrankinginfo)


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

**Note**:

The moveIndex method will overwrite the destination index, and delete the temporary index.

**Warning**

The moveIndex operation will override all settings of the destination,
There is one exception for the [replicas](#replicas) parameter which is not impacted.

For example, if you want to fully update your index `MyIndex` every night, we recommend the following process:

 1. Get settings and synonyms from the old index using [Get settings](#get-settings)
  and [Get synonym](#get-synonym).
 1. Apply settings and synonyms to the temporary index `MyTmpIndex`, (this will create the `MyTmpIndex` index)
  using [Set settings](#set-settings) and [Batch synonyms](#batch-synonyms)
  (make sure to remove the [replicas](#replicas) parameter from the settings if it exists).
 1. Import your records into a new index using [Add Objects](#add-objects).
 1. Atomically replace the index `MyIndex` with the content and settings of the index `MyTmpIndex`
 using the [Move index](#move-index) method.
 This will automatically override the old index without any downtime on the search.
 1. You'll end up with only one index called `MyIndex`, that contains the records and settings pushed to `MyTmpIndex`
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
- [List api keys](#list-api-keys)
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

## List api keys - `listApiKeys` 

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


