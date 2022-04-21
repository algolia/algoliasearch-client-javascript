package com.algolia.model.abtesting;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** AddABTestsRequest */
public class AddABTestsRequest {

  @SerializedName("name")
  private String name;

  @SerializedName("variant")
  private List<AddABTestsVariant> variant = new ArrayList<>();

  @SerializedName("endAt")
  private String endAt;

  public AddABTestsRequest setName(String name) {
    this.name = name;
    return this;
  }

  /**
   * A/B test name.
   *
   * @return name
   */
  @javax.annotation.Nonnull
  public String getName() {
    return name;
  }

  public AddABTestsRequest setVariant(List<AddABTestsVariant> variant) {
    this.variant = variant;
    return this;
  }

  public AddABTestsRequest addVariantItem(AddABTestsVariant variantItem) {
    this.variant.add(variantItem);
    return this;
  }

  /**
   * List of 2 variants for the A/B test.
   *
   * @return variant
   */
  @javax.annotation.Nonnull
  public List<AddABTestsVariant> getVariant() {
    return variant;
  }

  public AddABTestsRequest setEndAt(String endAt) {
    this.endAt = endAt;
    return this;
  }

  /**
   * End date for the A/B test expressed as YYYY-MM-DDThh:mm:ssZ.
   *
   * @return endAt
   */
  @javax.annotation.Nonnull
  public String getEndAt() {
    return endAt;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    AddABTestsRequest addABTestsRequest = (AddABTestsRequest) o;
    return (
      Objects.equals(this.name, addABTestsRequest.name) &&
      Objects.equals(this.variant, addABTestsRequest.variant) &&
      Objects.equals(this.endAt, addABTestsRequest.endAt)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(name, variant, endAt);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class AddABTestsRequest {\n");
    sb.append("    name: ").append(toIndentedString(name)).append("\n");
    sb.append("    variant: ").append(toIndentedString(variant)).append("\n");
    sb.append("    endAt: ").append(toIndentedString(endAt)).append("\n");
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
