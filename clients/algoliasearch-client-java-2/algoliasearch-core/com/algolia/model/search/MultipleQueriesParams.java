package com.algolia.model.search;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** MultipleQueriesParams */
public class MultipleQueriesParams {

  @SerializedName("requests")
  private List<MultipleQueries> requests = new ArrayList<>();

  @SerializedName("strategy")
  private MultipleQueriesStrategy strategy;

  public MultipleQueriesParams setRequests(List<MultipleQueries> requests) {
    this.requests = requests;
    return this;
  }

  public MultipleQueriesParams addRequestsItem(MultipleQueries requestsItem) {
    this.requests.add(requestsItem);
    return this;
  }

  /**
   * Get requests
   *
   * @return requests
   */
  @javax.annotation.Nonnull
  public List<MultipleQueries> getRequests() {
    return requests;
  }

  public MultipleQueriesParams setStrategy(MultipleQueriesStrategy strategy) {
    this.strategy = strategy;
    return this;
  }

  /**
   * Get strategy
   *
   * @return strategy
   */
  @javax.annotation.Nullable
  public MultipleQueriesStrategy getStrategy() {
    return strategy;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    MultipleQueriesParams multipleQueriesParams = (MultipleQueriesParams) o;
    return (
      Objects.equals(this.requests, multipleQueriesParams.requests) &&
      Objects.equals(this.strategy, multipleQueriesParams.strategy)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(requests, strategy);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class MultipleQueriesParams {\n");
    sb.append("    requests: ").append(toIndentedString(requests)).append("\n");
    sb.append("    strategy: ").append(toIndentedString(strategy)).append("\n");
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
