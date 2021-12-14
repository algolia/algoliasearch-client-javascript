package com.algolia.model;

import com.google.gson.annotations.SerializedName;
import io.swagger.annotations.ApiModelProperty;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

/** BaseSearchResponse */
public class BaseSearchResponse {

  public static final String SERIALIZED_NAME_AB_TEST_I_D = "abTestID";

  @SerializedName(SERIALIZED_NAME_AB_TEST_I_D)
  private Integer abTestID;

  public static final String SERIALIZED_NAME_AB_TEST_VARIANT_I_D =
    "abTestVariantID";

  @SerializedName(SERIALIZED_NAME_AB_TEST_VARIANT_I_D)
  private Integer abTestVariantID;

  public static final String SERIALIZED_NAME_AROUND_LAT_LNG = "aroundLatLng";

  @SerializedName(SERIALIZED_NAME_AROUND_LAT_LNG)
  private String aroundLatLng;

  public static final String SERIALIZED_NAME_AUTOMATIC_RADIUS =
    "automaticRadius";

  @SerializedName(SERIALIZED_NAME_AUTOMATIC_RADIUS)
  private String automaticRadius;

  public static final String SERIALIZED_NAME_EXHAUSTIVE_FACETS_COUNT =
    "exhaustiveFacetsCount";

  @SerializedName(SERIALIZED_NAME_EXHAUSTIVE_FACETS_COUNT)
  private Boolean exhaustiveFacetsCount;

  public static final String SERIALIZED_NAME_EXHAUSTIVE_NB_HITS =
    "exhaustiveNbHits";

  @SerializedName(SERIALIZED_NAME_EXHAUSTIVE_NB_HITS)
  private Boolean exhaustiveNbHits;

  public static final String SERIALIZED_NAME_EXHAUSTIVE_TYPO = "exhaustiveTypo";

  @SerializedName(SERIALIZED_NAME_EXHAUSTIVE_TYPO)
  private Boolean exhaustiveTypo;

  public static final String SERIALIZED_NAME_FACETS = "facets";

  @SerializedName(SERIALIZED_NAME_FACETS)
  private Map<String, Map<String, String>> facets = null;

  public static final String SERIALIZED_NAME_FACETS_STATS = "facets_stats";

  @SerializedName(SERIALIZED_NAME_FACETS_STATS)
  private Map<String, BaseSearchResponseFacetsStats> facetsStats = null;

  public static final String SERIALIZED_NAME_HITS_PER_PAGE = "hitsPerPage";

  @SerializedName(SERIALIZED_NAME_HITS_PER_PAGE)
  private Integer hitsPerPage = 20;

  public static final String SERIALIZED_NAME_INDEX = "index";

  @SerializedName(SERIALIZED_NAME_INDEX)
  private String index;

  public static final String SERIALIZED_NAME_INDEX_USED = "indexUsed";

  @SerializedName(SERIALIZED_NAME_INDEX_USED)
  private String indexUsed;

  public static final String SERIALIZED_NAME_MESSAGE = "message";

  @SerializedName(SERIALIZED_NAME_MESSAGE)
  private String message;

  public static final String SERIALIZED_NAME_NB_HITS = "nbHits";

  @SerializedName(SERIALIZED_NAME_NB_HITS)
  private Integer nbHits;

  public static final String SERIALIZED_NAME_NB_PAGES = "nbPages";

  @SerializedName(SERIALIZED_NAME_NB_PAGES)
  private Integer nbPages;

  public static final String SERIALIZED_NAME_NB_SORTED_HITS = "nbSortedHits";

  @SerializedName(SERIALIZED_NAME_NB_SORTED_HITS)
  private Integer nbSortedHits;

  public static final String SERIALIZED_NAME_PAGE = "page";

  @SerializedName(SERIALIZED_NAME_PAGE)
  private Integer page = 0;

  public static final String SERIALIZED_NAME_PARAMS = "params";

  @SerializedName(SERIALIZED_NAME_PARAMS)
  private String params;

  public static final String SERIALIZED_NAME_PARSED_QUERY = "parsedQuery";

  @SerializedName(SERIALIZED_NAME_PARSED_QUERY)
  private String parsedQuery;

  public static final String SERIALIZED_NAME_PROCESSING_TIME_M_S =
    "processingTimeMS";

  @SerializedName(SERIALIZED_NAME_PROCESSING_TIME_M_S)
  private Integer processingTimeMS;

  public static final String SERIALIZED_NAME_QUERY = "query";

  @SerializedName(SERIALIZED_NAME_QUERY)
  private String query = "";

  public static final String SERIALIZED_NAME_QUERY_AFTER_REMOVAL =
    "queryAfterRemoval";

  @SerializedName(SERIALIZED_NAME_QUERY_AFTER_REMOVAL)
  private String queryAfterRemoval;

  public static final String SERIALIZED_NAME_SERVER_USED = "serverUsed";

  @SerializedName(SERIALIZED_NAME_SERVER_USED)
  private String serverUsed;

  public static final String SERIALIZED_NAME_USER_DATA = "userData";

  @SerializedName(SERIALIZED_NAME_USER_DATA)
  private Map<String, Object> userData = null;

  public BaseSearchResponse abTestID(Integer abTestID) {
    this.abTestID = abTestID;
    return this;
  }

  /**
   * If a search encounters an index that is being A/B tested, abTestID reports the ongoing A/B test
   * ID.
   *
   * @return abTestID
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "If a search encounters an index that is being A/B tested, abTestID reports the ongoing" +
    " A/B test ID."
  )
  public Integer getAbTestID() {
    return abTestID;
  }

  public void setAbTestID(Integer abTestID) {
    this.abTestID = abTestID;
  }

  public BaseSearchResponse abTestVariantID(Integer abTestVariantID) {
    this.abTestVariantID = abTestVariantID;
    return this;
  }

  /**
   * If a search encounters an index that is being A/B tested, abTestVariantID reports the variant
   * ID of the index used.
   *
   * @return abTestVariantID
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "If a search encounters an index that is being A/B tested, abTestVariantID reports the" +
    " variant ID of the index used."
  )
  public Integer getAbTestVariantID() {
    return abTestVariantID;
  }

  public void setAbTestVariantID(Integer abTestVariantID) {
    this.abTestVariantID = abTestVariantID;
  }

  public BaseSearchResponse aroundLatLng(String aroundLatLng) {
    this.aroundLatLng = aroundLatLng;
    return this;
  }

  /**
   * The computed geo location.
   *
   * @return aroundLatLng
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "The computed geo location.")
  public String getAroundLatLng() {
    return aroundLatLng;
  }

  public void setAroundLatLng(String aroundLatLng) {
    this.aroundLatLng = aroundLatLng;
  }

  public BaseSearchResponse automaticRadius(String automaticRadius) {
    this.automaticRadius = automaticRadius;
    return this;
  }

  /**
   * The automatically computed radius. For legacy reasons, this parameter is a string and not an
   * integer.
   *
   * @return automaticRadius
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "The automatically computed radius. For legacy reasons, this parameter is a string and" +
    " not an integer."
  )
  public String getAutomaticRadius() {
    return automaticRadius;
  }

  public void setAutomaticRadius(String automaticRadius) {
    this.automaticRadius = automaticRadius;
  }

  public BaseSearchResponse exhaustiveFacetsCount(
    Boolean exhaustiveFacetsCount
  ) {
    this.exhaustiveFacetsCount = exhaustiveFacetsCount;
    return this;
  }

  /**
   * Whether the facet count is exhaustive or approximate.
   *
   * @return exhaustiveFacetsCount
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Whether the facet count is exhaustive or approximate."
  )
  public Boolean getExhaustiveFacetsCount() {
    return exhaustiveFacetsCount;
  }

  public void setExhaustiveFacetsCount(Boolean exhaustiveFacetsCount) {
    this.exhaustiveFacetsCount = exhaustiveFacetsCount;
  }

  public BaseSearchResponse exhaustiveNbHits(Boolean exhaustiveNbHits) {
    this.exhaustiveNbHits = exhaustiveNbHits;
    return this;
  }

  /**
   * Indicate if the nbHits count was exhaustive or approximate
   *
   * @return exhaustiveNbHits
   */
  @javax.annotation.Nonnull
  @ApiModelProperty(
    required = true,
    value = "Indicate if the nbHits count was exhaustive or approximate"
  )
  public Boolean getExhaustiveNbHits() {
    return exhaustiveNbHits;
  }

  public void setExhaustiveNbHits(Boolean exhaustiveNbHits) {
    this.exhaustiveNbHits = exhaustiveNbHits;
  }

  public BaseSearchResponse exhaustiveTypo(Boolean exhaustiveTypo) {
    this.exhaustiveTypo = exhaustiveTypo;
    return this;
  }

  /**
   * Indicate if the typo-tolerence search was exhaustive or approximate (only included when
   * typo-tolerance is enabled)
   *
   * @return exhaustiveTypo
   */
  @javax.annotation.Nonnull
  @ApiModelProperty(
    required = true,
    value = "Indicate if the typo-tolerence search was exhaustive or approximate (only included when" +
    " typo-tolerance is enabled)"
  )
  public Boolean getExhaustiveTypo() {
    return exhaustiveTypo;
  }

  public void setExhaustiveTypo(Boolean exhaustiveTypo) {
    this.exhaustiveTypo = exhaustiveTypo;
  }

  public BaseSearchResponse facets(Map<String, Map<String, String>> facets) {
    this.facets = facets;
    return this;
  }

  public BaseSearchResponse putFacetsItem(
    String key,
    Map<String, String> facetsItem
  ) {
    if (this.facets == null) {
      this.facets = new HashMap<>();
    }
    this.facets.put(key, facetsItem);
    return this;
  }

  /**
   * A mapping of each facet name to the corresponding facet counts.
   *
   * @return facets
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    example = "{\"category\":{\"food\":1,\"tech\":42}}",
    value = "A mapping of each facet name to the corresponding facet counts."
  )
  public Map<String, Map<String, String>> getFacets() {
    return facets;
  }

  public void setFacets(Map<String, Map<String, String>> facets) {
    this.facets = facets;
  }

  public BaseSearchResponse facetsStats(
    Map<String, BaseSearchResponseFacetsStats> facetsStats
  ) {
    this.facetsStats = facetsStats;
    return this;
  }

  public BaseSearchResponse putFacetsStatsItem(
    String key,
    BaseSearchResponseFacetsStats facetsStatsItem
  ) {
    if (this.facetsStats == null) {
      this.facetsStats = new HashMap<>();
    }
    this.facetsStats.put(key, facetsStatsItem);
    return this;
  }

  /**
   * Statistics for numerical facets.
   *
   * @return facetsStats
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "Statistics for numerical facets.")
  public Map<String, BaseSearchResponseFacetsStats> getFacetsStats() {
    return facetsStats;
  }

  public void setFacetsStats(
    Map<String, BaseSearchResponseFacetsStats> facetsStats
  ) {
    this.facetsStats = facetsStats;
  }

  public BaseSearchResponse hitsPerPage(Integer hitsPerPage) {
    this.hitsPerPage = hitsPerPage;
    return this;
  }

  /**
   * Set the number of hits per page.
   *
   * @return hitsPerPage
   */
  @javax.annotation.Nonnull
  @ApiModelProperty(required = true, value = "Set the number of hits per page.")
  public Integer getHitsPerPage() {
    return hitsPerPage;
  }

  public void setHitsPerPage(Integer hitsPerPage) {
    this.hitsPerPage = hitsPerPage;
  }

  public BaseSearchResponse index(String index) {
    this.index = index;
    return this;
  }

  /**
   * Index name used for the query.
   *
   * @return index
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    example = "indexName",
    value = "Index name used for the query."
  )
  public String getIndex() {
    return index;
  }

  public void setIndex(String index) {
    this.index = index;
  }

  public BaseSearchResponse indexUsed(String indexUsed) {
    this.indexUsed = indexUsed;
    return this;
  }

  /**
   * Index name used for the query. In the case of an A/B test, the targeted index isn’t always the
   * index used by the query.
   *
   * @return indexUsed
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    example = "indexNameAlt",
    value = "Index name used for the query. In the case of an A/B test, the targeted index isn’t" +
    " always the index used by the query."
  )
  public String getIndexUsed() {
    return indexUsed;
  }

  public void setIndexUsed(String indexUsed) {
    this.indexUsed = indexUsed;
  }

  public BaseSearchResponse message(String message) {
    this.message = message;
    return this;
  }

  /**
   * Used to return warnings about the query.
   *
   * @return message
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "Used to return warnings about the query.")
  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public BaseSearchResponse nbHits(Integer nbHits) {
    this.nbHits = nbHits;
    return this;
  }

  /**
   * Number of hits that the search query matched
   *
   * @return nbHits
   */
  @javax.annotation.Nonnull
  @ApiModelProperty(
    example = "20",
    required = true,
    value = "Number of hits that the search query matched"
  )
  public Integer getNbHits() {
    return nbHits;
  }

  public void setNbHits(Integer nbHits) {
    this.nbHits = nbHits;
  }

  public BaseSearchResponse nbPages(Integer nbPages) {
    this.nbPages = nbPages;
    return this;
  }

  /**
   * Number of pages available for the current query
   *
   * @return nbPages
   */
  @javax.annotation.Nonnull
  @ApiModelProperty(
    example = "1",
    required = true,
    value = "Number of pages available for the current query"
  )
  public Integer getNbPages() {
    return nbPages;
  }

  public void setNbPages(Integer nbPages) {
    this.nbPages = nbPages;
  }

  public BaseSearchResponse nbSortedHits(Integer nbSortedHits) {
    this.nbSortedHits = nbSortedHits;
    return this;
  }

  /**
   * The number of hits selected and sorted by the relevant sort algorithm
   *
   * @return nbSortedHits
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    example = "20",
    value = "The number of hits selected and sorted by the relevant sort algorithm"
  )
  public Integer getNbSortedHits() {
    return nbSortedHits;
  }

  public void setNbSortedHits(Integer nbSortedHits) {
    this.nbSortedHits = nbSortedHits;
  }

  public BaseSearchResponse page(Integer page) {
    this.page = page;
    return this;
  }

  /**
   * Specify the page to retrieve.
   *
   * @return page
   */
  @javax.annotation.Nonnull
  @ApiModelProperty(required = true, value = "Specify the page to retrieve.")
  public Integer getPage() {
    return page;
  }

  public void setPage(Integer page) {
    this.page = page;
  }

  public BaseSearchResponse params(String params) {
    this.params = params;
    return this;
  }

  /**
   * A url-encoded string of all search parameters.
   *
   * @return params
   */
  @javax.annotation.Nonnull
  @ApiModelProperty(
    example = "query=a&hitsPerPage=20",
    required = true,
    value = "A url-encoded string of all search parameters."
  )
  public String getParams() {
    return params;
  }

  public void setParams(String params) {
    this.params = params;
  }

  public BaseSearchResponse parsedQuery(String parsedQuery) {
    this.parsedQuery = parsedQuery;
    return this;
  }

  /**
   * The query string that will be searched, after normalization.
   *
   * @return parsedQuery
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "The query string that will be searched, after normalization."
  )
  public String getParsedQuery() {
    return parsedQuery;
  }

  public void setParsedQuery(String parsedQuery) {
    this.parsedQuery = parsedQuery;
  }

  public BaseSearchResponse processingTimeMS(Integer processingTimeMS) {
    this.processingTimeMS = processingTimeMS;
    return this;
  }

  /**
   * Time the server took to process the request, in milliseconds.
   *
   * @return processingTimeMS
   */
  @javax.annotation.Nonnull
  @ApiModelProperty(
    example = "20",
    required = true,
    value = "Time the server took to process the request, in milliseconds."
  )
  public Integer getProcessingTimeMS() {
    return processingTimeMS;
  }

  public void setProcessingTimeMS(Integer processingTimeMS) {
    this.processingTimeMS = processingTimeMS;
  }

  public BaseSearchResponse query(String query) {
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

  public BaseSearchResponse queryAfterRemoval(String queryAfterRemoval) {
    this.queryAfterRemoval = queryAfterRemoval;
    return this;
  }

  /**
   * A markup text indicating which parts of the original query have been removed in order to
   * retrieve a non-empty result set.
   *
   * @return queryAfterRemoval
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "A markup text indicating which parts of the original query have been removed in order to" +
    " retrieve a non-empty result set."
  )
  public String getQueryAfterRemoval() {
    return queryAfterRemoval;
  }

  public void setQueryAfterRemoval(String queryAfterRemoval) {
    this.queryAfterRemoval = queryAfterRemoval;
  }

  public BaseSearchResponse serverUsed(String serverUsed) {
    this.serverUsed = serverUsed;
    return this;
  }

  /**
   * Actual host name of the server that processed the request.
   *
   * @return serverUsed
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Actual host name of the server that processed the request."
  )
  public String getServerUsed() {
    return serverUsed;
  }

  public void setServerUsed(String serverUsed) {
    this.serverUsed = serverUsed;
  }

  public BaseSearchResponse userData(Map<String, Object> userData) {
    this.userData = userData;
    return this;
  }

  public BaseSearchResponse putUserDataItem(String key, Object userDataItem) {
    if (this.userData == null) {
      this.userData = new HashMap<>();
    }
    this.userData.put(key, userDataItem);
    return this;
  }

  /**
   * Lets you store custom data in your indices.
   *
   * @return userData
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "Lets you store custom data in your indices.")
  public Map<String, Object> getUserData() {
    return userData;
  }

  public void setUserData(Map<String, Object> userData) {
    this.userData = userData;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    BaseSearchResponse baseSearchResponse = (BaseSearchResponse) o;
    return (
      Objects.equals(this.abTestID, baseSearchResponse.abTestID) &&
      Objects.equals(
        this.abTestVariantID,
        baseSearchResponse.abTestVariantID
      ) &&
      Objects.equals(this.aroundLatLng, baseSearchResponse.aroundLatLng) &&
      Objects.equals(
        this.automaticRadius,
        baseSearchResponse.automaticRadius
      ) &&
      Objects.equals(
        this.exhaustiveFacetsCount,
        baseSearchResponse.exhaustiveFacetsCount
      ) &&
      Objects.equals(
        this.exhaustiveNbHits,
        baseSearchResponse.exhaustiveNbHits
      ) &&
      Objects.equals(this.exhaustiveTypo, baseSearchResponse.exhaustiveTypo) &&
      Objects.equals(this.facets, baseSearchResponse.facets) &&
      Objects.equals(this.facetsStats, baseSearchResponse.facetsStats) &&
      Objects.equals(this.hitsPerPage, baseSearchResponse.hitsPerPage) &&
      Objects.equals(this.index, baseSearchResponse.index) &&
      Objects.equals(this.indexUsed, baseSearchResponse.indexUsed) &&
      Objects.equals(this.message, baseSearchResponse.message) &&
      Objects.equals(this.nbHits, baseSearchResponse.nbHits) &&
      Objects.equals(this.nbPages, baseSearchResponse.nbPages) &&
      Objects.equals(this.nbSortedHits, baseSearchResponse.nbSortedHits) &&
      Objects.equals(this.page, baseSearchResponse.page) &&
      Objects.equals(this.params, baseSearchResponse.params) &&
      Objects.equals(this.parsedQuery, baseSearchResponse.parsedQuery) &&
      Objects.equals(
        this.processingTimeMS,
        baseSearchResponse.processingTimeMS
      ) &&
      Objects.equals(this.query, baseSearchResponse.query) &&
      Objects.equals(
        this.queryAfterRemoval,
        baseSearchResponse.queryAfterRemoval
      ) &&
      Objects.equals(this.serverUsed, baseSearchResponse.serverUsed) &&
      Objects.equals(this.userData, baseSearchResponse.userData)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(
      abTestID,
      abTestVariantID,
      aroundLatLng,
      automaticRadius,
      exhaustiveFacetsCount,
      exhaustiveNbHits,
      exhaustiveTypo,
      facets,
      facetsStats,
      hitsPerPage,
      index,
      indexUsed,
      message,
      nbHits,
      nbPages,
      nbSortedHits,
      page,
      params,
      parsedQuery,
      processingTimeMS,
      query,
      queryAfterRemoval,
      serverUsed,
      userData
    );
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class BaseSearchResponse {\n");
    sb.append("    abTestID: ").append(toIndentedString(abTestID)).append("\n");
    sb
      .append("    abTestVariantID: ")
      .append(toIndentedString(abTestVariantID))
      .append("\n");
    sb
      .append("    aroundLatLng: ")
      .append(toIndentedString(aroundLatLng))
      .append("\n");
    sb
      .append("    automaticRadius: ")
      .append(toIndentedString(automaticRadius))
      .append("\n");
    sb
      .append("    exhaustiveFacetsCount: ")
      .append(toIndentedString(exhaustiveFacetsCount))
      .append("\n");
    sb
      .append("    exhaustiveNbHits: ")
      .append(toIndentedString(exhaustiveNbHits))
      .append("\n");
    sb
      .append("    exhaustiveTypo: ")
      .append(toIndentedString(exhaustiveTypo))
      .append("\n");
    sb.append("    facets: ").append(toIndentedString(facets)).append("\n");
    sb
      .append("    facetsStats: ")
      .append(toIndentedString(facetsStats))
      .append("\n");
    sb
      .append("    hitsPerPage: ")
      .append(toIndentedString(hitsPerPage))
      .append("\n");
    sb.append("    index: ").append(toIndentedString(index)).append("\n");
    sb
      .append("    indexUsed: ")
      .append(toIndentedString(indexUsed))
      .append("\n");
    sb.append("    message: ").append(toIndentedString(message)).append("\n");
    sb.append("    nbHits: ").append(toIndentedString(nbHits)).append("\n");
    sb.append("    nbPages: ").append(toIndentedString(nbPages)).append("\n");
    sb
      .append("    nbSortedHits: ")
      .append(toIndentedString(nbSortedHits))
      .append("\n");
    sb.append("    page: ").append(toIndentedString(page)).append("\n");
    sb.append("    params: ").append(toIndentedString(params)).append("\n");
    sb
      .append("    parsedQuery: ")
      .append(toIndentedString(parsedQuery))
      .append("\n");
    sb
      .append("    processingTimeMS: ")
      .append(toIndentedString(processingTimeMS))
      .append("\n");
    sb.append("    query: ").append(toIndentedString(query)).append("\n");
    sb
      .append("    queryAfterRemoval: ")
      .append(toIndentedString(queryAfterRemoval))
      .append("\n");
    sb
      .append("    serverUsed: ")
      .append(toIndentedString(serverUsed))
      .append("\n");
    sb.append("    userData: ").append(toIndentedString(userData)).append("\n");
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
