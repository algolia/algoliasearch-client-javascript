package com.algolia.model;

import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.annotations.SerializedName;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;

/** A dictionary entry. */
public class DictionaryEntry extends HashMap<String, Object> {

  @SerializedName("objectID")
  private String objectID;

  @SerializedName("language")
  private String language;

  @SerializedName("word")
  private String word;

  @SerializedName("words")
  private List<String> words = null;

  @SerializedName("decomposition")
  private List<String> decomposition = null;

  /** The state of the dictionary entry. */
  @JsonAdapter(StateEnum.Adapter.class)
  public enum StateEnum {
    ENABLED("enabled"),

    DISABLED("disabled");

    private String value;

    StateEnum(String value) {
      this.value = value;
    }

    public String getValue() {
      return value;
    }

    @Override
    public String toString() {
      return String.valueOf(value);
    }

    public static StateEnum fromValue(String value) {
      for (StateEnum b : StateEnum.values()) {
        if (b.value.equals(value)) {
          return b;
        }
      }
      throw new IllegalArgumentException("Unexpected value '" + value + "'");
    }

    public static class Adapter extends TypeAdapter<StateEnum> {

      @Override
      public void write(
        final JsonWriter jsonWriter,
        final StateEnum enumeration
      ) throws IOException {
        jsonWriter.value(enumeration.getValue());
      }

      @Override
      public StateEnum read(final JsonReader jsonReader) throws IOException {
        String value = jsonReader.nextString();
        return StateEnum.fromValue(value);
      }
    }
  }

  @SerializedName("state")
  private StateEnum state = StateEnum.ENABLED;

  public DictionaryEntry objectID(String objectID) {
    this.objectID = objectID;
    return this;
  }

  /**
   * Unique identifier of the object.
   *
   * @return objectID
   */
  @javax.annotation.Nonnull
  public String getObjectID() {
    return objectID;
  }

  public void setObjectID(String objectID) {
    this.objectID = objectID;
  }

  public DictionaryEntry language(String language) {
    this.language = language;
    return this;
  }

  /**
   * Language ISO code supported by the dictionary (e.g., \"en\" for English).
   *
   * @return language
   */
  @javax.annotation.Nonnull
  public String getLanguage() {
    return language;
  }

  public void setLanguage(String language) {
    this.language = language;
  }

  public DictionaryEntry word(String word) {
    this.word = word;
    return this;
  }

  /**
   * The word of the dictionary entry.
   *
   * @return word
   */
  @javax.annotation.Nullable
  public String getWord() {
    return word;
  }

  public void setWord(String word) {
    this.word = word;
  }

  public DictionaryEntry words(List<String> words) {
    this.words = words;
    return this;
  }

  public DictionaryEntry addWordsItem(String wordsItem) {
    if (this.words == null) {
      this.words = new ArrayList<>();
    }
    this.words.add(wordsItem);
    return this;
  }

  /**
   * The words of the dictionary entry.
   *
   * @return words
   */
  @javax.annotation.Nullable
  public List<String> getWords() {
    return words;
  }

  public void setWords(List<String> words) {
    this.words = words;
  }

  public DictionaryEntry decomposition(List<String> decomposition) {
    this.decomposition = decomposition;
    return this;
  }

  public DictionaryEntry addDecompositionItem(String decompositionItem) {
    if (this.decomposition == null) {
      this.decomposition = new ArrayList<>();
    }
    this.decomposition.add(decompositionItem);
    return this;
  }

  /**
   * A decomposition of the word of the dictionary entry.
   *
   * @return decomposition
   */
  @javax.annotation.Nullable
  public List<String> getDecomposition() {
    return decomposition;
  }

  public void setDecomposition(List<String> decomposition) {
    this.decomposition = decomposition;
  }

  public DictionaryEntry state(StateEnum state) {
    this.state = state;
    return this;
  }

  /**
   * The state of the dictionary entry.
   *
   * @return state
   */
  @javax.annotation.Nullable
  public StateEnum getState() {
    return state;
  }

  public void setState(StateEnum state) {
    this.state = state;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    DictionaryEntry dictionaryEntry = (DictionaryEntry) o;
    return (
      Objects.equals(this.objectID, dictionaryEntry.objectID) &&
      Objects.equals(this.language, dictionaryEntry.language) &&
      Objects.equals(this.word, dictionaryEntry.word) &&
      Objects.equals(this.words, dictionaryEntry.words) &&
      Objects.equals(this.decomposition, dictionaryEntry.decomposition) &&
      Objects.equals(this.state, dictionaryEntry.state) &&
      super.equals(o)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(
      objectID,
      language,
      word,
      words,
      decomposition,
      state,
      super.hashCode()
    );
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class DictionaryEntry {\n");
    sb.append("    ").append(toIndentedString(super.toString())).append("\n");
    sb.append("    objectID: ").append(toIndentedString(objectID)).append("\n");
    sb.append("    language: ").append(toIndentedString(language)).append("\n");
    sb.append("    word: ").append(toIndentedString(word)).append("\n");
    sb.append("    words: ").append(toIndentedString(words)).append("\n");
    sb
      .append("    decomposition: ")
      .append(toIndentedString(decomposition))
      .append("\n");
    sb.append("    state: ").append(toIndentedString(state)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces (except the first line).
   */
  private String toIndentedString(Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}
