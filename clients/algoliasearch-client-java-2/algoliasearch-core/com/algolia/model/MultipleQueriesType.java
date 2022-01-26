package com.algolia.model;

import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import java.io.IOException;

/** Perform a search query with `default`, will search for facet values if `facet` is given. */
@JsonAdapter(MultipleQueriesType.Adapter.class)
public enum MultipleQueriesType {
  DEFAULT("default"),

  FACET("facet");

  private String value;

  MultipleQueriesType(String value) {
    this.value = value;
  }

  public String getValue() {
    return value;
  }

  @Override
  public String toString() {
    return String.valueOf(value);
  }

  public static MultipleQueriesType fromValue(String value) {
    for (MultipleQueriesType b : MultipleQueriesType.values()) {
      if (b.value.equals(value)) {
        return b;
      }
    }
    throw new IllegalArgumentException("Unexpected value '" + value + "'");
  }

  public static class Adapter extends TypeAdapter<MultipleQueriesType> {

    @Override
    public void write(
      final JsonWriter jsonWriter,
      final MultipleQueriesType enumeration
    ) throws IOException {
      jsonWriter.value(enumeration.getValue());
    }

    @Override
    public MultipleQueriesType read(final JsonReader jsonReader)
      throws IOException {
      String value = jsonReader.nextString();
      return MultipleQueriesType.fromValue(value);
    }
  }
}
