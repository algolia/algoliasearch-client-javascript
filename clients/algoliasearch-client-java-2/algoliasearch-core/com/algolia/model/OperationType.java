package com.algolia.model;

import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import java.io.IOException;

/** Type of operation to perform (move or copy). */
@JsonAdapter(OperationType.Adapter.class)
public enum OperationType {
  MOVE("move"),

  COPY("copy");

  private String value;

  OperationType(String value) {
    this.value = value;
  }

  public String getValue() {
    return value;
  }

  @Override
  public String toString() {
    return String.valueOf(value);
  }

  public static OperationType fromValue(String value) {
    for (OperationType b : OperationType.values()) {
      if (b.value.equals(value)) {
        return b;
      }
    }
    throw new IllegalArgumentException("Unexpected value '" + value + "'");
  }

  public static class Adapter extends TypeAdapter<OperationType> {

    @Override
    public void write(
      final JsonWriter jsonWriter,
      final OperationType enumeration
    ) throws IOException {
      jsonWriter.value(enumeration.getValue());
    }

    @Override
    public OperationType read(final JsonReader jsonReader) throws IOException {
      String value = jsonReader.nextString();
      return OperationType.fromValue(value);
    }
  }
}
