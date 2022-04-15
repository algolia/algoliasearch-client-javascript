package com.algolia.model.abtesting;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** AbTestsVariantSearchParams */
public class AbTestsVariantSearchParams {

  @SerializedName("index")
  private String index;

  @SerializedName("trafficPercentage")
  private Integer trafficPercentage;

  @SerializedName("description")
  private String description;

  @SerializedName("customSearchParameters")
  private Object customSearchParameters;

  public AbTestsVariantSearchParams setIndex(String index) {
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

  public AbTestsVariantSearchParams setTrafficPercentage(
    Integer trafficPercentage
  ) {
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

  public AbTestsVariantSearchParams setDescription(String description) {
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

  public AbTestsVariantSearchParams setCustomSearchParameters(
    Object customSearchParameters
  ) {
    this.customSearchParameters = customSearchParameters;
    return this;
  }

  /**
   * Get customSearchParameters
   *
   * @return customSearchParameters
   */
  @javax.annotation.Nonnull
  public Object getCustomSearchParameters() {
    return customSearchParameters;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    AbTestsVariantSearchParams abTestsVariantSearchParams = (AbTestsVariantSearchParams) o;
    return (
      Objects.equals(this.index, abTestsVariantSearchParams.index) &&
      Objects.equals(
        this.trafficPercentage,
        abTestsVariantSearchParams.trafficPercentage
      ) &&
      Objects.equals(
        this.description,
        abTestsVariantSearchParams.description
      ) &&
      Objects.equals(
        this.customSearchParameters,
        abTestsVariantSearchParams.customSearchParameters
      )
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(
      index,
      trafficPercentage,
      description,
      customSearchParameters
    );
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class AbTestsVariantSearchParams {\n");
    sb.append("    index: ").append(toIndentedString(index)).append("\n");
    sb
      .append("    trafficPercentage: ")
      .append(toIndentedString(trafficPercentage))
      .append("\n");
    sb
      .append("    description: ")
      .append(toIndentedString(description))
      .append("\n");
    sb
      .append("    customSearchParameters: ")
      .append(toIndentedString(customSearchParameters))
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
