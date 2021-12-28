package com.algolia.model;

import com.google.gson.annotations.SerializedName;
import io.swagger.annotations.ApiModelProperty;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** SearchForFacetValuesResponse */
public class SearchForFacetValuesResponse {

  public static final String SERIALIZED_NAME_FACET_HITS = "facetHits";

  @SerializedName(SERIALIZED_NAME_FACET_HITS)
  private List<SearchForFacetValuesResponseFacetHits> facetHits = new ArrayList<>();

  public SearchForFacetValuesResponse facetHits(
    List<SearchForFacetValuesResponseFacetHits> facetHits
  ) {
    this.facetHits = facetHits;
    return this;
  }

  public SearchForFacetValuesResponse addFacetHitsItem(
    SearchForFacetValuesResponseFacetHits facetHitsItem
  ) {
    this.facetHits.add(facetHitsItem);
    return this;
  }

  /**
   * Get facetHits
   *
   * @return facetHits
   */
  @javax.annotation.Nonnull
  @ApiModelProperty(required = true, value = "")
  public List<SearchForFacetValuesResponseFacetHits> getFacetHits() {
    return facetHits;
  }

  public void setFacetHits(
    List<SearchForFacetValuesResponseFacetHits> facetHits
  ) {
    this.facetHits = facetHits;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    SearchForFacetValuesResponse searchForFacetValuesResponse = (SearchForFacetValuesResponse) o;
    return Objects.equals(
      this.facetHits,
      searchForFacetValuesResponse.facetHits
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(facetHits);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class SearchForFacetValuesResponse {\n");
    sb
      .append("    facetHits: ")
      .append(toIndentedString(facetHits))
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
