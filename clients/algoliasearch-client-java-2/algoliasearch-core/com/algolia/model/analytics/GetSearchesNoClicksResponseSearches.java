package com.algolia.model.analytics;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** GetSearchesNoClicksResponseSearches */
public class GetSearchesNoClicksResponseSearches {

  @SerializedName("search")
  private String search;

  @SerializedName("count")
  private Integer count;

  @SerializedName("withFilterCount")
  private Integer withFilterCount;

  public GetSearchesNoClicksResponseSearches setSearch(String search) {
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

  public GetSearchesNoClicksResponseSearches setCount(Integer count) {
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

  public GetSearchesNoClicksResponseSearches setWithFilterCount(
    Integer withFilterCount
  ) {
    this.withFilterCount = withFilterCount;
    return this;
  }

  /**
   * The number of occurrences.
   *
   * @return withFilterCount
   */
  @javax.annotation.Nonnull
  public Integer getWithFilterCount() {
    return withFilterCount;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    GetSearchesNoClicksResponseSearches getSearchesNoClicksResponseSearches = (GetSearchesNoClicksResponseSearches) o;
    return (
      Objects.equals(this.search, getSearchesNoClicksResponseSearches.search) &&
      Objects.equals(this.count, getSearchesNoClicksResponseSearches.count) &&
      Objects.equals(
        this.withFilterCount,
        getSearchesNoClicksResponseSearches.withFilterCount
      )
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(search, count, withFilterCount);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class GetSearchesNoClicksResponseSearches {\n");
    sb.append("    search: ").append(toIndentedString(search)).append("\n");
    sb.append("    count: ").append(toIndentedString(count)).append("\n");
    sb
      .append("    withFilterCount: ")
      .append(toIndentedString(withFilterCount))
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
