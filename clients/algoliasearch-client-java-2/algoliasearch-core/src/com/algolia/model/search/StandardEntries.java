package com.algolia.model.search;

import com.google.gson.annotations.SerializedName;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

/**
 * Map of language ISO code supported by the dictionary (e.g., \"en\" for English) to a boolean
 * value.
 */
public class StandardEntries {

  @SerializedName("plurals")
  private Map<String, Boolean> plurals = null;

  @SerializedName("stopwords")
  private Map<String, Boolean> stopwords = null;

  @SerializedName("compounds")
  private Map<String, Boolean> compounds = null;

  public StandardEntries setPlurals(Map<String, Boolean> plurals) {
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
  public Map<String, Boolean> getPlurals() {
    return plurals;
  }

  public StandardEntries setStopwords(Map<String, Boolean> stopwords) {
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
  public Map<String, Boolean> getStopwords() {
    return stopwords;
  }

  public StandardEntries setCompounds(Map<String, Boolean> compounds) {
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
  public Map<String, Boolean> getCompounds() {
    return compounds;
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

  @Override
  public int hashCode() {
    return Objects.hash(plurals, stopwords, compounds);
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
