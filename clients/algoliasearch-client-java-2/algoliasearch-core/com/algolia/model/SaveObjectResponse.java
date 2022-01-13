package com.algolia.model;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** SaveObjectResponse */
public class SaveObjectResponse {

  @SerializedName("createdAt")
  private String createdAt;

  @SerializedName("taskID")
  private Integer taskID;

  @SerializedName("objectID")
  private String objectID;

  public SaveObjectResponse createdAt(String createdAt) {
    this.createdAt = createdAt;
    return this;
  }

  /**
   * Get createdAt
   *
   * @return createdAt
   */
  @javax.annotation.Nullable
  public String getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(String createdAt) {
    this.createdAt = createdAt;
  }

  public SaveObjectResponse taskID(Integer taskID) {
    this.taskID = taskID;
    return this;
  }

  /**
   * taskID of the task to wait for.
   *
   * @return taskID
   */
  @javax.annotation.Nullable
  public Integer getTaskID() {
    return taskID;
  }

  public void setTaskID(Integer taskID) {
    this.taskID = taskID;
  }

  public SaveObjectResponse objectID(String objectID) {
    this.objectID = objectID;
    return this;
  }

  /**
   * Unique identifier of the object.
   *
   * @return objectID
   */
  @javax.annotation.Nullable
  public String getObjectID() {
    return objectID;
  }

  public void setObjectID(String objectID) {
    this.objectID = objectID;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    SaveObjectResponse saveObjectResponse = (SaveObjectResponse) o;
    return (
      Objects.equals(this.createdAt, saveObjectResponse.createdAt) &&
      Objects.equals(this.taskID, saveObjectResponse.taskID) &&
      Objects.equals(this.objectID, saveObjectResponse.objectID)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(createdAt, taskID, objectID);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class SaveObjectResponse {\n");
    sb
      .append("    createdAt: ")
      .append(toIndentedString(createdAt))
      .append("\n");
    sb.append("    taskID: ").append(toIndentedString(taskID)).append("\n");
    sb.append("    objectID: ").append(toIndentedString(objectID)).append("\n");
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
