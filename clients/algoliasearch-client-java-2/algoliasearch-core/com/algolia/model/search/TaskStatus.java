package com.algolia.model.search;

import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import java.io.IOException;

/** Gets or Sets taskStatus */
@JsonAdapter(TaskStatus.Adapter.class)
public enum TaskStatus {
  PUBLISHED("published"),

  NOT_PUBLISHED("notPublished");

  private final String value;

  TaskStatus(String value) {
    this.value = value;
  }

  public String getValue() {
    return value;
  }

  @Override
  public String toString() {
    return String.valueOf(value);
  }

  public static TaskStatus fromValue(String value) {
    for (TaskStatus b : TaskStatus.values()) {
      if (b.value.equals(value)) {
        return b;
      }
    }
    throw new IllegalArgumentException("Unexpected value '" + value + "'");
  }

  public static class Adapter extends TypeAdapter<TaskStatus> {

    @Override
    public void write(
      final JsonWriter jsonWriter,
      final TaskStatus enumeration
    ) throws IOException {
      jsonWriter.value(enumeration.getValue());
    }

    @Override
    public TaskStatus read(final JsonReader jsonReader) throws IOException {
      String value = jsonReader.nextString();
      return TaskStatus.fromValue(value);
    }
  }
}
