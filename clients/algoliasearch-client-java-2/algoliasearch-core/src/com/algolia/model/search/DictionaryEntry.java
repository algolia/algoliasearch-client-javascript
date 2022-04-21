package com.algolia.model.search;

import com.google.gson.annotations.SerializedName;
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

  @SerializedName("state")
  private DictionaryEntryState state = DictionaryEntryState.ENABLED;

  public DictionaryEntry setObjectID(String objectID) {
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

  public DictionaryEntry setLanguage(String language) {
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

  public DictionaryEntry setWord(String word) {
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

  public DictionaryEntry setWords(List<String> words) {
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

  public DictionaryEntry setDecomposition(List<String> decomposition) {
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

  public DictionaryEntry setState(DictionaryEntryState state) {
    this.state = state;
    return this;
  }

  /**
   * Get state
   *
   * @return state
   */
  @javax.annotation.Nullable
  public DictionaryEntryState getState() {
    return state;
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
