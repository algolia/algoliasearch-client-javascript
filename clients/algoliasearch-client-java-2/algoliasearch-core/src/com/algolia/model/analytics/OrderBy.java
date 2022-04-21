package com.algolia.model.analytics;

import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import java.io.IOException;

/** Gets or Sets orderBy */
@JsonAdapter(OrderBy.Adapter.class)
public enum OrderBy {
  SEARCH_COUNT("searchCount"),

  CLICK_THROUGH_RATE("clickThroughRate"),

  CONVERSION_RATE("conversionRate"),

  AVERAGE_CLICK_POSITION("averageClickPosition");

  private final String value;

  OrderBy(String value) {
    this.value = value;
  }

  public String getValue() {
    return value;
  }

  @Override
  public String toString() {
    return String.valueOf(value);
  }

  public static OrderBy fromValue(String value) {
    for (OrderBy b : OrderBy.values()) {
      if (b.value.equals(value)) {
        return b;
      }
    }
    throw new IllegalArgumentException("Unexpected value '" + value + "'");
  }

  public static class Adapter extends TypeAdapter<OrderBy> {

    @Override
    public void write(final JsonWriter jsonWriter, final OrderBy enumeration)
      throws IOException {
      jsonWriter.value(enumeration.getValue());
    }

    @Override
    public OrderBy read(final JsonReader jsonReader) throws IOException {
      String value = jsonReader.nextString();
      return OrderBy.fromValue(value);
    }
  }
}
