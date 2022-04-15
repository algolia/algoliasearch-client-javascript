package com.algolia.model.recommend;

import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import java.io.IOException;

/** The recommendation model to use. */
@JsonAdapter(RecommendationModels.Adapter.class)
public enum RecommendationModels {
  RELATED_PRODUCTS("related-products"),

  BOUGHT_TOGETHER("bought-together");

  private final String value;

  RecommendationModels(String value) {
    this.value = value;
  }

  public String getValue() {
    return value;
  }

  @Override
  public String toString() {
    return String.valueOf(value);
  }

  public static RecommendationModels fromValue(String value) {
    for (RecommendationModels b : RecommendationModels.values()) {
      if (b.value.equals(value)) {
        return b;
      }
    }
    throw new IllegalArgumentException("Unexpected value '" + value + "'");
  }

  public static class Adapter extends TypeAdapter<RecommendationModels> {

    @Override
    public void write(
      final JsonWriter jsonWriter,
      final RecommendationModels enumeration
    ) throws IOException {
      jsonWriter.value(enumeration.getValue());
    }

    @Override
    public RecommendationModels read(final JsonReader jsonReader)
      throws IOException {
      String value = jsonReader.nextString();
      return RecommendationModels.fromValue(value);
    }
  }
}
