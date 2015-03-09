(function($) {
  var extend = function(out) {
    out = out || {};
    for (var i = 1; i < arguments.length; i++) {
      if (!arguments[i]) {
        continue;
      }
      for (var key in arguments[i]) {
        if (arguments[i].hasOwnProperty(key)) {
          out[key] = arguments[i][key];
        }
      }
    }
    return out;
  };

  /**
   * Algolia Search Helper providing faceting and disjunctive faceting
   * @param {AlgoliaSearch} client an AlgoliaSearch client
   * @param {string} index the index name to query
   * @param {hash} options an associative array defining the hitsPerPage, list of facets, the list of disjunctive facets and the default facet filters
   */
  window.AlgoliaSearchHelper = function(client, index, options) {
    /// Default options
    var defaults = {
      facets: [],            // list of facets to compute
      disjunctiveFacets: [], // list of disjunctive facets to compute
      hitsPerPage: 20,       // number of hits per page
      defaultFacetFilters: [] // the default list of facetFilters
    };

    this.init(client, index, extend({}, defaults, options));
  };

  AlgoliaSearchHelper.prototype = {
    /**
     * Initialize a new AlgoliaSearchHelper
     * @param  {AlgoliaSearch} client an AlgoliaSearch client
     * @param  {string} index the index name to query
     * @param  {hash} options an associative array defining the hitsPerPage, list of facets and list of disjunctive facets
     * @return {AlgoliaSearchHelper}
     */
    init: function(client, index, options) {
      this.client = client;
      this.index = index;
      this.options = options;
      this.page = 0;
      this.refinements = {};
      this.excludes = {};
      this.disjunctiveRefinements = {};
      this.extraQueries = [];
    },

    /**
     * Perform a query
     * @param  {string} q the user query
     * @param  {function} searchCallback the result callback called with two arguments:
     *  success: boolean set to true if the request was successfull
     *  content: the query answer with an extra 'disjunctiveFacets' attribute
     */
    search: function(q, searchCallback, searchParams) {
      this.q = q;
      this.searchCallback = searchCallback;
      this.searchParams = searchParams || {};
      this.page = this.page || 0;
      this.refinements = this.refinements || {};
      this.disjunctiveRefinements = this.disjunctiveRefinements || {};
      this._search();
    },

    /**
     * Remove all refinements (disjunctive + conjunctive)
     */
    clearRefinements: function() {
      this.disjunctiveRefinements = {};
      this.refinements = {};
    },

    /**
     * Ensure a facet refinement exists
     * @param  {string} facet the facet to refine
     * @param  {string} value the associated value
     */
    addDisjunctiveRefine: function(facet, value) {
      this.disjunctiveRefinements = this.disjunctiveRefinements || {};
      this.disjunctiveRefinements[facet] = this.disjunctiveRefinements[facet] || {};
      this.disjunctiveRefinements[facet][value] = true;
    },

    /**
     * Ensure a facet refinement does not exist
     * @param  {string} facet the facet to refine
     * @param  {string} value the associated value
     */
    removeDisjunctiveRefine: function(facet, value) {
      this.disjunctiveRefinements = this.disjunctiveRefinements || {};
      this.disjunctiveRefinements[facet] = this.disjunctiveRefinements[facet] || {};
      try {
        delete this.disjunctiveRefinements[facet][value];
      } catch (e) {
        this.disjunctiveRefinements[facet][value] = undefined; // IE compat
      }
    },

    /**
     * Ensure a facet refinement exists
     * @param  {string} facet the facet to refine
     * @param  {string} value the associated value
     */
    addRefine: function(facet, value) {
      var refinement = facet + ':' + value;
      this.refinements = this.refinements || {};
      this.refinements[refinement] = true;
    },

    /**
     * Ensure a facet refinement does not exist
     * @param  {string} facet the facet to refine
     * @param  {string} value the associated value
     */
    removeRefine: function(facet, value) {
      var refinement = facet + ':' + value;
      this.refinements = this.refinements || {};
      this.refinements[refinement] = false;
    },

    /**
     * Ensure a facet exclude exists
     * @param  {string} facet the facet to refine
     * @param  {string} value the associated value
     */
    addExclude: function(facet, value) {
      var refinement = facet + ':-' + value;
      this.excludes = this.excludes || {};
      this.excludes[refinement] = true;
    },

    /**
     * Ensure a facet exclude does not exist
     * @param  {string} facet the facet to refine
     * @param  {string} value the associated value
     */
    removeExclude: function(facet, value) {
      var refinement = facet + ':-' + value;
      this.excludes = this.excludes || {};
      this.excludes[refinement] = false;
    },

    /**
     * Toggle refinement state of an exclude
     * @param  {string} facet the facet to refine
     * @param  {string} value the associated value
     * @return {boolean} true if the facet has been found
     */
    toggleExclude: function(facet, value) {
      for (var i = 0; i < this.options.facets.length; ++i) {
        if (this.options.facets[i] == facet) {
          var refinement = facet + ':-' + value;
          this.excludes[refinement] = !this.excludes[refinement];
          this.page = 0;
          this._search();
          return true;
        }
      }
      return false;
    },

    /**
     * Toggle refinement state of a facet
     * @param  {string} facet the facet to refine
     * @param  {string} value the associated value
     * @return {boolean} true if the facet has been found
     */
    toggleRefine: function(facet, value) {
      for (var i = 0; i < this.options.facets.length; ++i) {
        if (this.options.facets[i] == facet) {
          var refinement = facet + ':' + value;
          this.refinements[refinement] = !this.refinements[refinement];
          this.page = 0;
          this._search();
          return true;
        }
      }
      this.disjunctiveRefinements[facet] = this.disjunctiveRefinements[facet] || {};
      for (var j = 0; j < this.options.disjunctiveFacets.length; ++j) {
        if (this.options.disjunctiveFacets[j] == facet) {
          this.disjunctiveRefinements[facet][value] = !this.disjunctiveRefinements[facet][value];
          this.page = 0;
          this._search();
          return true;
        }
      }
      return false;
    },

    /**
     * Check the refinement state of a facet
     * @param  {string}  facet the facet
     * @param  {string}  value the associated value
     * @return {boolean} true if refined
     */
    isRefined: function(facet, value) {
      var refinement = facet + ':' + value;
      if (this.refinements[refinement]) {
        return true;
      }
      if (this.disjunctiveRefinements[facet] && this.disjunctiveRefinements[facet][value]) {
        return true;
      }
      return false;
    },

    /**
     * Check the exclude state of a facet
     * @param  {string}  facet the facet
     * @param  {string}  value the associated value
     * @return {boolean} true if refined
     */
    isExcluded: function(facet, value) {
      var refinement = facet + ':-' + value;
      if (this.excludes[refinement]) {
        return true;
      }
      return false;
    },

    /**
     * Go to next page
     */
    nextPage: function() {
      this._gotoPage(this.page + 1);
    },

    /**
     * Go to previous page
     */
    previousPage: function() {
      if (this.page > 0) {
        this._gotoPage(this.page - 1);
      }
    },

    /**
     * Goto a page
     * @param  {integer} page The page number
     */
    gotoPage: function(page) {
        this._gotoPage(page);
    },

    /**
     * Configure the page but do not trigger a reload
     * @param  {integer} page The page number
     */
    setPage: function(page) {
      this.page = page;
    },

    /**
     * Configure the underlying index name
     * @param {string} name the index name
     */
    setIndex: function(name) {
      this.index = name;
    },

    /**
     * Get the underlying configured index name
     */
    getIndex: function() {
      return this.index;
    },

    /**
     * Clear the extra queries added to the underlying batch of queries
     */
    clearExtraQueries: function() {
      this.extraQueries = [];
    },

    /**
     * Add an extra query to the underlying batch of queries. Once you add queries
     * to the batch, the 2nd parameter of the searchCallback will be an object with a `results`
     * attribute listing all search results.
     */
    addExtraQuery: function(index, query, params) {
      this.extraQueries.push({ index: index, query: query, params: (params || {}) });
    },

    ///////////// PRIVATE

    /**
     * Goto a page
     * @param  {integer} page The page number
     */
    _gotoPage: function(page) {
      this.page = page;
      this._search();
    },

    /**
     * Perform the underlying queries
     */
    _search: function() {
      this.client.startQueriesBatch();
      this.client.addQueryInBatch(this.index, this.q, this._getHitsSearchParams());
      var disjunctiveFacets = [];
      var unusedDisjunctiveFacets = {};
      var i = 0;
      for (i = 0; i < this.options.disjunctiveFacets.length; ++i) {
        var facet = this.options.disjunctiveFacets[i];
        if (this._hasDisjunctiveRefinements(facet)) {
          disjunctiveFacets.push(facet);
        } else {
          unusedDisjunctiveFacets[facet] = true;
        }
      }
      for (i = 0; i < disjunctiveFacets.length; ++i) {
        this.client.addQueryInBatch(this.index, this.q, this._getDisjunctiveFacetSearchParams(disjunctiveFacets[i]));
      }
      for (i = 0; i < this.extraQueries.length; ++i) {
        this.client.addQueryInBatch(this.extraQueries[i].index, this.extraQueries[i].query, this.extraQueries[i].params);
      }
      var self = this;
      this.client.sendQueriesBatch(function(success, content) {
        if (!success) {
          self.searchCallback(false, content);
          return;
        }
        var aggregatedAnswer = content.results[0];
        aggregatedAnswer.disjunctiveFacets = aggregatedAnswer.disjunctiveFacets || {};
        aggregatedAnswer.facetStats = aggregatedAnswer.facetStats || {};
        // create disjunctive facets from facets (disjunctive facets without refinements)
        for (var facet in unusedDisjunctiveFacets) {
          if (aggregatedAnswer.facets[facet] && !aggregatedAnswer.disjunctiveFacets[facet]) {
            aggregatedAnswer.disjunctiveFacets[facet] = aggregatedAnswer.facets[facet];
            try {
              delete aggregatedAnswer.facets[facet];
            } catch (e) {
              aggregatedAnswer.facets[facet] = undefined; // IE compat
            }
          }
        }
        // aggregate the disjunctive facets
        for (i = 0; i < disjunctiveFacets.length; ++i) {
          for (var dfacet in content.results[i + 1].facets) {
            aggregatedAnswer.disjunctiveFacets[dfacet] = content.results[i + 1].facets[dfacet];
            if (self.disjunctiveRefinements[dfacet]) {
              for (var value in self.disjunctiveRefinements[dfacet]) {
                // add the disjunctive reginements if it is no more retrieved
                if (!aggregatedAnswer.disjunctiveFacets[dfacet][value] && self.disjunctiveRefinements[dfacet][value]) {
                  aggregatedAnswer.disjunctiveFacets[dfacet][value] = 0;
                }
              }
            }
          }
          // aggregate the disjunctive facets stats
          for (var stats in content.results[i + 1].facets_stats) {
            aggregatedAnswer.facetStats[stats] = content.results[i + 1].facets_stats[stats];
          }
        }
        // add the excludes
        for (var exclude in self.excludes) {
          if (self.excludes[exclude]) {
            var e = exclude.indexOf(':-');
            var facet = exclude.slice(0, e);
            var value = exclude.slice(e + 2);
            aggregatedAnswer.facets[facet] = aggregatedAnswer.facets[facet] || {};
            if (!aggregatedAnswer.facets[facet][value]) {
              aggregatedAnswer.facets[facet][value] = 0;
            }
          }
        }
        // call the actual callback
        if (self.extraQueries.length === 0) {
          self.searchCallback(true, aggregatedAnswer);
        } else {
          // append the extra queries
          var c = { results: [ aggregatedAnswer ] };
          for (i = 0; i < self.extraQueries.length; ++i) {
            c.results.push(content.results[1 + disjunctiveFacets.length + i]);
          }
          self.searchCallback(true, c);
        }
      });
    },

    /**
     * Build search parameters used to fetch hits
     * @return {hash}
     */
    _getHitsSearchParams: function() {
      var facets = [];
      var i = 0;
      for (i = 0; i < this.options.facets.length; ++i) {
        facets.push(this.options.facets[i]);
      }
      for (i = 0; i < this.options.disjunctiveFacets.length; ++i) {
        var facet = this.options.disjunctiveFacets[i];
        if (!this._hasDisjunctiveRefinements(facet)) {
          facets.push(facet);
        }
      }
      return extend({}, {
        hitsPerPage: this.options.hitsPerPage,
        page: this.page,
        facets: facets,
        facetFilters: this._getFacetFilters()
      }, this.searchParams);
    },

    /**
     * Build search parameters used to fetch a disjunctive facet
     * @param  {string} facet the associated facet name
     * @return {hash}
     */
    _getDisjunctiveFacetSearchParams: function(facet) {
      return extend({}, this.searchParams, {
        hitsPerPage: 1,
        page: 0,
        attributesToRetrieve: [],
        attributesToHighlight: [],
        attributesToSnippet: [],
        facets: facet,
        facetFilters: this._getFacetFilters(facet)
      });
    },

    /**
     * Test if there are some disjunctive refinements on the facet
     */
    _hasDisjunctiveRefinements: function(facet) {
      for (var value in this.disjunctiveRefinements[facet]) {
        if (this.disjunctiveRefinements[facet][value]) {
          return true;
        }
      }
      return false;
    },

    /**
     * Build facetFilters parameter based on current refinements
     * @param  {string} facet if set, the current disjunctive facet
     * @return {hash}
     */
    _getFacetFilters: function(facet) {
      var facetFilters = [];
      if (this.options.defaultFacetFilters) {
        for (var i = 0; i < this.options.defaultFacetFilters.length; ++i) {
          facetFilters.push(this.options.defaultFacetFilters[i]);
        }
      }
      for (var refinement in this.refinements) {
        if (this.refinements[refinement]) {
          facetFilters.push(refinement);
        }
      }
      for (var refinement in this.excludes) {
        if (this.excludes[refinement]) {
          facetFilters.push(refinement);
        }
      }
      for (var disjunctiveRefinement in this.disjunctiveRefinements) {
        if (disjunctiveRefinement != facet) {
          var refinements = [];
          for (var value in this.disjunctiveRefinements[disjunctiveRefinement]) {
            if (this.disjunctiveRefinements[disjunctiveRefinement][value]) {
              refinements.push(disjunctiveRefinement + ':' + value);
            }
          }
          if (refinements.length > 0) {
            facetFilters.push(refinements);
          }
        }
      }
      return facetFilters;
    }
  };
})();
