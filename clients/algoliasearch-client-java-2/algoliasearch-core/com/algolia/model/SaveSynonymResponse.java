package com.algolia.model;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** SaveSynonymResponse */
public class SaveSynonymResponse {

  @SerializedName("taskID")
  private Integer taskID;

  @SerializedName("updatedAt")
  private String updatedAt;

  @SerializedName("id")
  private String id;

  public SaveSynonymResponse taskID(Integer taskID) {
    this.taskID = taskID;
    return this;
  }

  /**
   * taskID of the task to wait for.
   *
   * @return taskID
   */
  @javax.annotation.Nonnull
  public Integer getTaskID() {
    return taskID;
  }

  public void setTaskID(Integer taskID) {
    this.taskID = taskID;
  }

  public SaveSynonymResponse updatedAt(String updatedAt) {
    this.updatedAt = updatedAt;
    return this;
  }

  /**
   * Date of last update (ISO-8601 format).
   *
   * @return updatedAt
   */
  @javax.annotation.Nonnull
  public String getUpdatedAt() {
    return updatedAt;
  }

  public void setUpdatedAt(String updatedAt) {
    this.updatedAt = updatedAt;
  }

  public SaveSynonymResponse id(String id) {
    this.id = id;
    return this;
  }

  /**
   * objectID of the inserted object.
   *
   * @return id
   */
  @javax.annotation.Nonnull
  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    SaveSynonymResponse saveSynonymResponse = (SaveSynonymResponse) o;
    return (
      Objects.equals(this.taskID, saveSynonymResponse.taskID) &&
      Objects.equals(this.updatedAt, saveSynonymResponse.updatedAt) &&
      Objects.equals(this.id, saveSynonymResponse.id)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(taskID, updatedAt, id);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class SaveSynonymResponse {\n");
    sb.append("    taskID: ").append(toIndentedString(taskID)).append("\n");
    sb
      .append("    updatedAt: ")
      .append(toIndentedString(updatedAt))
      .append("\n");
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
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
