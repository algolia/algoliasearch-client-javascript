package com.algolia.model.abtesting;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** ListABTestsResponse */
public class ListABTestsResponse {

  @SerializedName("abtests")
  private List<ABTest> abtests = new ArrayList<>();

  @SerializedName("count")
  private Integer count;

  @SerializedName("total")
  private Integer total;

  public ListABTestsResponse setAbtests(List<ABTest> abtests) {
    this.abtests = abtests;
    return this;
  }

  public ListABTestsResponse addAbtestsItem(ABTest abtestsItem) {
    this.abtests.add(abtestsItem);
    return this;
  }

  /**
   * List of A/B tests.
   *
   * @return abtests
   */
  @javax.annotation.Nonnull
  public List<ABTest> getAbtests() {
    return abtests;
  }

  public ListABTestsResponse setCount(Integer count) {
    this.count = count;
    return this;
  }

  /**
   * Number of A/B tests found for the app.
   *
   * @return count
   */
  @javax.annotation.Nonnull
  public Integer getCount() {
    return count;
  }

  public ListABTestsResponse setTotal(Integer total) {
    this.total = total;
    return this;
  }

  /**
   * Number of A/B tests retrievable.
   *
   * @return total
   */
  @javax.annotation.Nonnull
  public Integer getTotal() {
    return total;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ListABTestsResponse listABTestsResponse = (ListABTestsResponse) o;
    return (
      Objects.equals(this.abtests, listABTestsResponse.abtests) &&
      Objects.equals(this.count, listABTestsResponse.count) &&
      Objects.equals(this.total, listABTestsResponse.total)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(abtests, count, total);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ListABTestsResponse {\n");
    sb.append("    abtests: ").append(toIndentedString(abtests)).append("\n");
    sb.append("    count: ").append(toIndentedString(count)).append("\n");
    sb.append("    total: ").append(toIndentedString(total)).append("\n");
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
