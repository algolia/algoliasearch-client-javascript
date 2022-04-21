package com.algolia.model.abtesting;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** CustomSearchParams */
public class CustomSearchParams {

  @SerializedName("customSearchParameters")
  private Object customSearchParameters;

  public CustomSearchParams setCustomSearchParameters(
    Object customSearchParameters
  ) {
    this.customSearchParameters = customSearchParameters;
    return this;
  }

  /**
   * Get customSearchParameters
   *
   * @return customSearchParameters
   */
  @javax.annotation.Nonnull
  public Object getCustomSearchParameters() {
    return customSearchParameters;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    CustomSearchParams customSearchParams = (CustomSearchParams) o;
    return Objects.equals(
      this.customSearchParameters,
      customSearchParams.customSearchParameters
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(customSearchParameters);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class CustomSearchParams {\n");
    sb
      .append("    customSearchParameters: ")
      .append(toIndentedString(customSearchParameters))
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
