package com.algolia.model.abtesting;

import com.algolia.JSON;
import com.algolia.utils.CompoundType;
import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.reflect.TypeToken;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import java.io.IOException;

@JsonAdapter(AddABTestsVariant.Adapter.class)
public abstract class AddABTestsVariant implements CompoundType {

  public static AddABTestsVariant ofAbTestsVariant(AbTestsVariant inside) {
    return new AddABTestsVariantAbTestsVariant(inside);
  }

  public static AddABTestsVariant ofAbTestsVariantSearchParams(
    AbTestsVariantSearchParams inside
  ) {
    return new AddABTestsVariantAbTestsVariantSearchParams(inside);
  }

  public static class Adapter extends TypeAdapter<AddABTestsVariant> {

    @Override
    public void write(final JsonWriter out, final AddABTestsVariant oneOf)
      throws IOException {
      TypeAdapter runtimeTypeAdapter = (TypeAdapter) JSON
        .getGson()
        .getAdapter(TypeToken.get(oneOf.getInsideValue().getClass()));
      runtimeTypeAdapter.write(out, oneOf.getInsideValue());
    }

    @Override
    public AddABTestsVariant read(final JsonReader jsonReader)
      throws IOException {
      return null;
    }
  }
}

@JsonAdapter(AddABTestsVariant.Adapter.class)
class AddABTestsVariantAbTestsVariant extends AddABTestsVariant {

  private final AbTestsVariant insideValue;

  AddABTestsVariantAbTestsVariant(AbTestsVariant insideValue) {
    this.insideValue = insideValue;
  }

  @Override
  public AbTestsVariant getInsideValue() {
    return insideValue;
  }
}

@JsonAdapter(AddABTestsVariant.Adapter.class)
class AddABTestsVariantAbTestsVariantSearchParams extends AddABTestsVariant {

  private final AbTestsVariantSearchParams insideValue;

  AddABTestsVariantAbTestsVariantSearchParams(
    AbTestsVariantSearchParams insideValue
  ) {
    this.insideValue = insideValue;
  }

  @Override
  public AbTestsVariantSearchParams getInsideValue() {
    return insideValue;
  }
}
