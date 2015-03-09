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
