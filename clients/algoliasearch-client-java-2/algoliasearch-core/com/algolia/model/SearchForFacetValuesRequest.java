package com.algolia.model;

import com.google.gson.annotations.SerializedName;
import io.swagger.annotations.ApiModelProperty;
import java.util.Objects;

/** SearchForFacetValuesRequest */
public class SearchForFacetValuesRequest {

  public static final String SERIALIZED_NAME_PARAMS = "params";

  @SerializedName(SERIALIZED_NAME_PARAMS)
  private String params = "";

  public static final String SERIALIZED_NAME_FACET_QUERY = "facetQuery";

  @SerializedName(SERIALIZED_NAME_FACET_QUERY)
  private String facetQuery = "";

  public static final String SERIALIZED_NAME_MAX_FACET_HITS = "maxFacetHits";

  @SerializedName(SERIALIZED_NAME_MAX_FACET_HITS)
  private Integer maxFacetHits = 10;

  public SearchForFacetValuesRequest params(String params) {
    this.params = params;
    return this;
  }

  /**
   * Search parameters as URL-encoded query string.
   *
   * @return params
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "Search parameters as URL-encoded query string.")
  public String getParams() {
    return params;
  }

  public void setParams(String params) {
    this.params = params;
  }

  public SearchForFacetValuesRequest facetQuery(String facetQuery) {
    this.facetQuery = facetQuery;
    return this;
  }

  /**
   * Text to search inside the facet's values.
   *
   * @return facetQuery
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "Text to search inside the facet's values.")
  public String getFacetQuery() {
    return facetQuery;
  }

  public void setFacetQuery(String facetQuery) {
    this.facetQuery = facetQuery;
  }

  public SearchForFacetValuesRequest maxFacetHits(Integer maxFacetHits) {
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
  @ApiModelProperty(
    value = "Maximum number of facet hits to return during a search for facet values. For performance" +
    " reasons, the maximum allowed number of returned values is 100."
  )
  public Integer getMaxFacetHits() {
    return maxFacetHits;
  }

  public void setMaxFacetHits(Integer maxFacetHits) {
    this.maxFacetHits = maxFacetHits;
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
