package com.algolia.model;

import com.google.gson.annotations.SerializedName;
import java.time.OffsetDateTime;
import java.util.Objects;

/** The response with a taskID and a deletedAt timestamp. */
public class DeletedAtResponse {

  @SerializedName("taskID")
  private Integer taskID;

  @SerializedName("deletedAt")
  private OffsetDateTime deletedAt;

  public DeletedAtResponse taskID(Integer taskID) {
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

  public DeletedAtResponse deletedAt(OffsetDateTime deletedAt) {
    this.deletedAt = deletedAt;
    return this;
  }

  /**
   * Date of deletion (ISO-8601 format).
   *
   * @return deletedAt
   */
  @javax.annotation.Nonnull
  public OffsetDateTime getDeletedAt() {
    return deletedAt;
  }

  public void setDeletedAt(OffsetDateTime deletedAt) {
    this.deletedAt = deletedAt;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    DeletedAtResponse deletedAtResponse = (DeletedAtResponse) o;
    return (
      Objects.equals(this.taskID, deletedAtResponse.taskID) &&
      Objects.equals(this.deletedAt, deletedAtResponse.deletedAt)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(taskID, deletedAt);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class DeletedAtResponse {\n");
    sb.append("    taskID: ").append(toIndentedString(taskID)).append("\n");
    sb
      .append("    deletedAt: ")
      .append(toIndentedString(deletedAt))
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
