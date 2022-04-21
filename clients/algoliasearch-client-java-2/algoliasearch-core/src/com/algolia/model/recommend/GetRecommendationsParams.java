package com.algolia.model.recommend;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** The `getRecommendations` parameters. */
public class GetRecommendationsParams {

  @SerializedName("requests")
  private List<RecommendationsRequest> requests = new ArrayList<>();

  public GetRecommendationsParams setRequests(
    List<RecommendationsRequest> requests
  ) {
    this.requests = requests;
    return this;
  }

  public GetRecommendationsParams addRequestsItem(
    RecommendationsRequest requestsItem
  ) {
    this.requests.add(requestsItem);
    return this;
  }

  /**
   * The `getRecommendations` requests.
   *
   * @return requests
   */
  @javax.annotation.Nonnull
  public List<RecommendationsRequest> getRequests() {
    return requests;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    GetRecommendationsParams getRecommendationsParams = (GetRecommendationsParams) o;
    return Objects.equals(this.requests, getRecommendationsParams.requests);
  }

  @Override
  public int hashCode() {
    return Objects.hash(requests);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class GetRecommendationsParams {\n");
    sb.append("    requests: ").append(toIndentedString(requests)).append("\n");
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
