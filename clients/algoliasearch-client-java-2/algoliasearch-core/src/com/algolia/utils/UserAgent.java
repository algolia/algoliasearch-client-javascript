package com.algolia.utils;

import java.util.LinkedHashSet;
import java.util.Set;

public class UserAgent {

  private final Set<String> segments;

  private String finalValue;

  public UserAgent(String clientVersion) {
    this.finalValue = String.format("Algolia for Java (%s)", clientVersion);
    this.segments = new LinkedHashSet<String>();
    this.addSegment(new Segment("JVM", System.getProperty("java.version")));
  }

  public String addSegment(Segment seg) {
    String segment = seg.toString();
    if (segments.contains(segment)) {
      return finalValue;
    }
    segments.add(segment);
    finalValue += segment;
    return finalValue;
  }

  @Override
  public String toString() {
    return finalValue;
  }

  public static class Segment {

    private final String value;
    private final String version;

    public Segment(String value) {
      this(value, null);
    }

    public Segment(String value, String version) {
      this.value = value;
      this.version = version;
    }

    @Override
    public String toString() {
      StringBuilder sb = new StringBuilder();
      sb.append("; ").append(value);
      if (version != null) {
        sb.append(" (").append(version).append(")");
      }
      return sb.toString();
    }
  }
}
