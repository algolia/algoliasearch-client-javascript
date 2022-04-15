package com.algolia.model.querySuggestions;

import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import java.io.IOException;

/** type of the record, can be one of three values (INFO, SKIP or ERROR). */
@JsonAdapter(LogLevel.Adapter.class)
public enum LogLevel {
  I_NF_O("INFO"),

  S_KI_P("SKIP"),

  E_RR_OR("ERROR");

  private final String value;

  LogLevel(String value) {
    this.value = value;
  }

  public String getValue() {
    return value;
  }

  @Override
  public String toString() {
    return String.valueOf(value);
  }

  public static LogLevel fromValue(String value) {
    for (LogLevel b : LogLevel.values()) {
      if (b.value.equals(value)) {
        return b;
      }
    }
    throw new IllegalArgumentException("Unexpected value '" + value + "'");
  }

  public static class Adapter extends TypeAdapter<LogLevel> {

    @Override
    public void write(final JsonWriter jsonWriter, final LogLevel enumeration)
      throws IOException {
      jsonWriter.value(enumeration.getValue());
    }

    @Override
    public LogLevel read(final JsonReader jsonReader) throws IOException {
      String value = jsonReader.nextString();
      return LogLevel.fromValue(value);
    }
  }
}
