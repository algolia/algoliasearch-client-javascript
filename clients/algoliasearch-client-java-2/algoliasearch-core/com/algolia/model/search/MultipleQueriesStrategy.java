package com.algolia.model.search;

import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import java.io.IOException;

/** Gets or Sets multipleQueriesStrategy */
@JsonAdapter(MultipleQueriesStrategy.Adapter.class)
public enum MultipleQueriesStrategy {
  NONE("none"),

  STOPIFENOUGHMATCHES("stopIfEnoughMatches");

  private String value;

  MultipleQueriesStrategy(String value) {
    this.value = value;
  }

  public String getValue() {
    return value;
  }

  @Override
  public String toString() {
    return String.valueOf(value);
  }

  public static MultipleQueriesStrategy fromValue(String value) {
    for (MultipleQueriesStrategy b : MultipleQueriesStrategy.values()) {
      if (b.value.equals(value)) {
        return b;
      }
    }
    throw new IllegalArgumentException("Unexpected value '" + value + "'");
  }

  public static class Adapter extends TypeAdapter<MultipleQueriesStrategy> {

    @Override
    public void write(
      final JsonWriter jsonWriter,
      final MultipleQueriesStrategy enumeration
    ) throws IOException {
      jsonWriter.value(enumeration.getValue());
    }

    @Override
    public MultipleQueriesStrategy read(final JsonReader jsonReader)
      throws IOException {
      String value = jsonReader.nextString();
      return MultipleQueriesStrategy.fromValue(value);
    }
  }
}
