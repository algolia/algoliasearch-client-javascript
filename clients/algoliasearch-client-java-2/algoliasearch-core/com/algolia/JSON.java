package com.algolia;

import com.google.gson.FieldNamingPolicy;
import com.google.gson.FieldNamingStrategy;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.InstanceCreator;
import com.google.gson.JsonParseException;
import com.google.gson.JsonSyntaxException;
import com.google.gson.TypeAdapter;
import com.google.gson.TypeAdapterFactory;
import com.google.gson.annotations.SerializedName;
import com.google.gson.internal.$Gson$Types;
import com.google.gson.internal.ConstructorConstructor;
import com.google.gson.internal.Excluder;
import com.google.gson.internal.LinkedTreeMap;
import com.google.gson.internal.ObjectConstructor;
import com.google.gson.internal.Primitives;
import com.google.gson.internal.bind.MapTypeAdapterFactory;
import com.google.gson.internal.bind.util.ISO8601Utils;
import com.google.gson.reflect.TypeToken;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonToken;
import com.google.gson.stream.JsonWriter;
import io.gsonfire.GsonFireBuilder;
import java.io.IOException;
import java.io.StringReader;
import java.io.StringWriter;
import java.lang.reflect.Field;
import java.lang.reflect.Type;
import java.lang.reflect.TypeVariable;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.ParsePosition;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.Date;
import java.util.EnumMap;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.IdentityHashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.TreeMap;
import java.util.WeakHashMap;
import java.util.concurrent.ConcurrentHashMap;
import okio.ByteString;

public class JSON {

  private Gson gson;
  private boolean isLenientOnJson = false;
  private DateTypeAdapter dateTypeAdapter = new DateTypeAdapter();
  private SqlDateTypeAdapter sqlDateTypeAdapter = new SqlDateTypeAdapter();
  private OffsetDateTimeTypeAdapter offsetDateTimeTypeAdapter = new OffsetDateTimeTypeAdapter();
  private LocalDateTypeAdapter localDateTypeAdapter = new LocalDateTypeAdapter();
  private ByteArrayAdapter byteArrayAdapter = new ByteArrayAdapter();
  private RetainFieldMapFactory mapAdapter = new RetainFieldMapFactory();

  public static GsonBuilder createGson() {
    GsonFireBuilder fireBuilder = new GsonFireBuilder();
    GsonBuilder builder = fireBuilder.createGsonBuilder();
    return builder;
  }

  public JSON() {
    gson =
      createGson()
        .registerTypeAdapter(Date.class, dateTypeAdapter)
        .registerTypeAdapter(java.sql.Date.class, sqlDateTypeAdapter)
        .registerTypeAdapter(OffsetDateTime.class, offsetDateTimeTypeAdapter)
        .registerTypeAdapter(LocalDate.class, localDateTypeAdapter)
        .registerTypeAdapter(byte[].class, byteArrayAdapter)
        .registerTypeAdapterFactory(mapAdapter)
        .create();
  }

  /**
   * Get Gson.
   *
   * @return Gson
   */
  public Gson getGson() {
    return gson;
  }

  /**
   * Set Gson.
   *
   * @param gson Gson
   * @return JSON
   */
  public JSON setGson(Gson gson) {
    this.gson = gson;
    return this;
  }

  public JSON setLenientOnJson(boolean lenientOnJson) {
    isLenientOnJson = lenientOnJson;
    return this;
  }

  /**
   * Serialize the given Java object into JSON string.
   *
   * @param obj Object
   * @return String representation of the JSON
   */
  public String serialize(Object obj) {
    return gson.toJson(obj);
  }

  /**
   * Deserialize the given JSON string to Java object.
   *
   * @param <T> Type
   * @param body The JSON string
   * @param returnType The type to deserialize into
   * @return The deserialized Java object
   */
  public <T> T deserialize(String body, Type returnType) {
    try {
      if (isLenientOnJson) {
        JsonReader jsonReader = new JsonReader(new StringReader(body));
        // see
        // https://google-gson.googlecode.com/svn/trunk/gson/docs/javadocs/com/google/gson/stream/JsonReader.html#setLenient(boolean)
        jsonReader.setLenient(true);
        return gson.fromJson(jsonReader, returnType);
      } else {
        return gson.fromJson(body, returnType);
      }
    } catch (JsonParseException e) {
      // Fallback processing when failed to parse JSON form response body:
      // return the response body string directly for the String return type;
      if (returnType.equals(String.class)) {
        return (T) body;
      } else {
        throw (e);
      }
    }
  }

  /** Gson TypeAdapter for Byte Array type */
  public class ByteArrayAdapter extends TypeAdapter<byte[]> {

    @Override
    public void write(JsonWriter out, byte[] value) throws IOException {
      if (value == null) {
        out.nullValue();
      } else {
        out.value(ByteString.of(value).base64());
      }
    }

    @Override
    public byte[] read(JsonReader in) throws IOException {
      switch (in.peek()) {
        case NULL:
          in.nextNull();
          return null;
        default:
          String bytesAsBase64 = in.nextString();
          ByteString byteString = ByteString.decodeBase64(bytesAsBase64);
          return byteString.toByteArray();
      }
    }
  }

  /** Gson TypeAdapter for JSR310 OffsetDateTime type */
  public static class OffsetDateTimeTypeAdapter
    extends TypeAdapter<OffsetDateTime> {

    private DateTimeFormatter formatter;

    public OffsetDateTimeTypeAdapter() {
      this(DateTimeFormatter.ISO_OFFSET_DATE_TIME);
    }

    public OffsetDateTimeTypeAdapter(DateTimeFormatter formatter) {
      this.formatter = formatter;
    }

    public void setFormat(DateTimeFormatter dateFormat) {
      this.formatter = dateFormat;
    }

    @Override
    public void write(JsonWriter out, OffsetDateTime date) throws IOException {
      if (date == null) {
        out.nullValue();
      } else {
        out.value(formatter.format(date));
      }
    }

    @Override
    public OffsetDateTime read(JsonReader in) throws IOException {
      switch (in.peek()) {
        case NULL:
          in.nextNull();
          return null;
        default:
          String date = in.nextString();
          if (date.endsWith("+0000")) {
            date = date.substring(0, date.length() - 5) + "Z";
          }
          return OffsetDateTime.parse(date, formatter);
      }
    }
  }

  /** Gson TypeAdapter for JSR310 LocalDate type */
  public class LocalDateTypeAdapter extends TypeAdapter<LocalDate> {

    private DateTimeFormatter formatter;

    public LocalDateTypeAdapter() {
      this(DateTimeFormatter.ISO_LOCAL_DATE);
    }

    public LocalDateTypeAdapter(DateTimeFormatter formatter) {
      this.formatter = formatter;
    }

    public void setFormat(DateTimeFormatter dateFormat) {
      this.formatter = dateFormat;
    }

    @Override
    public void write(JsonWriter out, LocalDate date) throws IOException {
      if (date == null) {
        out.nullValue();
      } else {
        out.value(formatter.format(date));
      }
    }

    @Override
    public LocalDate read(JsonReader in) throws IOException {
      switch (in.peek()) {
        case NULL:
          in.nextNull();
          return null;
        default:
          String date = in.nextString();
          return LocalDate.parse(date, formatter);
      }
    }
  }

  public JSON setOffsetDateTimeFormat(DateTimeFormatter dateFormat) {
    offsetDateTimeTypeAdapter.setFormat(dateFormat);
    return this;
  }

  public JSON setLocalDateFormat(DateTimeFormatter dateFormat) {
    localDateTypeAdapter.setFormat(dateFormat);
    return this;
  }

  /**
   * Gson TypeAdapter for java.sql.Date type If the dateFormat is null, a simple "yyyy-MM-dd" format
   * will be used (more efficient than SimpleDateFormat).
   */
  public static class SqlDateTypeAdapter extends TypeAdapter<java.sql.Date> {

    private DateFormat dateFormat;

    public SqlDateTypeAdapter() {}

    public SqlDateTypeAdapter(DateFormat dateFormat) {
      this.dateFormat = dateFormat;
    }

    public void setFormat(DateFormat dateFormat) {
      this.dateFormat = dateFormat;
    }

    @Override
    public void write(JsonWriter out, java.sql.Date date) throws IOException {
      if (date == null) {
        out.nullValue();
      } else {
        String value;
        if (dateFormat != null) {
          value = dateFormat.format(date);
        } else {
          value = date.toString();
        }
        out.value(value);
      }
    }

    @Override
    public java.sql.Date read(JsonReader in) throws IOException {
      switch (in.peek()) {
        case NULL:
          in.nextNull();
          return null;
        default:
          String date = in.nextString();
          try {
            if (dateFormat != null) {
              return new java.sql.Date(dateFormat.parse(date).getTime());
            }
            return new java.sql.Date(
              ISO8601Utils.parse(date, new ParsePosition(0)).getTime()
            );
          } catch (ParseException e) {
            throw new JsonParseException(e);
          }
      }
    }
  }

  /**
   * Gson TypeAdapter for java.util.Date type If the dateFormat is null, ISO8601Utils will be used.
   */
  public static class DateTypeAdapter extends TypeAdapter<Date> {

    private DateFormat dateFormat;

    public DateTypeAdapter() {}

    public DateTypeAdapter(DateFormat dateFormat) {
      this.dateFormat = dateFormat;
    }

    public void setFormat(DateFormat dateFormat) {
      this.dateFormat = dateFormat;
    }

    @Override
    public void write(JsonWriter out, Date date) throws IOException {
      if (date == null) {
        out.nullValue();
      } else {
        String value;
        if (dateFormat != null) {
          value = dateFormat.format(date);
        } else {
          value = ISO8601Utils.format(date, true);
        }
        out.value(value);
      }
    }

    @Override
    public Date read(JsonReader in) throws IOException {
      try {
        switch (in.peek()) {
          case NULL:
            in.nextNull();
            return null;
          default:
            String date = in.nextString();
            try {
              if (dateFormat != null) {
                return dateFormat.parse(date);
              }
              return ISO8601Utils.parse(date, new ParsePosition(0));
            } catch (ParseException e) {
              throw new JsonParseException(e);
            }
        }
      } catch (IllegalArgumentException e) {
        throw new JsonParseException(e);
      }
    }
  }

  public JSON setDateFormat(DateFormat dateFormat) {
    dateTypeAdapter.setFormat(dateFormat);
    return this;
  }

  public JSON setSqlDateFormat(DateFormat dateFormat) {
    sqlDateTypeAdapter.setFormat(dateFormat);
    return this;
  }
}

// https://stackoverflow.com/questions/21458468/gson-wont-properly-serialise-a-class-that-extends-hashmap
class RetainFieldMapFactory implements TypeAdapterFactory {

  FieldNamingPolicy fieldNamingPolicy = FieldNamingPolicy.IDENTITY;
  ConstructorConstructor constructorConstructor = new ConstructorConstructor(
    Collections.<Type, InstanceCreator<?>>emptyMap()
  );
  MapTypeAdapterFactory defaultMapFactory = new MapTypeAdapterFactory(
    constructorConstructor,
    false
  );
  ReflectiveFilterMapFieldFactory defaultObjectFactory = new ReflectiveFilterMapFieldFactory(
    constructorConstructor,
    fieldNamingPolicy,
    Excluder.DEFAULT
  );

  @Override
  public <T> TypeAdapter<T> create(Gson gson, TypeToken<T> type) {
    final TypeAdapter<T> mapAdapter = defaultMapFactory.create(gson, type);
    if (mapAdapter != null) {
      return (TypeAdapter<T>) new RetainFieldMapAdapter(
        mapAdapter,
        defaultObjectFactory.create(gson, type)
      );
    }
    return mapAdapter;
  }

  class RetainFieldMapAdapter extends TypeAdapter<Map<String, Object>> {

    TypeAdapter<Map<String, Object>> mapAdapter;
    ReflectiveTypeAdapterFactory.Adapter<Map<String, Object>> objectAdapter;

    RetainFieldMapAdapter(
      TypeAdapter mapAdapter,
      ReflectiveTypeAdapterFactory.Adapter objectAdapter
    ) {
      this.mapAdapter = mapAdapter;
      this.objectAdapter = objectAdapter;
    }

    @Override
    public void write(final JsonWriter out, Map<String, Object> value)
      throws IOException {
      if (value == null) {
        out.nullValue();
        return;
      }
      // 1.write object
      StringWriter sw = new StringWriter();
      objectAdapter.write(new JsonWriter(sw), value);

      // 2.convert object to a map
      Map<String, Object> objectMap = mapAdapter.fromJson(sw.toString());

      // 3.overwrite fields in object to a copy map
      value = new LinkedHashMap<String, Object>(value);
      value.putAll(objectMap);

      // 4.write the copy map
      mapAdapter.write(out, value);
    }

    @Override
    public Map<String, Object> read(JsonReader in) throws IOException {
      // 1.create map, all key-value retain in map
      Map<String, Object> map = mapAdapter.read(in);

      // 2.create object from created map
      Map<String, Object> object = objectAdapter.fromJsonTree(
        mapAdapter.toJsonTree(map)
      );

      // 3.remove fields in object from map
      for (String field : objectAdapter.boundFields.keySet()) {
        map.remove(field);
      }
      // 4.put map to object
      object.putAll(map);
      return object;
    }
  }

  static class ReflectiveFilterMapFieldFactory
    extends ReflectiveTypeAdapterFactory {

    public ReflectiveFilterMapFieldFactory(
      ConstructorConstructor constructorConstructor,
      FieldNamingStrategy fieldNamingPolicy,
      Excluder excluder
    ) {
      super(constructorConstructor, fieldNamingPolicy, excluder);
    }

    @Override
    protected boolean shouldFindFieldInClass(
      Class willFindClass,
      Class<?> originalRaw
    ) {
      Class[] endClasses = new Class[] {
        Object.class,
        HashMap.class,
        LinkedHashMap.class,
        LinkedTreeMap.class,
        Hashtable.class,
        TreeMap.class,
        ConcurrentHashMap.class,
        IdentityHashMap.class,
        WeakHashMap.class,
        EnumMap.class,
      };
      for (Class c : endClasses) {
        if (willFindClass == c) return false;
      }

      return super.shouldFindFieldInClass(willFindClass, originalRaw);
    }
  }

  /**
   * below code copy from {@link com.google.gson.internal.bind.ReflectiveTypeAdapterFactory} (little
   * modify, in source this class is final) Type adapter that reflects over the fields and methods
   * of a class.
   */
  static class ReflectiveTypeAdapterFactory implements TypeAdapterFactory {

    private final ConstructorConstructor constructorConstructor;
    private final FieldNamingStrategy fieldNamingPolicy;
    private final Excluder excluder;

    public ReflectiveTypeAdapterFactory(
      ConstructorConstructor constructorConstructor,
      FieldNamingStrategy fieldNamingPolicy,
      Excluder excluder
    ) {
      this.constructorConstructor = constructorConstructor;
      this.fieldNamingPolicy = fieldNamingPolicy;
      this.excluder = excluder;
    }

    public boolean excludeField(Field f, boolean serialize) {
      return (
        !excluder.excludeClass(f.getType(), serialize) &&
        !excluder.excludeField(f, serialize)
      );
    }

    private String getFieldName(Field f) {
      SerializedName serializedName = f.getAnnotation(SerializedName.class);
      return serializedName == null
        ? fieldNamingPolicy.translateName(f)
        : serializedName.value();
    }

    public <T> Adapter<T> create(Gson gson, final TypeToken<T> type) {
      Class<? super T> raw = type.getRawType();

      if (!Object.class.isAssignableFrom(raw)) {
        return null; // it's a primitive!
      }

      ObjectConstructor<T> constructor = constructorConstructor.get(type);
      return new Adapter<T>(constructor, getBoundFields(gson, type, raw));
    }

    private ReflectiveTypeAdapterFactory.BoundField createBoundField(
      final Gson context,
      final Field field,
      final String name,
      final TypeToken<?> fieldType,
      boolean serialize,
      boolean deserialize
    ) {
      final boolean isPrimitive = Primitives.isPrimitive(
        fieldType.getRawType()
      );

      // special casing primitives here saves ~5% on Android...
      return new ReflectiveTypeAdapterFactory.BoundField(
        name,
        serialize,
        deserialize
      ) {
        final TypeAdapter<?> typeAdapter = context.getAdapter(fieldType);

        @SuppressWarnings({ "unchecked", "rawtypes" }) // the type adapter and field type always agree
        @Override
        void write(JsonWriter writer, Object value)
          throws IOException, IllegalAccessException {
          Object fieldValue = field.get(value);
          TypeAdapter t = new TypeAdapterRuntimeTypeWrapper(
            context,
            this.typeAdapter,
            fieldType.getType()
          );
          t.write(writer, fieldValue);
        }

        @Override
        void read(JsonReader reader, Object value)
          throws IOException, IllegalAccessException {
          Object fieldValue = typeAdapter.read(reader);
          if (fieldValue != null || !isPrimitive) {
            field.set(value, fieldValue);
          }
        }
      };
    }

    private Map<String, BoundField> getBoundFields(
      Gson context,
      TypeToken<?> type,
      Class<?> raw
    ) {
      Map<String, BoundField> result = new LinkedHashMap<String, BoundField>();
      if (raw.isInterface()) {
        return result;
      }

      Type declaredType = type.getType();
      Class<?> originalRaw = type.getRawType();
      while (shouldFindFieldInClass(raw, originalRaw)) {
        Field[] fields = raw.getDeclaredFields();
        for (Field field : fields) {
          boolean serialize = excludeField(field, true);
          boolean deserialize = excludeField(field, false);
          if (!serialize && !deserialize) {
            continue;
          }
          field.setAccessible(true);
          Type fieldType = $Gson$Types.resolve(
            type.getType(),
            raw,
            field.getGenericType()
          );
          BoundField boundField = createBoundField(
            context,
            field,
            getFieldName(field),
            TypeToken.get(fieldType),
            serialize,
            deserialize
          );
          BoundField previous = result.put(boundField.name, boundField);
          if (previous != null) {
            throw new IllegalArgumentException(
              declaredType +
              " declares multiple JSON fields named " +
              previous.name
            );
          }
        }
        type =
          TypeToken.get(
            $Gson$Types.resolve(type.getType(), raw, raw.getGenericSuperclass())
          );
        raw = type.getRawType();
      }
      return result;
    }

    protected boolean shouldFindFieldInClass(
      Class willFindClass,
      Class<?> originalRaw
    ) {
      return willFindClass != Object.class;
    }

    abstract static class BoundField {

      final String name;
      final boolean serialized;
      final boolean deserialized;

      protected BoundField(
        String name,
        boolean serialized,
        boolean deserialized
      ) {
        this.name = name;
        this.serialized = serialized;
        this.deserialized = deserialized;
      }

      abstract void write(JsonWriter writer, Object value)
        throws IOException, IllegalAccessException;

      abstract void read(JsonReader reader, Object value)
        throws IOException, IllegalAccessException;
    }

    public static final class Adapter<T> extends TypeAdapter<T> {

      private final ObjectConstructor<T> constructor;
      private final Map<String, BoundField> boundFields;

      private Adapter(
        ObjectConstructor<T> constructor,
        Map<String, BoundField> boundFields
      ) {
        this.constructor = constructor;
        this.boundFields = boundFields;
      }

      @Override
      public T read(JsonReader in) throws IOException {
        if (in.peek() == JsonToken.NULL) {
          in.nextNull();
          return null;
        }

        T instance = constructor.construct();

        try {
          in.beginObject();
          while (in.hasNext()) {
            String name = in.nextName();
            BoundField field = boundFields.get(name);
            if (field == null || !field.deserialized) {
              in.skipValue();
            } else {
              field.read(in, instance);
            }
          }
        } catch (IllegalStateException e) {
          throw new JsonSyntaxException(e);
        } catch (IllegalAccessException e) {
          throw new AssertionError(e);
        }
        in.endObject();
        return instance;
      }

      @Override
      public void write(JsonWriter out, T value) throws IOException {
        if (value == null) {
          out.nullValue();
          return;
        }

        out.beginObject();
        try {
          for (BoundField boundField : boundFields.values()) {
            if (boundField.serialized) {
              out.name(boundField.name);
              boundField.write(out, value);
            }
          }
        } catch (IllegalAccessException e) {
          throw new AssertionError();
        }
        out.endObject();
      }
    }
  }

  static class TypeAdapterRuntimeTypeWrapper<T> extends TypeAdapter<T> {

    private final Gson context;
    private final TypeAdapter<T> delegate;
    private final Type type;

    TypeAdapterRuntimeTypeWrapper(
      Gson context,
      TypeAdapter<T> delegate,
      Type type
    ) {
      this.context = context;
      this.delegate = delegate;
      this.type = type;
    }

    @Override
    public T read(JsonReader in) throws IOException {
      return delegate.read(in);
    }

    @SuppressWarnings({ "rawtypes", "unchecked" })
    @Override
    public void write(JsonWriter out, T value) throws IOException {
      // Order of preference for choosing type adapters
      // First preference: a type adapter registered for the runtime type
      // Second preference: a type adapter registered for the declared type
      // Third preference: reflective type adapter for the runtime type (if it is a
      // sub class of the declared type)
      // Fourth preference: reflective type adapter for the declared type

      TypeAdapter chosen = delegate;
      Type runtimeType = getRuntimeTypeIfMoreSpecific(type, value);
      if (runtimeType != type) {
        TypeAdapter runtimeTypeAdapter = context.getAdapter(
          TypeToken.get(runtimeType)
        );
        if (
          !(runtimeTypeAdapter instanceof ReflectiveTypeAdapterFactory.Adapter)
        ) {
          // The user registered a type adapter for the runtime type, so we will use that
          chosen = runtimeTypeAdapter;
        } else if (
          !(delegate instanceof ReflectiveTypeAdapterFactory.Adapter)
        ) {
          // The user registered a type adapter for Base class, so we prefer it over the
          // reflective type adapter for the runtime type
          chosen = delegate;
        } else {
          // Use the type adapter for runtime type
          chosen = runtimeTypeAdapter;
        }
      }
      chosen.write(out, value);
    }

    /** Finds a compatible runtime type if it is more specific */
    private Type getRuntimeTypeIfMoreSpecific(Type type, Object value) {
      if (
        value != null &&
        (
          type == Object.class ||
          type instanceof TypeVariable<?> ||
          type instanceof Class<?>
        )
      ) {
        type = value.getClass();
      }
      return type;
    }
  }
}
