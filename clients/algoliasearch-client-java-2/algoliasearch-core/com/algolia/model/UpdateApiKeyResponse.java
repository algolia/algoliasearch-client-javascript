package com.algolia.model;

import com.google.gson.annotations.SerializedName;
import io.swagger.annotations.ApiModelProperty;
import java.time.OffsetDateTime;
import java.util.Objects;

/** UpdateApiKeyResponse */
public class UpdateApiKeyResponse {

  public static final String SERIALIZED_NAME_KEY = "key";

  @SerializedName(SERIALIZED_NAME_KEY)
  private String key;

  public static final String SERIALIZED_NAME_UPDATED_AT = "updatedAt";

  @SerializedName(SERIALIZED_NAME_UPDATED_AT)
  private OffsetDateTime updatedAt;

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
  @ApiModelProperty(required = true, value = "Key string.")
  public String getKey() {
    return key;
  }

  public void setKey(String key) {
    this.key = key;
  }

  public UpdateApiKeyResponse updatedAt(OffsetDateTime updatedAt) {
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
