package com.algolia.model.search;

import com.algolia.JSON;
import com.algolia.utils.CompoundType;
import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.reflect.TypeToken;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import java.io.IOException;

@JsonAdapter(SearchParams.Adapter.class)
public abstract class SearchParams implements CompoundType {

  public static SearchParams ofSearchParamsObject(SearchParamsObject inside) {
    return new SearchParamsSearchParamsObject(inside);
  }

  public static SearchParams ofSearchParamsString(SearchParamsString inside) {
    return new SearchParamsSearchParamsString(inside);
  }

  public static class Adapter extends TypeAdapter<SearchParams> {

    @Override
    public void write(final JsonWriter out, final SearchParams oneOf)
      throws IOException {
      TypeAdapter runtimeTypeAdapter = (TypeAdapter) JSON
        .getGson()
        .getAdapter(TypeToken.get(oneOf.getInsideValue().getClass()));
      runtimeTypeAdapter.write(out, oneOf.getInsideValue());
    }

    @Override
    public SearchParams read(final JsonReader jsonReader) throws IOException {
      return null;
    }
  }
}

@JsonAdapter(SearchParams.Adapter.class)
class SearchParamsSearchParamsObject extends SearchParams {

  private final SearchParamsObject insideValue;

  SearchParamsSearchParamsObject(SearchParamsObject insideValue) {
    this.insideValue = insideValue;
  }

  @Override
  public SearchParamsObject getInsideValue() {
    return insideValue;
  }
}

@JsonAdapter(SearchParams.Adapter.class)
class SearchParamsSearchParamsString extends SearchParams {

  private final SearchParamsString insideValue;

  SearchParamsSearchParamsString(SearchParamsString insideValue) {
    this.insideValue = insideValue;
  }

  @Override
  public SearchParamsString getInsideValue() {
    return insideValue;
  }
}
