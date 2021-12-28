package com.algolia.model;

import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import java.io.IOException;

/**
 * Whether the pattern parameter must match the beginning or the end of the query string, or both,
 * or none.
 */
@JsonAdapter(Anchoring.Adapter.class)
public enum Anchoring {
  IS("is"),

  STARTSWITH("startsWith"),

  ENDSWITH("endsWith"),

  CONTAINS("contains");

  private String value;

  Anchoring(String value) {
    this.value = value;
  }

  public String getValue() {
    return value;
  }

  @Override
  public String toString() {
    return String.valueOf(value);
  }

  public static Anchoring fromValue(String value) {
    for (Anchoring b : Anchoring.values()) {
      if (b.value.equals(value)) {
        return b;
      }
    }
    throw new IllegalArgumentException("Unexpected value '" + value + "'");
  }

  public static class Adapter extends TypeAdapter<Anchoring> {

    @Override
    public void write(final JsonWriter jsonWriter, final Anchoring enumeration)
      throws IOException {
      jsonWriter.value(enumeration.getValue());
    }

    @Override
    public Anchoring read(final JsonReader jsonReader) throws IOException {
      String value = jsonReader.nextString();
      return Anchoring.fromValue(value);
    }
  }
}
