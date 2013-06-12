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

 1. Add a script include of `algoliasearch-min.js`
 2. Initialize the client with your ApplicationID, API-Key and list of hostnames (you can find all of them on your Algolia account)
 3. When you use this API client for search on a website, we strongly recommand to use a key with an ACL restricted to "search". You can retrieve one with `client.addUserKey(["search"])`.

```javascript
  <script src="algoliasearch-min.js"></script>
  <script>
    client = new AlgoliaSearch('ApplicationID', 'API-Key', 
                               ['user-1.algolia.io', 'user-2.algolia.io', 'user-3.algolia.io']);
    ...
```

Quick Start
-------------

First index some data. You can use the command line client [quick start](https://github.com/algolia/algoliasearch-client-cmd#quick-start) for example to index the 1000 world's biggest cities.

You can then update the `simple-ui.html` file with your ApplicationID, API-Key, hostnames and index name to test the Javascript client in the browser.

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
 * **attributesToHighlight**: a string that contains the names of attributes to highlight separated by a comma.<br/>By default indexed attributes are highlighted.
 * **minWordSizeForApprox1**: the minimum number of characters in a query word to accept one typo in this word.<br/>Defaults to 3.
 * **minWordSizeForApprox2**: the minimum number of characters in a query word to accept two typos in this word.<br/>Defaults to 7.
 * **getRankingInfo**: if set to 1, the result hits will contain ranking information in _rankingInfo attribute.
 * **page**: *(pagination parameter)* page to retrieve (zero base).<br/>Defaults to 0.
 * **hitsPerPage**: *(pagination parameter)* number of hits per page.<br/>Defaults to 10.
 * **aroundLatLng**: search for entries around a given latitude/longitude (specified as two floats separated by a comma).<br/>For example `aroundLatLng=47.316669,5.016670`).<br/>You can specify the maximum distance in meters with the **aroundRadius** parameter (in meters).<br/>At indexing, you should specify geoloc of an object with the _geoloc attribute (in the form `{"_geoloc":{"lat":48.853409, "lng":2.348800}}`)
 * **insideBoundingBox**: search entries inside a given area defined by the two extreme points of a rectangle (defined by 4 floats: p1Lat,p1Lng,p2Lat,p2Lng).<br/>For example `insideBoundingBox=47.3165,4.9665,47.3424,5.0201`).<br/>At indexing, you should specify geoloc of an object with the _geoloc attribute (in the form `{"_geoloc":{"lat":48.853409, "lng":2.348800}}`)
 * **tags**: filter the query by a set of tags. You can AND tags by separating them by commas. To OR tags, you must add parentheses. For example, `tags=tag1,(tag2,tag3)` means *tag1 AND (tag2 OR tag3)*.<br/>At indexing, tags should be added in the _tags attribute of objects (for example `{"_tags":["tag1","tag2"]}` )

```javascript
index = client.initIndex('MyIndexName');
index.search('query string', function(success, content) {
    for (var h in content.hits) {
        console.log('Hit(' + content.hits[h].objectID + '): ' + content.hits[h].toString());
    }
});

index.search('query string', function(success, content) {
    for (var h in content.hits) {
        console.log('Hit(' + content.hits[h].objectID + '): ' + content.hits[h].toString());
    }
}, {'attributes': 'population,name', 'hitsPerPage': 50});
```

The server response will look like:

```javascript
{   "hasError": false,
    "errorMsg": null,
    "answer":
            { "hits":[
                        { "name": "Betty Jane Mccamey",
                          "company": "Vita Foods Inc.",
                          "email": "betty@mccamey.com",
                          "objectID": "6891Y2usk0",
                          "_highlightResult": {"name": {"value": "Betty <em>Jan</em>e Mccamey", "matchLevel": "full"}, 
                                               "company": {"value": "Vita Foods Inc.", "matchLevel": "none"},
                                               "email": {"value": "betty@mccamey.com", "matchLevel": "none"} }
                        },
                        { "name": "Gayla Geimer Dan", 
                          "company": "Ortman Mccain Co", 
                          "email": "gayla@geimer.com", 
                          "objectID": "ap78784310" 
                          "_highlightResult": {"name": {"value": "Gayla Geimer <em>Dan</em>", "matchLevel": "full" },
                                               "company": {"value": "Ortman Mccain Co", "matchLevel": "none" },
                                               "email": {"highlighted": "gayla@geimer.com", "matchLevel": "none" } }
                        }],
                "page":0,
                "nbHits":2,
                "nbPages":1,
                "hitsPerPage:":20,
                "processingTimeMS":1,
                "query":"jan"
            }
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
    client = new AlgoliaSearch('ApplicationID', 'API-Key', 
                               ['user-1.algolia.io', 'user-2.algolia.io', 'user-3.algolia.io'],
                               'https');
    ...
```
