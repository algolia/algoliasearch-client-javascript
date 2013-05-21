Algolia Search API Client for Javascript
==================

This Javascript client let you easily use the Algolia Search API in a browser, it is compatible with most browsers (Internet Explorer >= 8, Firefox >= 3.5, Google Chrome >= 3, Safari >= 4, Opera >= 12, Opera mobile >= 12, etc.)

See [this wikipedia page](http://en.wikipedia.org/wiki/Cross-Origin_Resource_Sharing#Browser_support) to have more details on supported browser (this library supports XDomainRequest extension and so supports IE8 and IE9).

Setup
-------------
To setup your project, follow these steps:

 1. Add a script include of `algoliasearch-min.js`
 2. Initialize the client with your ApplicationID, API-Key and list of hostnames (you can find all of them on your Algolia account)
 3. When you use this API client for search on a website, we strongly recommand to use a key with an ACL restricted "search" that you can retrieve with `client.addUserKey(["search"])`.

<pre><code>
  &lt;script src="algoliasearch-min.js"&gt;&lt;/script&gt;
  &lt;script&gt;
    client = new AlgoliaSearch('ApplicationID', 'API-Key', 
                              ['http://api-u1-1.algolia.io', 'http://api-u1-2.algolia.io', 'api-u1-3.algolia.io']),
</code></pre>

Quick Start
-------------

You can replace your ApplicationID and API-Key in `simple-ui.html` to test the Javascript client on your account.

General Principle
-------------

All API calls will return the result in a callback that takes two arguments:

 1. **sucess**: a boolean that is set to false when an error was found.
 2. **content**: the object containing answer (if an error was found, you can retrieve the error message in `content.message`)

Search 
-------------
To perform a search, you have just to initialize the index and perform a call to search.<br/>
You can optionally use the following arguments :

 * **attributes**: a string that contains attribute names to retrieve separated by a comma.<br/>By default all attributes are retrieved.
 * **attributesToHighlight**: a string that contains attribute names to highlight separated by a comma.<br/>By default all textual attributes are highlighted.
 * **minWordSizeForApprox1**: the minimum number of characters in a query word to accept one typo in this word.<br/>Defaults to 3.
 * **minWordSizeForApprox2**: the minimum number of characters in a query word to accept two typos in this word.<br/>Defaults to 7.
 * **getRankingInfo**: if set to 1, the result hits will contain ranking information in _rankingInfo attribute.
 * **page**: *(pagination parameter)* page to retrieve (zero base).<br/>Defaults to 0.
 * **hitsPerPage**: *(pagination parameter)* number of hits per page.<br/>Defaults to 10.
 * **aroundLatLng**: search for entries around a given latitude/longitude (specified as two floats separated by a comma).<br/>For example `aroundLatLng=47.316669,5.016670`).<br/>You can specify the maximum distance in meters with **aroundRadius parameter** (in meters).<br/>At indexing, you should specify geoloc of an object with _geoloc attribute (in the form `{"_geoloc":{"lat":48.853409, "lng":2.348800}}`)
 * **insideBoundingBox**: search entries inside a given area defined by the two extreme points of a rectangle (defined by 4 floats: p1Lat,p1Lng,p2Lat, p2Lng).<br/>For example `insideBoundingBox=47.3165,4.9665,47.3424,5.0201`).<br/>At indexing, you should specify geoloc of an object with _geoloc attribute (in the form `{"_geoloc":{"lat":48.853409, "lng":2.348800}}`)
 * **tags**: filter the query by a set of tags (contains a list of tags separated by a comma).<br/>At indexing, tags should be added in _tags attribute of objects (for example `{"_tags":["tag1","tag2"]}` )

<pre><code>
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

</code></pre>

The search answer will be of the form:
<pre><code>
{
    "hasError": false,
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
</code></pre>

Add a new object in the Index
-------------

Each entry in an index has a unique identifier called `objectID`. You have two way to add en entry in the index:

 1. Using automatic `objectID` assignement, you will be able to retrieve it in the answer.
 2. Passing your `objectID`

You have no need to create an index, it will be automatically create the first time you add an object.
Objects are schema less, you have no configuration to start indexing. You can look at settings section to have more details on advanced settings.

Example with automatic `objectID` assignement:
<pre><code>
index.addObject({'name': 'San Francisco', 
                 'population': 805235}, function(success, content) {
  console.log('objectID=' + content.objectID);
});
</code></pre>

Example with manual `objectID` assignement:
<pre><code>
index.addObject({'name': 'San Francisco', 
                 'population': 805235}, function(success, content) {
  console.log('objectID=' + content.objectID);
}, 'myID');
</code></pre>

Update an existing object in the Index
-------------


You have two options to update an existing object:

 1. Replace all attributes of an existing object.
 2. Replace only some attributes of an existing object.

Example to replace content of an existing object:
<pre><code>
index.saveObject({'name': 'Los Angeles', 
                  'population': 3792621,
                  'objectID': 'myID'});
</code></pre>

Example of code to update only the population attribute of an existing object:
<pre><code>
index.partialUpdateObject({'population': 3792621,
                           'objectID': 'myID'});
</code></pre>

Get an object
-------------

You can easily retrieve an object using its `objectID` and optionnaly a list of attributes you want to retrieve (using comma as separator):
<pre><code>
// Retrieves all attributes
idx.getObject('myID', function(success, content) {
  console.log(content.objectID + ": " + content.toString());
});
// Retrieves name and population attributes
idx.getObject('myID', function(success, content) {
  console.log(content.objectID + ": " + content.toString());
}, "name,population");
// Retrieves only name attribute
idx.getObject('myID', function(success, content) {
  console.log(content.objectID + ": " + content.toString());
}, "name");
</code></pre>

Delete an object
-------------

You can delete an object using its `objectID`:
<pre><code>
index.deleteObject('myID');
</code></pre>

Index Settings
-------------

You can retrieve all settings using the `getSettings` functions. The result will contains the following attributes:

 * **minWordSizeForApprox1**: (integer) the minimum number of characters to accept one typo (default = 3).
 * **minWordSizeForApprox2**: (integer) the minimum number of characters to accept two typos (default = 7).
 * **hitsPerPage**: (integer) the number of hits per page (default = 10).
 * **attributesToRetrieve**: (array of strings) default list of attributes to retrieve for objects.
 * **attributesToHighlight**: (array of strings) default list of attributes to highlight
 * **attributesToIndex**: (array of strings) the list of fields you want to index.<br/>By default all textual attributes of your objects are indexed, but you should update it to get optimal results.<br/>
 This parameter has two important uses:
  *  *Limit the attributes to index*.<br/> 
For example if you store a binary image in base64, you want to store it in the index but you don't want to use the base64 string for search.
  * *Control part of the ranking* (see the **ranking** parameter for full explanation).<br/>
Matches in attributes at the beginning of the list will be considered more important than matches in attributes further down the list.
 * **ranking**: (array of strings) controls the way results are sorted.<br/>
We have four available criteria: 
  * **typo**: (sort according to number of typos),
  * **geo**: (sort according to decreassing distance when performing a geo-location based search),
  * **position**: (sort according to the matching attribute), 
  * **custom**: which is user defined.<br/>
The standard order is ["typo", "geo", position", "custom"]
 * **customRanking**: (array of strings) lets you specify part of the ranking.<br/>
The syntax of this condition is an array of strings containing attributes prefixed by asc (ascending order) or desc (descending order) operator.<br/>
For example `"customRanking" => ["desc(population)", "asc(name)"]`

You can easily retrieve settings and update them:
<pre><code>
index.getSettings(function(success, content) {
  if (success) {
    content.customRanking = ['desc(population)', 'asc(name)']
    index.setSettings(content);
  }
});

</code></pre>
