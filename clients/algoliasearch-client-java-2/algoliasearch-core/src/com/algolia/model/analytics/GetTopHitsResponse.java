package com.algolia.model.analytics;

import com.algolia.JSON;
import com.algolia.utils.CompoundType;
import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.reflect.TypeToken;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import java.io.IOException;

@JsonAdapter(GetTopHitsResponse.Adapter.class)
public abstract class GetTopHitsResponse implements CompoundType {

  public static GetTopHitsResponse ofTopHitsResponse(TopHitsResponse inside) {
    return new GetTopHitsResponseTopHitsResponse(inside);
  }

  public static GetTopHitsResponse ofTopHitsResponseWithAnalytics(
    TopHitsResponseWithAnalytics inside
  ) {
    return new GetTopHitsResponseTopHitsResponseWithAnalytics(inside);
  }

  public static class Adapter extends TypeAdapter<GetTopHitsResponse> {

    @Override
    public void write(final JsonWriter out, final GetTopHitsResponse oneOf)
      throws IOException {
      TypeAdapter runtimeTypeAdapter = (TypeAdapter) JSON
        .getGson()
        .getAdapter(TypeToken.get(oneOf.getInsideValue().getClass()));
      runtimeTypeAdapter.write(out, oneOf.getInsideValue());
    }

    @Override
    public GetTopHitsResponse read(final JsonReader jsonReader)
      throws IOException {
      return null;
    }
  }
}

@JsonAdapter(GetTopHitsResponse.Adapter.class)
class GetTopHitsResponseTopHitsResponse extends GetTopHitsResponse {

  private final TopHitsResponse insideValue;

  GetTopHitsResponseTopHitsResponse(TopHitsResponse insideValue) {
    this.insideValue = insideValue;
  }

  @Override
  public TopHitsResponse getInsideValue() {
    return insideValue;
  }
}

@JsonAdapter(GetTopHitsResponse.Adapter.class)
class GetTopHitsResponseTopHitsResponseWithAnalytics
  extends GetTopHitsResponse {

  private final TopHitsResponseWithAnalytics insideValue;

  GetTopHitsResponseTopHitsResponseWithAnalytics(
    TopHitsResponseWithAnalytics insideValue
  ) {
    this.insideValue = insideValue;
  }

  @Override
  public TopHitsResponseWithAnalytics getInsideValue() {
    return insideValue;
  }
}
