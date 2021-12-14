package com.algolia.model;

import com.google.gson.annotations.SerializedName;
import io.swagger.annotations.ApiModelProperty;
import java.time.OffsetDateTime;
import java.util.Objects;

/** DeleteIndexResponse */
public class DeleteIndexResponse {

  public static final String SERIALIZED_NAME_TASK_I_D = "taskID";

  @SerializedName(SERIALIZED_NAME_TASK_I_D)
  private Integer taskID;

  public static final String SERIALIZED_NAME_DELETE_AT = "deleteAt";

  @SerializedName(SERIALIZED_NAME_DELETE_AT)
  private OffsetDateTime deleteAt;

  public DeleteIndexResponse taskID(Integer taskID) {
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

  public DeleteIndexResponse deleteAt(OffsetDateTime deleteAt) {
    this.deleteAt = deleteAt;
    return this;
  }

  /**
   * Date of deletion (ISO-8601 format).
   *
   * @return deleteAt
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "Date of deletion (ISO-8601 format).")
  public OffsetDateTime getDeleteAt() {
    return deleteAt;
  }

  public void setDeleteAt(OffsetDateTime deleteAt) {
    this.deleteAt = deleteAt;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    DeleteIndexResponse deleteIndexResponse = (DeleteIndexResponse) o;
    return (
      Objects.equals(this.taskID, deleteIndexResponse.taskID) &&
      Objects.equals(this.deleteAt, deleteIndexResponse.deleteAt)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(taskID, deleteAt);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class DeleteIndexResponse {\n");
    sb.append("    taskID: ").append(toIndentedString(taskID)).append("\n");
    sb.append("    deleteAt: ").append(toIndentedString(deleteAt)).append("\n");
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
