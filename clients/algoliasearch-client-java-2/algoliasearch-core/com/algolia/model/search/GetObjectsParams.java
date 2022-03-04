package com.algolia.model.search;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** The `getObjects` parameters. */
public class GetObjectsParams {

  @SerializedName("requests")
  private List<MultipleGetObjectsParams> requests = null;

  public GetObjectsParams requests(List<MultipleGetObjectsParams> requests) {
    this.requests = requests;
    return this;
  }

  public GetObjectsParams addRequestsItem(
    MultipleGetObjectsParams requestsItem
  ) {
    if (this.requests == null) {
      this.requests = new ArrayList<>();
    }
    this.requests.add(requestsItem);
    return this;
  }

  /**
   * Get requests
   *
   * @return requests
   */
  @javax.annotation.Nullable
  public List<MultipleGetObjectsParams> getRequests() {
    return requests;
  }

  public void setRequests(List<MultipleGetObjectsParams> requests) {
    this.requests = requests;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    GetObjectsParams getObjectsParams = (GetObjectsParams) o;
    return Objects.equals(this.requests, getObjectsParams.requests);
  }

  @Override
  public int hashCode() {
    return Objects.hash(requests);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class GetObjectsParams {\n");
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
