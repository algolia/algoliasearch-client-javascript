package com.algolia.model.insights;

import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import java.io.IOException;

/** An eventType can be a click, a conversion, or a view. */
@JsonAdapter(EventType.Adapter.class)
public enum EventType {
  CLICK("click"),

  CONVERSION("conversion"),

  VIEW("view");

  private final String value;

  EventType(String value) {
    this.value = value;
  }

  public String getValue() {
    return value;
  }

  @Override
  public String toString() {
    return String.valueOf(value);
  }

  public static EventType fromValue(String value) {
    for (EventType b : EventType.values()) {
      if (b.value.equals(value)) {
        return b;
      }
    }
    throw new IllegalArgumentException("Unexpected value '" + value + "'");
  }

  public static class Adapter extends TypeAdapter<EventType> {

    @Override
    public void write(final JsonWriter jsonWriter, final EventType enumeration)
      throws IOException {
      jsonWriter.value(enumeration.getValue());
    }

    @Override
    public EventType read(final JsonReader jsonReader) throws IOException {
      String value = jsonReader.nextString();
      return EventType.fromValue(value);
    }
  }
}
