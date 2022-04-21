package com.algolia.model.analytics;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** GetTopFiltersNoResultsResponse */
public class GetTopFiltersNoResultsResponse {

  @SerializedName("values")
  private List<GetTopFiltersNoResultsValues> values = new ArrayList<>();

  public GetTopFiltersNoResultsResponse setValues(
    List<GetTopFiltersNoResultsValues> values
  ) {
    this.values = values;
    return this;
  }

  public GetTopFiltersNoResultsResponse addValuesItem(
    GetTopFiltersNoResultsValues valuesItem
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
  public List<GetTopFiltersNoResultsValues> getValues() {
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
    GetTopFiltersNoResultsResponse getTopFiltersNoResultsResponse = (GetTopFiltersNoResultsResponse) o;
    return Objects.equals(this.values, getTopFiltersNoResultsResponse.values);
  }

  @Override
  public int hashCode() {
    return Objects.hash(values);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class GetTopFiltersNoResultsResponse {\n");
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
