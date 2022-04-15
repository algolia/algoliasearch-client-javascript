package com.algolia.model.analytics;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** GetTopFiltersNoResultsValues */
public class GetTopFiltersNoResultsValues {

  @SerializedName("count")
  private Integer count;

  @SerializedName("values")
  private List<GetTopFiltersNoResultsValue> values = new ArrayList<>();

  public GetTopFiltersNoResultsValues setCount(Integer count) {
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

  public GetTopFiltersNoResultsValues setValues(
    List<GetTopFiltersNoResultsValue> values
  ) {
    this.values = values;
    return this;
  }

  public GetTopFiltersNoResultsValues addValuesItem(
    GetTopFiltersNoResultsValue valuesItem
  ) {
    this.values.add(valuesItem);
    return this;
  }

  /**
   * A list of filters without results.
   *
   * @return values
   */
  @javax.annotation.Nonnull
  public List<GetTopFiltersNoResultsValue> getValues() {
    return values;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    GetTopFiltersNoResultsValues getTopFiltersNoResultsValues = (GetTopFiltersNoResultsValues) o;
    return (
      Objects.equals(this.count, getTopFiltersNoResultsValues.count) &&
      Objects.equals(this.values, getTopFiltersNoResultsValues.values)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(count, values);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class GetTopFiltersNoResultsValues {\n");
    sb.append("    count: ").append(toIndentedString(count)).append("\n");
    sb.append("    values: ").append(toIndentedString(values)).append("\n");
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
