/*
 * Copyright (c) 2014 Algolia
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

(function($) {
  
  /**
   * Algolia Places API
   * @param {string} Your application ID
   * @param {string} Your API Key
   */
  window.AlgoliaPlaces = function(applicationID, apiKey) {
     this.init(applicationID, apiKey);
  };

  AlgoliaPlaces.prototype = {
    /**
     * @param {string} Your application ID
     * @param {string} Your API Key
     */
    init: function(applicationID, apiKey) {
      this.client = new AlgoliaSearch(applicationID, apiKey, 'http', true, ['places-1.algolia.io', 'places-2.algolia.io', 'places-3.algolia.io']);
      this.cache = {};
    },

    /**
     * Perform a query
     * @param  {string} q the user query
     * @param  {function} searchCallback the result callback called with two arguments:
     *  success: boolean set to true if the request was successfull
     *  content: the query answer with an extra 'disjunctiveFacets' attribute
     * @param {hash} the list of search parameters
     */
    search: function(q, searchCallback, searchParams) {
      var indexObj = this;
      var params = 'query=' + encodeURIComponent(q);
      if (!this.client._isUndefined(searchParams) && searchParams != null) {
          params = this.client._getSearchParams(searchParams, params);
      }
      var pObj = {params: params, apiKey: this.client.apiKey, appID: this.client.applicationID};
      this.client._jsonRequest({ cache: this.cache,
                                 method: 'POST',
                                 url: '/1/places/query',
                                 body: pObj,
                                 callback: searchCallback,
                                 removeCustomHTTPHeaders: true });
    }
  };
})();
