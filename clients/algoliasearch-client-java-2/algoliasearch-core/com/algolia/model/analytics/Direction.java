package com.algolia.model.analytics;

import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import java.io.IOException;

/** Gets or Sets direction */
@JsonAdapter(Direction.Adapter.class)
public enum Direction {
  ASC("asc"),

  DESC("desc");

  private final String value;

  Direction(String value) {
    this.value = value;
  }

  public String getValue() {
    return value;
  }

  @Override
  public String toString() {
    return String.valueOf(value);
  }

  public static Direction fromValue(String value) {
    for (Direction b : Direction.values()) {
      if (b.value.equals(value)) {
        return b;
      }
    }
    throw new IllegalArgumentException("Unexpected value '" + value + "'");
  }

  public static class Adapter extends TypeAdapter<Direction> {

    @Override
    public void write(final JsonWriter jsonWriter, final Direction enumeration)
      throws IOException {
      jsonWriter.value(enumeration.getValue());
    }

    @Override
    public Direction read(final JsonReader jsonReader) throws IOException {
      String value = jsonReader.nextString();
      return Direction.fromValue(value);
    }
  }
}
