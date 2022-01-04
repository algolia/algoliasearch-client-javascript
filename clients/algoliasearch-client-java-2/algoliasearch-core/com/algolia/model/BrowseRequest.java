package com.algolia.model;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** BrowseRequest */
public class BrowseRequest {

  @SerializedName("params")
  private String params = "";

  @SerializedName("cursor")
  private String cursor;

  public BrowseRequest params(String params) {
    this.params = params;
    return this;
  }

  /**
   * Search parameters as URL-encoded query string.
   *
   * @return params
   */
  @javax.annotation.Nullable
  public String getParams() {
    return params;
  }

  public void setParams(String params) {
    this.params = params;
  }

  public BrowseRequest cursor(String cursor) {
    this.cursor = cursor;
    return this;
  }

  /**
   * Cursor indicating the location to resume browsing from. Must match the value returned by the
   * previous call.
   *
   * @return cursor
   */
  @javax.annotation.Nullable
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
    BrowseRequest browseRequest = (BrowseRequest) o;
    return (
      Objects.equals(this.params, browseRequest.params) &&
      Objects.equals(this.cursor, browseRequest.cursor)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(params, cursor);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class BrowseRequest {\n");
    sb.append("    params: ").append(toIndentedString(params)).append("\n");
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
