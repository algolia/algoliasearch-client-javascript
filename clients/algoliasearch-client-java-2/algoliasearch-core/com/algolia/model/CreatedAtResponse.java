package com.algolia.model;

import com.google.gson.annotations.SerializedName;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.time.OffsetDateTime;
import java.util.Objects;

/** The response with a createdAt timestamp. */
@ApiModel(description = "The response with a createdAt timestamp.")
public class CreatedAtResponse {

  public static final String SERIALIZED_NAME_CREATED_AT = "createdAt";

  @SerializedName(SERIALIZED_NAME_CREATED_AT)
  private OffsetDateTime createdAt;

  public CreatedAtResponse createdAt(OffsetDateTime createdAt) {
    this.createdAt = createdAt;
    return this;
  }

  /**
   * Date of creation (ISO-8601 format).
   *
   * @return createdAt
   */
  @javax.annotation.Nonnull
  @ApiModelProperty(
    required = true,
    value = "Date of creation (ISO-8601 format)."
  )
  public OffsetDateTime getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(OffsetDateTime createdAt) {
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
    CreatedAtResponse createdAtResponse = (CreatedAtResponse) o;
    return Objects.equals(this.createdAt, createdAtResponse.createdAt);
  }

  @Override
  public int hashCode() {
    return Objects.hash(createdAt);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class CreatedAtResponse {\n");
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
