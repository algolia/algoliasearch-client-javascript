package com.algolia.model.analytics;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** GetSearchesNoResultsResponseSearches */
public class GetSearchesNoResultsResponseSearches {

  @SerializedName("search")
  private String search;

  @SerializedName("count")
  private Integer count;

  @SerializedName("nbHits")
  private Integer nbHits;

  public GetSearchesNoResultsResponseSearches setSearch(String search) {
    this.search = search;
    return this;
  }

  /**
   * The search query.
   *
   * @return search
   */
  @javax.annotation.Nonnull
  public String getSearch() {
    return search;
  }

  public GetSearchesNoResultsResponseSearches setCount(Integer count) {
    this.count = count;
    return this;
  }

  /**
   * The number of occurrences.
   *
   * @return count
   */
  @javax.annotation.Nonnull
  public Integer getCount() {
    return count;
  }

  public GetSearchesNoResultsResponseSearches setNbHits(Integer nbHits) {
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

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    GetSearchesNoResultsResponseSearches getSearchesNoResultsResponseSearches = (GetSearchesNoResultsResponseSearches) o;
    return (
      Objects.equals(
        this.search,
        getSearchesNoResultsResponseSearches.search
      ) &&
      Objects.equals(this.count, getSearchesNoResultsResponseSearches.count) &&
      Objects.equals(this.nbHits, getSearchesNoResultsResponseSearches.nbHits)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(search, count, nbHits);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class GetSearchesNoResultsResponseSearches {\n");
    sb.append("    search: ").append(toIndentedString(search)).append("\n");
    sb.append("    count: ").append(toIndentedString(count)).append("\n");
    sb.append("    nbHits: ").append(toIndentedString(nbHits)).append("\n");
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
