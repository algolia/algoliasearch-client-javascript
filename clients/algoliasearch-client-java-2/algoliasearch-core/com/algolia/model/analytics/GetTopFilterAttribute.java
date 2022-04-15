package com.algolia.model.analytics;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** GetTopFilterAttribute */
public class GetTopFilterAttribute {

  @SerializedName("attribute")
  private String attribute;

  @SerializedName("count")
  private Integer count;

  public GetTopFilterAttribute setAttribute(String attribute) {
    this.attribute = attribute;
    return this;
  }

  /**
   * The attribute.
   *
   * @return attribute
   */
  @javax.annotation.Nonnull
  public String getAttribute() {
    return attribute;
  }

  public GetTopFilterAttribute setCount(Integer count) {
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

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    GetTopFilterAttribute getTopFilterAttribute = (GetTopFilterAttribute) o;
    return (
      Objects.equals(this.attribute, getTopFilterAttribute.attribute) &&
      Objects.equals(this.count, getTopFilterAttribute.count)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(attribute, count);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class GetTopFilterAttribute {\n");
    sb
      .append("    attribute: ")
      .append(toIndentedString(attribute))
      .append("\n");
    sb.append("    count: ").append(toIndentedString(count)).append("\n");
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
