package com.algolia.methods.requests;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.algolia.JSON;
import com.algolia.Pair;
import com.algolia.api.PersonalizationApi;
import com.algolia.model.personalization.*;
import com.algolia.utils.echo.*;
import com.google.gson.reflect.TypeToken;
import java.util.*;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.skyscreamer.jsonassert.JSONAssert;
import org.skyscreamer.jsonassert.JSONCompareMode;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class PersonalizationApiTests {

  private PersonalizationApi client;

  @BeforeAll
  void init() {
    client = new PersonalizationApi("appId", "apiKey", new EchoRequester());
  }

  @Test
  @DisplayName("allow del method for a custom path with minimal parameters")
  void delTest0() {
    String path0 = "/test/minimal";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.del(path0);
      }
    );

    assertEquals(req.getPath(), "/1/test/minimal");
    assertEquals(req.getMethod(), "DELETE");
  }

  @Test
  @DisplayName("allow del method for a custom path with all parameters")
  void delTest1() {
    String path0 = "/test/all";

    Map<String, Object> parameters0 = new HashMap<>();
    {
      String query1 = "parameters";

      parameters0.put("query", query1);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.del(path0, parameters0);
      }
    );

    assertEquals(req.getPath(), "/1/test/all");
    assertEquals(req.getMethod(), "DELETE");

    Map<String, String> expectedQuery = JSON.deserialize(
      "{\"query\":\"parameters\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> actualQuery = req.getQueryParams();
    for (Map.Entry<String, String> entry : expectedQuery.entrySet()) {
      boolean found = false;
      for (Pair p : actualQuery) {
        if (
          p.getName().equals(entry.getKey()) &&
          p.getValue().equals(entry.getValue())
        ) {
          found = true;
        }
      }
      assertTrue(
        found,
        "Query parameter " + entry.getKey() + " not found in the actual query"
      );
    }
  }

  @Test
  @DisplayName("delete deleteUserProfile")
  void deleteUserProfileTest0() {
    String userToken0 = "UserToken";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.deleteUserProfile(userToken0);
      }
    );

    assertEquals(req.getPath(), "/1/profiles/UserToken");
    assertEquals(req.getMethod(), "DELETE");
  }

  @Test
  @DisplayName("allow get method for a custom path with minimal parameters")
  void getTest0() {
    String path0 = "/test/minimal";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.get(path0);
      }
    );

    assertEquals(req.getPath(), "/1/test/minimal");
    assertEquals(req.getMethod(), "GET");
  }

  @Test
  @DisplayName("allow get method for a custom path with all parameters")
  void getTest1() {
    String path0 = "/test/all";

    Map<String, Object> parameters0 = new HashMap<>();
    {
      String query1 = "parameters";

      parameters0.put("query", query1);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.get(path0, parameters0);
      }
    );

    assertEquals(req.getPath(), "/1/test/all");
    assertEquals(req.getMethod(), "GET");

    Map<String, String> expectedQuery = JSON.deserialize(
      "{\"query\":\"parameters\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> actualQuery = req.getQueryParams();
    for (Map.Entry<String, String> entry : expectedQuery.entrySet()) {
      boolean found = false;
      for (Pair p : actualQuery) {
        if (
          p.getName().equals(entry.getKey()) &&
          p.getValue().equals(entry.getValue())
        ) {
          found = true;
        }
      }
      assertTrue(
        found,
        "Query parameter " + entry.getKey() + " not found in the actual query"
      );
    }
  }

  @Test
  @DisplayName("get getPersonalizationStrategy")
  void getPersonalizationStrategyTest0() {
    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getPersonalizationStrategy();
      }
    );

    assertEquals(req.getPath(), "/1/strategies/personalization");
    assertEquals(req.getMethod(), "GET");
  }

  @Test
  @DisplayName("get getUserTokenProfile")
  void getUserTokenProfileTest0() {
    String userToken0 = "UserToken";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getUserTokenProfile(userToken0);
      }
    );

    assertEquals(req.getPath(), "/1/profiles/personalization/UserToken");
    assertEquals(req.getMethod(), "GET");
  }

  @Test
  @DisplayName("allow post method for a custom path with minimal parameters")
  void postTest0() {
    String path0 = "/test/minimal";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.post(path0);
      }
    );

    assertEquals(req.getPath(), "/1/test/minimal");
    assertEquals(req.getMethod(), "POST");
  }

  @Test
  @DisplayName("allow post method for a custom path with all parameters")
  void postTest1() {
    String path0 = "/test/all";

    Map<String, Object> parameters0 = new HashMap<>();
    {
      String query1 = "parameters";

      parameters0.put("query", query1);
    }

    Map<String, String> body0 = new HashMap<>();
    {
      String body1 = "parameters";

      body0.put("body", body1);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.post(path0, parameters0, body0);
      }
    );

    assertEquals(req.getPath(), "/1/test/all");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"body\":\"parameters\"}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });

    Map<String, String> expectedQuery = JSON.deserialize(
      "{\"query\":\"parameters\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> actualQuery = req.getQueryParams();
    for (Map.Entry<String, String> entry : expectedQuery.entrySet()) {
      boolean found = false;
      for (Pair p : actualQuery) {
        if (
          p.getName().equals(entry.getKey()) &&
          p.getValue().equals(entry.getValue())
        ) {
          found = true;
        }
      }
      assertTrue(
        found,
        "Query parameter " + entry.getKey() + " not found in the actual query"
      );
    }
  }

  @Test
  @DisplayName("allow put method for a custom path with minimal parameters")
  void putTest0() {
    String path0 = "/test/minimal";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.put(path0);
      }
    );

    assertEquals(req.getPath(), "/1/test/minimal");
    assertEquals(req.getMethod(), "PUT");
  }

  @Test
  @DisplayName("allow put method for a custom path with all parameters")
  void putTest1() {
    String path0 = "/test/all";

    Map<String, Object> parameters0 = new HashMap<>();
    {
      String query1 = "parameters";

      parameters0.put("query", query1);
    }

    Map<String, String> body0 = new HashMap<>();
    {
      String body1 = "parameters";

      body0.put("body", body1);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.put(path0, parameters0, body0);
      }
    );

    assertEquals(req.getPath(), "/1/test/all");
    assertEquals(req.getMethod(), "PUT");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"body\":\"parameters\"}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });

    Map<String, String> expectedQuery = JSON.deserialize(
      "{\"query\":\"parameters\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> actualQuery = req.getQueryParams();
    for (Map.Entry<String, String> entry : expectedQuery.entrySet()) {
      boolean found = false;
      for (Pair p : actualQuery) {
        if (
          p.getName().equals(entry.getKey()) &&
          p.getValue().equals(entry.getValue())
        ) {
          found = true;
        }
      }
      assertTrue(
        found,
        "Query parameter " + entry.getKey() + " not found in the actual query"
      );
    }
  }

  @Test
  @DisplayName("set setPersonalizationStrategy")
  void setPersonalizationStrategyTest0() {
    PersonalizationStrategyParams personalizationStrategyParams0 = new PersonalizationStrategyParams();
    {
      List<EventScoring> eventScoring1 = new ArrayList<>();
      {
        EventScoring eventScoring_02 = new EventScoring();
        {
          int score3 = 42;

          eventScoring_02.setScore(score3);
          String eventName3 = "Algolia";

          eventScoring_02.setEventName(eventName3);
          String eventType3 = "Event";

          eventScoring_02.setEventType(eventType3);
        }
        eventScoring1.add(eventScoring_02);
      }
      personalizationStrategyParams0.setEventScoring(eventScoring1);

      List<FacetScoring> facetScoring1 = new ArrayList<>();
      {
        FacetScoring facetScoring_02 = new FacetScoring();
        {
          int score3 = 42;

          facetScoring_02.setScore(score3);
          String facetName3 = "Event";

          facetScoring_02.setFacetName(facetName3);
        }
        facetScoring1.add(facetScoring_02);
      }
      personalizationStrategyParams0.setFacetScoring(facetScoring1);

      int personalizationImpact1 = 42;

      personalizationStrategyParams0.setPersonalizationImpact(
        personalizationImpact1
      );
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.setPersonalizationStrategy(
          personalizationStrategyParams0
        );
      }
    );

    assertEquals(req.getPath(), "/1/strategies/personalization");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"eventScoring\":[{\"score\":42,\"eventName\":\"Algolia\",\"eventType\":\"Event\"}],\"facetScoring\":[{\"score\":42,\"facetName\":\"Event\"}],\"personalizationImpact\":42}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
  }
}
