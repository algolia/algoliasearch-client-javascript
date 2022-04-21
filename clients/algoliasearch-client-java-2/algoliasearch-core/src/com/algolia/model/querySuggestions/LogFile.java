package com.algolia.model.querySuggestions;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** LogFile */
public class LogFile {

  @SerializedName("timestamp")
  private String timestamp;

  @SerializedName("level")
  private LogLevel level;

  @SerializedName("message")
  private String message;

  @SerializedName("contextLevel")
  private Integer contextLevel;

  public LogFile setTimestamp(String timestamp) {
    this.timestamp = timestamp;
    return this;
  }

  /**
   * date and time of creation of the record.
   *
   * @return timestamp
   */
  @javax.annotation.Nonnull
  public String getTimestamp() {
    return timestamp;
  }

  public LogFile setLevel(LogLevel level) {
    this.level = level;
    return this;
  }

  /**
   * Get level
   *
   * @return level
   */
  @javax.annotation.Nonnull
  public LogLevel getLevel() {
    return level;
  }

  public LogFile setMessage(String message) {
    this.message = message;
    return this;
  }

  /**
   * detailed description of what happened.
   *
   * @return message
   */
  @javax.annotation.Nonnull
  public String getMessage() {
    return message;
  }

  public LogFile setContextLevel(Integer contextLevel) {
    this.contextLevel = contextLevel;
    return this;
  }

  /**
   * indicates the hierarchy of the records. For example, a record with contextLevel=1 belongs to a
   * preceding record with contextLevel=0.
   *
   * @return contextLevel
   */
  @javax.annotation.Nonnull
  public Integer getContextLevel() {
    return contextLevel;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    LogFile logFile = (LogFile) o;
    return (
      Objects.equals(this.timestamp, logFile.timestamp) &&
      Objects.equals(this.level, logFile.level) &&
      Objects.equals(this.message, logFile.message) &&
      Objects.equals(this.contextLevel, logFile.contextLevel)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(timestamp, level, message, contextLevel);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class LogFile {\n");
    sb
      .append("    timestamp: ")
      .append(toIndentedString(timestamp))
      .append("\n");
    sb.append("    level: ").append(toIndentedString(level)).append("\n");
    sb.append("    message: ").append(toIndentedString(message)).append("\n");
    sb
      .append("    contextLevel: ")
      .append(toIndentedString(contextLevel))
      .append("\n");
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
