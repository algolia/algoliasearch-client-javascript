package com.algolia.model.recommend;

import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import java.io.IOException;

/** Indicates how well the attribute matched the search query. */
@JsonAdapter(MatchLevel.Adapter.class)
public enum MatchLevel {
  NONE("none"),

  PARTIAL("partial"),

  FULL("full");

  private final String value;

  MatchLevel(String value) {
    this.value = value;
  }

  public String getValue() {
    return value;
  }

  @Override
  public String toString() {
    return String.valueOf(value);
  }

  public static MatchLevel fromValue(String value) {
    for (MatchLevel b : MatchLevel.values()) {
      if (b.value.equals(value)) {
        return b;
      }
    }
    throw new IllegalArgumentException("Unexpected value '" + value + "'");
  }

  public static class Adapter extends TypeAdapter<MatchLevel> {

    @Override
    public void write(
      final JsonWriter jsonWriter,
      final MatchLevel enumeration
    ) throws IOException {
      jsonWriter.value(enumeration.getValue());
    }

    @Override
    public MatchLevel read(final JsonReader jsonReader) throws IOException {
      String value = jsonReader.nextString();
      return MatchLevel.fromValue(value);
    }
  }
}
