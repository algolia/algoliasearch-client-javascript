package com.algolia.model.analytics;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** GetTopFilterForAttributeResponse */
public class GetTopFilterForAttributeResponse {

  @SerializedName("values")
  private List<GetTopFilterForAttribute> values = new ArrayList<>();

  public GetTopFilterForAttributeResponse setValues(
    List<GetTopFilterForAttribute> values
  ) {
    this.values = values;
    return this;
  }

  public GetTopFilterForAttributeResponse addValuesItem(
    GetTopFilterForAttribute valuesItem
  ) {
    this.values.add(valuesItem);
    return this;
  }

  /**
   * A list of filters for the given attributes.
   *
   * @return values
   */
  @javax.annotation.Nonnull
  public List<GetTopFilterForAttribute> getValues() {
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
    GetTopFilterForAttributeResponse getTopFilterForAttributeResponse = (GetTopFilterForAttributeResponse) o;
    return Objects.equals(this.values, getTopFilterForAttributeResponse.values);
  }

  @Override
  public int hashCode() {
    return Objects.hash(values);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class GetTopFilterForAttributeResponse {\n");
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
