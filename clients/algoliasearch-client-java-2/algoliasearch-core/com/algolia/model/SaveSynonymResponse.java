package com.algolia.model;

import com.google.gson.annotations.SerializedName;
import io.swagger.annotations.ApiModelProperty;
import java.time.OffsetDateTime;
import java.util.Objects;

/** SaveSynonymResponse */
public class SaveSynonymResponse {

  public static final String SERIALIZED_NAME_TASK_I_D = "taskID";

  @SerializedName(SERIALIZED_NAME_TASK_I_D)
  private Integer taskID;

  public static final String SERIALIZED_NAME_UPDATED_AT = "updatedAt";

  @SerializedName(SERIALIZED_NAME_UPDATED_AT)
  private OffsetDateTime updatedAt;

  public static final String SERIALIZED_NAME_ID = "id";

  @SerializedName(SERIALIZED_NAME_ID)
  private String id;

  public SaveSynonymResponse taskID(Integer taskID) {
    this.taskID = taskID;
    return this;
  }

  /**
   * taskID of the indexing task to wait for.
   *
   * @return taskID
   */
  @javax.annotation.Nonnull
  @ApiModelProperty(
    required = true,
    value = "taskID of the indexing task to wait for."
  )
  public Integer getTaskID() {
    return taskID;
  }

  public void setTaskID(Integer taskID) {
    this.taskID = taskID;
  }

  public SaveSynonymResponse updatedAt(OffsetDateTime updatedAt) {
    this.updatedAt = updatedAt;
    return this;
  }

  /**
   * Date of last update (ISO-8601 format).
   *
   * @return updatedAt
   */
  @javax.annotation.Nonnull
  @ApiModelProperty(
    required = true,
    value = "Date of last update (ISO-8601 format)."
  )
  public OffsetDateTime getUpdatedAt() {
    return updatedAt;
  }

  public void setUpdatedAt(OffsetDateTime updatedAt) {
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
  @ApiModelProperty(required = true, value = "objectID of the inserted object.")
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
