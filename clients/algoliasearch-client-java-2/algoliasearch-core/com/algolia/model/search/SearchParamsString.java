package com.algolia.model.search;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** SearchParamsString */
public class SearchParamsString {

  @SerializedName("params")
  private String params = "";

  public SearchParamsString params(String params) {
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

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    SearchParamsString searchParamsString = (SearchParamsString) o;
    return Objects.equals(this.params, searchParamsString.params);
  }

  @Override
  public int hashCode() {
    return Objects.hash(params);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class SearchParamsString {\n");
    sb.append("    params: ").append(toIndentedString(params)).append("\n");
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
