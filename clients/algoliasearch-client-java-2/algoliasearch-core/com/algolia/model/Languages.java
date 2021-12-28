package com.algolia.model;

import com.google.gson.annotations.SerializedName;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.Objects;

/** A dictionary language. */
@ApiModel(description = "A dictionary language.")
public class Languages {

  public static final String SERIALIZED_NAME_PLURALS = "plurals";

  @SerializedName(SERIALIZED_NAME_PLURALS)
  private DictionaryLanguage plurals;

  public static final String SERIALIZED_NAME_STOPWORDS = "stopwords";

  @SerializedName(SERIALIZED_NAME_STOPWORDS)
  private DictionaryLanguage stopwords;

  public static final String SERIALIZED_NAME_COMPOUNDS = "compounds";

  @SerializedName(SERIALIZED_NAME_COMPOUNDS)
  private DictionaryLanguage compounds;

  public Languages plurals(DictionaryLanguage plurals) {
    this.plurals = plurals;
    return this;
  }

  /**
   * Get plurals
   *
   * @return plurals
   */
  @javax.annotation.Nullable
  @ApiModelProperty(required = true, value = "")
  public DictionaryLanguage getPlurals() {
    return plurals;
  }

  public void setPlurals(DictionaryLanguage plurals) {
    this.plurals = plurals;
  }

  public Languages stopwords(DictionaryLanguage stopwords) {
    this.stopwords = stopwords;
    return this;
  }

  /**
   * Get stopwords
   *
   * @return stopwords
   */
  @javax.annotation.Nullable
  @ApiModelProperty(required = true, value = "")
  public DictionaryLanguage getStopwords() {
    return stopwords;
  }

  public void setStopwords(DictionaryLanguage stopwords) {
    this.stopwords = stopwords;
  }

  public Languages compounds(DictionaryLanguage compounds) {
    this.compounds = compounds;
    return this;
  }

  /**
   * Get compounds
   *
   * @return compounds
   */
  @javax.annotation.Nullable
  @ApiModelProperty(required = true, value = "")
  public DictionaryLanguage getCompounds() {
    return compounds;
  }

  public void setCompounds(DictionaryLanguage compounds) {
    this.compounds = compounds;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Languages languages = (Languages) o;
    return (
      Objects.equals(this.plurals, languages.plurals) &&
      Objects.equals(this.stopwords, languages.stopwords) &&
      Objects.equals(this.compounds, languages.compounds)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(plurals, stopwords, compounds);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Languages {\n");
    sb.append("    plurals: ").append(toIndentedString(plurals)).append("\n");
    sb
      .append("    stopwords: ")
      .append(toIndentedString(stopwords))
      .append("\n");
    sb
      .append("    compounds: ")
      .append(toIndentedString(compounds))
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
