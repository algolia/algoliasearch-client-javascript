package com.algolia.model.search;

import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import java.io.IOException;

/** Controls whether typo tolerance is enabled and how it is applied. */
@JsonAdapter(TypoTolerance.Adapter.class)
public enum TypoTolerance {
  TRUE("true"),

  FALSE("false"),

  MIN("min"),

  STRICT("strict");

  private final String value;

  TypoTolerance(String value) {
    this.value = value;
  }

  public String getValue() {
    return value;
  }

  @Override
  public String toString() {
    return String.valueOf(value);
  }

  public static TypoTolerance fromValue(String value) {
    for (TypoTolerance b : TypoTolerance.values()) {
      if (b.value.equals(value)) {
        return b;
      }
    }
    throw new IllegalArgumentException("Unexpected value '" + value + "'");
  }

  public static class Adapter extends TypeAdapter<TypoTolerance> {

    @Override
    public void write(
      final JsonWriter jsonWriter,
      final TypoTolerance enumeration
    ) throws IOException {
      jsonWriter.value(enumeration.getValue());
    }

    @Override
    public TypoTolerance read(final JsonReader jsonReader) throws IOException {
      String value = jsonReader.nextString();
      return TypoTolerance.fromValue(value);
    }
  }
}
