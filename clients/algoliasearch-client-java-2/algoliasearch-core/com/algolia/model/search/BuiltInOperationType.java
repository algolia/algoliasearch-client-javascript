package com.algolia.model.search;

import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import java.io.IOException;

/** The operation to apply on the attribute. */
@JsonAdapter(BuiltInOperationType.Adapter.class)
public enum BuiltInOperationType {
  INCREMENT("Increment"),

  DECREMENT("Decrement"),

  ADD("Add"),

  REMOVE("Remove"),

  ADD_UNIQUE("AddUnique"),

  INCREMENT_FROM("IncrementFrom"),

  INCREMENT_SET("IncrementSet");

  private final String value;

  BuiltInOperationType(String value) {
    this.value = value;
  }

  public String getValue() {
    return value;
  }

  @Override
  public String toString() {
    return String.valueOf(value);
  }

  public static BuiltInOperationType fromValue(String value) {
    for (BuiltInOperationType b : BuiltInOperationType.values()) {
      if (b.value.equals(value)) {
        return b;
      }
    }
    throw new IllegalArgumentException("Unexpected value '" + value + "'");
  }

  public static class Adapter extends TypeAdapter<BuiltInOperationType> {

    @Override
    public void write(
      final JsonWriter jsonWriter,
      final BuiltInOperationType enumeration
    ) throws IOException {
      jsonWriter.value(enumeration.getValue());
    }

    @Override
    public BuiltInOperationType read(final JsonReader jsonReader)
      throws IOException {
      String value = jsonReader.nextString();
      return BuiltInOperationType.fromValue(value);
    }
  }
}
