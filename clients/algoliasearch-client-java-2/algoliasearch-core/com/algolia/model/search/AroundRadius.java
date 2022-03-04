package com.algolia.model.search;

import com.algolia.JSON;
import com.algolia.utils.CompoundType;
import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.reflect.TypeToken;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import java.io.IOException;

@JsonAdapter(AroundRadius.Adapter.class)
public abstract class AroundRadius implements CompoundType {

  public static AroundRadius of(AroundRadiusOneOf inside) {
    return new AroundRadiusAroundRadiusOneOf(inside);
  }

  public static AroundRadius of(Integer inside) {
    return new AroundRadiusInteger(inside);
  }

  public abstract Object getInsideValue();

  public static class Adapter extends TypeAdapter<AroundRadius> {

    @Override
    public void write(final JsonWriter out, final AroundRadius oneOf)
      throws IOException {
      TypeAdapter runtimeTypeAdapter = (TypeAdapter) JSON
        .getGson()
        .getAdapter(TypeToken.get(oneOf.getInsideValue().getClass()));
      runtimeTypeAdapter.write(out, oneOf.getInsideValue());
    }

    @Override
    public AroundRadius read(final JsonReader jsonReader) throws IOException {
      return null;
    }
  }
}

@JsonAdapter(AroundRadius.Adapter.class)
class AroundRadiusAroundRadiusOneOf extends AroundRadius {

  private final AroundRadiusOneOf insideValue;

  AroundRadiusAroundRadiusOneOf(AroundRadiusOneOf insideValue) {
    this.insideValue = insideValue;
  }

  @Override
  public AroundRadiusOneOf getInsideValue() {
    return insideValue;
  }
}

@JsonAdapter(AroundRadius.Adapter.class)
class AroundRadiusInteger extends AroundRadius {

  private final Integer insideValue;

  AroundRadiusInteger(Integer insideValue) {
    this.insideValue = insideValue;
  }

  @Override
  public Integer getInsideValue() {
    return insideValue;
  }
}
