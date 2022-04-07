package com.algolia.model.search;

import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import java.io.IOException;

/** Gets or Sets logType */
@JsonAdapter(LogType.Adapter.class)
public enum LogType {
  ALL("all"),

  QUERY("query"),

  BUILD("build"),

  ERROR("error");

  private final String value;

  LogType(String value) {
    this.value = value;
  }

  public String getValue() {
    return value;
  }

  @Override
  public String toString() {
    return String.valueOf(value);
  }

  public static LogType fromValue(String value) {
    for (LogType b : LogType.values()) {
      if (b.value.equals(value)) {
        return b;
      }
    }
    throw new IllegalArgumentException("Unexpected value '" + value + "'");
  }

  public static class Adapter extends TypeAdapter<LogType> {

    @Override
    public void write(final JsonWriter jsonWriter, final LogType enumeration)
      throws IOException {
      jsonWriter.value(enumeration.getValue());
    }

    @Override
    public LogType read(final JsonReader jsonReader) throws IOException {
      String value = jsonReader.nextString();
      return LogType.fromValue(value);
    }
  }
}
