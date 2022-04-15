package com.algolia.model.recommend;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** BaseSearchResponseFacetsStats */
public class BaseSearchResponseFacetsStats {

  @SerializedName("min")
  private Integer min;

  @SerializedName("max")
  private Integer max;

  @SerializedName("avg")
  private Integer avg;

  @SerializedName("sum")
  private Integer sum;

  public BaseSearchResponseFacetsStats setMin(Integer min) {
    this.min = min;
    return this;
  }

  /**
   * The minimum value in the result set.
   *
   * @return min
   */
  @javax.annotation.Nullable
  public Integer getMin() {
    return min;
  }

  public BaseSearchResponseFacetsStats setMax(Integer max) {
    this.max = max;
    return this;
  }

  /**
   * The maximum value in the result set.
   *
   * @return max
   */
  @javax.annotation.Nullable
  public Integer getMax() {
    return max;
  }

  public BaseSearchResponseFacetsStats setAvg(Integer avg) {
    this.avg = avg;
    return this;
  }

  /**
   * The average facet value in the result set.
   *
   * @return avg
   */
  @javax.annotation.Nullable
  public Integer getAvg() {
    return avg;
  }

  public BaseSearchResponseFacetsStats setSum(Integer sum) {
    this.sum = sum;
    return this;
  }

  /**
   * The sum of all values in the result set.
   *
   * @return sum
   */
  @javax.annotation.Nullable
  public Integer getSum() {
    return sum;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    BaseSearchResponseFacetsStats baseSearchResponseFacetsStats = (BaseSearchResponseFacetsStats) o;
    return (
      Objects.equals(this.min, baseSearchResponseFacetsStats.min) &&
      Objects.equals(this.max, baseSearchResponseFacetsStats.max) &&
      Objects.equals(this.avg, baseSearchResponseFacetsStats.avg) &&
      Objects.equals(this.sum, baseSearchResponseFacetsStats.sum)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(min, max, avg, sum);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class BaseSearchResponseFacetsStats {\n");
    sb.append("    min: ").append(toIndentedString(min)).append("\n");
    sb.append("    max: ").append(toIndentedString(max)).append("\n");
    sb.append("    avg: ").append(toIndentedString(avg)).append("\n");
    sb.append("    sum: ").append(toIndentedString(sum)).append("\n");
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
