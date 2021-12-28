package com.algolia.model;

import com.google.gson.annotations.SerializedName;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.Objects;

/** Custom entries for a dictionary */
@ApiModel(description = "Custom entries for a dictionary")
public class DictionaryLanguage {

  public static final String SERIALIZED_NAME_NB_CUSTOM_ENTIRES =
    "nbCustomEntires";

  @SerializedName(SERIALIZED_NAME_NB_CUSTOM_ENTIRES)
  private Integer nbCustomEntires;

  public DictionaryLanguage nbCustomEntires(Integer nbCustomEntires) {
    this.nbCustomEntires = nbCustomEntires;
    return this;
  }

  /**
   * When nbCustomEntries is set to 0, the user didn't customize the dictionary. The dictionary is
   * still supported with standard, Algolia-provided entries.
   *
   * @return nbCustomEntires
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "When nbCustomEntries is set to 0, the user didn't customize the dictionary. The" +
    " dictionary is still supported with standard, Algolia-provided entries."
  )
  public Integer getNbCustomEntires() {
    return nbCustomEntires;
  }

  public void setNbCustomEntires(Integer nbCustomEntires) {
    this.nbCustomEntires = nbCustomEntires;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    DictionaryLanguage dictionaryLanguage = (DictionaryLanguage) o;
    return Objects.equals(
      this.nbCustomEntires,
      dictionaryLanguage.nbCustomEntires
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(nbCustomEntires);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class DictionaryLanguage {\n");
    sb
      .append("    nbCustomEntires: ")
      .append(toIndentedString(nbCustomEntires))
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
