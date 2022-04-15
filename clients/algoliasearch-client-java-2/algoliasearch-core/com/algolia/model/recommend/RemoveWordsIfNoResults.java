package com.algolia.model.recommend;

import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import java.io.IOException;

/** Selects a strategy to remove words from the query when it doesn't match any hits. */
@JsonAdapter(RemoveWordsIfNoResults.Adapter.class)
public enum RemoveWordsIfNoResults {
  NONE("none"),

  LAST_WORDS("lastWords"),

  FIRST_WORDS("firstWords"),

  ALL_OPTIONAL("allOptional");

  private final String value;

  RemoveWordsIfNoResults(String value) {
    this.value = value;
  }

  public String getValue() {
    return value;
  }

  @Override
  public String toString() {
    return String.valueOf(value);
  }

  public static RemoveWordsIfNoResults fromValue(String value) {
    for (RemoveWordsIfNoResults b : RemoveWordsIfNoResults.values()) {
      if (b.value.equals(value)) {
        return b;
      }
    }
    throw new IllegalArgumentException("Unexpected value '" + value + "'");
  }

  public static class Adapter extends TypeAdapter<RemoveWordsIfNoResults> {

    @Override
    public void write(
      final JsonWriter jsonWriter,
      final RemoveWordsIfNoResults enumeration
    ) throws IOException {
      jsonWriter.value(enumeration.getValue());
    }

    @Override
    public RemoveWordsIfNoResults read(final JsonReader jsonReader)
      throws IOException {
      String value = jsonReader.nextString();
      return RemoveWordsIfNoResults.fromValue(value);
    }
  }
}
