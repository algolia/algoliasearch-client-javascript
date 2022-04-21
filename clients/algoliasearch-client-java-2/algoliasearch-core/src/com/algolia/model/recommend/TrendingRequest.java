package com.algolia.model.recommend;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** TrendingRequest */
public class TrendingRequest {

  @SerializedName("model")
  private TrendingModels model;

  @SerializedName("facetName")
  private String facetName;

  @SerializedName("facetValue")
  private String facetValue;

  @SerializedName("indexName")
  private String indexName;

  @SerializedName("threshold")
  private Integer threshold;

  @SerializedName("maxRecommendations")
  private Integer maxRecommendations = 0;

  @SerializedName("queryParameters")
  private SearchParamsObject queryParameters;

  @SerializedName("fallbackParameters")
  private SearchParamsObject fallbackParameters;

  public TrendingRequest setModel(TrendingModels model) {
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

  public TrendingRequest setFacetName(String facetName) {
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

  public TrendingRequest setFacetValue(String facetValue) {
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

  public TrendingRequest setIndexName(String indexName) {
    this.indexName = indexName;
    return this;
  }

  /**
   * The Algolia index name.
   *
   * @return indexName
   */
  @javax.annotation.Nonnull
  public String getIndexName() {
    return indexName;
  }

  public TrendingRequest setThreshold(Integer threshold) {
    this.threshold = threshold;
    return this;
  }

  /**
   * The threshold to use when filtering recommendations by their score. minimum: 0 maximum: 100
   *
   * @return threshold
   */
  @javax.annotation.Nonnull
  public Integer getThreshold() {
    return threshold;
  }

  public TrendingRequest setMaxRecommendations(Integer maxRecommendations) {
    this.maxRecommendations = maxRecommendations;
    return this;
  }

  /**
   * The max number of recommendations to retrieve. If it's set to 0, all the recommendations of the
   * objectID may be returned.
   *
   * @return maxRecommendations
   */
  @javax.annotation.Nullable
  public Integer getMaxRecommendations() {
    return maxRecommendations;
  }

  public TrendingRequest setQueryParameters(
    SearchParamsObject queryParameters
  ) {
    this.queryParameters = queryParameters;
    return this;
  }

  /**
   * Get queryParameters
   *
   * @return queryParameters
   */
  @javax.annotation.Nullable
  public SearchParamsObject getQueryParameters() {
    return queryParameters;
  }

  public TrendingRequest setFallbackParameters(
    SearchParamsObject fallbackParameters
  ) {
    this.fallbackParameters = fallbackParameters;
    return this;
  }

  /**
   * Get fallbackParameters
   *
   * @return fallbackParameters
   */
  @javax.annotation.Nullable
  public SearchParamsObject getFallbackParameters() {
    return fallbackParameters;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    TrendingRequest trendingRequest = (TrendingRequest) o;
    return (
      Objects.equals(this.model, trendingRequest.model) &&
      Objects.equals(this.facetName, trendingRequest.facetName) &&
      Objects.equals(this.facetValue, trendingRequest.facetValue) &&
      Objects.equals(this.indexName, trendingRequest.indexName) &&
      Objects.equals(this.threshold, trendingRequest.threshold) &&
      Objects.equals(
        this.maxRecommendations,
        trendingRequest.maxRecommendations
      ) &&
      Objects.equals(this.queryParameters, trendingRequest.queryParameters) &&
      Objects.equals(
        this.fallbackParameters,
        trendingRequest.fallbackParameters
      )
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(
      model,
      facetName,
      facetValue,
      indexName,
      threshold,
      maxRecommendations,
      queryParameters,
      fallbackParameters
    );
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class TrendingRequest {\n");
    sb.append("    model: ").append(toIndentedString(model)).append("\n");
    sb
      .append("    facetName: ")
      .append(toIndentedString(facetName))
      .append("\n");
    sb
      .append("    facetValue: ")
      .append(toIndentedString(facetValue))
      .append("\n");
    sb
      .append("    indexName: ")
      .append(toIndentedString(indexName))
      .append("\n");
    sb
      .append("    threshold: ")
      .append(toIndentedString(threshold))
      .append("\n");
    sb
      .append("    maxRecommendations: ")
      .append(toIndentedString(maxRecommendations))
      .append("\n");
    sb
      .append("    queryParameters: ")
      .append(toIndentedString(queryParameters))
      .append("\n");
    sb
      .append("    fallbackParameters: ")
      .append(toIndentedString(fallbackParameters))
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
