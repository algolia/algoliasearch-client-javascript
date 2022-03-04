package com.algolia.model.search;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** UpdateApiKeyResponse */
public class UpdateApiKeyResponse {

  @SerializedName("key")
  private String key;

  @SerializedName("updatedAt")
  private String updatedAt;

  public UpdateApiKeyResponse key(String key) {
    this.key = key;
    return this;
  }

  /**
   * Key string.
   *
   * @return key
   */
  @javax.annotation.Nonnull
  public String getKey() {
    return key;
  }

  public void setKey(String key) {
    this.key = key;
  }

  public UpdateApiKeyResponse updatedAt(String updatedAt) {
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

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    UpdateApiKeyResponse updateApiKeyResponse = (UpdateApiKeyResponse) o;
    return (
      Objects.equals(this.key, updateApiKeyResponse.key) &&
      Objects.equals(this.updatedAt, updateApiKeyResponse.updatedAt)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(key, updatedAt);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class UpdateApiKeyResponse {\n");
    sb.append("    key: ").append(toIndentedString(key)).append("\n");
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
