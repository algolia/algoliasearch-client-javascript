package com.algolia.model;

import com.google.gson.annotations.SerializedName;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** The `batch` requests. */
@ApiModel(description = "The `batch` requests.")
public class BatchWriteObject {

  public static final String SERIALIZED_NAME_REQUESTS = "requests";

  @SerializedName(SERIALIZED_NAME_REQUESTS)
  private List<Operation> requests = null;

  public BatchWriteObject requests(List<Operation> requests) {
    this.requests = requests;
    return this;
  }

  public BatchWriteObject addRequestsItem(Operation requestsItem) {
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
  @ApiModelProperty(value = "")
  public List<Operation> getRequests() {
    return requests;
  }

  public void setRequests(List<Operation> requests) {
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
    BatchWriteObject batchWriteObject = (BatchWriteObject) o;
    return Objects.equals(this.requests, batchWriteObject.requests);
  }

  @Override
  public int hashCode() {
    return Objects.hash(requests);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class BatchWriteObject {\n");
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
