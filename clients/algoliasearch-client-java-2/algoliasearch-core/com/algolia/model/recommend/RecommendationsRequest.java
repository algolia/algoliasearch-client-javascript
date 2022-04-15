package com.algolia.model.recommend;

import com.algolia.JSON;
import com.algolia.utils.CompoundType;
import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.reflect.TypeToken;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import java.io.IOException;

@JsonAdapter(RecommendationsRequest.Adapter.class)
public abstract class RecommendationsRequest implements CompoundType {

  public static RecommendationsRequest ofRecommendationRequest(
    RecommendationRequest inside
  ) {
    return new RecommendationsRequestRecommendationRequest(inside);
  }

  public static RecommendationsRequest ofTrendingRequest(
    TrendingRequest inside
  ) {
    return new RecommendationsRequestTrendingRequest(inside);
  }

  public static class Adapter extends TypeAdapter<RecommendationsRequest> {

    @Override
    public void write(final JsonWriter out, final RecommendationsRequest oneOf)
      throws IOException {
      TypeAdapter runtimeTypeAdapter = (TypeAdapter) JSON
        .getGson()
        .getAdapter(TypeToken.get(oneOf.getInsideValue().getClass()));
      runtimeTypeAdapter.write(out, oneOf.getInsideValue());
    }

    @Override
    public RecommendationsRequest read(final JsonReader jsonReader)
      throws IOException {
      return null;
    }
  }
}

@JsonAdapter(RecommendationsRequest.Adapter.class)
class RecommendationsRequestRecommendationRequest
  extends RecommendationsRequest {

  private final RecommendationRequest insideValue;

  RecommendationsRequestRecommendationRequest(
    RecommendationRequest insideValue
  ) {
    this.insideValue = insideValue;
  }

  @Override
  public RecommendationRequest getInsideValue() {
    return insideValue;
  }
}

@JsonAdapter(RecommendationsRequest.Adapter.class)
class RecommendationsRequestTrendingRequest extends RecommendationsRequest {

  private final TrendingRequest insideValue;

  RecommendationsRequestTrendingRequest(TrendingRequest insideValue) {
    this.insideValue = insideValue;
  }

  @Override
  public TrendingRequest getInsideValue() {
    return insideValue;
  }
}
