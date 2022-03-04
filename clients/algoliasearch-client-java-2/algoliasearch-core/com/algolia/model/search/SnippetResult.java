package com.algolia.model.search;

import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.annotations.SerializedName;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import java.io.IOException;
import java.util.Objects;

/** SnippetResult */
public class SnippetResult {

  @SerializedName("value")
  private String value;

  /** Indicates how well the attribute matched the search query. */
  @JsonAdapter(MatchLevelEnum.Adapter.class)
  public enum MatchLevelEnum {
    NONE("none"),

    PARTIAL("partial"),

    FULL("full");

    private String value;

    MatchLevelEnum(String value) {
      this.value = value;
    }

    public String getValue() {
      return value;
    }

    @Override
    public String toString() {
      return String.valueOf(value);
    }

    public static MatchLevelEnum fromValue(String value) {
      for (MatchLevelEnum b : MatchLevelEnum.values()) {
        if (b.value.equals(value)) {
          return b;
        }
      }
      throw new IllegalArgumentException("Unexpected value '" + value + "'");
    }

    public static class Adapter extends TypeAdapter<MatchLevelEnum> {

      @Override
      public void write(
        final JsonWriter jsonWriter,
        final MatchLevelEnum enumeration
      ) throws IOException {
        jsonWriter.value(enumeration.getValue());
      }

      @Override
      public MatchLevelEnum read(final JsonReader jsonReader)
        throws IOException {
        String value = jsonReader.nextString();
        return MatchLevelEnum.fromValue(value);
      }
    }
  }

  @SerializedName("matchLevel")
  private MatchLevelEnum matchLevel;

  public SnippetResult value(String value) {
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

  public void setValue(String value) {
    this.value = value;
  }

  public SnippetResult matchLevel(MatchLevelEnum matchLevel) {
    this.matchLevel = matchLevel;
    return this;
  }

  /**
   * Indicates how well the attribute matched the search query.
   *
   * @return matchLevel
   */
  @javax.annotation.Nullable
  public MatchLevelEnum getMatchLevel() {
    return matchLevel;
  }

  public void setMatchLevel(MatchLevelEnum matchLevel) {
    this.matchLevel = matchLevel;
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
