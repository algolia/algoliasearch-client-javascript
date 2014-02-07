Algolia Search API Client for JavaScript
==================




This Javascript client let you easily use the [Algolia Search API](http://www.algolia.com) in a browser, it is compatible with most browsers:

 * Internet Explorer &ge; 8
 * Firefox &ge; 3.5
 * Google Chrome &ge; 3
 * Safari &ge; 4
 * Opera &ge; 12
 * Opera mobile &ge; 12
 * etc.

See [this wikipedia page](http://en.wikipedia.org/wiki/Cross-Origin_Resource_Sharing#Browser_support) to have more details on supported browsers (we use XDomainRequest for IE8 and IE9).


[Algolia Search](http://www.algolia.com) is a search API that provides hosted full-text, numerical and faceted search.
Algolia’s Search API makes it easy to deliver a great search experience in your apps & websites providing:

 * REST and JSON-based API
 * search among infinite attributes from a single searchbox
 * instant-search after each keystroke
 * relevance & popularity combination
 * typo-tolerance in any language
 * faceting
 * 99.99% SLA
 * first-class data security



[![Build Status](https://travis-ci.org/algolia/algoliasearch-client-js.png?branch=master)](https://travis-ci.org/algolia/algoliasearch-client-js) [![NPM version](https://badge.fury.io/js/algoliasearch.png)](http://badge.fury.io/js/algoliasearch)



Table of Content
-------------
**Get started**

1. [Setup](#setup)
1. [Quick Start](#quick-start)
1. [General Principle](#general-principle)"])
1. [Online documentation](#online-documentation)

**Commands reference**


1. [Search](#search)




Setup
-------------
To setup your project, follow these steps:




 1. Download the [client](https://github.com/algolia/algoliasearch-client-js/archive/master.zip) and add a script include of `algoliasearch.min.js`
 2. Initialize the client with your ApplicationID and API-Key. You can find all of them on [your Algolia account](http://www.algolia.com/users/edit).
 3. When you use this API client for search on a website, we strongly recommand to use a key with an ACL restricted to "search". You can retrieve one with `client.addUserKey(["search"])`.

```javascript
  <script src="algoliasearch.min.js"></script>
  <script>
    client = new AlgoliaSearch('ApplicationID', 'API-Key');
    ...
```



Quick Start
-------------

First, index some data. For example, you can use the command line client [quick start](https://github.com/algolia/algoliasearch-client-cmd#quick-start) to index the 500 contacts sample.

You can then update the ```example/autocomplete.html``` file with your ```ApplicationID```, ```API-Key``` and ```index name``` to test the autocomplete feature. This version is based on [typeahead.js](http://twitter.github.io/typeahead.js/) version 0.9.3 with a small [patch](https://github.com/algolia/typeahead.js/commit/4edb95e8beb390e92720196a29186d83b8dba9d9) to allow usage of Algolia JS client.

You can also update the ```example/instantsearch.html``` file with your ```ApplicationID```, ```API-Key``` and ```index name``` to test an instant-search example.



General Principle
-------------

All API calls will return the result in a callback that takes two arguments:

 1. **success**: a boolean that is set to false when an error was found.
 2. **content**: the object containing the answer (if an error was found, you can retrieve the error message in `content.message`)



Online Documentation
----------------

Check our [online documentation](http://www.algolia.com/doc):
 * [Initial Import](http://www.algolia.com/doc#InitialImport)
 * [Ranking &amp; Relevance](http://www.algolia.com/doc#RankingRelevance)
 * [Settings](http://www.algolia.com/doc#Settings)
 * [Search](http://www.algolia.com/doc#Search)
 * [Incremental Updates](http://www.algolia.com/doc#IncrementalUpdates)
 * [Reindexing](http://www.algolia.com/doc#Reindexing)
 * [Numeric-Search](http://www.algolia.com/doc#Numeric-Search)
 * [Category-Search](http://www.algolia.com/doc#Category-Search)
 * [Faceting](http://www.algolia.com/doc#Faceting)
 * [Geo-Search](http://www.algolia.com/doc#Geo-Search)
 * [Security](http://www.algolia.com/doc#Security)
 * [Indexing Several Types](http://www.algolia.com/doc#IndexingSeveralTypes)
 * [REST API](http://www.algolia.com/doc/rest)




Update the index
-------------

The javascript client is dedicated to web apps searching directly from the browser. In some use-cases, it can however be interesting to perform updates to the index directly in javascript, for example in an HTML5 mobile app. Therefore, just as for other languages, the javascript client is able to add, update or delete objects, or to modify index settings.

For more details about updating an index from javascript, have a look at the [algoliasearch.js](https://github.com/algolia/algoliasearch-client-js/blob/master/algoliasearch.js) source file to see details about each function.

**Note:** If you use the javascript client to update the index, you need to specify `https` as the protocol in the client initialization:

```javascript
  <script src="algoliasearch.min.js"></script>
  <script>
    client = new AlgoliaSearch('ApplicationID', 'API-Key', 'https');
    ...
```



