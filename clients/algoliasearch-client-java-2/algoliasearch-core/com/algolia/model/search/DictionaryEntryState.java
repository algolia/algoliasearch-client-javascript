package com.algolia.model.search;

import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import java.io.IOException;

/** The state of the dictionary entry. */
@JsonAdapter(DictionaryEntryState.Adapter.class)
public enum DictionaryEntryState {
  ENABLED("enabled"),

  DISABLED("disabled");

  private final String value;

  DictionaryEntryState(String value) {
    this.value = value;
  }

  public String getValue() {
    return value;
  }

  @Override
  public String toString() {
    return String.valueOf(value);
  }

  public static DictionaryEntryState fromValue(String value) {
    for (DictionaryEntryState b : DictionaryEntryState.values()) {
      if (b.value.equals(value)) {
        return b;
      }
    }
    throw new IllegalArgumentException("Unexpected value '" + value + "'");
  }

  public static class Adapter extends TypeAdapter<DictionaryEntryState> {

    @Override
    public void write(
      final JsonWriter jsonWriter,
      final DictionaryEntryState enumeration
    ) throws IOException {
      jsonWriter.value(enumeration.getValue());
    }

    @Override
    public DictionaryEntryState read(final JsonReader jsonReader)
      throws IOException {
      String value = jsonReader.nextString();
      return DictionaryEntryState.fromValue(value);
    }
  }
}
