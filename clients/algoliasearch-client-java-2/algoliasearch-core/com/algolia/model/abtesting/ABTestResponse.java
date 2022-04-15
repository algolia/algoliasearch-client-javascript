package com.algolia.model.abtesting;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** ABTestResponse */
public class ABTestResponse {

  @SerializedName("index")
  private String index;

  @SerializedName("abTestID")
  private Integer abTestID;

  @SerializedName("taskID")
  private Integer taskID;

  public ABTestResponse setIndex(String index) {
    this.index = index;
    return this;
  }

  /**
   * The index performing the A/B test.
   *
   * @return index
   */
  @javax.annotation.Nonnull
  public String getIndex() {
    return index;
  }

  public ABTestResponse setAbTestID(Integer abTestID) {
    this.abTestID = abTestID;
    return this;
  }

  /**
   * The A/B test ID.
   *
   * @return abTestID
   */
  @javax.annotation.Nonnull
  public Integer getAbTestID() {
    return abTestID;
  }

  public ABTestResponse setTaskID(Integer taskID) {
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

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ABTestResponse abTestResponse = (ABTestResponse) o;
    return (
      Objects.equals(this.index, abTestResponse.index) &&
      Objects.equals(this.abTestID, abTestResponse.abTestID) &&
      Objects.equals(this.taskID, abTestResponse.taskID)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(index, abTestID, taskID);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ABTestResponse {\n");
    sb.append("    index: ").append(toIndentedString(index)).append("\n");
    sb.append("    abTestID: ").append(toIndentedString(abTestID)).append("\n");
    sb.append("    taskID: ").append(toIndentedString(taskID)).append("\n");
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
