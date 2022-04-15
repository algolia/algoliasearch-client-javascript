package com.algolia.model.analytics;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** TopSearchesResponse */
public class TopSearchesResponse {

  @SerializedName("searches")
  private List<GetSearchesNoResultsResponseSearches> searches = new ArrayList<>();

  public TopSearchesResponse setSearches(
    List<GetSearchesNoResultsResponseSearches> searches
  ) {
    this.searches = searches;
    return this;
  }

  public TopSearchesResponse addSearchesItem(
    GetSearchesNoResultsResponseSearches searchesItem
  ) {
    this.searches.add(searchesItem);
    return this;
  }

  /**
   * A list of top searches with their count.
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
    TopSearchesResponse topSearchesResponse = (TopSearchesResponse) o;
    return Objects.equals(this.searches, topSearchesResponse.searches);
  }

  @Override
  public int hashCode() {
    return Objects.hash(searches);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class TopSearchesResponse {\n");
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
