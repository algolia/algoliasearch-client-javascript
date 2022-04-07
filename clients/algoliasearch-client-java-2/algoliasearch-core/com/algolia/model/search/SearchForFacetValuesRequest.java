package com.algolia.model.search;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** SearchForFacetValuesRequest */
public class SearchForFacetValuesRequest {

  @SerializedName("params")
  private String params = "";

  @SerializedName("facetQuery")
  private String facetQuery = "";

  @SerializedName("maxFacetHits")
  private Integer maxFacetHits = 10;

  public SearchForFacetValuesRequest setParams(String params) {
    this.params = params;
    return this;
  }

  /**
   * Search parameters as URL-encoded query string.
   *
   * @return params
   */
  @javax.annotation.Nullable
  public String getParams() {
    return params;
  }

  public SearchForFacetValuesRequest setFacetQuery(String facetQuery) {
    this.facetQuery = facetQuery;
    return this;
  }

  /**
   * Text to search inside the facet's values.
   *
   * @return facetQuery
   */
  @javax.annotation.Nullable
  public String getFacetQuery() {
    return facetQuery;
  }

  public SearchForFacetValuesRequest setMaxFacetHits(Integer maxFacetHits) {
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

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    SearchForFacetValuesRequest searchForFacetValuesRequest = (SearchForFacetValuesRequest) o;
    return (
      Objects.equals(this.params, searchForFacetValuesRequest.params) &&
      Objects.equals(this.facetQuery, searchForFacetValuesRequest.facetQuery) &&
      Objects.equals(
        this.maxFacetHits,
        searchForFacetValuesRequest.maxFacetHits
      )
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(params, facetQuery, maxFacetHits);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class SearchForFacetValuesRequest {\n");
    sb.append("    params: ").append(toIndentedString(params)).append("\n");
    sb
      .append("    facetQuery: ")
      .append(toIndentedString(facetQuery))
      .append("\n");
    sb
      .append("    maxFacetHits: ")
      .append(toIndentedString(maxFacetHits))
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
