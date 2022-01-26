package com.algolia.model;

import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import java.io.IOException;

/** Actions to perform. */
@JsonAdapter(DictionaryAction.Adapter.class)
public enum DictionaryAction {
  ADDENTRY("addEntry"),

  DELETEENTRY("deleteEntry");

  private String value;

  DictionaryAction(String value) {
    this.value = value;
  }

  public String getValue() {
    return value;
  }

  @Override
  public String toString() {
    return String.valueOf(value);
  }

  public static DictionaryAction fromValue(String value) {
    for (DictionaryAction b : DictionaryAction.values()) {
      if (b.value.equals(value)) {
        return b;
      }
    }
    throw new IllegalArgumentException("Unexpected value '" + value + "'");
  }

  public static class Adapter extends TypeAdapter<DictionaryAction> {

    @Override
    public void write(
      final JsonWriter jsonWriter,
      final DictionaryAction enumeration
    ) throws IOException {
      jsonWriter.value(enumeration.getValue());
    }

    @Override
    public DictionaryAction read(final JsonReader jsonReader)
      throws IOException {
      String value = jsonReader.nextString();
      return DictionaryAction.fromValue(value);
    }
  }
}
