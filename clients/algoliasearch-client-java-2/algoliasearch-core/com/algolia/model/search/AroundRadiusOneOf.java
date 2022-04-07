package com.algolia.model.search;

import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import java.io.IOException;

/** Gets or Sets aroundRadius_oneOf */
@JsonAdapter(AroundRadiusOneOf.Adapter.class)
public enum AroundRadiusOneOf {
  ALL("all");

  private final String value;

  AroundRadiusOneOf(String value) {
    this.value = value;
  }

  public String getValue() {
    return value;
  }

  @Override
  public String toString() {
    return String.valueOf(value);
  }

  public static AroundRadiusOneOf fromValue(String value) {
    for (AroundRadiusOneOf b : AroundRadiusOneOf.values()) {
      if (b.value.equals(value)) {
        return b;
      }
    }
    throw new IllegalArgumentException("Unexpected value '" + value + "'");
  }

  public static class Adapter extends TypeAdapter<AroundRadiusOneOf> {

    @Override
    public void write(
      final JsonWriter jsonWriter,
      final AroundRadiusOneOf enumeration
    ) throws IOException {
      jsonWriter.value(enumeration.getValue());
    }

    @Override
    public AroundRadiusOneOf read(final JsonReader jsonReader)
      throws IOException {
      String value = jsonReader.nextString();
      return AroundRadiusOneOf.fromValue(value);
    }
  }
}
