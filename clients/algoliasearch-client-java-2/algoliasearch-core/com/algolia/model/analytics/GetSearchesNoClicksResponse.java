package com.algolia.model.analytics;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** GetSearchesNoClicksResponse */
public class GetSearchesNoClicksResponse {

  @SerializedName("searches")
  private List<GetSearchesNoClicksResponseSearches> searches = new ArrayList<>();

  public GetSearchesNoClicksResponse setSearches(
    List<GetSearchesNoClicksResponseSearches> searches
  ) {
    this.searches = searches;
    return this;
  }

  public GetSearchesNoClicksResponse addSearchesItem(
    GetSearchesNoClicksResponseSearches searchesItem
  ) {
    this.searches.add(searchesItem);
    return this;
  }

  /**
   * A list of searches with no clicks and their count.
   *
   * @return searches
   */
  @javax.annotation.Nonnull
  public List<GetSearchesNoClicksResponseSearches> getSearches() {
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
    GetSearchesNoClicksResponse getSearchesNoClicksResponse = (GetSearchesNoClicksResponse) o;
    return Objects.equals(this.searches, getSearchesNoClicksResponse.searches);
  }

  @Override
  public int hashCode() {
    return Objects.hash(searches);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class GetSearchesNoClicksResponse {\n");
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
