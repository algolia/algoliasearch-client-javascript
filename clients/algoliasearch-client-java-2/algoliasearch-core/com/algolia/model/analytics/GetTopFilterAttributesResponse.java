package com.algolia.model.analytics;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** GetTopFilterAttributesResponse */
public class GetTopFilterAttributesResponse {

  @SerializedName("attributes")
  private List<GetTopFilterAttribute> attributes = new ArrayList<>();

  public GetTopFilterAttributesResponse setAttributes(
    List<GetTopFilterAttribute> attributes
  ) {
    this.attributes = attributes;
    return this;
  }

  public GetTopFilterAttributesResponse addAttributesItem(
    GetTopFilterAttribute attributesItem
  ) {
    this.attributes.add(attributesItem);
    return this;
  }

  /**
   * A list of attributes with their count.
   *
   * @return attributes
   */
  @javax.annotation.Nonnull
  public List<GetTopFilterAttribute> getAttributes() {
    return attributes;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    GetTopFilterAttributesResponse getTopFilterAttributesResponse = (GetTopFilterAttributesResponse) o;
    return Objects.equals(
      this.attributes,
      getTopFilterAttributesResponse.attributes
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(attributes);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class GetTopFilterAttributesResponse {\n");
    sb
      .append("    attributes: ")
      .append(toIndentedString(attributes))
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
