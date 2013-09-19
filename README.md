Algolia Search API Client for Javascript
==================

This Javascript client let you easily use the Algolia Search API in a browser, it is compatible with most browsers:

 * Internet Explorer &ge; 8
 * Firefox &ge; 3.5
 * Google Chrome &ge; 3
 * Safari &ge; 4
 * Opera &ge; 12
 * Opera mobile &ge; 12
 * etc.

See [this wikipedia page](http://en.wikipedia.org/wiki/Cross-Origin_Resource_Sharing#Browser_support) to have more details on supported browsers (we use XDomainRequest for IE8 and IE9).

Setup
-------------
To setup your project, follow these steps:

 1. Download the [client](https://github.com/algolia/algoliasearch-client-js/archive/master.zip) and add a script include of `algoliasearch-min.js`
 2. Initialize the client with your ApplicationID and API-Key. You can find all of them on [your Algolia account](http://www.algolia.com/users/edit).
 3. When you use this API client for search on a website, we strongly recommand to use a key with an ACL restricted to "search". You can retrieve one with `client.addUserKey(["search"])`.

```javascript
  <script src="algoliasearch-min.js"></script>
  <script>
    client = new AlgoliaSearch('ApplicationID', 'API-Key');
    ...
```

Quick Start
-------------

First index some data. You can use the command line client [quick start](https://github.com/algolia/algoliasearch-client-cmd#quick-start) for example to index the 500 contacts.

You can then update the `simple-ui.html` file with your ApplicationID, API-Key and index name to test the Javascript client in the browser.

General Principle
-------------

All API calls will return the result in a callback that takes two arguments:

 1. **sucess**: a boolean that is set to false when an error was found.
 2. **content**: the object containing the answer (if an error was found, you can retrieve the error message in `content.message`)

Search 
-------------
To perform a search, you just need to initialize the index and perform a call to the search function.<br/>
You can use the following optional arguments:

 * **attributes**: a string that contains the names of attributes to retrieve separated by a comma.<br/>By default all attributes are retrieved.
 * **attributesToHighlight**: a string that contains the names of attributes to highlight separated by a comma.<br/>By default indexed attributes are highlighted. Numerical attributes cannot be highlighted. A **matchLevel** is returned for each highlighted attribute and can contain: "full" if all the query terms were found in the attribute, "partial" if only some of the query terms were found, or "none" if none of the query terms were found.
 * **attributesToSnippet**: a string that contains the names of attributes to snippet alongside the number of words to return (syntax is 'attributeName:nbWords'). Attributes are separated by a comma (Example: "attributesToSnippet=name:10,content:10").<br/>By default no snippet is computed.
 * **minWordSizeForApprox1**: the minimum number of characters in a query word to accept one typo in this word.<br/>Defaults to 3.
 * **minWordSizeForApprox2**: the minimum number of characters in a query word to accept two typos in this word.<br/>Defaults to 7.
 * **getRankingInfo**: if set to 1, the result hits will contain ranking information in _rankingInfo attribute.
 * **page**: *(pagination parameter)* page to retrieve (zero base).<br/>Defaults to 0.
 * **hitsPerPage**: *(pagination parameter)* number of hits per page.<br/>Defaults to 10.
 * **aroundLatLng**: search for entries around a given latitude/longitude (specified as two floats separated by a comma).<br/>For example `aroundLatLng=47.316669,5.016670`).<br/>You can specify the maximum distance in meters with the **aroundRadius** parameter (in meters) and the precision for ranking with **aroundPrecision** (for example if you set aroundPrecision=100, two objects that are distant of less than 100m will be considered as identical for "geo" ranking parameter).<br/>At indexing, you should specify geoloc of an object with the _geoloc attribute (in the form `{"_geoloc":{"lat":48.853409, "lng":2.348800}}`)
 * **insideBoundingBox**: search entries inside a given area defined by the two extreme points of a rectangle (defined by 4 floats: p1Lat,p1Lng,p2Lat,p2Lng).<br/>For example `insideBoundingBox=47.3165,4.9665,47.3424,5.0201`).<br/>At indexing, you should specify geoloc of an object with the _geoloc attribute (in the form `{"_geoloc":{"lat":48.853409, "lng":2.348800}}`)
 * **queryType**: select how the query words are interpreted:
  * **prefixAll**: all query words are interpreted as prefixes (default behavior).
  * **prefixLast**: only the last word is interpreted as a prefix. This option is recommended if you have a lot of content to speedup the processing.
  * **prefixNone**: no query word is interpreted as a prefix. This option is not recommended.
 * **numerics**: specify the list of numeric filters you want to apply separated by a comma. The syntax of one filter is `attributeName` followed by `operand` followed by `value`. Supported operands are `<`, `<=`, `=`, `>` and `>=`. 
 You can have multiple conditions on one attribute like for example `numerics=price>100,price<1000`.
 * **tags**: filter the query by a set of tags. You can AND tags by separating them by commas. To OR tags, you must add parentheses. For example, `tags=tag1,(tag2,tag3)` means *tag1 AND (tag2 OR tag3)*.<br/>At indexing, tags should be added in the _tags attribute of objects (for example `{"_tags":["tag1","tag2"]}` )

```javascript
index = client.initIndex('contacts');
index.search('query string', function(success, content) {
    for (var h in content.hits) {
        console.log('Hit(' + content.hits[h].objectID + '): ' + content.hits[h].toString());
    }
});

index.search('query string', function(success, content) {
    for (var h in content.hits) {
        console.log('Hit(' + content.hits[h].objectID + '): ' + content.hits[h].toString());
    }
}, {'attributes': 'firstname,lastname', 'hitsPerPage': 50});
```

The server response will look like:

```javascript
{
  "hits": [
    {
      "firstname": "Jimmie",
      "lastname": "Barninger",
      "company": "California Paint & Wlpaper Str",
      "address": "Box #-4038",
      "city": "Modesto",
      "county": "Stanislaus",
      "state": "CA",
      "zip": "95352",
      "phone": "209-525-7568",
      "fax": "209-525-4389",
      "email": "jimmie@barninger.com",
      "web": "http://www.jimmiebarninger.com",
      "followers": 3947,
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
        },
        "address": {
          "value": "Box #-4038",
          "matchLevel": "none"
        },
        "city": {
          "value": "Modesto",
          "matchLevel": "none"
        },
        "email": {
          "value": "<em>jimmie</em>@barninger.com",
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
  "params": "query=jimmie+paint&"
}
```

Update the index
-------------

The javascript client is dedicated to web apps searching directly from the browser. In some use-cases, it can however be interesting to perform updates to the index directly in javascript, for example in an HTML5 mobile app. Therefore, just as for other languages, the javascript client is able to add, update or delete objects, or to modify index settings.

For more details about updating an index from javascript, have a look at the [algoliasearch.js](https://github.com/algolia/algoliasearch-client-js/blob/master/algoliasearch.js) source file to see details about each function.

**Note:** If you use the javascript client to update the index, you need to specify `https` as the protocol in the client initialization:

```javascript
  <script src="algoliasearch-min.js"></script>
  <script>
    client = new AlgoliaSearch('ApplicationID', 'API-Key', 'https');
    ...
```
