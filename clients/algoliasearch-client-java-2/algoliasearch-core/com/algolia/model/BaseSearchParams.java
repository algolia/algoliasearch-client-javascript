package com.algolia.model;

import com.google.gson.annotations.SerializedName;
import io.swagger.annotations.ApiModelProperty;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import org.openapitools.jackson.nullable.JsonNullable;

/** BaseSearchParams */
public class BaseSearchParams {

  public static final String SERIALIZED_NAME_QUERY = "query";

  @SerializedName(SERIALIZED_NAME_QUERY)
  private String query = "";

  public static final String SERIALIZED_NAME_SIMILAR_QUERY = "similarQuery";

  @SerializedName(SERIALIZED_NAME_SIMILAR_QUERY)
  private String similarQuery = "";

  public static final String SERIALIZED_NAME_FILTERS = "filters";

  @SerializedName(SERIALIZED_NAME_FILTERS)
  private String filters = "";

  public static final String SERIALIZED_NAME_FACET_FILTERS = "facetFilters";

  @SerializedName(SERIALIZED_NAME_FACET_FILTERS)
  private List<String> facetFilters = null;

  public static final String SERIALIZED_NAME_OPTIONAL_FILTERS =
    "optionalFilters";

  @SerializedName(SERIALIZED_NAME_OPTIONAL_FILTERS)
  private List<String> optionalFilters = null;

  public static final String SERIALIZED_NAME_NUMERIC_FILTERS = "numericFilters";

  @SerializedName(SERIALIZED_NAME_NUMERIC_FILTERS)
  private List<String> numericFilters = null;

  public static final String SERIALIZED_NAME_TAG_FILTERS = "tagFilters";

  @SerializedName(SERIALIZED_NAME_TAG_FILTERS)
  private List<String> tagFilters = null;

  public static final String SERIALIZED_NAME_SUM_OR_FILTERS_SCORES =
    "sumOrFiltersScores";

  @SerializedName(SERIALIZED_NAME_SUM_OR_FILTERS_SCORES)
  private Boolean sumOrFiltersScores = false;

  public static final String SERIALIZED_NAME_FACETS = "facets";

  @SerializedName(SERIALIZED_NAME_FACETS)
  private List<String> facets = null;

  public static final String SERIALIZED_NAME_MAX_VALUES_PER_FACET =
    "maxValuesPerFacet";

  @SerializedName(SERIALIZED_NAME_MAX_VALUES_PER_FACET)
  private Integer maxValuesPerFacet = 100;

  public static final String SERIALIZED_NAME_FACETING_AFTER_DISTINCT =
    "facetingAfterDistinct";

  @SerializedName(SERIALIZED_NAME_FACETING_AFTER_DISTINCT)
  private Boolean facetingAfterDistinct = false;

  public static final String SERIALIZED_NAME_SORT_FACET_VALUES_BY =
    "sortFacetValuesBy";

  @SerializedName(SERIALIZED_NAME_SORT_FACET_VALUES_BY)
  private String sortFacetValuesBy = "count";

  public static final String SERIALIZED_NAME_PAGE = "page";

  @SerializedName(SERIALIZED_NAME_PAGE)
  private Integer page = 0;

  public static final String SERIALIZED_NAME_OFFSET = "offset";

  @SerializedName(SERIALIZED_NAME_OFFSET)
  private Integer offset;

  public static final String SERIALIZED_NAME_LENGTH = "length";

  @SerializedName(SERIALIZED_NAME_LENGTH)
  private Integer length;

  public static final String SERIALIZED_NAME_AROUND_LAT_LNG = "aroundLatLng";

  @SerializedName(SERIALIZED_NAME_AROUND_LAT_LNG)
  private String aroundLatLng = "";

  public static final String SERIALIZED_NAME_AROUND_LAT_LNG_VIA_I_P =
    "aroundLatLngViaIP";

  @SerializedName(SERIALIZED_NAME_AROUND_LAT_LNG_VIA_I_P)
  private Boolean aroundLatLngViaIP = false;

  public static final String SERIALIZED_NAME_AROUND_RADIUS = "aroundRadius";

  @SerializedName(SERIALIZED_NAME_AROUND_RADIUS)
  private OneOfintegerstring aroundRadius;

  public static final String SERIALIZED_NAME_AROUND_PRECISION =
    "aroundPrecision";

  @SerializedName(SERIALIZED_NAME_AROUND_PRECISION)
  private Integer aroundPrecision = 10;

  public static final String SERIALIZED_NAME_MINIMUM_AROUND_RADIUS =
    "minimumAroundRadius";

  @SerializedName(SERIALIZED_NAME_MINIMUM_AROUND_RADIUS)
  private Integer minimumAroundRadius;

  public static final String SERIALIZED_NAME_INSIDE_BOUNDING_BOX =
    "insideBoundingBox";

  @SerializedName(SERIALIZED_NAME_INSIDE_BOUNDING_BOX)
  private List<BigDecimal> insideBoundingBox = null;

  public static final String SERIALIZED_NAME_INSIDE_POLYGON = "insidePolygon";

  @SerializedName(SERIALIZED_NAME_INSIDE_POLYGON)
  private List<BigDecimal> insidePolygon = null;

  public static final String SERIALIZED_NAME_NATURAL_LANGUAGES =
    "naturalLanguages";

  @SerializedName(SERIALIZED_NAME_NATURAL_LANGUAGES)
  private List<String> naturalLanguages = null;

  public static final String SERIALIZED_NAME_RULE_CONTEXTS = "ruleContexts";

  @SerializedName(SERIALIZED_NAME_RULE_CONTEXTS)
  private List<String> ruleContexts = null;

  public static final String SERIALIZED_NAME_PERSONALIZATION_IMPACT =
    "personalizationImpact";

  @SerializedName(SERIALIZED_NAME_PERSONALIZATION_IMPACT)
  private Integer personalizationImpact = 100;

  public static final String SERIALIZED_NAME_USER_TOKEN = "userToken";

  @SerializedName(SERIALIZED_NAME_USER_TOKEN)
  private String userToken;

  public static final String SERIALIZED_NAME_GET_RANKING_INFO =
    "getRankingInfo";

  @SerializedName(SERIALIZED_NAME_GET_RANKING_INFO)
  private Boolean getRankingInfo = false;

  public static final String SERIALIZED_NAME_CLICK_ANALYTICS = "clickAnalytics";

  @SerializedName(SERIALIZED_NAME_CLICK_ANALYTICS)
  private Boolean clickAnalytics = false;

  public static final String SERIALIZED_NAME_ANALYTICS = "analytics";

  @SerializedName(SERIALIZED_NAME_ANALYTICS)
  private Boolean analytics = true;

  public static final String SERIALIZED_NAME_ANALYTICS_TAGS = "analyticsTags";

  @SerializedName(SERIALIZED_NAME_ANALYTICS_TAGS)
  private List<String> analyticsTags = null;

  public static final String SERIALIZED_NAME_PERCENTILE_COMPUTATION =
    "percentileComputation";

  @SerializedName(SERIALIZED_NAME_PERCENTILE_COMPUTATION)
  private Boolean percentileComputation = true;

  public static final String SERIALIZED_NAME_ENABLE_A_B_TEST = "enableABTest";

  @SerializedName(SERIALIZED_NAME_ENABLE_A_B_TEST)
  private Boolean enableABTest = true;

  public static final String SERIALIZED_NAME_ENABLE_RE_RANKING =
    "enableReRanking";

  @SerializedName(SERIALIZED_NAME_ENABLE_RE_RANKING)
  private Boolean enableReRanking = true;

  public BaseSearchParams query(String query) {
    this.query = query;
    return this;
  }

  /**
   * The text to search in the index.
   *
   * @return query
   */
  @javax.annotation.Nonnull
  @ApiModelProperty(required = true, value = "The text to search in the index.")
  public String getQuery() {
    return query;
  }

  public void setQuery(String query) {
    this.query = query;
  }

  public BaseSearchParams similarQuery(String similarQuery) {
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
  @ApiModelProperty(
    value = "Overrides the query parameter and performs a more generic search that can be used to" +
    " find \"similar\" results."
  )
  public String getSimilarQuery() {
    return similarQuery;
  }

  public void setSimilarQuery(String similarQuery) {
    this.similarQuery = similarQuery;
  }

  public BaseSearchParams filters(String filters) {
    this.filters = filters;
    return this;
  }

  /**
   * Filter the query with numeric, facet and/or tag filters.
   *
   * @return filters
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Filter the query with numeric, facet and/or tag filters."
  )
  public String getFilters() {
    return filters;
  }

  public void setFilters(String filters) {
    this.filters = filters;
  }

  public BaseSearchParams facetFilters(List<String> facetFilters) {
    this.facetFilters = facetFilters;
    return this;
  }

  public BaseSearchParams addFacetFiltersItem(String facetFiltersItem) {
    if (this.facetFilters == null) {
      this.facetFilters = new ArrayList<>();
    }
    this.facetFilters.add(facetFiltersItem);
    return this;
  }

  /**
   * Filter hits by facet value.
   *
   * @return facetFilters
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "Filter hits by facet value.")
  public List<String> getFacetFilters() {
    return facetFilters;
  }

  public void setFacetFilters(List<String> facetFilters) {
    this.facetFilters = facetFilters;
  }

  public BaseSearchParams optionalFilters(List<String> optionalFilters) {
    this.optionalFilters = optionalFilters;
    return this;
  }

  public BaseSearchParams addOptionalFiltersItem(String optionalFiltersItem) {
    if (this.optionalFilters == null) {
      this.optionalFilters = new ArrayList<>();
    }
    this.optionalFilters.add(optionalFiltersItem);
    return this;
  }

  /**
   * Create filters for ranking purposes, where records that match the filter are ranked higher, or
   * lower in the case of a negative optional filter.
   *
   * @return optionalFilters
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Create filters for ranking purposes, where records that match the filter are ranked" +
    " higher, or lower in the case of a negative optional filter."
  )
  public List<String> getOptionalFilters() {
    return optionalFilters;
  }

  public void setOptionalFilters(List<String> optionalFilters) {
    this.optionalFilters = optionalFilters;
  }

  public BaseSearchParams numericFilters(List<String> numericFilters) {
    this.numericFilters = numericFilters;
    return this;
  }

  public BaseSearchParams addNumericFiltersItem(String numericFiltersItem) {
    if (this.numericFilters == null) {
      this.numericFilters = new ArrayList<>();
    }
    this.numericFilters.add(numericFiltersItem);
    return this;
  }

  /**
   * Filter on numeric attributes.
   *
   * @return numericFilters
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "Filter on numeric attributes.")
  public List<String> getNumericFilters() {
    return numericFilters;
  }

  public void setNumericFilters(List<String> numericFilters) {
    this.numericFilters = numericFilters;
  }

  public BaseSearchParams tagFilters(List<String> tagFilters) {
    this.tagFilters = tagFilters;
    return this;
  }

  public BaseSearchParams addTagFiltersItem(String tagFiltersItem) {
    if (this.tagFilters == null) {
      this.tagFilters = new ArrayList<>();
    }
    this.tagFilters.add(tagFiltersItem);
    return this;
  }

  /**
   * Filter hits by tags.
   *
   * @return tagFilters
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "Filter hits by tags.")
  public List<String> getTagFilters() {
    return tagFilters;
  }

  public void setTagFilters(List<String> tagFilters) {
    this.tagFilters = tagFilters;
  }

  public BaseSearchParams sumOrFiltersScores(Boolean sumOrFiltersScores) {
    this.sumOrFiltersScores = sumOrFiltersScores;
    return this;
  }

  /**
   * Determines how to calculate the total score for filtering.
   *
   * @return sumOrFiltersScores
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Determines how to calculate the total score for filtering."
  )
  public Boolean getSumOrFiltersScores() {
    return sumOrFiltersScores;
  }

  public void setSumOrFiltersScores(Boolean sumOrFiltersScores) {
    this.sumOrFiltersScores = sumOrFiltersScores;
  }

  public BaseSearchParams facets(List<String> facets) {
    this.facets = facets;
    return this;
  }

  public BaseSearchParams addFacetsItem(String facetsItem) {
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
  @ApiModelProperty(value = "Retrieve facets and their facet values.")
  public List<String> getFacets() {
    return facets;
  }

  public void setFacets(List<String> facets) {
    this.facets = facets;
  }

  public BaseSearchParams maxValuesPerFacet(Integer maxValuesPerFacet) {
    this.maxValuesPerFacet = maxValuesPerFacet;
    return this;
  }

  /**
   * Maximum number of facet values to return for each facet during a regular search.
   *
   * @return maxValuesPerFacet
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Maximum number of facet values to return for each facet during a regular search."
  )
  public Integer getMaxValuesPerFacet() {
    return maxValuesPerFacet;
  }

  public void setMaxValuesPerFacet(Integer maxValuesPerFacet) {
    this.maxValuesPerFacet = maxValuesPerFacet;
  }

  public BaseSearchParams facetingAfterDistinct(Boolean facetingAfterDistinct) {
    this.facetingAfterDistinct = facetingAfterDistinct;
    return this;
  }

  /**
   * Force faceting to be applied after de-duplication (via the Distinct setting).
   *
   * @return facetingAfterDistinct
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Force faceting to be applied after de-duplication (via the Distinct setting)."
  )
  public Boolean getFacetingAfterDistinct() {
    return facetingAfterDistinct;
  }

  public void setFacetingAfterDistinct(Boolean facetingAfterDistinct) {
    this.facetingAfterDistinct = facetingAfterDistinct;
  }

  public BaseSearchParams sortFacetValuesBy(String sortFacetValuesBy) {
    this.sortFacetValuesBy = sortFacetValuesBy;
    return this;
  }

  /**
   * Controls how facet values are fetched.
   *
   * @return sortFacetValuesBy
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "Controls how facet values are fetched.")
  public String getSortFacetValuesBy() {
    return sortFacetValuesBy;
  }

  public void setSortFacetValuesBy(String sortFacetValuesBy) {
    this.sortFacetValuesBy = sortFacetValuesBy;
  }

  public BaseSearchParams page(Integer page) {
    this.page = page;
    return this;
  }

  /**
   * Specify the page to retrieve.
   *
   * @return page
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "Specify the page to retrieve.")
  public Integer getPage() {
    return page;
  }

  public void setPage(Integer page) {
    this.page = page;
  }

  public BaseSearchParams offset(Integer offset) {
    this.offset = offset;
    return this;
  }

  /**
   * Specify the offset of the first hit to return.
   *
   * @return offset
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "Specify the offset of the first hit to return.")
  public Integer getOffset() {
    return offset;
  }

  public void setOffset(Integer offset) {
    this.offset = offset;
  }

  public BaseSearchParams length(Integer length) {
    this.length = length;
    return this;
  }

  /**
   * Set the number of hits to retrieve (used only with offset). minimum: 1 maximum: 1000
   *
   * @return length
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Set the number of hits to retrieve (used only with offset)."
  )
  public Integer getLength() {
    return length;
  }

  public void setLength(Integer length) {
    this.length = length;
  }

  public BaseSearchParams aroundLatLng(String aroundLatLng) {
    this.aroundLatLng = aroundLatLng;
    return this;
  }

  /**
   * Search for entries around a central geolocation, enabling a geo search within a circular area.
   *
   * @return aroundLatLng
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Search for entries around a central geolocation, enabling a geo search within a circular" +
    " area."
  )
  public String getAroundLatLng() {
    return aroundLatLng;
  }

  public void setAroundLatLng(String aroundLatLng) {
    this.aroundLatLng = aroundLatLng;
  }

  public BaseSearchParams aroundLatLngViaIP(Boolean aroundLatLngViaIP) {
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
  @ApiModelProperty(
    value = "Search for entries around a given location automatically computed from the requester's" +
    " IP address."
  )
  public Boolean getAroundLatLngViaIP() {
    return aroundLatLngViaIP;
  }

  public void setAroundLatLngViaIP(Boolean aroundLatLngViaIP) {
    this.aroundLatLngViaIP = aroundLatLngViaIP;
  }

  public BaseSearchParams aroundRadius(OneOfintegerstring aroundRadius) {
    this.aroundRadius = aroundRadius;
    return this;
  }

  /**
   * Define the maximum radius for a geo search (in meters).
   *
   * @return aroundRadius
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Define the maximum radius for a geo search (in meters)."
  )
  public OneOfintegerstring getAroundRadius() {
    return aroundRadius;
  }

  public void setAroundRadius(OneOfintegerstring aroundRadius) {
    this.aroundRadius = aroundRadius;
  }

  public BaseSearchParams aroundPrecision(Integer aroundPrecision) {
    this.aroundPrecision = aroundPrecision;
    return this;
  }

  /**
   * Precision of geo search (in meters), to add grouping by geo location to the ranking formula.
   *
   * @return aroundPrecision
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Precision of geo search (in meters), to add grouping by geo location to the ranking" +
    " formula."
  )
  public Integer getAroundPrecision() {
    return aroundPrecision;
  }

  public void setAroundPrecision(Integer aroundPrecision) {
    this.aroundPrecision = aroundPrecision;
  }

  public BaseSearchParams minimumAroundRadius(Integer minimumAroundRadius) {
    this.minimumAroundRadius = minimumAroundRadius;
    return this;
  }

  /**
   * Minimum radius (in meters) used for a geo search when aroundRadius is not set. minimum: 1
   *
   * @return minimumAroundRadius
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Minimum radius (in meters) used for a geo search when aroundRadius is not set."
  )
  public Integer getMinimumAroundRadius() {
    return minimumAroundRadius;
  }

  public void setMinimumAroundRadius(Integer minimumAroundRadius) {
    this.minimumAroundRadius = minimumAroundRadius;
  }

  public BaseSearchParams insideBoundingBox(
    List<BigDecimal> insideBoundingBox
  ) {
    this.insideBoundingBox = insideBoundingBox;
    return this;
  }

  public BaseSearchParams addInsideBoundingBoxItem(
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
  @ApiModelProperty(
    value = "Search inside a rectangular area (in geo coordinates)."
  )
  public List<BigDecimal> getInsideBoundingBox() {
    return insideBoundingBox;
  }

  public void setInsideBoundingBox(List<BigDecimal> insideBoundingBox) {
    this.insideBoundingBox = insideBoundingBox;
  }

  public BaseSearchParams insidePolygon(List<BigDecimal> insidePolygon) {
    this.insidePolygon = insidePolygon;
    return this;
  }

  public BaseSearchParams addInsidePolygonItem(BigDecimal insidePolygonItem) {
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
  @ApiModelProperty(value = "Search inside a polygon (in geo coordinates).")
  public List<BigDecimal> getInsidePolygon() {
    return insidePolygon;
  }

  public void setInsidePolygon(List<BigDecimal> insidePolygon) {
    this.insidePolygon = insidePolygon;
  }

  public BaseSearchParams naturalLanguages(List<String> naturalLanguages) {
    this.naturalLanguages = naturalLanguages;
    return this;
  }

  public BaseSearchParams addNaturalLanguagesItem(String naturalLanguagesItem) {
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
  @ApiModelProperty(
    value = "This parameter changes the default values of certain parameters and settings that work" +
    " best for a natural language query, such as ignorePlurals, removeStopWords," +
    " removeWordsIfNoResults, analyticsTags and ruleContexts. These parameters and" +
    " settings work well together when the query is formatted in natural language" +
    " instead of keywords, for example when your user performs a voice search."
  )
  public List<String> getNaturalLanguages() {
    return naturalLanguages;
  }

  public void setNaturalLanguages(List<String> naturalLanguages) {
    this.naturalLanguages = naturalLanguages;
  }

  public BaseSearchParams ruleContexts(List<String> ruleContexts) {
    this.ruleContexts = ruleContexts;
    return this;
  }

  public BaseSearchParams addRuleContextsItem(String ruleContextsItem) {
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
  @ApiModelProperty(value = "Enables contextual rules.")
  public List<String> getRuleContexts() {
    return ruleContexts;
  }

  public void setRuleContexts(List<String> ruleContexts) {
    this.ruleContexts = ruleContexts;
  }

  public BaseSearchParams personalizationImpact(Integer personalizationImpact) {
    this.personalizationImpact = personalizationImpact;
    return this;
  }

  /**
   * Define the impact of the Personalization feature.
   *
   * @return personalizationImpact
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "Define the impact of the Personalization feature.")
  public Integer getPersonalizationImpact() {
    return personalizationImpact;
  }

  public void setPersonalizationImpact(Integer personalizationImpact) {
    this.personalizationImpact = personalizationImpact;
  }

  public BaseSearchParams userToken(String userToken) {
    this.userToken = userToken;
    return this;
  }

  /**
   * Associates a certain user token with the current search.
   *
   * @return userToken
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Associates a certain user token with the current search."
  )
  public String getUserToken() {
    return userToken;
  }

  public void setUserToken(String userToken) {
    this.userToken = userToken;
  }

  public BaseSearchParams getRankingInfo(Boolean getRankingInfo) {
    this.getRankingInfo = getRankingInfo;
    return this;
  }

  /**
   * Retrieve detailed ranking information.
   *
   * @return getRankingInfo
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "Retrieve detailed ranking information.")
  public Boolean getGetRankingInfo() {
    return getRankingInfo;
  }

  public void setGetRankingInfo(Boolean getRankingInfo) {
    this.getRankingInfo = getRankingInfo;
  }

  public BaseSearchParams clickAnalytics(Boolean clickAnalytics) {
    this.clickAnalytics = clickAnalytics;
    return this;
  }

  /**
   * Enable the Click Analytics feature.
   *
   * @return clickAnalytics
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "Enable the Click Analytics feature.")
  public Boolean getClickAnalytics() {
    return clickAnalytics;
  }

  public void setClickAnalytics(Boolean clickAnalytics) {
    this.clickAnalytics = clickAnalytics;
  }

  public BaseSearchParams analytics(Boolean analytics) {
    this.analytics = analytics;
    return this;
  }

  /**
   * Whether the current query will be taken into account in the Analytics.
   *
   * @return analytics
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Whether the current query will be taken into account in the Analytics."
  )
  public Boolean getAnalytics() {
    return analytics;
  }

  public void setAnalytics(Boolean analytics) {
    this.analytics = analytics;
  }

  public BaseSearchParams analyticsTags(List<String> analyticsTags) {
    this.analyticsTags = analyticsTags;
    return this;
  }

  public BaseSearchParams addAnalyticsTagsItem(String analyticsTagsItem) {
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
  @ApiModelProperty(
    value = "List of tags to apply to the query for analytics purposes."
  )
  public List<String> getAnalyticsTags() {
    return analyticsTags;
  }

  public void setAnalyticsTags(List<String> analyticsTags) {
    this.analyticsTags = analyticsTags;
  }

  public BaseSearchParams percentileComputation(Boolean percentileComputation) {
    this.percentileComputation = percentileComputation;
    return this;
  }

  /**
   * Whether to include or exclude a query from the processing-time percentile computation.
   *
   * @return percentileComputation
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Whether to include or exclude a query from the processing-time percentile computation."
  )
  public Boolean getPercentileComputation() {
    return percentileComputation;
  }

  public void setPercentileComputation(Boolean percentileComputation) {
    this.percentileComputation = percentileComputation;
  }

  public BaseSearchParams enableABTest(Boolean enableABTest) {
    this.enableABTest = enableABTest;
    return this;
  }

  /**
   * Whether this search should participate in running AB tests.
   *
   * @return enableABTest
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Whether this search should participate in running AB tests."
  )
  public Boolean getEnableABTest() {
    return enableABTest;
  }

  public void setEnableABTest(Boolean enableABTest) {
    this.enableABTest = enableABTest;
  }

  public BaseSearchParams enableReRanking(Boolean enableReRanking) {
    this.enableReRanking = enableReRanking;
    return this;
  }

  /**
   * Whether this search should use AI Re-Ranking.
   *
   * @return enableReRanking
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "Whether this search should use AI Re-Ranking.")
  public Boolean getEnableReRanking() {
    return enableReRanking;
  }

  public void setEnableReRanking(Boolean enableReRanking) {
    this.enableReRanking = enableReRanking;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    BaseSearchParams baseSearchParams = (BaseSearchParams) o;
    return (
      Objects.equals(this.query, baseSearchParams.query) &&
      Objects.equals(this.similarQuery, baseSearchParams.similarQuery) &&
      Objects.equals(this.filters, baseSearchParams.filters) &&
      Objects.equals(this.facetFilters, baseSearchParams.facetFilters) &&
      Objects.equals(this.optionalFilters, baseSearchParams.optionalFilters) &&
      Objects.equals(this.numericFilters, baseSearchParams.numericFilters) &&
      Objects.equals(this.tagFilters, baseSearchParams.tagFilters) &&
      Objects.equals(
        this.sumOrFiltersScores,
        baseSearchParams.sumOrFiltersScores
      ) &&
      Objects.equals(this.facets, baseSearchParams.facets) &&
      Objects.equals(
        this.maxValuesPerFacet,
        baseSearchParams.maxValuesPerFacet
      ) &&
      Objects.equals(
        this.facetingAfterDistinct,
        baseSearchParams.facetingAfterDistinct
      ) &&
      Objects.equals(
        this.sortFacetValuesBy,
        baseSearchParams.sortFacetValuesBy
      ) &&
      Objects.equals(this.page, baseSearchParams.page) &&
      Objects.equals(this.offset, baseSearchParams.offset) &&
      Objects.equals(this.length, baseSearchParams.length) &&
      Objects.equals(this.aroundLatLng, baseSearchParams.aroundLatLng) &&
      Objects.equals(
        this.aroundLatLngViaIP,
        baseSearchParams.aroundLatLngViaIP
      ) &&
      Objects.equals(this.aroundRadius, baseSearchParams.aroundRadius) &&
      Objects.equals(this.aroundPrecision, baseSearchParams.aroundPrecision) &&
      Objects.equals(
        this.minimumAroundRadius,
        baseSearchParams.minimumAroundRadius
      ) &&
      Objects.equals(
        this.insideBoundingBox,
        baseSearchParams.insideBoundingBox
      ) &&
      Objects.equals(this.insidePolygon, baseSearchParams.insidePolygon) &&
      Objects.equals(
        this.naturalLanguages,
        baseSearchParams.naturalLanguages
      ) &&
      Objects.equals(this.ruleContexts, baseSearchParams.ruleContexts) &&
      Objects.equals(
        this.personalizationImpact,
        baseSearchParams.personalizationImpact
      ) &&
      Objects.equals(this.userToken, baseSearchParams.userToken) &&
      Objects.equals(this.getRankingInfo, baseSearchParams.getRankingInfo) &&
      Objects.equals(this.clickAnalytics, baseSearchParams.clickAnalytics) &&
      Objects.equals(this.analytics, baseSearchParams.analytics) &&
      Objects.equals(this.analyticsTags, baseSearchParams.analyticsTags) &&
      Objects.equals(
        this.percentileComputation,
        baseSearchParams.percentileComputation
      ) &&
      Objects.equals(this.enableABTest, baseSearchParams.enableABTest) &&
      Objects.equals(this.enableReRanking, baseSearchParams.enableReRanking)
    );
  }

  private static <T> boolean equalsNullable(
    JsonNullable<T> a,
    JsonNullable<T> b
  ) {
    return (
      a == b ||
      (
        a != null &&
        b != null &&
        a.isPresent() &&
        b.isPresent() &&
        Objects.deepEquals(a.get(), b.get())
      )
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(
      query,
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
      enableReRanking
    );
  }

  private static <T> int hashCodeNullable(JsonNullable<T> a) {
    if (a == null) {
      return 1;
    }
    return a.isPresent() ? Arrays.deepHashCode(new Object[] { a.get() }) : 31;
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class BaseSearchParams {\n");
    sb.append("    query: ").append(toIndentedString(query)).append("\n");
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
