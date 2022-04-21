package com.algolia.model.recommend;

import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import java.io.IOException;

/** Controls how the exact ranking criterion is computed when the query contains only one word. */
@JsonAdapter(ExactOnSingleWordQuery.Adapter.class)
public enum ExactOnSingleWordQuery {
  ATTRIBUTE("attribute"),

  NONE("none"),

  WORD("word");

  private final String value;

  ExactOnSingleWordQuery(String value) {
    this.value = value;
  }

  public String getValue() {
    return value;
  }

  @Override
  public String toString() {
    return String.valueOf(value);
  }

  public static ExactOnSingleWordQuery fromValue(String value) {
    for (ExactOnSingleWordQuery b : ExactOnSingleWordQuery.values()) {
      if (b.value.equals(value)) {
        return b;
      }
    }
    throw new IllegalArgumentException("Unexpected value '" + value + "'");
  }

  public static class Adapter extends TypeAdapter<ExactOnSingleWordQuery> {

    @Override
    public void write(
      final JsonWriter jsonWriter,
      final ExactOnSingleWordQuery enumeration
    ) throws IOException {
      jsonWriter.value(enumeration.getValue());
    }

    @Override
    public ExactOnSingleWordQuery read(final JsonReader jsonReader)
      throws IOException {
      String value = jsonReader.nextString();
      return ExactOnSingleWordQuery.fromValue(value);
    }
  }
}
