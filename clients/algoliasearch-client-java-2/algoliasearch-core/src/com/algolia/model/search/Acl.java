package com.algolia.model.search;

import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import java.io.IOException;

/** Gets or Sets acl */
@JsonAdapter(Acl.Adapter.class)
public enum Acl {
  ADD_OBJECT("addObject"),

  ANALYTICS("analytics"),

  BROWSE("browse"),

  DELETE_OBJECT("deleteObject"),

  DELETE_INDEX("deleteIndex"),

  EDIT_SETTINGS("editSettings"),

  LIST_INDEXES("listIndexes"),

  LOGS("logs"),

  PERSONALIZATION("personalization"),

  RECOMMENDATION("recommendation"),

  SEARCH("search"),

  SEE_UNRETRIEVABLE_ATTRIBUTES("seeUnretrievableAttributes"),

  SETTINGS("settings"),

  USAGE("usage");

  private final String value;

  Acl(String value) {
    this.value = value;
  }

  public String getValue() {
    return value;
  }

  @Override
  public String toString() {
    return String.valueOf(value);
  }

  public static Acl fromValue(String value) {
    for (Acl b : Acl.values()) {
      if (b.value.equals(value)) {
        return b;
      }
    }
    throw new IllegalArgumentException("Unexpected value '" + value + "'");
  }

  public static class Adapter extends TypeAdapter<Acl> {

    @Override
    public void write(final JsonWriter jsonWriter, final Acl enumeration)
      throws IOException {
      jsonWriter.value(enumeration.getValue());
    }

    @Override
    public Acl read(final JsonReader jsonReader) throws IOException {
      String value = jsonReader.nextString();
      return Acl.fromValue(value);
    }
  }
}
