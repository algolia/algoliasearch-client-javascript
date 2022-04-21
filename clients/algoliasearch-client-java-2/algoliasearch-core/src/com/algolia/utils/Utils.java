package com.algolia.utils;

import java.time.Clock;
import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.zone.ZoneRules;

public class Utils {

  private static final ZoneRules ZONE_RULES_UTC = ZoneOffset.UTC.getRules();

  /**
   * Memory optimization for getZoneRules with the same ZoneOffset (UTC). ZoneRules is immutable and
   * threadsafe, but getRules method consumes a lot of memory during load testing.
   */
  public static OffsetDateTime nowUTC() {
    final Instant now = Clock.system(ZoneOffset.UTC).instant();
    return OffsetDateTime.ofInstant(now, ZONE_RULES_UTC.getOffset(now));
  }
}
