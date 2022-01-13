package com.algolia.model;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** AddApiKeyResponse */
public class AddApiKeyResponse {

  @SerializedName("key")
  private String key;

  @SerializedName("createdAt")
  private String createdAt;

  public AddApiKeyResponse key(String key) {
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

  public AddApiKeyResponse createdAt(String createdAt) {
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
    AddApiKeyResponse addApiKeyResponse = (AddApiKeyResponse) o;
    return (
      Objects.equals(this.key, addApiKeyResponse.key) &&
      Objects.equals(this.createdAt, addApiKeyResponse.createdAt)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(key, createdAt);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class AddApiKeyResponse {\n");
    sb.append("    key: ").append(toIndentedString(key)).append("\n");
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
