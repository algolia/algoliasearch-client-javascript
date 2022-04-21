package com.algolia.model.search;

import com.google.gson.annotations.SerializedName;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

/** RankingInfo */
public class RankingInfo {

  @SerializedName("filters")
  private Integer filters;

  @SerializedName("firstMatchedWord")
  private Integer firstMatchedWord;

  @SerializedName("geoDistance")
  private Integer geoDistance;

  @SerializedName("geoPrecision")
  private Integer geoPrecision;

  @SerializedName("matchedGeoLocation")
  private Map<String, RankingInfoMatchedGeoLocation> matchedGeoLocation = null;

  @SerializedName("nbExactWords")
  private Integer nbExactWords;

  @SerializedName("nbTypos")
  private Integer nbTypos;

  @SerializedName("promoted")
  private Boolean promoted;

  @SerializedName("proximityDistance")
  private Integer proximityDistance;

  @SerializedName("userScore")
  private Integer userScore;

  @SerializedName("word")
  private Integer word;

  public RankingInfo setFilters(Integer filters) {
    this.filters = filters;
    return this;
  }

  /**
   * This field is reserved for advanced usage.
   *
   * @return filters
   */
  @javax.annotation.Nullable
  public Integer getFilters() {
    return filters;
  }

  public RankingInfo setFirstMatchedWord(Integer firstMatchedWord) {
    this.firstMatchedWord = firstMatchedWord;
    return this;
  }

  /**
   * Position of the most important matched attribute in the attributes to index list.
   *
   * @return firstMatchedWord
   */
  @javax.annotation.Nullable
  public Integer getFirstMatchedWord() {
    return firstMatchedWord;
  }

  public RankingInfo setGeoDistance(Integer geoDistance) {
    this.geoDistance = geoDistance;
    return this;
  }

  /**
   * Distance between the geo location in the search query and the best matching geo location in the
   * record, divided by the geo precision (in meters).
   *
   * @return geoDistance
   */
  @javax.annotation.Nullable
  public Integer getGeoDistance() {
    return geoDistance;
  }

  public RankingInfo setGeoPrecision(Integer geoPrecision) {
    this.geoPrecision = geoPrecision;
    return this;
  }

  /**
   * Precision used when computing the geo distance, in meters.
   *
   * @return geoPrecision
   */
  @javax.annotation.Nullable
  public Integer getGeoPrecision() {
    return geoPrecision;
  }

  public RankingInfo setMatchedGeoLocation(
    Map<String, RankingInfoMatchedGeoLocation> matchedGeoLocation
  ) {
    this.matchedGeoLocation = matchedGeoLocation;
    return this;
  }

  public RankingInfo putMatchedGeoLocationItem(
    String key,
    RankingInfoMatchedGeoLocation matchedGeoLocationItem
  ) {
    if (this.matchedGeoLocation == null) {
      this.matchedGeoLocation = new HashMap<>();
    }
    this.matchedGeoLocation.put(key, matchedGeoLocationItem);
    return this;
  }

  /**
   * Get matchedGeoLocation
   *
   * @return matchedGeoLocation
   */
  @javax.annotation.Nullable
  public Map<String, RankingInfoMatchedGeoLocation> getMatchedGeoLocation() {
    return matchedGeoLocation;
  }

  public RankingInfo setNbExactWords(Integer nbExactWords) {
    this.nbExactWords = nbExactWords;
    return this;
  }

  /**
   * Number of exactly matched words.
   *
   * @return nbExactWords
   */
  @javax.annotation.Nullable
  public Integer getNbExactWords() {
    return nbExactWords;
  }

  public RankingInfo setNbTypos(Integer nbTypos) {
    this.nbTypos = nbTypos;
    return this;
  }

  /**
   * Number of typos encountered when matching the record.
   *
   * @return nbTypos
   */
  @javax.annotation.Nullable
  public Integer getNbTypos() {
    return nbTypos;
  }

  public RankingInfo setPromoted(Boolean promoted) {
    this.promoted = promoted;
    return this;
  }

  /**
   * Present and set to true if a Rule promoted the hit.
   *
   * @return promoted
   */
  @javax.annotation.Nullable
  public Boolean getPromoted() {
    return promoted;
  }

  public RankingInfo setProximityDistance(Integer proximityDistance) {
    this.proximityDistance = proximityDistance;
    return this;
  }

  /**
   * When the query contains more than one word, the sum of the distances between matched words (in
   * meters).
   *
   * @return proximityDistance
   */
  @javax.annotation.Nullable
  public Integer getProximityDistance() {
    return proximityDistance;
  }

  public RankingInfo setUserScore(Integer userScore) {
    this.userScore = userScore;
    return this;
  }

  /**
   * Custom ranking for the object, expressed as a single integer value.
   *
   * @return userScore
   */
  @javax.annotation.Nullable
  public Integer getUserScore() {
    return userScore;
  }

  public RankingInfo setWord(Integer word) {
    this.word = word;
    return this;
  }

  /**
   * Number of matched words, including prefixes and typos.
   *
   * @return word
   */
  @javax.annotation.Nullable
  public Integer getWord() {
    return word;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    RankingInfo rankingInfo = (RankingInfo) o;
    return (
      Objects.equals(this.filters, rankingInfo.filters) &&
      Objects.equals(this.firstMatchedWord, rankingInfo.firstMatchedWord) &&
      Objects.equals(this.geoDistance, rankingInfo.geoDistance) &&
      Objects.equals(this.geoPrecision, rankingInfo.geoPrecision) &&
      Objects.equals(this.matchedGeoLocation, rankingInfo.matchedGeoLocation) &&
      Objects.equals(this.nbExactWords, rankingInfo.nbExactWords) &&
      Objects.equals(this.nbTypos, rankingInfo.nbTypos) &&
      Objects.equals(this.promoted, rankingInfo.promoted) &&
      Objects.equals(this.proximityDistance, rankingInfo.proximityDistance) &&
      Objects.equals(this.userScore, rankingInfo.userScore) &&
      Objects.equals(this.word, rankingInfo.word)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(
      filters,
      firstMatchedWord,
      geoDistance,
      geoPrecision,
      matchedGeoLocation,
      nbExactWords,
      nbTypos,
      promoted,
      proximityDistance,
      userScore,
      word
    );
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class RankingInfo {\n");
    sb.append("    filters: ").append(toIndentedString(filters)).append("\n");
    sb
      .append("    firstMatchedWord: ")
      .append(toIndentedString(firstMatchedWord))
      .append("\n");
    sb
      .append("    geoDistance: ")
      .append(toIndentedString(geoDistance))
      .append("\n");
    sb
      .append("    geoPrecision: ")
      .append(toIndentedString(geoPrecision))
      .append("\n");
    sb
      .append("    matchedGeoLocation: ")
      .append(toIndentedString(matchedGeoLocation))
      .append("\n");
    sb
      .append("    nbExactWords: ")
      .append(toIndentedString(nbExactWords))
      .append("\n");
    sb.append("    nbTypos: ").append(toIndentedString(nbTypos)).append("\n");
    sb.append("    promoted: ").append(toIndentedString(promoted)).append("\n");
    sb
      .append("    proximityDistance: ")
      .append(toIndentedString(proximityDistance))
      .append("\n");
    sb
      .append("    userScore: ")
      .append(toIndentedString(userScore))
      .append("\n");
    sb.append("    word: ").append(toIndentedString(word)).append("\n");
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
