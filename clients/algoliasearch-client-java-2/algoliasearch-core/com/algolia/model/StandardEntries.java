package com.algolia.model;

import com.google.gson.annotations.SerializedName;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import org.openapitools.jackson.nullable.JsonNullable;

/**
 * Map of language ISO code supported by the dictionary (e.g., \"en\" for English) to a boolean
 * value.
 */
@ApiModel(
  description = "Map of language ISO code supported by the dictionary (e.g., \"en\" for English) to a" +
  " boolean value."
)
public class StandardEntries {

  public static final String SERIALIZED_NAME_PLURALS = "plurals";

  @SerializedName(SERIALIZED_NAME_PLURALS)
  private Map<String, Boolean> plurals = null;

  public static final String SERIALIZED_NAME_STOPWORDS = "stopwords";

  @SerializedName(SERIALIZED_NAME_STOPWORDS)
  private Map<String, Boolean> stopwords = null;

  public static final String SERIALIZED_NAME_COMPOUNDS = "compounds";

  @SerializedName(SERIALIZED_NAME_COMPOUNDS)
  private Map<String, Boolean> compounds = null;

  public StandardEntries plurals(Map<String, Boolean> plurals) {
    this.plurals = plurals;
    return this;
  }

  public StandardEntries putPluralsItem(String key, Boolean pluralsItem) {
    if (this.plurals == null) {
      this.plurals = new HashMap<>();
    }
    this.plurals.put(key, pluralsItem);
    return this;
  }

  /**
   * Language ISO code.
   *
   * @return plurals
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "Language ISO code.")
  public Map<String, Boolean> getPlurals() {
    return plurals;
  }

  public void setPlurals(Map<String, Boolean> plurals) {
    this.plurals = plurals;
  }

  public StandardEntries stopwords(Map<String, Boolean> stopwords) {
    this.stopwords = stopwords;
    return this;
  }

  public StandardEntries putStopwordsItem(String key, Boolean stopwordsItem) {
    if (this.stopwords == null) {
      this.stopwords = new HashMap<>();
    }
    this.stopwords.put(key, stopwordsItem);
    return this;
  }

  /**
   * Language ISO code.
   *
   * @return stopwords
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "Language ISO code.")
  public Map<String, Boolean> getStopwords() {
    return stopwords;
  }

  public void setStopwords(Map<String, Boolean> stopwords) {
    this.stopwords = stopwords;
  }

  public StandardEntries compounds(Map<String, Boolean> compounds) {
    this.compounds = compounds;
    return this;
  }

  public StandardEntries putCompoundsItem(String key, Boolean compoundsItem) {
    if (this.compounds == null) {
      this.compounds = new HashMap<>();
    }
    this.compounds.put(key, compoundsItem);
    return this;
  }

  /**
   * Language ISO code.
   *
   * @return compounds
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "Language ISO code.")
  public Map<String, Boolean> getCompounds() {
    return compounds;
  }

  public void setCompounds(Map<String, Boolean> compounds) {
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
    StandardEntries standardEntries = (StandardEntries) o;
    return (
      Objects.equals(this.plurals, standardEntries.plurals) &&
      Objects.equals(this.stopwords, standardEntries.stopwords) &&
      Objects.equals(this.compounds, standardEntries.compounds)
    );
  }

  private static <T> boolean equalsNullable(
    JsonNullable<T> a,
    JsonNullable<T> b
  ) {
    return (
      a == b ||
      (
        a != null &&
        b != null &&
        a.isPresent() &&
        b.isPresent() &&
        Objects.deepEquals(a.get(), b.get())
      )
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(plurals, stopwords, compounds);
  }

  private static <T> int hashCodeNullable(JsonNullable<T> a) {
    if (a == null) {
      return 1;
    }
    return a.isPresent() ? Arrays.deepHashCode(new Object[] { a.get() }) : 31;
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class StandardEntries {\n");
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
