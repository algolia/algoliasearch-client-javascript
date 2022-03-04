package com.algolia.model.search;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** MultipleBatchResponse */
public class MultipleBatchResponse {

  @SerializedName("taskID")
  private Object taskID;

  @SerializedName("objectIDs")
  private List<String> objectIDs = null;

  public MultipleBatchResponse taskID(Object taskID) {
    this.taskID = taskID;
    return this;
  }

  /**
   * List of tasksIDs per index.
   *
   * @return taskID
   */
  @javax.annotation.Nullable
  public Object getTaskID() {
    return taskID;
  }

  public void setTaskID(Object taskID) {
    this.taskID = taskID;
  }

  public MultipleBatchResponse objectIDs(List<String> objectIDs) {
    this.objectIDs = objectIDs;
    return this;
  }

  public MultipleBatchResponse addObjectIDsItem(String objectIDsItem) {
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
    MultipleBatchResponse multipleBatchResponse = (MultipleBatchResponse) o;
    return (
      Objects.equals(this.taskID, multipleBatchResponse.taskID) &&
      Objects.equals(this.objectIDs, multipleBatchResponse.objectIDs)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(taskID, objectIDs);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class MultipleBatchResponse {\n");
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
