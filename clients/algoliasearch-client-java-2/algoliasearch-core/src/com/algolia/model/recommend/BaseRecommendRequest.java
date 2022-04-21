package com.algolia.model.recommend;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** BaseRecommendRequest */
public class BaseRecommendRequest {

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

  public BaseRecommendRequest setIndexName(String indexName) {
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

  public BaseRecommendRequest setThreshold(Integer threshold) {
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

  public BaseRecommendRequest setMaxRecommendations(
    Integer maxRecommendations
  ) {
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

  public BaseRecommendRequest setQueryParameters(
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

  public BaseRecommendRequest setFallbackParameters(
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
    BaseRecommendRequest baseRecommendRequest = (BaseRecommendRequest) o;
    return (
      Objects.equals(this.indexName, baseRecommendRequest.indexName) &&
      Objects.equals(this.threshold, baseRecommendRequest.threshold) &&
      Objects.equals(
        this.maxRecommendations,
        baseRecommendRequest.maxRecommendations
      ) &&
      Objects.equals(
        this.queryParameters,
        baseRecommendRequest.queryParameters
      ) &&
      Objects.equals(
        this.fallbackParameters,
        baseRecommendRequest.fallbackParameters
      )
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(
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
    sb.append("class BaseRecommendRequest {\n");
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
