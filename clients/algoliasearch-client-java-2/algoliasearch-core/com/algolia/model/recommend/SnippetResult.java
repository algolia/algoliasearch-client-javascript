package com.algolia.model.recommend;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** SnippetResult */
public class SnippetResult {

  @SerializedName("value")
  private String value;

  @SerializedName("matchLevel")
  private MatchLevel matchLevel;

  public SnippetResult setValue(String value) {
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

  public SnippetResult setMatchLevel(MatchLevel matchLevel) {
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

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    SnippetResult snippetResult = (SnippetResult) o;
    return (
      Objects.equals(this.value, snippetResult.value) &&
      Objects.equals(this.matchLevel, snippetResult.matchLevel)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(value, matchLevel);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class SnippetResult {\n");
    sb.append("    value: ").append(toIndentedString(value)).append("\n");
    sb
      .append("    matchLevel: ")
      .append(toIndentedString(matchLevel))
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
