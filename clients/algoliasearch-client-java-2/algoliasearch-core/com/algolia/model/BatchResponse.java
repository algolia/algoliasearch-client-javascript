package com.algolia.model;

import com.google.gson.annotations.SerializedName;
import io.swagger.annotations.ApiModelProperty;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** BatchResponse */
public class BatchResponse {

  public static final String SERIALIZED_NAME_TASK_I_D = "taskID";

  @SerializedName(SERIALIZED_NAME_TASK_I_D)
  private Integer taskID;

  public static final String SERIALIZED_NAME_OBJECT_I_DS = "objectIDs";

  @SerializedName(SERIALIZED_NAME_OBJECT_I_DS)
  private List<String> objectIDs = null;

  public BatchResponse taskID(Integer taskID) {
    this.taskID = taskID;
    return this;
  }

  /**
   * taskID of the indexing task to wait for.
   *
   * @return taskID
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "taskID of the indexing task to wait for.")
  public Integer getTaskID() {
    return taskID;
  }

  public void setTaskID(Integer taskID) {
    this.taskID = taskID;
  }

  public BatchResponse objectIDs(List<String> objectIDs) {
    this.objectIDs = objectIDs;
    return this;
  }

  public BatchResponse addObjectIDsItem(String objectIDsItem) {
    if (this.objectIDs == null) {
      this.objectIDs = new ArrayList<>();
    }
    this.objectIDs.add(objectIDsItem);
    return this;
  }

  /**
   * List of objectID.
   *
   * @return objectIDs
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "List of objectID.")
  public List<String> getObjectIDs() {
    return objectIDs;
  }

  public void setObjectIDs(List<String> objectIDs) {
    this.objectIDs = objectIDs;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    BatchResponse batchResponse = (BatchResponse) o;
    return (
      Objects.equals(this.taskID, batchResponse.taskID) &&
      Objects.equals(this.objectIDs, batchResponse.objectIDs)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(taskID, objectIDs);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class BatchResponse {\n");
    sb.append("    taskID: ").append(toIndentedString(taskID)).append("\n");
    sb
      .append("    objectIDs: ")
      .append(toIndentedString(objectIDs))
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
