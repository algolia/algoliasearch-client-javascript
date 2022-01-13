package com.algolia.model;

import com.google.gson.annotations.SerializedName;
import java.time.OffsetDateTime;
import java.util.Objects;

/** The response with a taskID and an updatedAt timestamp. */
public class UpdatedAtResponse {

  @SerializedName("taskID")
  private Integer taskID;

  @SerializedName("updatedAt")
  private OffsetDateTime updatedAt;

  public UpdatedAtResponse taskID(Integer taskID) {
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

  public UpdatedAtResponse updatedAt(OffsetDateTime updatedAt) {
    this.updatedAt = updatedAt;
    return this;
  }

  /**
   * Date of last update (ISO-8601 format).
   *
   * @return updatedAt
   */
  @javax.annotation.Nonnull
  public OffsetDateTime getUpdatedAt() {
    return updatedAt;
  }

  public void setUpdatedAt(OffsetDateTime updatedAt) {
    this.updatedAt = updatedAt;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    UpdatedAtResponse updatedAtResponse = (UpdatedAtResponse) o;
    return (
      Objects.equals(this.taskID, updatedAtResponse.taskID) &&
      Objects.equals(this.updatedAt, updatedAtResponse.updatedAt)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(taskID, updatedAt);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class UpdatedAtResponse {\n");
    sb.append("    taskID: ").append(toIndentedString(taskID)).append("\n");
    sb
      .append("    updatedAt: ")
      .append(toIndentedString(updatedAt))
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
