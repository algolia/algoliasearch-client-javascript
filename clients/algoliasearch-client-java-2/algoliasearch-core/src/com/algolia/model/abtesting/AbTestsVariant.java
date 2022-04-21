package com.algolia.model.abtesting;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** AbTestsVariant */
public class AbTestsVariant {

  @SerializedName("index")
  private String index;

  @SerializedName("trafficPercentage")
  private Integer trafficPercentage;

  @SerializedName("description")
  private String description;

  public AbTestsVariant setIndex(String index) {
    this.index = index;
    return this;
  }

  /**
   * The index performing the A/B test.
   *
   * @return index
   */
  @javax.annotation.Nonnull
  public String getIndex() {
    return index;
  }

  public AbTestsVariant setTrafficPercentage(Integer trafficPercentage) {
    this.trafficPercentage = trafficPercentage;
    return this;
  }

  /**
   * The traffic perfecentage for the A/B test.
   *
   * @return trafficPercentage
   */
  @javax.annotation.Nonnull
  public Integer getTrafficPercentage() {
    return trafficPercentage;
  }

  public AbTestsVariant setDescription(String description) {
    this.description = description;
    return this;
  }

  /**
   * The A/B test description.
   *
   * @return description
   */
  @javax.annotation.Nullable
  public String getDescription() {
    return description;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    AbTestsVariant abTestsVariant = (AbTestsVariant) o;
    return (
      Objects.equals(this.index, abTestsVariant.index) &&
      Objects.equals(
        this.trafficPercentage,
        abTestsVariant.trafficPercentage
      ) &&
      Objects.equals(this.description, abTestsVariant.description)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(index, trafficPercentage, description);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class AbTestsVariant {\n");
    sb.append("    index: ").append(toIndentedString(index)).append("\n");
    sb
      .append("    trafficPercentage: ")
      .append(toIndentedString(trafficPercentage))
      .append("\n");
    sb
      .append("    description: ")
      .append(toIndentedString(description))
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
