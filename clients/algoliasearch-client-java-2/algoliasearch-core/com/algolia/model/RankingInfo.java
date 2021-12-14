package com.algolia.model;

import com.google.gson.annotations.SerializedName;
import io.swagger.annotations.ApiModelProperty;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

/** RankingInfo */
public class RankingInfo {

  public static final String SERIALIZED_NAME_FILTERS = "filters";

  @SerializedName(SERIALIZED_NAME_FILTERS)
  private Integer filters;

  public static final String SERIALIZED_NAME_FIRST_MATCHED_WORD =
    "firstMatchedWord";

  @SerializedName(SERIALIZED_NAME_FIRST_MATCHED_WORD)
  private Integer firstMatchedWord;

  public static final String SERIALIZED_NAME_GEO_DISTANCE = "geoDistance";

  @SerializedName(SERIALIZED_NAME_GEO_DISTANCE)
  private Integer geoDistance;

  public static final String SERIALIZED_NAME_GEO_PRECISION = "geoPrecision";

  @SerializedName(SERIALIZED_NAME_GEO_PRECISION)
  private Integer geoPrecision;

  public static final String SERIALIZED_NAME_MATCHED_GEO_LOCATION =
    "matchedGeoLocation";

  @SerializedName(SERIALIZED_NAME_MATCHED_GEO_LOCATION)
  private Map<String, RankingInfoMatchedGeoLocation> matchedGeoLocation = null;

  public static final String SERIALIZED_NAME_NB_EXACT_WORDS = "nbExactWords";

  @SerializedName(SERIALIZED_NAME_NB_EXACT_WORDS)
  private Integer nbExactWords;

  public static final String SERIALIZED_NAME_NB_TYPOS = "nbTypos";

  @SerializedName(SERIALIZED_NAME_NB_TYPOS)
  private Integer nbTypos;

  public static final String SERIALIZED_NAME_PROMOTED = "promoted";

  @SerializedName(SERIALIZED_NAME_PROMOTED)
  private Boolean promoted;

  public static final String SERIALIZED_NAME_PROXIMITY_DISTANCE =
    "proximityDistance";

  @SerializedName(SERIALIZED_NAME_PROXIMITY_DISTANCE)
  private Integer proximityDistance;

  public static final String SERIALIZED_NAME_USER_SCORE = "userScore";

  @SerializedName(SERIALIZED_NAME_USER_SCORE)
  private Integer userScore;

  public static final String SERIALIZED_NAME_WORD = "word";

  @SerializedName(SERIALIZED_NAME_WORD)
  private Integer word;

  public RankingInfo filters(Integer filters) {
    this.filters = filters;
    return this;
  }

  /**
   * This field is reserved for advanced usage.
   *
   * @return filters
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "This field is reserved for advanced usage.")
  public Integer getFilters() {
    return filters;
  }

  public void setFilters(Integer filters) {
    this.filters = filters;
  }

  public RankingInfo firstMatchedWord(Integer firstMatchedWord) {
    this.firstMatchedWord = firstMatchedWord;
    return this;
  }

  /**
   * Position of the most important matched attribute in the attributes to index list.
   *
   * @return firstMatchedWord
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Position of the most important matched attribute in the attributes to index list."
  )
  public Integer getFirstMatchedWord() {
    return firstMatchedWord;
  }

  public void setFirstMatchedWord(Integer firstMatchedWord) {
    this.firstMatchedWord = firstMatchedWord;
  }

  public RankingInfo geoDistance(Integer geoDistance) {
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
  @ApiModelProperty(
    value = "Distance between the geo location in the search query and the best matching geo location" +
    " in the record, divided by the geo precision (in meters)."
  )
  public Integer getGeoDistance() {
    return geoDistance;
  }

  public void setGeoDistance(Integer geoDistance) {
    this.geoDistance = geoDistance;
  }

  public RankingInfo geoPrecision(Integer geoPrecision) {
    this.geoPrecision = geoPrecision;
    return this;
  }

  /**
   * Precision used when computing the geo distance, in meters.
   *
   * @return geoPrecision
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Precision used when computing the geo distance, in meters."
  )
  public Integer getGeoPrecision() {
    return geoPrecision;
  }

  public void setGeoPrecision(Integer geoPrecision) {
    this.geoPrecision = geoPrecision;
  }

  public RankingInfo matchedGeoLocation(
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
  @ApiModelProperty(value = "")
  public Map<String, RankingInfoMatchedGeoLocation> getMatchedGeoLocation() {
    return matchedGeoLocation;
  }

  public void setMatchedGeoLocation(
    Map<String, RankingInfoMatchedGeoLocation> matchedGeoLocation
  ) {
    this.matchedGeoLocation = matchedGeoLocation;
  }

  public RankingInfo nbExactWords(Integer nbExactWords) {
    this.nbExactWords = nbExactWords;
    return this;
  }

  /**
   * Number of exactly matched words.
   *
   * @return nbExactWords
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "Number of exactly matched words.")
  public Integer getNbExactWords() {
    return nbExactWords;
  }

  public void setNbExactWords(Integer nbExactWords) {
    this.nbExactWords = nbExactWords;
  }

  public RankingInfo nbTypos(Integer nbTypos) {
    this.nbTypos = nbTypos;
    return this;
  }

  /**
   * Number of typos encountered when matching the record.
   *
   * @return nbTypos
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Number of typos encountered when matching the record."
  )
  public Integer getNbTypos() {
    return nbTypos;
  }

  public void setNbTypos(Integer nbTypos) {
    this.nbTypos = nbTypos;
  }

  public RankingInfo promoted(Boolean promoted) {
    this.promoted = promoted;
    return this;
  }

  /**
   * Present and set to true if a Rule promoted the hit.
   *
   * @return promoted
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Present and set to true if a Rule promoted the hit."
  )
  public Boolean getPromoted() {
    return promoted;
  }

  public void setPromoted(Boolean promoted) {
    this.promoted = promoted;
  }

  public RankingInfo proximityDistance(Integer proximityDistance) {
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
  @ApiModelProperty(
    value = "When the query contains more than one word, the sum of the distances between matched" +
    " words (in meters)."
  )
  public Integer getProximityDistance() {
    return proximityDistance;
  }

  public void setProximityDistance(Integer proximityDistance) {
    this.proximityDistance = proximityDistance;
  }

  public RankingInfo userScore(Integer userScore) {
    this.userScore = userScore;
    return this;
  }

  /**
   * Custom ranking for the object, expressed as a single integer value.
   *
   * @return userScore
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Custom ranking for the object, expressed as a single integer value."
  )
  public Integer getUserScore() {
    return userScore;
  }

  public void setUserScore(Integer userScore) {
    this.userScore = userScore;
  }

  public RankingInfo word(Integer word) {
    this.word = word;
    return this;
  }

  /**
   * Number of matched words, including prefixes and typos.
   *
   * @return word
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Number of matched words, including prefixes and typos."
  )
  public Integer getWord() {
    return word;
  }

  public void setWord(Integer word) {
    this.word = word;
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
