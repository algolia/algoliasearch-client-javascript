package com.algolia.model;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** CreatedAtObject */
public class CreatedAtObject {

  @SerializedName("createdAt")
  private String createdAt;

  public CreatedAtObject createdAt(String createdAt) {
    this.createdAt = createdAt;
    return this;
  }

  /**
   * Date of creation (ISO-8601 format).
   *
   * @return createdAt
   */
  @javax.annotation.Nonnull
  public String getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(String createdAt) {
    this.createdAt = createdAt;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    CreatedAtObject createdAtObject = (CreatedAtObject) o;
    return Objects.equals(this.createdAt, createdAtObject.createdAt);
  }

  @Override
  public int hashCode() {
    return Objects.hash(createdAt);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class CreatedAtObject {\n");
    sb
      .append("    createdAt: ")
      .append(toIndentedString(createdAt))
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
