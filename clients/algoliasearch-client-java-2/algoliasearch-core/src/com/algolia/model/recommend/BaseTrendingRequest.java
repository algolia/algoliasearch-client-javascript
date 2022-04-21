package com.algolia.model.recommend;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** BaseTrendingRequest */
public class BaseTrendingRequest {

  @SerializedName("model")
  private TrendingModels model;

  @SerializedName("facetName")
  private String facetName;

  @SerializedName("facetValue")
  private String facetValue;

  public BaseTrendingRequest setModel(TrendingModels model) {
    this.model = model;
    return this;
  }

  /**
   * Get model
   *
   * @return model
   */
  @javax.annotation.Nonnull
  public TrendingModels getModel() {
    return model;
  }

  public BaseTrendingRequest setFacetName(String facetName) {
    this.facetName = facetName;
    return this;
  }

  /**
   * The facet name to use for trending models.
   *
   * @return facetName
   */
  @javax.annotation.Nullable
  public String getFacetName() {
    return facetName;
  }

  public BaseTrendingRequest setFacetValue(String facetValue) {
    this.facetValue = facetValue;
    return this;
  }

  /**
   * The facet value to use for trending models.
   *
   * @return facetValue
   */
  @javax.annotation.Nullable
  public String getFacetValue() {
    return facetValue;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    BaseTrendingRequest baseTrendingRequest = (BaseTrendingRequest) o;
    return (
      Objects.equals(this.model, baseTrendingRequest.model) &&
      Objects.equals(this.facetName, baseTrendingRequest.facetName) &&
      Objects.equals(this.facetValue, baseTrendingRequest.facetValue)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(model, facetName, facetValue);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class BaseTrendingRequest {\n");
    sb.append("    model: ").append(toIndentedString(model)).append("\n");
    sb
      .append("    facetName: ")
      .append(toIndentedString(facetName))
      .append("\n");
    sb
      .append("    facetValue: ")
      .append(toIndentedString(facetValue))
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
