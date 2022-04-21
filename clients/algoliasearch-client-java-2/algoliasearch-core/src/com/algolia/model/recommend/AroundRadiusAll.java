package com.algolia.model.recommend;

import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import java.io.IOException;

/** Gets or Sets aroundRadiusAll */
@JsonAdapter(AroundRadiusAll.Adapter.class)
public enum AroundRadiusAll {
  ALL("all");

  private final String value;

  AroundRadiusAll(String value) {
    this.value = value;
  }

  public String getValue() {
    return value;
  }

  @Override
  public String toString() {
    return String.valueOf(value);
  }

  public static AroundRadiusAll fromValue(String value) {
    for (AroundRadiusAll b : AroundRadiusAll.values()) {
      if (b.value.equals(value)) {
        return b;
      }
    }
    throw new IllegalArgumentException("Unexpected value '" + value + "'");
  }

  public static class Adapter extends TypeAdapter<AroundRadiusAll> {

    @Override
    public void write(
      final JsonWriter jsonWriter,
      final AroundRadiusAll enumeration
    ) throws IOException {
      jsonWriter.value(enumeration.getValue());
    }

    @Override
    public AroundRadiusAll read(final JsonReader jsonReader)
      throws IOException {
      String value = jsonReader.nextString();
      return AroundRadiusAll.fromValue(value);
    }
  }
}
