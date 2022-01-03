package com.algolia.model;

import com.google.gson.annotations.SerializedName;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** The `getObjects` requests. */
@ApiModel(description = "The `getObjects` requests.")
public class GetObjectsObject {

  public static final String SERIALIZED_NAME_REQUESTS = "requests";

  @SerializedName(SERIALIZED_NAME_REQUESTS)
  private List<MultipleGetObjectsObject> requests = null;

  public GetObjectsObject requests(List<MultipleGetObjectsObject> requests) {
    this.requests = requests;
    return this;
  }

  public GetObjectsObject addRequestsItem(
    MultipleGetObjectsObject requestsItem
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
  @ApiModelProperty(value = "")
  public List<MultipleGetObjectsObject> getRequests() {
    return requests;
  }

  public void setRequests(List<MultipleGetObjectsObject> requests) {
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
    GetObjectsObject getObjectsObject = (GetObjectsObject) o;
    return Objects.equals(this.requests, getObjectsObject.requests);
  }

  @Override
  public int hashCode() {
    return Objects.hash(requests);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class GetObjectsObject {\n");
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
