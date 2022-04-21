package com.algolia.model.search;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

/** SearchResponse */
public class SearchResponse {

  @SerializedName("abTestID")
  private Integer abTestID;

  @SerializedName("abTestVariantID")
  private Integer abTestVariantID;

  @SerializedName("aroundLatLng")
  private String aroundLatLng;

  @SerializedName("automaticRadius")
  private String automaticRadius;

  @SerializedName("exhaustiveFacetsCount")
  private Boolean exhaustiveFacetsCount;

  @SerializedName("exhaustiveNbHits")
  private Boolean exhaustiveNbHits;

  @SerializedName("exhaustiveTypo")
  private Boolean exhaustiveTypo;

  @SerializedName("facets")
  private Map<String, Map<String, String>> facets = null;

  @SerializedName("facets_stats")
  private Map<String, BaseSearchResponseFacetsStats> facetsStats = null;

  @SerializedName("hitsPerPage")
  private Integer hitsPerPage = 20;

  @SerializedName("index")
  private String index;

  @SerializedName("indexUsed")
  private String indexUsed;

  @SerializedName("message")
  private String message;

  @SerializedName("nbHits")
  private Integer nbHits;

  @SerializedName("nbPages")
  private Integer nbPages;

  @SerializedName("nbSortedHits")
  private Integer nbSortedHits;

  @SerializedName("page")
  private Integer page = 0;

  @SerializedName("params")
  private String params;

  @SerializedName("parsedQuery")
  private String parsedQuery;

  @SerializedName("processingTimeMS")
  private Integer processingTimeMS;

  @SerializedName("query")
  private String query = "";

  @SerializedName("queryAfterRemoval")
  private String queryAfterRemoval;

  @SerializedName("serverUsed")
  private String serverUsed;

  @SerializedName("userData")
  private Object userData = new Object();

  @SerializedName("hits")
  private List<Hit> hits = new ArrayList<>();

  public SearchResponse setAbTestID(Integer abTestID) {
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
  public Integer getAbTestID() {
    return abTestID;
  }

  public SearchResponse setAbTestVariantID(Integer abTestVariantID) {
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
  public Integer getAbTestVariantID() {
    return abTestVariantID;
  }

  public SearchResponse setAroundLatLng(String aroundLatLng) {
    this.aroundLatLng = aroundLatLng;
    return this;
  }

  /**
   * The computed geo location.
   *
   * @return aroundLatLng
   */
  @javax.annotation.Nullable
  public String getAroundLatLng() {
    return aroundLatLng;
  }

  public SearchResponse setAutomaticRadius(String automaticRadius) {
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
  public String getAutomaticRadius() {
    return automaticRadius;
  }

  public SearchResponse setExhaustiveFacetsCount(
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
  public Boolean getExhaustiveFacetsCount() {
    return exhaustiveFacetsCount;
  }

  public SearchResponse setExhaustiveNbHits(Boolean exhaustiveNbHits) {
    this.exhaustiveNbHits = exhaustiveNbHits;
    return this;
  }

  /**
   * Indicate if the nbHits count was exhaustive or approximate.
   *
   * @return exhaustiveNbHits
   */
  @javax.annotation.Nonnull
  public Boolean getExhaustiveNbHits() {
    return exhaustiveNbHits;
  }

  public SearchResponse setExhaustiveTypo(Boolean exhaustiveTypo) {
    this.exhaustiveTypo = exhaustiveTypo;
    return this;
  }

  /**
   * Indicate if the typo-tolerence search was exhaustive or approximate (only included when
   * typo-tolerance is enabled).
   *
   * @return exhaustiveTypo
   */
  @javax.annotation.Nonnull
  public Boolean getExhaustiveTypo() {
    return exhaustiveTypo;
  }

  public SearchResponse setFacets(Map<String, Map<String, String>> facets) {
    this.facets = facets;
    return this;
  }

  public SearchResponse putFacetsItem(
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
  public Map<String, Map<String, String>> getFacets() {
    return facets;
  }

  public SearchResponse setFacetsStats(
    Map<String, BaseSearchResponseFacetsStats> facetsStats
  ) {
    this.facetsStats = facetsStats;
    return this;
  }

  public SearchResponse putFacetsStatsItem(
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
  public Map<String, BaseSearchResponseFacetsStats> getFacetsStats() {
    return facetsStats;
  }

  public SearchResponse setHitsPerPage(Integer hitsPerPage) {
    this.hitsPerPage = hitsPerPage;
    return this;
  }

  /**
   * Set the number of hits per page.
   *
   * @return hitsPerPage
   */
  @javax.annotation.Nonnull
  public Integer getHitsPerPage() {
    return hitsPerPage;
  }

  public SearchResponse setIndex(String index) {
    this.index = index;
    return this;
  }

  /**
   * Index name used for the query.
   *
   * @return index
   */
  @javax.annotation.Nullable
  public String getIndex() {
    return index;
  }

  public SearchResponse setIndexUsed(String indexUsed) {
    this.indexUsed = indexUsed;
    return this;
  }

  /**
   * Index name used for the query. In the case of an A/B test, the targeted index isn't always the
   * index used by the query.
   *
   * @return indexUsed
   */
  @javax.annotation.Nullable
  public String getIndexUsed() {
    return indexUsed;
  }

  public SearchResponse setMessage(String message) {
    this.message = message;
    return this;
  }

  /**
   * Used to return warnings about the query.
   *
   * @return message
   */
  @javax.annotation.Nullable
  public String getMessage() {
    return message;
  }

  public SearchResponse setNbHits(Integer nbHits) {
    this.nbHits = nbHits;
    return this;
  }

  /**
   * Number of hits that the search query matched.
   *
   * @return nbHits
   */
  @javax.annotation.Nonnull
  public Integer getNbHits() {
    return nbHits;
  }

  public SearchResponse setNbPages(Integer nbPages) {
    this.nbPages = nbPages;
    return this;
  }

  /**
   * Number of pages available for the current query.
   *
   * @return nbPages
   */
  @javax.annotation.Nonnull
  public Integer getNbPages() {
    return nbPages;
  }

  public SearchResponse setNbSortedHits(Integer nbSortedHits) {
    this.nbSortedHits = nbSortedHits;
    return this;
  }

  /**
   * The number of hits selected and sorted by the relevant sort algorithm.
   *
   * @return nbSortedHits
   */
  @javax.annotation.Nullable
  public Integer getNbSortedHits() {
    return nbSortedHits;
  }

  public SearchResponse setPage(Integer page) {
    this.page = page;
    return this;
  }

  /**
   * Specify the page to retrieve.
   *
   * @return page
   */
  @javax.annotation.Nonnull
  public Integer getPage() {
    return page;
  }

  public SearchResponse setParams(String params) {
    this.params = params;
    return this;
  }

  /**
   * A url-encoded string of all search parameters.
   *
   * @return params
   */
  @javax.annotation.Nonnull
  public String getParams() {
    return params;
  }

  public SearchResponse setParsedQuery(String parsedQuery) {
    this.parsedQuery = parsedQuery;
    return this;
  }

  /**
   * The query string that will be searched, after normalization.
   *
   * @return parsedQuery
   */
  @javax.annotation.Nullable
  public String getParsedQuery() {
    return parsedQuery;
  }

  public SearchResponse setProcessingTimeMS(Integer processingTimeMS) {
    this.processingTimeMS = processingTimeMS;
    return this;
  }

  /**
   * Time the server took to process the request, in milliseconds.
   *
   * @return processingTimeMS
   */
  @javax.annotation.Nonnull
  public Integer getProcessingTimeMS() {
    return processingTimeMS;
  }

  public SearchResponse setQuery(String query) {
    this.query = query;
    return this;
  }

  /**
   * The text to search in the index.
   *
   * @return query
   */
  @javax.annotation.Nonnull
  public String getQuery() {
    return query;
  }

  public SearchResponse setQueryAfterRemoval(String queryAfterRemoval) {
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
  public String getQueryAfterRemoval() {
    return queryAfterRemoval;
  }

  public SearchResponse setServerUsed(String serverUsed) {
    this.serverUsed = serverUsed;
    return this;
  }

  /**
   * Actual host name of the server that processed the request.
   *
   * @return serverUsed
   */
  @javax.annotation.Nullable
  public String getServerUsed() {
    return serverUsed;
  }

  public SearchResponse setUserData(Object userData) {
    this.userData = userData;
    return this;
  }

  /**
   * Lets you store custom data in your indices.
   *
   * @return userData
   */
  @javax.annotation.Nullable
  public Object getUserData() {
    return userData;
  }

  public SearchResponse setHits(List<Hit> hits) {
    this.hits = hits;
    return this;
  }

  public SearchResponse addHitsItem(Hit hitsItem) {
    this.hits.add(hitsItem);
    return this;
  }

  /**
   * Get hits
   *
   * @return hits
   */
  @javax.annotation.Nonnull
  public List<Hit> getHits() {
    return hits;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    SearchResponse searchResponse = (SearchResponse) o;
    return (
      Objects.equals(this.abTestID, searchResponse.abTestID) &&
      Objects.equals(this.abTestVariantID, searchResponse.abTestVariantID) &&
      Objects.equals(this.aroundLatLng, searchResponse.aroundLatLng) &&
      Objects.equals(this.automaticRadius, searchResponse.automaticRadius) &&
      Objects.equals(
        this.exhaustiveFacetsCount,
        searchResponse.exhaustiveFacetsCount
      ) &&
      Objects.equals(this.exhaustiveNbHits, searchResponse.exhaustiveNbHits) &&
      Objects.equals(this.exhaustiveTypo, searchResponse.exhaustiveTypo) &&
      Objects.equals(this.facets, searchResponse.facets) &&
      Objects.equals(this.facetsStats, searchResponse.facetsStats) &&
      Objects.equals(this.hitsPerPage, searchResponse.hitsPerPage) &&
      Objects.equals(this.index, searchResponse.index) &&
      Objects.equals(this.indexUsed, searchResponse.indexUsed) &&
      Objects.equals(this.message, searchResponse.message) &&
      Objects.equals(this.nbHits, searchResponse.nbHits) &&
      Objects.equals(this.nbPages, searchResponse.nbPages) &&
      Objects.equals(this.nbSortedHits, searchResponse.nbSortedHits) &&
      Objects.equals(this.page, searchResponse.page) &&
      Objects.equals(this.params, searchResponse.params) &&
      Objects.equals(this.parsedQuery, searchResponse.parsedQuery) &&
      Objects.equals(this.processingTimeMS, searchResponse.processingTimeMS) &&
      Objects.equals(this.query, searchResponse.query) &&
      Objects.equals(
        this.queryAfterRemoval,
        searchResponse.queryAfterRemoval
      ) &&
      Objects.equals(this.serverUsed, searchResponse.serverUsed) &&
      Objects.equals(this.userData, searchResponse.userData) &&
      Objects.equals(this.hits, searchResponse.hits)
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
      userData,
      hits
    );
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class SearchResponse {\n");
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
    sb.append("    hits: ").append(toIndentedString(hits)).append("\n");
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
