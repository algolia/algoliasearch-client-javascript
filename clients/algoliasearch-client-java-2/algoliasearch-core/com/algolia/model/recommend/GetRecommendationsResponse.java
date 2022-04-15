package com.algolia.model.recommend;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** GetRecommendationsResponse */
public class GetRecommendationsResponse {

  @SerializedName("results")
  private List<RecommendationsResponse> results = null;

  public GetRecommendationsResponse setResults(
    List<RecommendationsResponse> results
  ) {
    this.results = results;
    return this;
  }

  public GetRecommendationsResponse addResultsItem(
    RecommendationsResponse resultsItem
  ) {
    if (this.results == null) {
      this.results = new ArrayList<>();
    }
    this.results.add(resultsItem);
    return this;
  }

  /**
   * Get results
   *
   * @return results
   */
  @javax.annotation.Nullable
  public List<RecommendationsResponse> getResults() {
    return results;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    GetRecommendationsResponse getRecommendationsResponse = (GetRecommendationsResponse) o;
    return Objects.equals(this.results, getRecommendationsResponse.results);
  }

  @Override
  public int hashCode() {
    return Objects.hash(results);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class GetRecommendationsResponse {\n");
    sb.append("    results: ").append(toIndentedString(results)).append("\n");
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
