package com.algolia.model;

import com.google.gson.annotations.SerializedName;
import io.swagger.annotations.ApiModelProperty;
import java.util.Objects;

/** BaseBrowseResponse */
public class BaseBrowseResponse {

  public static final String SERIALIZED_NAME_CURSOR = "cursor";

  @SerializedName(SERIALIZED_NAME_CURSOR)
  private String cursor;

  public BaseBrowseResponse cursor(String cursor) {
    this.cursor = cursor;
    return this;
  }

  /**
   * Cursor indicating the location to resume browsing from. Must match the value returned by the
   * previous call.
   *
   * @return cursor
   */
  @javax.annotation.Nonnull
  @ApiModelProperty(
    example = "jMDY3M2MwM2QwMWUxMmQwYWI0ZTN",
    required = true,
    value = "Cursor indicating the location to resume browsing from. Must match the value returned by" +
    " the previous call."
  )
  public String getCursor() {
    return cursor;
  }

  public void setCursor(String cursor) {
    this.cursor = cursor;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    BaseBrowseResponse baseBrowseResponse = (BaseBrowseResponse) o;
    return Objects.equals(this.cursor, baseBrowseResponse.cursor);
  }

  @Override
  public int hashCode() {
    return Objects.hash(cursor);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class BaseBrowseResponse {\n");
    sb.append("    cursor: ").append(toIndentedString(cursor)).append("\n");
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
