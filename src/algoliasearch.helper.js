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
   * @param {hash} options an associative array defining the hitsPerPage, list of facets and list of disjunctive facets
   */
  window.AlgoliaSearchHelper = function(client, index, options) {
    /// Default options
    var defaults = {
      facets: [],            // list of facets to compute
      disjunctiveFacets: [], // list of disjunctive facets to compute
      hitsPerPage: 20        // number of hits per page
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
      for (var i = 0; i < this.options.disjunctiveFacets.length; ++i) {
        var facet = this.options.disjunctiveFacets[i];
        if (this._hasDisjunctiveRefinements(facet)) {
          disjunctiveFacets.push(facet);
        } else {
          unusedDisjunctiveFacets[facet] = true;
        }
      }
      for (var i = 0; i < disjunctiveFacets.length; ++i) {
        this.client.addQueryInBatch(this.index, this.q, this._getDisjunctiveFacetSearchParams(disjunctiveFacets[i]));
      }
      for (var i = 0; i < this.extraQueries.length; ++i) {
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
        for (var i = 0; i < disjunctiveFacets.length; ++i) {
          for (var facet in content.results[i + 1].facets) {
            aggregatedAnswer.disjunctiveFacets[facet] = content.results[i + 1].facets[facet];
            if (self.disjunctiveRefinements[facet]) {
              for (var value in self.disjunctiveRefinements[facet]) {
                if (!aggregatedAnswer.disjunctiveFacets[facet][value] && self.disjunctiveRefinements[facet][value]) {
                  aggregatedAnswer.disjunctiveFacets[facet][value] = 0;
                }
              }
            }
          }
          for (var stats in content.results[i + 1].facets_stats) {
            aggregatedAnswer.facetStats[stats] = content.results[i + 1].facets_stats[stats];
          }
        }
        if (self.extraQueries.length === 0) {
          self.searchCallback(true, aggregatedAnswer);
        } else {
          var c = { results: [ aggregatedAnswer ] };
          for (var i = 0; i < self.extraQueries.length; ++i) {
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
      for (var i = 0; i < this.options.facets.length; ++i) {
        facets.push(this.options.facets[i]);
      }
      for (var i = 0; i < this.options.disjunctiveFacets.length; ++i) {
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
      for (var refinement in this.refinements) {
        if (this.refinements[refinement]) {
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
