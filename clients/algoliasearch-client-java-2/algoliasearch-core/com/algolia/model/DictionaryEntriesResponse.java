package com.algolia.model;

import com.google.gson.annotations.SerializedName;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.time.OffsetDateTime;
import java.util.Objects;

/** The dictionary entry reponse. */
@ApiModel(description = "The dictionary entry reponse.")
public class DictionaryEntriesResponse {

  public static final String SERIALIZED_NAME_TASK_ID = "taskId";

  @SerializedName(SERIALIZED_NAME_TASK_ID)
  private Integer taskId;

  public static final String SERIALIZED_NAME_UPDATED_AT = "updatedAt";

  @SerializedName(SERIALIZED_NAME_UPDATED_AT)
  private OffsetDateTime updatedAt;

  public DictionaryEntriesResponse taskId(Integer taskId) {
    this.taskId = taskId;
    return this;
  }

  /**
   * taskID of the indexing task to wait for.
   *
   * @return taskId
   */
  @javax.annotation.Nonnull
  @ApiModelProperty(
    required = true,
    value = "taskID of the indexing task to wait for."
  )
  public Integer getTaskId() {
    return taskId;
  }

  public void setTaskId(Integer taskId) {
    this.taskId = taskId;
  }

  public DictionaryEntriesResponse updatedAt(OffsetDateTime updatedAt) {
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

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    DictionaryEntriesResponse dictionaryEntriesResponse = (DictionaryEntriesResponse) o;
    return (
      Objects.equals(this.taskId, dictionaryEntriesResponse.taskId) &&
      Objects.equals(this.updatedAt, dictionaryEntriesResponse.updatedAt)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(taskId, updatedAt);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class DictionaryEntriesResponse {\n");
    sb.append("    taskId: ").append(toIndentedString(taskId)).append("\n");
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
