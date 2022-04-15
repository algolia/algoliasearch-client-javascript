package com.algolia.model.analytics;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** GetSearchesNoResultsResponse */
public class GetSearchesNoResultsResponse {

  @SerializedName("searches")
  private List<GetSearchesNoResultsResponseSearches> searches = new ArrayList<>();

  public GetSearchesNoResultsResponse setSearches(
    List<GetSearchesNoResultsResponseSearches> searches
  ) {
    this.searches = searches;
    return this;
  }

  public GetSearchesNoResultsResponse addSearchesItem(
    GetSearchesNoResultsResponseSearches searchesItem
  ) {
    this.searches.add(searchesItem);
    return this;
  }

  /**
   * A list of searches with no results and their count.
   *
   * @return searches
   */
  @javax.annotation.Nonnull
  public List<GetSearchesNoResultsResponseSearches> getSearches() {
    return searches;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    GetSearchesNoResultsResponse getSearchesNoResultsResponse = (GetSearchesNoResultsResponse) o;
    return Objects.equals(this.searches, getSearchesNoResultsResponse.searches);
  }

  @Override
  public int hashCode() {
    return Objects.hash(searches);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class GetSearchesNoResultsResponse {\n");
    sb.append("    searches: ").append(toIndentedString(searches)).append("\n");
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
