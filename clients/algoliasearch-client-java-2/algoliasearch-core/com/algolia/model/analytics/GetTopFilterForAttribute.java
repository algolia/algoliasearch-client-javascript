package com.algolia.model.analytics;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** GetTopFilterForAttribute */
public class GetTopFilterForAttribute {

  @SerializedName("attribute")
  private String attribute;

  @SerializedName("operator")
  private String operator;

  @SerializedName("value")
  private String value;

  @SerializedName("count")
  private Integer count;

  public GetTopFilterForAttribute setAttribute(String attribute) {
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

  public GetTopFilterForAttribute setOperator(String operator) {
    this.operator = operator;
    return this;
  }

  /**
   * The operator.
   *
   * @return operator
   */
  @javax.annotation.Nonnull
  public String getOperator() {
    return operator;
  }

  public GetTopFilterForAttribute setValue(String value) {
    this.value = value;
    return this;
  }

  /**
   * The value of the attribute.
   *
   * @return value
   */
  @javax.annotation.Nonnull
  public String getValue() {
    return value;
  }

  public GetTopFilterForAttribute setCount(Integer count) {
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
    GetTopFilterForAttribute getTopFilterForAttribute = (GetTopFilterForAttribute) o;
    return (
      Objects.equals(this.attribute, getTopFilterForAttribute.attribute) &&
      Objects.equals(this.operator, getTopFilterForAttribute.operator) &&
      Objects.equals(this.value, getTopFilterForAttribute.value) &&
      Objects.equals(this.count, getTopFilterForAttribute.count)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(attribute, operator, value, count);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class GetTopFilterForAttribute {\n");
    sb
      .append("    attribute: ")
      .append(toIndentedString(attribute))
      .append("\n");
    sb.append("    operator: ").append(toIndentedString(operator)).append("\n");
    sb.append("    value: ").append(toIndentedString(value)).append("\n");
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
