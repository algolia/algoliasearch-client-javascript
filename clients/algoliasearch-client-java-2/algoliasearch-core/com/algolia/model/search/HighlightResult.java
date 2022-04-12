package com.algolia.model.search;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** Highlighted attributes. */
public class HighlightResult {

  @SerializedName("value")
  private String value;

  @SerializedName("matchLevel")
  private MatchLevel matchLevel;

  @SerializedName("matchedWords")
  private List<String> matchedWords = null;

  @SerializedName("fullyHighlighted")
  private Boolean fullyHighlighted;

  public HighlightResult setValue(String value) {
    this.value = value;
    return this;
  }

  /**
   * Markup text with occurrences highlighted.
   *
   * @return value
   */
  @javax.annotation.Nullable
  public String getValue() {
    return value;
  }

  public HighlightResult setMatchLevel(MatchLevel matchLevel) {
    this.matchLevel = matchLevel;
    return this;
  }

  /**
   * Get matchLevel
   *
   * @return matchLevel
   */
  @javax.annotation.Nullable
  public MatchLevel getMatchLevel() {
    return matchLevel;
  }

  public HighlightResult setMatchedWords(List<String> matchedWords) {
    this.matchedWords = matchedWords;
    return this;
  }

  public HighlightResult addMatchedWordsItem(String matchedWordsItem) {
    if (this.matchedWords == null) {
      this.matchedWords = new ArrayList<>();
    }
    this.matchedWords.add(matchedWordsItem);
    return this;
  }

  /**
   * List of words from the query that matched the object.
   *
   * @return matchedWords
   */
  @javax.annotation.Nullable
  public List<String> getMatchedWords() {
    return matchedWords;
  }

  public HighlightResult setFullyHighlighted(Boolean fullyHighlighted) {
    this.fullyHighlighted = fullyHighlighted;
    return this;
  }

  /**
   * Whether the entire attribute value is highlighted.
   *
   * @return fullyHighlighted
   */
  @javax.annotation.Nullable
  public Boolean getFullyHighlighted() {
    return fullyHighlighted;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    HighlightResult highlightResult = (HighlightResult) o;
    return (
      Objects.equals(this.value, highlightResult.value) &&
      Objects.equals(this.matchLevel, highlightResult.matchLevel) &&
      Objects.equals(this.matchedWords, highlightResult.matchedWords) &&
      Objects.equals(this.fullyHighlighted, highlightResult.fullyHighlighted)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(value, matchLevel, matchedWords, fullyHighlighted);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class HighlightResult {\n");
    sb.append("    value: ").append(toIndentedString(value)).append("\n");
    sb
      .append("    matchLevel: ")
      .append(toIndentedString(matchLevel))
      .append("\n");
    sb
      .append("    matchedWords: ")
      .append(toIndentedString(matchedWords))
      .append("\n");
    sb
      .append("    fullyHighlighted: ")
      .append(toIndentedString(fullyHighlighted))
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
