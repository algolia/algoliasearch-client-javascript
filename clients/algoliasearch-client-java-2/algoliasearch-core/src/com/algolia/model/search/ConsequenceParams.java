package com.algolia.model.search;

import com.google.gson.annotations.SerializedName;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** ConsequenceParams */
public class ConsequenceParams {

  @SerializedName("query")
  private String query;

  @SerializedName("automaticFacetFilters")
  private List<AutomaticFacetFilter> automaticFacetFilters = null;

  @SerializedName("automaticOptionalFacetFilters")
  private List<AutomaticFacetFilter> automaticOptionalFacetFilters = null;

  @SerializedName("similarQuery")
  private String similarQuery = "";

  @SerializedName("filters")
  private String filters = "";

  @SerializedName("facetFilters")
  private FacetFilters facetFilters;

  @SerializedName("optionalFilters")
  private OptionalFilters optionalFilters;

  @SerializedName("numericFilters")
  private NumericFilters numericFilters;

  @SerializedName("tagFilters")
  private TagFilters tagFilters;

  @SerializedName("sumOrFiltersScores")
  private Boolean sumOrFiltersScores = false;

  @SerializedName("facets")
  private List<String> facets = null;

  @SerializedName("maxValuesPerFacet")
  private Integer maxValuesPerFacet = 100;

  @SerializedName("facetingAfterDistinct")
  private Boolean facetingAfterDistinct = false;

  @SerializedName("sortFacetValuesBy")
  private String sortFacetValuesBy = "count";

  @SerializedName("page")
  private Integer page = 0;

  @SerializedName("offset")
  private Integer offset;

  @SerializedName("length")
  private Integer length;

  @SerializedName("aroundLatLng")
  private String aroundLatLng = "";

  @SerializedName("aroundLatLngViaIP")
  private Boolean aroundLatLngViaIP = false;

  @SerializedName("aroundRadius")
  private AroundRadius aroundRadius;

  @SerializedName("aroundPrecision")
  private Integer aroundPrecision = 10;

  @SerializedName("minimumAroundRadius")
  private Integer minimumAroundRadius;

  @SerializedName("insideBoundingBox")
  private List<BigDecimal> insideBoundingBox = null;

  @SerializedName("insidePolygon")
  private List<BigDecimal> insidePolygon = null;

  @SerializedName("naturalLanguages")
  private List<String> naturalLanguages = null;

  @SerializedName("ruleContexts")
  private List<String> ruleContexts = null;

  @SerializedName("personalizationImpact")
  private Integer personalizationImpact = 100;

  @SerializedName("userToken")
  private String userToken;

  @SerializedName("getRankingInfo")
  private Boolean getRankingInfo = false;

  @SerializedName("clickAnalytics")
  private Boolean clickAnalytics = false;

  @SerializedName("analytics")
  private Boolean analytics = true;

  @SerializedName("analyticsTags")
  private List<String> analyticsTags = null;

  @SerializedName("percentileComputation")
  private Boolean percentileComputation = true;

  @SerializedName("enableABTest")
  private Boolean enableABTest = true;

  @SerializedName("enableReRanking")
  private Boolean enableReRanking = true;

  @SerializedName("reRankingApplyFilter")
  private ReRankingApplyFilter reRankingApplyFilter;

  @SerializedName("searchableAttributes")
  private List<String> searchableAttributes = null;

  @SerializedName("attributesForFaceting")
  private List<String> attributesForFaceting = null;

  @SerializedName("unretrievableAttributes")
  private List<String> unretrievableAttributes = null;

  @SerializedName("attributesToRetrieve")
  private List<String> attributesToRetrieve = null;

  @SerializedName("restrictSearchableAttributes")
  private List<String> restrictSearchableAttributes = null;

  @SerializedName("ranking")
  private List<String> ranking = null;

  @SerializedName("customRanking")
  private List<String> customRanking = null;

  @SerializedName("relevancyStrictness")
  private Integer relevancyStrictness = 100;

  @SerializedName("attributesToHighlight")
  private List<String> attributesToHighlight = null;

  @SerializedName("attributesToSnippet")
  private List<String> attributesToSnippet = null;

  @SerializedName("highlightPreTag")
  private String highlightPreTag = "<em>";

  @SerializedName("highlightPostTag")
  private String highlightPostTag = "</em>";

  @SerializedName("snippetEllipsisText")
  private String snippetEllipsisText = "…";

  @SerializedName("restrictHighlightAndSnippetArrays")
  private Boolean restrictHighlightAndSnippetArrays = false;

  @SerializedName("hitsPerPage")
  private Integer hitsPerPage = 20;

  @SerializedName("minWordSizefor1Typo")
  private Integer minWordSizefor1Typo = 4;

  @SerializedName("minWordSizefor2Typos")
  private Integer minWordSizefor2Typos = 8;

  @SerializedName("typoTolerance")
  private TypoTolerance typoTolerance = TypoTolerance.TRUE;

  @SerializedName("allowTyposOnNumericTokens")
  private Boolean allowTyposOnNumericTokens = true;

  @SerializedName("disableTypoToleranceOnAttributes")
  private List<String> disableTypoToleranceOnAttributes = null;

  @SerializedName("separatorsToIndex")
  private String separatorsToIndex = "";

  @SerializedName("ignorePlurals")
  private String ignorePlurals = "false";

  @SerializedName("removeStopWords")
  private String removeStopWords = "false";

  @SerializedName("keepDiacriticsOnCharacters")
  private String keepDiacriticsOnCharacters = "";

  @SerializedName("queryLanguages")
  private List<String> queryLanguages = null;

  @SerializedName("decompoundQuery")
  private Boolean decompoundQuery = true;

  @SerializedName("enableRules")
  private Boolean enableRules = true;

  @SerializedName("enablePersonalization")
  private Boolean enablePersonalization = false;

  @SerializedName("queryType")
  private QueryType queryType = QueryType.PREFIX_LAST;

  @SerializedName("removeWordsIfNoResults")
  private RemoveWordsIfNoResults removeWordsIfNoResults =
    RemoveWordsIfNoResults.NONE;

  @SerializedName("advancedSyntax")
  private Boolean advancedSyntax = false;

  @SerializedName("optionalWords")
  private List<String> optionalWords = null;

  @SerializedName("disableExactOnAttributes")
  private List<String> disableExactOnAttributes = null;

  @SerializedName("exactOnSingleWordQuery")
  private ExactOnSingleWordQuery exactOnSingleWordQuery =
    ExactOnSingleWordQuery.ATTRIBUTE;

  @SerializedName("alternativesAsExact")
  private List<AlternativesAsExact> alternativesAsExact = null;

  @SerializedName("advancedSyntaxFeatures")
  private List<AdvancedSyntaxFeatures> advancedSyntaxFeatures = null;

  @SerializedName("distinct")
  private Integer distinct = 0;

  @SerializedName("synonyms")
  private Boolean synonyms = true;

  @SerializedName("replaceSynonymsInHighlight")
  private Boolean replaceSynonymsInHighlight = false;

  @SerializedName("minProximity")
  private Integer minProximity = 1;

  @SerializedName("responseFields")
  private List<String> responseFields = null;

  @SerializedName("maxFacetHits")
  private Integer maxFacetHits = 10;

  @SerializedName("attributeCriteriaComputedByMinProximity")
  private Boolean attributeCriteriaComputedByMinProximity = false;

  @SerializedName("renderingContent")
  private Object renderingContent = new Object();

  public ConsequenceParams setQuery(String query) {
    this.query = query;
    return this;
  }

  /**
   * Query string.
   *
   * @return query
   */
  @javax.annotation.Nullable
  public String getQuery() {
    return query;
  }

  public ConsequenceParams setAutomaticFacetFilters(
    List<AutomaticFacetFilter> automaticFacetFilters
  ) {
    this.automaticFacetFilters = automaticFacetFilters;
    return this;
  }

  public ConsequenceParams addAutomaticFacetFiltersItem(
    AutomaticFacetFilter automaticFacetFiltersItem
  ) {
    if (this.automaticFacetFilters == null) {
      this.automaticFacetFilters = new ArrayList<>();
    }
    this.automaticFacetFilters.add(automaticFacetFiltersItem);
    return this;
  }

  /**
   * Names of facets to which automatic filtering must be applied; they must match the facet name of
   * a facet value placeholder in the query pattern.
   *
   * @return automaticFacetFilters
   */
  @javax.annotation.Nullable
  public List<AutomaticFacetFilter> getAutomaticFacetFilters() {
    return automaticFacetFilters;
  }

  public ConsequenceParams setAutomaticOptionalFacetFilters(
    List<AutomaticFacetFilter> automaticOptionalFacetFilters
  ) {
    this.automaticOptionalFacetFilters = automaticOptionalFacetFilters;
    return this;
  }

  public ConsequenceParams addAutomaticOptionalFacetFiltersItem(
    AutomaticFacetFilter automaticOptionalFacetFiltersItem
  ) {
    if (this.automaticOptionalFacetFilters == null) {
      this.automaticOptionalFacetFilters = new ArrayList<>();
    }
    this.automaticOptionalFacetFilters.add(automaticOptionalFacetFiltersItem);
    return this;
  }

  /**
   * Same syntax as automaticFacetFilters, but the engine treats the filters as optional.
   *
   * @return automaticOptionalFacetFilters
   */
  @javax.annotation.Nullable
  public List<AutomaticFacetFilter> getAutomaticOptionalFacetFilters() {
    return automaticOptionalFacetFilters;
  }

  public ConsequenceParams setSimilarQuery(String similarQuery) {
    this.similarQuery = similarQuery;
    return this;
  }

  /**
   * Overrides the query parameter and performs a more generic search that can be used to find
   * \"similar\" results.
   *
   * @return similarQuery
   */
  @javax.annotation.Nullable
  public String getSimilarQuery() {
    return similarQuery;
  }

  public ConsequenceParams setFilters(String filters) {
    this.filters = filters;
    return this;
  }

  /**
   * Filter the query with numeric, facet and/or tag filters.
   *
   * @return filters
   */
  @javax.annotation.Nullable
  public String getFilters() {
    return filters;
  }

  public ConsequenceParams setFacetFilters(FacetFilters facetFilters) {
    this.facetFilters = facetFilters;
    return this;
  }

  /**
   * Get facetFilters
   *
   * @return facetFilters
   */
  @javax.annotation.Nullable
  public FacetFilters getFacetFilters() {
    return facetFilters;
  }

  public ConsequenceParams setOptionalFilters(OptionalFilters optionalFilters) {
    this.optionalFilters = optionalFilters;
    return this;
  }

  /**
   * Get optionalFilters
   *
   * @return optionalFilters
   */
  @javax.annotation.Nullable
  public OptionalFilters getOptionalFilters() {
    return optionalFilters;
  }

  public ConsequenceParams setNumericFilters(NumericFilters numericFilters) {
    this.numericFilters = numericFilters;
    return this;
  }

  /**
   * Get numericFilters
   *
   * @return numericFilters
   */
  @javax.annotation.Nullable
  public NumericFilters getNumericFilters() {
    return numericFilters;
  }

  public ConsequenceParams setTagFilters(TagFilters tagFilters) {
    this.tagFilters = tagFilters;
    return this;
  }

  /**
   * Get tagFilters
   *
   * @return tagFilters
   */
  @javax.annotation.Nullable
  public TagFilters getTagFilters() {
    return tagFilters;
  }

  public ConsequenceParams setSumOrFiltersScores(Boolean sumOrFiltersScores) {
    this.sumOrFiltersScores = sumOrFiltersScores;
    return this;
  }

  /**
   * Determines how to calculate the total score for filtering.
   *
   * @return sumOrFiltersScores
   */
  @javax.annotation.Nullable
  public Boolean getSumOrFiltersScores() {
    return sumOrFiltersScores;
  }

  public ConsequenceParams setFacets(List<String> facets) {
    this.facets = facets;
    return this;
  }

  public ConsequenceParams addFacetsItem(String facetsItem) {
    if (this.facets == null) {
      this.facets = new ArrayList<>();
    }
    this.facets.add(facetsItem);
    return this;
  }

  /**
   * Retrieve facets and their facet values.
   *
   * @return facets
   */
  @javax.annotation.Nullable
  public List<String> getFacets() {
    return facets;
  }

  public ConsequenceParams setMaxValuesPerFacet(Integer maxValuesPerFacet) {
    this.maxValuesPerFacet = maxValuesPerFacet;
    return this;
  }

  /**
   * Maximum number of facet values to return for each facet during a regular search.
   *
   * @return maxValuesPerFacet
   */
  @javax.annotation.Nullable
  public Integer getMaxValuesPerFacet() {
    return maxValuesPerFacet;
  }

  public ConsequenceParams setFacetingAfterDistinct(
    Boolean facetingAfterDistinct
  ) {
    this.facetingAfterDistinct = facetingAfterDistinct;
    return this;
  }

  /**
   * Force faceting to be applied after de-duplication (via the Distinct setting).
   *
   * @return facetingAfterDistinct
   */
  @javax.annotation.Nullable
  public Boolean getFacetingAfterDistinct() {
    return facetingAfterDistinct;
  }

  public ConsequenceParams setSortFacetValuesBy(String sortFacetValuesBy) {
    this.sortFacetValuesBy = sortFacetValuesBy;
    return this;
  }

  /**
   * Controls how facet values are fetched.
   *
   * @return sortFacetValuesBy
   */
  @javax.annotation.Nullable
  public String getSortFacetValuesBy() {
    return sortFacetValuesBy;
  }

  public ConsequenceParams setPage(Integer page) {
    this.page = page;
    return this;
  }

  /**
   * Specify the page to retrieve.
   *
   * @return page
   */
  @javax.annotation.Nullable
  public Integer getPage() {
    return page;
  }

  public ConsequenceParams setOffset(Integer offset) {
    this.offset = offset;
    return this;
  }

  /**
   * Specify the offset of the first hit to return.
   *
   * @return offset
   */
  @javax.annotation.Nullable
  public Integer getOffset() {
    return offset;
  }

  public ConsequenceParams setLength(Integer length) {
    this.length = length;
    return this;
  }

  /**
   * Set the number of hits to retrieve (used only with offset). minimum: 1 maximum: 1000
   *
   * @return length
   */
  @javax.annotation.Nullable
  public Integer getLength() {
    return length;
  }

  public ConsequenceParams setAroundLatLng(String aroundLatLng) {
    this.aroundLatLng = aroundLatLng;
    return this;
  }

  /**
   * Search for entries around a central geolocation, enabling a geo search within a circular area.
   *
   * @return aroundLatLng
   */
  @javax.annotation.Nullable
  public String getAroundLatLng() {
    return aroundLatLng;
  }

  public ConsequenceParams setAroundLatLngViaIP(Boolean aroundLatLngViaIP) {
    this.aroundLatLngViaIP = aroundLatLngViaIP;
    return this;
  }

  /**
   * Search for entries around a given location automatically computed from the requester's IP
   * address.
   *
   * @return aroundLatLngViaIP
   */
  @javax.annotation.Nullable
  public Boolean getAroundLatLngViaIP() {
    return aroundLatLngViaIP;
  }

  public ConsequenceParams setAroundRadius(AroundRadius aroundRadius) {
    this.aroundRadius = aroundRadius;
    return this;
  }

  /**
   * Get aroundRadius
   *
   * @return aroundRadius
   */
  @javax.annotation.Nullable
  public AroundRadius getAroundRadius() {
    return aroundRadius;
  }

  public ConsequenceParams setAroundPrecision(Integer aroundPrecision) {
    this.aroundPrecision = aroundPrecision;
    return this;
  }

  /**
   * Precision of geo search (in meters), to add grouping by geo location to the ranking formula.
   *
   * @return aroundPrecision
   */
  @javax.annotation.Nullable
  public Integer getAroundPrecision() {
    return aroundPrecision;
  }

  public ConsequenceParams setMinimumAroundRadius(Integer minimumAroundRadius) {
    this.minimumAroundRadius = minimumAroundRadius;
    return this;
  }

  /**
   * Minimum radius (in meters) used for a geo search when aroundRadius is not set. minimum: 1
   *
   * @return minimumAroundRadius
   */
  @javax.annotation.Nullable
  public Integer getMinimumAroundRadius() {
    return minimumAroundRadius;
  }

  public ConsequenceParams setInsideBoundingBox(
    List<BigDecimal> insideBoundingBox
  ) {
    this.insideBoundingBox = insideBoundingBox;
    return this;
  }

  public ConsequenceParams addInsideBoundingBoxItem(
    BigDecimal insideBoundingBoxItem
  ) {
    if (this.insideBoundingBox == null) {
      this.insideBoundingBox = new ArrayList<>();
    }
    this.insideBoundingBox.add(insideBoundingBoxItem);
    return this;
  }

  /**
   * Search inside a rectangular area (in geo coordinates).
   *
   * @return insideBoundingBox
   */
  @javax.annotation.Nullable
  public List<BigDecimal> getInsideBoundingBox() {
    return insideBoundingBox;
  }

  public ConsequenceParams setInsidePolygon(List<BigDecimal> insidePolygon) {
    this.insidePolygon = insidePolygon;
    return this;
  }

  public ConsequenceParams addInsidePolygonItem(BigDecimal insidePolygonItem) {
    if (this.insidePolygon == null) {
      this.insidePolygon = new ArrayList<>();
    }
    this.insidePolygon.add(insidePolygonItem);
    return this;
  }

  /**
   * Search inside a polygon (in geo coordinates).
   *
   * @return insidePolygon
   */
  @javax.annotation.Nullable
  public List<BigDecimal> getInsidePolygon() {
    return insidePolygon;
  }

  public ConsequenceParams setNaturalLanguages(List<String> naturalLanguages) {
    this.naturalLanguages = naturalLanguages;
    return this;
  }

  public ConsequenceParams addNaturalLanguagesItem(
    String naturalLanguagesItem
  ) {
    if (this.naturalLanguages == null) {
      this.naturalLanguages = new ArrayList<>();
    }
    this.naturalLanguages.add(naturalLanguagesItem);
    return this;
  }

  /**
   * This parameter changes the default values of certain parameters and settings that work best for
   * a natural language query, such as ignorePlurals, removeStopWords, removeWordsIfNoResults,
   * analyticsTags and ruleContexts. These parameters and settings work well together when the query
   * is formatted in natural language instead of keywords, for example when your user performs a
   * voice search.
   *
   * @return naturalLanguages
   */
  @javax.annotation.Nullable
  public List<String> getNaturalLanguages() {
    return naturalLanguages;
  }

  public ConsequenceParams setRuleContexts(List<String> ruleContexts) {
    this.ruleContexts = ruleContexts;
    return this;
  }

  public ConsequenceParams addRuleContextsItem(String ruleContextsItem) {
    if (this.ruleContexts == null) {
      this.ruleContexts = new ArrayList<>();
    }
    this.ruleContexts.add(ruleContextsItem);
    return this;
  }

  /**
   * Enables contextual rules.
   *
   * @return ruleContexts
   */
  @javax.annotation.Nullable
  public List<String> getRuleContexts() {
    return ruleContexts;
  }

  public ConsequenceParams setPersonalizationImpact(
    Integer personalizationImpact
  ) {
    this.personalizationImpact = personalizationImpact;
    return this;
  }

  /**
   * Define the impact of the Personalization feature.
   *
   * @return personalizationImpact
   */
  @javax.annotation.Nullable
  public Integer getPersonalizationImpact() {
    return personalizationImpact;
  }

  public ConsequenceParams setUserToken(String userToken) {
    this.userToken = userToken;
    return this;
  }

  /**
   * Associates a certain user token with the current search.
   *
   * @return userToken
   */
  @javax.annotation.Nullable
  public String getUserToken() {
    return userToken;
  }

  public ConsequenceParams setGetRankingInfo(Boolean getRankingInfo) {
    this.getRankingInfo = getRankingInfo;
    return this;
  }

  /**
   * Retrieve detailed ranking information.
   *
   * @return getRankingInfo
   */
  @javax.annotation.Nullable
  public Boolean getGetRankingInfo() {
    return getRankingInfo;
  }

  public ConsequenceParams setClickAnalytics(Boolean clickAnalytics) {
    this.clickAnalytics = clickAnalytics;
    return this;
  }

  /**
   * Enable the Click Analytics feature.
   *
   * @return clickAnalytics
   */
  @javax.annotation.Nullable
  public Boolean getClickAnalytics() {
    return clickAnalytics;
  }

  public ConsequenceParams setAnalytics(Boolean analytics) {
    this.analytics = analytics;
    return this;
  }

  /**
   * Whether the current query will be taken into account in the Analytics.
   *
   * @return analytics
   */
  @javax.annotation.Nullable
  public Boolean getAnalytics() {
    return analytics;
  }

  public ConsequenceParams setAnalyticsTags(List<String> analyticsTags) {
    this.analyticsTags = analyticsTags;
    return this;
  }

  public ConsequenceParams addAnalyticsTagsItem(String analyticsTagsItem) {
    if (this.analyticsTags == null) {
      this.analyticsTags = new ArrayList<>();
    }
    this.analyticsTags.add(analyticsTagsItem);
    return this;
  }

  /**
   * List of tags to apply to the query for analytics purposes.
   *
   * @return analyticsTags
   */
  @javax.annotation.Nullable
  public List<String> getAnalyticsTags() {
    return analyticsTags;
  }

  public ConsequenceParams setPercentileComputation(
    Boolean percentileComputation
  ) {
    this.percentileComputation = percentileComputation;
    return this;
  }

  /**
   * Whether to include or exclude a query from the processing-time percentile computation.
   *
   * @return percentileComputation
   */
  @javax.annotation.Nullable
  public Boolean getPercentileComputation() {
    return percentileComputation;
  }

  public ConsequenceParams setEnableABTest(Boolean enableABTest) {
    this.enableABTest = enableABTest;
    return this;
  }

  /**
   * Whether this search should participate in running AB tests.
   *
   * @return enableABTest
   */
  @javax.annotation.Nullable
  public Boolean getEnableABTest() {
    return enableABTest;
  }

  public ConsequenceParams setEnableReRanking(Boolean enableReRanking) {
    this.enableReRanking = enableReRanking;
    return this;
  }

  /**
   * Whether this search should use AI Re-Ranking.
   *
   * @return enableReRanking
   */
  @javax.annotation.Nullable
  public Boolean getEnableReRanking() {
    return enableReRanking;
  }

  public ConsequenceParams setReRankingApplyFilter(
    ReRankingApplyFilter reRankingApplyFilter
  ) {
    this.reRankingApplyFilter = reRankingApplyFilter;
    return this;
  }

  /**
   * Get reRankingApplyFilter
   *
   * @return reRankingApplyFilter
   */
  @javax.annotation.Nullable
  public ReRankingApplyFilter getReRankingApplyFilter() {
    return reRankingApplyFilter;
  }

  public ConsequenceParams setSearchableAttributes(
    List<String> searchableAttributes
  ) {
    this.searchableAttributes = searchableAttributes;
    return this;
  }

  public ConsequenceParams addSearchableAttributesItem(
    String searchableAttributesItem
  ) {
    if (this.searchableAttributes == null) {
      this.searchableAttributes = new ArrayList<>();
    }
    this.searchableAttributes.add(searchableAttributesItem);
    return this;
  }

  /**
   * The complete list of attributes used for searching.
   *
   * @return searchableAttributes
   */
  @javax.annotation.Nullable
  public List<String> getSearchableAttributes() {
    return searchableAttributes;
  }

  public ConsequenceParams setAttributesForFaceting(
    List<String> attributesForFaceting
  ) {
    this.attributesForFaceting = attributesForFaceting;
    return this;
  }

  public ConsequenceParams addAttributesForFacetingItem(
    String attributesForFacetingItem
  ) {
    if (this.attributesForFaceting == null) {
      this.attributesForFaceting = new ArrayList<>();
    }
    this.attributesForFaceting.add(attributesForFacetingItem);
    return this;
  }

  /**
   * The complete list of attributes that will be used for faceting.
   *
   * @return attributesForFaceting
   */
  @javax.annotation.Nullable
  public List<String> getAttributesForFaceting() {
    return attributesForFaceting;
  }

  public ConsequenceParams setUnretrievableAttributes(
    List<String> unretrievableAttributes
  ) {
    this.unretrievableAttributes = unretrievableAttributes;
    return this;
  }

  public ConsequenceParams addUnretrievableAttributesItem(
    String unretrievableAttributesItem
  ) {
    if (this.unretrievableAttributes == null) {
      this.unretrievableAttributes = new ArrayList<>();
    }
    this.unretrievableAttributes.add(unretrievableAttributesItem);
    return this;
  }

  /**
   * List of attributes that can't be retrieved at query time.
   *
   * @return unretrievableAttributes
   */
  @javax.annotation.Nullable
  public List<String> getUnretrievableAttributes() {
    return unretrievableAttributes;
  }

  public ConsequenceParams setAttributesToRetrieve(
    List<String> attributesToRetrieve
  ) {
    this.attributesToRetrieve = attributesToRetrieve;
    return this;
  }

  public ConsequenceParams addAttributesToRetrieveItem(
    String attributesToRetrieveItem
  ) {
    if (this.attributesToRetrieve == null) {
      this.attributesToRetrieve = new ArrayList<>();
    }
    this.attributesToRetrieve.add(attributesToRetrieveItem);
    return this;
  }

  /**
   * This parameter controls which attributes to retrieve and which not to retrieve.
   *
   * @return attributesToRetrieve
   */
  @javax.annotation.Nullable
  public List<String> getAttributesToRetrieve() {
    return attributesToRetrieve;
  }

  public ConsequenceParams setRestrictSearchableAttributes(
    List<String> restrictSearchableAttributes
  ) {
    this.restrictSearchableAttributes = restrictSearchableAttributes;
    return this;
  }

  public ConsequenceParams addRestrictSearchableAttributesItem(
    String restrictSearchableAttributesItem
  ) {
    if (this.restrictSearchableAttributes == null) {
      this.restrictSearchableAttributes = new ArrayList<>();
    }
    this.restrictSearchableAttributes.add(restrictSearchableAttributesItem);
    return this;
  }

  /**
   * Restricts a given query to look in only a subset of your searchable attributes.
   *
   * @return restrictSearchableAttributes
   */
  @javax.annotation.Nullable
  public List<String> getRestrictSearchableAttributes() {
    return restrictSearchableAttributes;
  }

  public ConsequenceParams setRanking(List<String> ranking) {
    this.ranking = ranking;
    return this;
  }

  public ConsequenceParams addRankingItem(String rankingItem) {
    if (this.ranking == null) {
      this.ranking = new ArrayList<>();
    }
    this.ranking.add(rankingItem);
    return this;
  }

  /**
   * Controls how Algolia should sort your results.
   *
   * @return ranking
   */
  @javax.annotation.Nullable
  public List<String> getRanking() {
    return ranking;
  }

  public ConsequenceParams setCustomRanking(List<String> customRanking) {
    this.customRanking = customRanking;
    return this;
  }

  public ConsequenceParams addCustomRankingItem(String customRankingItem) {
    if (this.customRanking == null) {
      this.customRanking = new ArrayList<>();
    }
    this.customRanking.add(customRankingItem);
    return this;
  }

  /**
   * Specifies the custom ranking criterion.
   *
   * @return customRanking
   */
  @javax.annotation.Nullable
  public List<String> getCustomRanking() {
    return customRanking;
  }

  public ConsequenceParams setRelevancyStrictness(Integer relevancyStrictness) {
    this.relevancyStrictness = relevancyStrictness;
    return this;
  }

  /**
   * Controls the relevancy threshold below which less relevant results aren't included in the
   * results.
   *
   * @return relevancyStrictness
   */
  @javax.annotation.Nullable
  public Integer getRelevancyStrictness() {
    return relevancyStrictness;
  }

  public ConsequenceParams setAttributesToHighlight(
    List<String> attributesToHighlight
  ) {
    this.attributesToHighlight = attributesToHighlight;
    return this;
  }

  public ConsequenceParams addAttributesToHighlightItem(
    String attributesToHighlightItem
  ) {
    if (this.attributesToHighlight == null) {
      this.attributesToHighlight = new ArrayList<>();
    }
    this.attributesToHighlight.add(attributesToHighlightItem);
    return this;
  }

  /**
   * List of attributes to highlight.
   *
   * @return attributesToHighlight
   */
  @javax.annotation.Nullable
  public List<String> getAttributesToHighlight() {
    return attributesToHighlight;
  }

  public ConsequenceParams setAttributesToSnippet(
    List<String> attributesToSnippet
  ) {
    this.attributesToSnippet = attributesToSnippet;
    return this;
  }

  public ConsequenceParams addAttributesToSnippetItem(
    String attributesToSnippetItem
  ) {
    if (this.attributesToSnippet == null) {
      this.attributesToSnippet = new ArrayList<>();
    }
    this.attributesToSnippet.add(attributesToSnippetItem);
    return this;
  }

  /**
   * List of attributes to snippet, with an optional maximum number of words to snippet.
   *
   * @return attributesToSnippet
   */
  @javax.annotation.Nullable
  public List<String> getAttributesToSnippet() {
    return attributesToSnippet;
  }

  public ConsequenceParams setHighlightPreTag(String highlightPreTag) {
    this.highlightPreTag = highlightPreTag;
    return this;
  }

  /**
   * The HTML string to insert before the highlighted parts in all highlight and snippet results.
   *
   * @return highlightPreTag
   */
  @javax.annotation.Nullable
  public String getHighlightPreTag() {
    return highlightPreTag;
  }

  public ConsequenceParams setHighlightPostTag(String highlightPostTag) {
    this.highlightPostTag = highlightPostTag;
    return this;
  }

  /**
   * The HTML string to insert after the highlighted parts in all highlight and snippet results.
   *
   * @return highlightPostTag
   */
  @javax.annotation.Nullable
  public String getHighlightPostTag() {
    return highlightPostTag;
  }

  public ConsequenceParams setSnippetEllipsisText(String snippetEllipsisText) {
    this.snippetEllipsisText = snippetEllipsisText;
    return this;
  }

  /**
   * String used as an ellipsis indicator when a snippet is truncated.
   *
   * @return snippetEllipsisText
   */
  @javax.annotation.Nullable
  public String getSnippetEllipsisText() {
    return snippetEllipsisText;
  }

  public ConsequenceParams setRestrictHighlightAndSnippetArrays(
    Boolean restrictHighlightAndSnippetArrays
  ) {
    this.restrictHighlightAndSnippetArrays = restrictHighlightAndSnippetArrays;
    return this;
  }

  /**
   * Restrict highlighting and snippeting to items that matched the query.
   *
   * @return restrictHighlightAndSnippetArrays
   */
  @javax.annotation.Nullable
  public Boolean getRestrictHighlightAndSnippetArrays() {
    return restrictHighlightAndSnippetArrays;
  }

  public ConsequenceParams setHitsPerPage(Integer hitsPerPage) {
    this.hitsPerPage = hitsPerPage;
    return this;
  }

  /**
   * Set the number of hits per page.
   *
   * @return hitsPerPage
   */
  @javax.annotation.Nullable
  public Integer getHitsPerPage() {
    return hitsPerPage;
  }

  public ConsequenceParams setMinWordSizefor1Typo(Integer minWordSizefor1Typo) {
    this.minWordSizefor1Typo = minWordSizefor1Typo;
    return this;
  }

  /**
   * Minimum number of characters a word in the query string must contain to accept matches with 1
   * typo.
   *
   * @return minWordSizefor1Typo
   */
  @javax.annotation.Nullable
  public Integer getMinWordSizefor1Typo() {
    return minWordSizefor1Typo;
  }

  public ConsequenceParams setMinWordSizefor2Typos(
    Integer minWordSizefor2Typos
  ) {
    this.minWordSizefor2Typos = minWordSizefor2Typos;
    return this;
  }

  /**
   * Minimum number of characters a word in the query string must contain to accept matches with 2
   * typos.
   *
   * @return minWordSizefor2Typos
   */
  @javax.annotation.Nullable
  public Integer getMinWordSizefor2Typos() {
    return minWordSizefor2Typos;
  }

  public ConsequenceParams setTypoTolerance(TypoTolerance typoTolerance) {
    this.typoTolerance = typoTolerance;
    return this;
  }

  /**
   * Get typoTolerance
   *
   * @return typoTolerance
   */
  @javax.annotation.Nullable
  public TypoTolerance getTypoTolerance() {
    return typoTolerance;
  }

  public ConsequenceParams setAllowTyposOnNumericTokens(
    Boolean allowTyposOnNumericTokens
  ) {
    this.allowTyposOnNumericTokens = allowTyposOnNumericTokens;
    return this;
  }

  /**
   * Whether to allow typos on numbers (\"numeric tokens\") in the query string.
   *
   * @return allowTyposOnNumericTokens
   */
  @javax.annotation.Nullable
  public Boolean getAllowTyposOnNumericTokens() {
    return allowTyposOnNumericTokens;
  }

  public ConsequenceParams setDisableTypoToleranceOnAttributes(
    List<String> disableTypoToleranceOnAttributes
  ) {
    this.disableTypoToleranceOnAttributes = disableTypoToleranceOnAttributes;
    return this;
  }

  public ConsequenceParams addDisableTypoToleranceOnAttributesItem(
    String disableTypoToleranceOnAttributesItem
  ) {
    if (this.disableTypoToleranceOnAttributes == null) {
      this.disableTypoToleranceOnAttributes = new ArrayList<>();
    }
    this.disableTypoToleranceOnAttributes.add(
        disableTypoToleranceOnAttributesItem
      );
    return this;
  }

  /**
   * List of attributes on which you want to disable typo tolerance.
   *
   * @return disableTypoToleranceOnAttributes
   */
  @javax.annotation.Nullable
  public List<String> getDisableTypoToleranceOnAttributes() {
    return disableTypoToleranceOnAttributes;
  }

  public ConsequenceParams setSeparatorsToIndex(String separatorsToIndex) {
    this.separatorsToIndex = separatorsToIndex;
    return this;
  }

  /**
   * Control which separators are indexed.
   *
   * @return separatorsToIndex
   */
  @javax.annotation.Nullable
  public String getSeparatorsToIndex() {
    return separatorsToIndex;
  }

  public ConsequenceParams setIgnorePlurals(String ignorePlurals) {
    this.ignorePlurals = ignorePlurals;
    return this;
  }

  /**
   * Treats singular, plurals, and other forms of declensions as matching terms.
   *
   * @return ignorePlurals
   */
  @javax.annotation.Nullable
  public String getIgnorePlurals() {
    return ignorePlurals;
  }

  public ConsequenceParams setRemoveStopWords(String removeStopWords) {
    this.removeStopWords = removeStopWords;
    return this;
  }

  /**
   * Removes stop (common) words from the query before executing it.
   *
   * @return removeStopWords
   */
  @javax.annotation.Nullable
  public String getRemoveStopWords() {
    return removeStopWords;
  }

  public ConsequenceParams setKeepDiacriticsOnCharacters(
    String keepDiacriticsOnCharacters
  ) {
    this.keepDiacriticsOnCharacters = keepDiacriticsOnCharacters;
    return this;
  }

  /**
   * List of characters that the engine shouldn't automatically normalize.
   *
   * @return keepDiacriticsOnCharacters
   */
  @javax.annotation.Nullable
  public String getKeepDiacriticsOnCharacters() {
    return keepDiacriticsOnCharacters;
  }

  public ConsequenceParams setQueryLanguages(List<String> queryLanguages) {
    this.queryLanguages = queryLanguages;
    return this;
  }

  public ConsequenceParams addQueryLanguagesItem(String queryLanguagesItem) {
    if (this.queryLanguages == null) {
      this.queryLanguages = new ArrayList<>();
    }
    this.queryLanguages.add(queryLanguagesItem);
    return this;
  }

  /**
   * Sets the languages to be used by language-specific settings and functionalities such as
   * ignorePlurals, removeStopWords, and CJK word-detection.
   *
   * @return queryLanguages
   */
  @javax.annotation.Nullable
  public List<String> getQueryLanguages() {
    return queryLanguages;
  }

  public ConsequenceParams setDecompoundQuery(Boolean decompoundQuery) {
    this.decompoundQuery = decompoundQuery;
    return this;
  }

  /**
   * Splits compound words into their composing atoms in the query.
   *
   * @return decompoundQuery
   */
  @javax.annotation.Nullable
  public Boolean getDecompoundQuery() {
    return decompoundQuery;
  }

  public ConsequenceParams setEnableRules(Boolean enableRules) {
    this.enableRules = enableRules;
    return this;
  }

  /**
   * Whether Rules should be globally enabled.
   *
   * @return enableRules
   */
  @javax.annotation.Nullable
  public Boolean getEnableRules() {
    return enableRules;
  }

  public ConsequenceParams setEnablePersonalization(
    Boolean enablePersonalization
  ) {
    this.enablePersonalization = enablePersonalization;
    return this;
  }

  /**
   * Enable the Personalization feature.
   *
   * @return enablePersonalization
   */
  @javax.annotation.Nullable
  public Boolean getEnablePersonalization() {
    return enablePersonalization;
  }

  public ConsequenceParams setQueryType(QueryType queryType) {
    this.queryType = queryType;
    return this;
  }

  /**
   * Get queryType
   *
   * @return queryType
   */
  @javax.annotation.Nullable
  public QueryType getQueryType() {
    return queryType;
  }

  public ConsequenceParams setRemoveWordsIfNoResults(
    RemoveWordsIfNoResults removeWordsIfNoResults
  ) {
    this.removeWordsIfNoResults = removeWordsIfNoResults;
    return this;
  }

  /**
   * Get removeWordsIfNoResults
   *
   * @return removeWordsIfNoResults
   */
  @javax.annotation.Nullable
  public RemoveWordsIfNoResults getRemoveWordsIfNoResults() {
    return removeWordsIfNoResults;
  }

  public ConsequenceParams setAdvancedSyntax(Boolean advancedSyntax) {
    this.advancedSyntax = advancedSyntax;
    return this;
  }

  /**
   * Enables the advanced query syntax.
   *
   * @return advancedSyntax
   */
  @javax.annotation.Nullable
  public Boolean getAdvancedSyntax() {
    return advancedSyntax;
  }

  public ConsequenceParams setOptionalWords(List<String> optionalWords) {
    this.optionalWords = optionalWords;
    return this;
  }

  public ConsequenceParams addOptionalWordsItem(String optionalWordsItem) {
    if (this.optionalWords == null) {
      this.optionalWords = new ArrayList<>();
    }
    this.optionalWords.add(optionalWordsItem);
    return this;
  }

  /**
   * A list of words that should be considered as optional when found in the query.
   *
   * @return optionalWords
   */
  @javax.annotation.Nullable
  public List<String> getOptionalWords() {
    return optionalWords;
  }

  public ConsequenceParams setDisableExactOnAttributes(
    List<String> disableExactOnAttributes
  ) {
    this.disableExactOnAttributes = disableExactOnAttributes;
    return this;
  }

  public ConsequenceParams addDisableExactOnAttributesItem(
    String disableExactOnAttributesItem
  ) {
    if (this.disableExactOnAttributes == null) {
      this.disableExactOnAttributes = new ArrayList<>();
    }
    this.disableExactOnAttributes.add(disableExactOnAttributesItem);
    return this;
  }

  /**
   * List of attributes on which you want to disable the exact ranking criterion.
   *
   * @return disableExactOnAttributes
   */
  @javax.annotation.Nullable
  public List<String> getDisableExactOnAttributes() {
    return disableExactOnAttributes;
  }

  public ConsequenceParams setExactOnSingleWordQuery(
    ExactOnSingleWordQuery exactOnSingleWordQuery
  ) {
    this.exactOnSingleWordQuery = exactOnSingleWordQuery;
    return this;
  }

  /**
   * Get exactOnSingleWordQuery
   *
   * @return exactOnSingleWordQuery
   */
  @javax.annotation.Nullable
  public ExactOnSingleWordQuery getExactOnSingleWordQuery() {
    return exactOnSingleWordQuery;
  }

  public ConsequenceParams setAlternativesAsExact(
    List<AlternativesAsExact> alternativesAsExact
  ) {
    this.alternativesAsExact = alternativesAsExact;
    return this;
  }

  public ConsequenceParams addAlternativesAsExactItem(
    AlternativesAsExact alternativesAsExactItem
  ) {
    if (this.alternativesAsExact == null) {
      this.alternativesAsExact = new ArrayList<>();
    }
    this.alternativesAsExact.add(alternativesAsExactItem);
    return this;
  }

  /**
   * List of alternatives that should be considered an exact match by the exact ranking criterion.
   *
   * @return alternativesAsExact
   */
  @javax.annotation.Nullable
  public List<AlternativesAsExact> getAlternativesAsExact() {
    return alternativesAsExact;
  }

  public ConsequenceParams setAdvancedSyntaxFeatures(
    List<AdvancedSyntaxFeatures> advancedSyntaxFeatures
  ) {
    this.advancedSyntaxFeatures = advancedSyntaxFeatures;
    return this;
  }

  public ConsequenceParams addAdvancedSyntaxFeaturesItem(
    AdvancedSyntaxFeatures advancedSyntaxFeaturesItem
  ) {
    if (this.advancedSyntaxFeatures == null) {
      this.advancedSyntaxFeatures = new ArrayList<>();
    }
    this.advancedSyntaxFeatures.add(advancedSyntaxFeaturesItem);
    return this;
  }

  /**
   * Allows you to specify which advanced syntax features are active when ‘advancedSyntax' is
   * enabled.
   *
   * @return advancedSyntaxFeatures
   */
  @javax.annotation.Nullable
  public List<AdvancedSyntaxFeatures> getAdvancedSyntaxFeatures() {
    return advancedSyntaxFeatures;
  }

  public ConsequenceParams setDistinct(Integer distinct) {
    this.distinct = distinct;
    return this;
  }

  /**
   * Enables de-duplication or grouping of results. minimum: 0 maximum: 4
   *
   * @return distinct
   */
  @javax.annotation.Nullable
  public Integer getDistinct() {
    return distinct;
  }

  public ConsequenceParams setSynonyms(Boolean synonyms) {
    this.synonyms = synonyms;
    return this;
  }

  /**
   * Whether to take into account an index's synonyms for a particular search.
   *
   * @return synonyms
   */
  @javax.annotation.Nullable
  public Boolean getSynonyms() {
    return synonyms;
  }

  public ConsequenceParams setReplaceSynonymsInHighlight(
    Boolean replaceSynonymsInHighlight
  ) {
    this.replaceSynonymsInHighlight = replaceSynonymsInHighlight;
    return this;
  }

  /**
   * Whether to highlight and snippet the original word that matches the synonym or the synonym
   * itself.
   *
   * @return replaceSynonymsInHighlight
   */
  @javax.annotation.Nullable
  public Boolean getReplaceSynonymsInHighlight() {
    return replaceSynonymsInHighlight;
  }

  public ConsequenceParams setMinProximity(Integer minProximity) {
    this.minProximity = minProximity;
    return this;
  }

  /**
   * Precision of the proximity ranking criterion. minimum: 1 maximum: 7
   *
   * @return minProximity
   */
  @javax.annotation.Nullable
  public Integer getMinProximity() {
    return minProximity;
  }

  public ConsequenceParams setResponseFields(List<String> responseFields) {
    this.responseFields = responseFields;
    return this;
  }

  public ConsequenceParams addResponseFieldsItem(String responseFieldsItem) {
    if (this.responseFields == null) {
      this.responseFields = new ArrayList<>();
    }
    this.responseFields.add(responseFieldsItem);
    return this;
  }

  /**
   * Choose which fields to return in the API response. This parameters applies to search and browse
   * queries.
   *
   * @return responseFields
   */
  @javax.annotation.Nullable
  public List<String> getResponseFields() {
    return responseFields;
  }

  public ConsequenceParams setMaxFacetHits(Integer maxFacetHits) {
    this.maxFacetHits = maxFacetHits;
    return this;
  }

  /**
   * Maximum number of facet hits to return during a search for facet values. For performance
   * reasons, the maximum allowed number of returned values is 100. maximum: 100
   *
   * @return maxFacetHits
   */
  @javax.annotation.Nullable
  public Integer getMaxFacetHits() {
    return maxFacetHits;
  }

  public ConsequenceParams setAttributeCriteriaComputedByMinProximity(
    Boolean attributeCriteriaComputedByMinProximity
  ) {
    this.attributeCriteriaComputedByMinProximity =
      attributeCriteriaComputedByMinProximity;
    return this;
  }

  /**
   * When attribute is ranked above proximity in your ranking formula, proximity is used to select
   * which searchable attribute is matched in the attribute ranking stage.
   *
   * @return attributeCriteriaComputedByMinProximity
   */
  @javax.annotation.Nullable
  public Boolean getAttributeCriteriaComputedByMinProximity() {
    return attributeCriteriaComputedByMinProximity;
  }

  public ConsequenceParams setRenderingContent(Object renderingContent) {
    this.renderingContent = renderingContent;
    return this;
  }

  /**
   * Content defining how the search interface should be rendered. Can be set via the settings for a
   * default value and can be overridden via rules.
   *
   * @return renderingContent
   */
  @javax.annotation.Nullable
  public Object getRenderingContent() {
    return renderingContent;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ConsequenceParams consequenceParams = (ConsequenceParams) o;
    return (
      Objects.equals(this.query, consequenceParams.query) &&
      Objects.equals(
        this.automaticFacetFilters,
        consequenceParams.automaticFacetFilters
      ) &&
      Objects.equals(
        this.automaticOptionalFacetFilters,
        consequenceParams.automaticOptionalFacetFilters
      ) &&
      Objects.equals(this.similarQuery, consequenceParams.similarQuery) &&
      Objects.equals(this.filters, consequenceParams.filters) &&
      Objects.equals(this.facetFilters, consequenceParams.facetFilters) &&
      Objects.equals(this.optionalFilters, consequenceParams.optionalFilters) &&
      Objects.equals(this.numericFilters, consequenceParams.numericFilters) &&
      Objects.equals(this.tagFilters, consequenceParams.tagFilters) &&
      Objects.equals(
        this.sumOrFiltersScores,
        consequenceParams.sumOrFiltersScores
      ) &&
      Objects.equals(this.facets, consequenceParams.facets) &&
      Objects.equals(
        this.maxValuesPerFacet,
        consequenceParams.maxValuesPerFacet
      ) &&
      Objects.equals(
        this.facetingAfterDistinct,
        consequenceParams.facetingAfterDistinct
      ) &&
      Objects.equals(
        this.sortFacetValuesBy,
        consequenceParams.sortFacetValuesBy
      ) &&
      Objects.equals(this.page, consequenceParams.page) &&
      Objects.equals(this.offset, consequenceParams.offset) &&
      Objects.equals(this.length, consequenceParams.length) &&
      Objects.equals(this.aroundLatLng, consequenceParams.aroundLatLng) &&
      Objects.equals(
        this.aroundLatLngViaIP,
        consequenceParams.aroundLatLngViaIP
      ) &&
      Objects.equals(this.aroundRadius, consequenceParams.aroundRadius) &&
      Objects.equals(this.aroundPrecision, consequenceParams.aroundPrecision) &&
      Objects.equals(
        this.minimumAroundRadius,
        consequenceParams.minimumAroundRadius
      ) &&
      Objects.equals(
        this.insideBoundingBox,
        consequenceParams.insideBoundingBox
      ) &&
      Objects.equals(this.insidePolygon, consequenceParams.insidePolygon) &&
      Objects.equals(
        this.naturalLanguages,
        consequenceParams.naturalLanguages
      ) &&
      Objects.equals(this.ruleContexts, consequenceParams.ruleContexts) &&
      Objects.equals(
        this.personalizationImpact,
        consequenceParams.personalizationImpact
      ) &&
      Objects.equals(this.userToken, consequenceParams.userToken) &&
      Objects.equals(this.getRankingInfo, consequenceParams.getRankingInfo) &&
      Objects.equals(this.clickAnalytics, consequenceParams.clickAnalytics) &&
      Objects.equals(this.analytics, consequenceParams.analytics) &&
      Objects.equals(this.analyticsTags, consequenceParams.analyticsTags) &&
      Objects.equals(
        this.percentileComputation,
        consequenceParams.percentileComputation
      ) &&
      Objects.equals(this.enableABTest, consequenceParams.enableABTest) &&
      Objects.equals(this.enableReRanking, consequenceParams.enableReRanking) &&
      Objects.equals(
        this.reRankingApplyFilter,
        consequenceParams.reRankingApplyFilter
      ) &&
      Objects.equals(
        this.searchableAttributes,
        consequenceParams.searchableAttributes
      ) &&
      Objects.equals(
        this.attributesForFaceting,
        consequenceParams.attributesForFaceting
      ) &&
      Objects.equals(
        this.unretrievableAttributes,
        consequenceParams.unretrievableAttributes
      ) &&
      Objects.equals(
        this.attributesToRetrieve,
        consequenceParams.attributesToRetrieve
      ) &&
      Objects.equals(
        this.restrictSearchableAttributes,
        consequenceParams.restrictSearchableAttributes
      ) &&
      Objects.equals(this.ranking, consequenceParams.ranking) &&
      Objects.equals(this.customRanking, consequenceParams.customRanking) &&
      Objects.equals(
        this.relevancyStrictness,
        consequenceParams.relevancyStrictness
      ) &&
      Objects.equals(
        this.attributesToHighlight,
        consequenceParams.attributesToHighlight
      ) &&
      Objects.equals(
        this.attributesToSnippet,
        consequenceParams.attributesToSnippet
      ) &&
      Objects.equals(this.highlightPreTag, consequenceParams.highlightPreTag) &&
      Objects.equals(
        this.highlightPostTag,
        consequenceParams.highlightPostTag
      ) &&
      Objects.equals(
        this.snippetEllipsisText,
        consequenceParams.snippetEllipsisText
      ) &&
      Objects.equals(
        this.restrictHighlightAndSnippetArrays,
        consequenceParams.restrictHighlightAndSnippetArrays
      ) &&
      Objects.equals(this.hitsPerPage, consequenceParams.hitsPerPage) &&
      Objects.equals(
        this.minWordSizefor1Typo,
        consequenceParams.minWordSizefor1Typo
      ) &&
      Objects.equals(
        this.minWordSizefor2Typos,
        consequenceParams.minWordSizefor2Typos
      ) &&
      Objects.equals(this.typoTolerance, consequenceParams.typoTolerance) &&
      Objects.equals(
        this.allowTyposOnNumericTokens,
        consequenceParams.allowTyposOnNumericTokens
      ) &&
      Objects.equals(
        this.disableTypoToleranceOnAttributes,
        consequenceParams.disableTypoToleranceOnAttributes
      ) &&
      Objects.equals(
        this.separatorsToIndex,
        consequenceParams.separatorsToIndex
      ) &&
      Objects.equals(this.ignorePlurals, consequenceParams.ignorePlurals) &&
      Objects.equals(this.removeStopWords, consequenceParams.removeStopWords) &&
      Objects.equals(
        this.keepDiacriticsOnCharacters,
        consequenceParams.keepDiacriticsOnCharacters
      ) &&
      Objects.equals(this.queryLanguages, consequenceParams.queryLanguages) &&
      Objects.equals(this.decompoundQuery, consequenceParams.decompoundQuery) &&
      Objects.equals(this.enableRules, consequenceParams.enableRules) &&
      Objects.equals(
        this.enablePersonalization,
        consequenceParams.enablePersonalization
      ) &&
      Objects.equals(this.queryType, consequenceParams.queryType) &&
      Objects.equals(
        this.removeWordsIfNoResults,
        consequenceParams.removeWordsIfNoResults
      ) &&
      Objects.equals(this.advancedSyntax, consequenceParams.advancedSyntax) &&
      Objects.equals(this.optionalWords, consequenceParams.optionalWords) &&
      Objects.equals(
        this.disableExactOnAttributes,
        consequenceParams.disableExactOnAttributes
      ) &&
      Objects.equals(
        this.exactOnSingleWordQuery,
        consequenceParams.exactOnSingleWordQuery
      ) &&
      Objects.equals(
        this.alternativesAsExact,
        consequenceParams.alternativesAsExact
      ) &&
      Objects.equals(
        this.advancedSyntaxFeatures,
        consequenceParams.advancedSyntaxFeatures
      ) &&
      Objects.equals(this.distinct, consequenceParams.distinct) &&
      Objects.equals(this.synonyms, consequenceParams.synonyms) &&
      Objects.equals(
        this.replaceSynonymsInHighlight,
        consequenceParams.replaceSynonymsInHighlight
      ) &&
      Objects.equals(this.minProximity, consequenceParams.minProximity) &&
      Objects.equals(this.responseFields, consequenceParams.responseFields) &&
      Objects.equals(this.maxFacetHits, consequenceParams.maxFacetHits) &&
      Objects.equals(
        this.attributeCriteriaComputedByMinProximity,
        consequenceParams.attributeCriteriaComputedByMinProximity
      ) &&
      Objects.equals(this.renderingContent, consequenceParams.renderingContent)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(
      query,
      automaticFacetFilters,
      automaticOptionalFacetFilters,
      similarQuery,
      filters,
      facetFilters,
      optionalFilters,
      numericFilters,
      tagFilters,
      sumOrFiltersScores,
      facets,
      maxValuesPerFacet,
      facetingAfterDistinct,
      sortFacetValuesBy,
      page,
      offset,
      length,
      aroundLatLng,
      aroundLatLngViaIP,
      aroundRadius,
      aroundPrecision,
      minimumAroundRadius,
      insideBoundingBox,
      insidePolygon,
      naturalLanguages,
      ruleContexts,
      personalizationImpact,
      userToken,
      getRankingInfo,
      clickAnalytics,
      analytics,
      analyticsTags,
      percentileComputation,
      enableABTest,
      enableReRanking,
      reRankingApplyFilter,
      searchableAttributes,
      attributesForFaceting,
      unretrievableAttributes,
      attributesToRetrieve,
      restrictSearchableAttributes,
      ranking,
      customRanking,
      relevancyStrictness,
      attributesToHighlight,
      attributesToSnippet,
      highlightPreTag,
      highlightPostTag,
      snippetEllipsisText,
      restrictHighlightAndSnippetArrays,
      hitsPerPage,
      minWordSizefor1Typo,
      minWordSizefor2Typos,
      typoTolerance,
      allowTyposOnNumericTokens,
      disableTypoToleranceOnAttributes,
      separatorsToIndex,
      ignorePlurals,
      removeStopWords,
      keepDiacriticsOnCharacters,
      queryLanguages,
      decompoundQuery,
      enableRules,
      enablePersonalization,
      queryType,
      removeWordsIfNoResults,
      advancedSyntax,
      optionalWords,
      disableExactOnAttributes,
      exactOnSingleWordQuery,
      alternativesAsExact,
      advancedSyntaxFeatures,
      distinct,
      synonyms,
      replaceSynonymsInHighlight,
      minProximity,
      responseFields,
      maxFacetHits,
      attributeCriteriaComputedByMinProximity,
      renderingContent
    );
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ConsequenceParams {\n");
    sb.append("    query: ").append(toIndentedString(query)).append("\n");
    sb
      .append("    automaticFacetFilters: ")
      .append(toIndentedString(automaticFacetFilters))
      .append("\n");
    sb
      .append("    automaticOptionalFacetFilters: ")
      .append(toIndentedString(automaticOptionalFacetFilters))
      .append("\n");
    sb
      .append("    similarQuery: ")
      .append(toIndentedString(similarQuery))
      .append("\n");
    sb.append("    filters: ").append(toIndentedString(filters)).append("\n");
    sb
      .append("    facetFilters: ")
      .append(toIndentedString(facetFilters))
      .append("\n");
    sb
      .append("    optionalFilters: ")
      .append(toIndentedString(optionalFilters))
      .append("\n");
    sb
      .append("    numericFilters: ")
      .append(toIndentedString(numericFilters))
      .append("\n");
    sb
      .append("    tagFilters: ")
      .append(toIndentedString(tagFilters))
      .append("\n");
    sb
      .append("    sumOrFiltersScores: ")
      .append(toIndentedString(sumOrFiltersScores))
      .append("\n");
    sb.append("    facets: ").append(toIndentedString(facets)).append("\n");
    sb
      .append("    maxValuesPerFacet: ")
      .append(toIndentedString(maxValuesPerFacet))
      .append("\n");
    sb
      .append("    facetingAfterDistinct: ")
      .append(toIndentedString(facetingAfterDistinct))
      .append("\n");
    sb
      .append("    sortFacetValuesBy: ")
      .append(toIndentedString(sortFacetValuesBy))
      .append("\n");
    sb.append("    page: ").append(toIndentedString(page)).append("\n");
    sb.append("    offset: ").append(toIndentedString(offset)).append("\n");
    sb.append("    length: ").append(toIndentedString(length)).append("\n");
    sb
      .append("    aroundLatLng: ")
      .append(toIndentedString(aroundLatLng))
      .append("\n");
    sb
      .append("    aroundLatLngViaIP: ")
      .append(toIndentedString(aroundLatLngViaIP))
      .append("\n");
    sb
      .append("    aroundRadius: ")
      .append(toIndentedString(aroundRadius))
      .append("\n");
    sb
      .append("    aroundPrecision: ")
      .append(toIndentedString(aroundPrecision))
      .append("\n");
    sb
      .append("    minimumAroundRadius: ")
      .append(toIndentedString(minimumAroundRadius))
      .append("\n");
    sb
      .append("    insideBoundingBox: ")
      .append(toIndentedString(insideBoundingBox))
      .append("\n");
    sb
      .append("    insidePolygon: ")
      .append(toIndentedString(insidePolygon))
      .append("\n");
    sb
      .append("    naturalLanguages: ")
      .append(toIndentedString(naturalLanguages))
      .append("\n");
    sb
      .append("    ruleContexts: ")
      .append(toIndentedString(ruleContexts))
      .append("\n");
    sb
      .append("    personalizationImpact: ")
      .append(toIndentedString(personalizationImpact))
      .append("\n");
    sb
      .append("    userToken: ")
      .append(toIndentedString(userToken))
      .append("\n");
    sb
      .append("    getRankingInfo: ")
      .append(toIndentedString(getRankingInfo))
      .append("\n");
    sb
      .append("    clickAnalytics: ")
      .append(toIndentedString(clickAnalytics))
      .append("\n");
    sb
      .append("    analytics: ")
      .append(toIndentedString(analytics))
      .append("\n");
    sb
      .append("    analyticsTags: ")
      .append(toIndentedString(analyticsTags))
      .append("\n");
    sb
      .append("    percentileComputation: ")
      .append(toIndentedString(percentileComputation))
      .append("\n");
    sb
      .append("    enableABTest: ")
      .append(toIndentedString(enableABTest))
      .append("\n");
    sb
      .append("    enableReRanking: ")
      .append(toIndentedString(enableReRanking))
      .append("\n");
    sb
      .append("    reRankingApplyFilter: ")
      .append(toIndentedString(reRankingApplyFilter))
      .append("\n");
    sb
      .append("    searchableAttributes: ")
      .append(toIndentedString(searchableAttributes))
      .append("\n");
    sb
      .append("    attributesForFaceting: ")
      .append(toIndentedString(attributesForFaceting))
      .append("\n");
    sb
      .append("    unretrievableAttributes: ")
      .append(toIndentedString(unretrievableAttributes))
      .append("\n");
    sb
      .append("    attributesToRetrieve: ")
      .append(toIndentedString(attributesToRetrieve))
      .append("\n");
    sb
      .append("    restrictSearchableAttributes: ")
      .append(toIndentedString(restrictSearchableAttributes))
      .append("\n");
    sb.append("    ranking: ").append(toIndentedString(ranking)).append("\n");
    sb
      .append("    customRanking: ")
      .append(toIndentedString(customRanking))
      .append("\n");
    sb
      .append("    relevancyStrictness: ")
      .append(toIndentedString(relevancyStrictness))
      .append("\n");
    sb
      .append("    attributesToHighlight: ")
      .append(toIndentedString(attributesToHighlight))
      .append("\n");
    sb
      .append("    attributesToSnippet: ")
      .append(toIndentedString(attributesToSnippet))
      .append("\n");
    sb
      .append("    highlightPreTag: ")
      .append(toIndentedString(highlightPreTag))
      .append("\n");
    sb
      .append("    highlightPostTag: ")
      .append(toIndentedString(highlightPostTag))
      .append("\n");
    sb
      .append("    snippetEllipsisText: ")
      .append(toIndentedString(snippetEllipsisText))
      .append("\n");
    sb
      .append("    restrictHighlightAndSnippetArrays: ")
      .append(toIndentedString(restrictHighlightAndSnippetArrays))
      .append("\n");
    sb
      .append("    hitsPerPage: ")
      .append(toIndentedString(hitsPerPage))
      .append("\n");
    sb
      .append("    minWordSizefor1Typo: ")
      .append(toIndentedString(minWordSizefor1Typo))
      .append("\n");
    sb
      .append("    minWordSizefor2Typos: ")
      .append(toIndentedString(minWordSizefor2Typos))
      .append("\n");
    sb
      .append("    typoTolerance: ")
      .append(toIndentedString(typoTolerance))
      .append("\n");
    sb
      .append("    allowTyposOnNumericTokens: ")
      .append(toIndentedString(allowTyposOnNumericTokens))
      .append("\n");
    sb
      .append("    disableTypoToleranceOnAttributes: ")
      .append(toIndentedString(disableTypoToleranceOnAttributes))
      .append("\n");
    sb
      .append("    separatorsToIndex: ")
      .append(toIndentedString(separatorsToIndex))
      .append("\n");
    sb
      .append("    ignorePlurals: ")
      .append(toIndentedString(ignorePlurals))
      .append("\n");
    sb
      .append("    removeStopWords: ")
      .append(toIndentedString(removeStopWords))
      .append("\n");
    sb
      .append("    keepDiacriticsOnCharacters: ")
      .append(toIndentedString(keepDiacriticsOnCharacters))
      .append("\n");
    sb
      .append("    queryLanguages: ")
      .append(toIndentedString(queryLanguages))
      .append("\n");
    sb
      .append("    decompoundQuery: ")
      .append(toIndentedString(decompoundQuery))
      .append("\n");
    sb
      .append("    enableRules: ")
      .append(toIndentedString(enableRules))
      .append("\n");
    sb
      .append("    enablePersonalization: ")
      .append(toIndentedString(enablePersonalization))
      .append("\n");
    sb
      .append("    queryType: ")
      .append(toIndentedString(queryType))
      .append("\n");
    sb
      .append("    removeWordsIfNoResults: ")
      .append(toIndentedString(removeWordsIfNoResults))
      .append("\n");
    sb
      .append("    advancedSyntax: ")
      .append(toIndentedString(advancedSyntax))
      .append("\n");
    sb
      .append("    optionalWords: ")
      .append(toIndentedString(optionalWords))
      .append("\n");
    sb
      .append("    disableExactOnAttributes: ")
      .append(toIndentedString(disableExactOnAttributes))
      .append("\n");
    sb
      .append("    exactOnSingleWordQuery: ")
      .append(toIndentedString(exactOnSingleWordQuery))
      .append("\n");
    sb
      .append("    alternativesAsExact: ")
      .append(toIndentedString(alternativesAsExact))
      .append("\n");
    sb
      .append("    advancedSyntaxFeatures: ")
      .append(toIndentedString(advancedSyntaxFeatures))
      .append("\n");
    sb.append("    distinct: ").append(toIndentedString(distinct)).append("\n");
    sb.append("    synonyms: ").append(toIndentedString(synonyms)).append("\n");
    sb
      .append("    replaceSynonymsInHighlight: ")
      .append(toIndentedString(replaceSynonymsInHighlight))
      .append("\n");
    sb
      .append("    minProximity: ")
      .append(toIndentedString(minProximity))
      .append("\n");
    sb
      .append("    responseFields: ")
      .append(toIndentedString(responseFields))
      .append("\n");
    sb
      .append("    maxFacetHits: ")
      .append(toIndentedString(maxFacetHits))
      .append("\n");
    sb
      .append("    attributeCriteriaComputedByMinProximity: ")
      .append(toIndentedString(attributeCriteriaComputedByMinProximity))
      .append("\n");
    sb
      .append("    renderingContent: ")
      .append(toIndentedString(renderingContent))
      .append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces (except the first line).
   */
  private String toIndentedString(Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}
