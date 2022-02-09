package com.algolia.methods.requests;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;

import com.algolia.JSON;
import com.algolia.Pair;
import com.algolia.model.*;
import com.algolia.search.SearchApi;
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
class SearchApiTests {

  private SearchApi client;
  private JSON json;

  @BeforeAll
  void init() {
    client = new SearchApi("appId", "apiKey", new EchoRequester());
    json = new JSON();
  }

  @Test
  @DisplayName("addApiKey")
  void addApiKeyTest0() {
    ApiKey param0 = new ApiKey();
    {
      List acl1 = new ArrayList();
      {
        String aclParam02 = "search";

        acl1.add(aclParam02);
        String aclParam12 = "addObject";

        acl1.add(aclParam12);
      }

      param0.setAcl(acl1);
      String description1 = "my new api key";

      param0.setDescription(description1);

      int validity1 = 300;

      param0.setValidity(validity1);

      int maxQueriesPerIPPerHour1 = 100;

      param0.setMaxQueriesPerIPPerHour(maxQueriesPerIPPerHour1);

      int maxHitsPerQuery1 = 20;

      param0.setMaxHitsPerQuery(maxHitsPerQuery1);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.addApiKey(param0);
      }
    );

    assertEquals(req.getPath(), "/1/keys");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"acl\":[\"search\",\"addObject\"],\"description\":\"my new api" +
        " key\",\"validity\":300,\"maxQueriesPerIPPerHour\":100,\"maxHitsPerQuery\":20}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
  }

  @Test
  @DisplayName("addOrUpdateObject")
  void addOrUpdateObjectTest0() {
    String indexName1 = "indexName";

    String objectID1 = "uniqueID";

    HashMap body1 = new HashMap<String, Object>();
    {
      String key2 = "value";

      body1.put("key", key2);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.addOrUpdateObject(indexName1, objectID1, body1);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/indexName/uniqueID");
    assertEquals(req.getMethod(), "PUT");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"key\":\"value\"}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
  }

  @Test
  @DisplayName("appendSource")
  void appendSourceTest0() {
    Source param0 = new Source();
    {
      String source1 = "theSource";

      param0.setSource(source1);
      String description1 = "theDescription";

      param0.setDescription(description1);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.appendSource(param0);
      }
    );

    assertEquals(req.getPath(), "/1/security/sources/append");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"source\":\"theSource\",\"description\":\"theDescription\"}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
  }

  @Test
  @DisplayName("assignUserId")
  void assignUserIdTest0() {
    String xAlgoliaUserID1 = "userID";

    AssignUserIdParams assignUserIdParams1 = new AssignUserIdParams();
    {
      String cluster2 = "theCluster";

      assignUserIdParams1.setCluster(cluster2);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.assignUserId(xAlgoliaUserID1, assignUserIdParams1);
      }
    );

    assertEquals(req.getPath(), "/1/clusters/mapping");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"cluster\":\"theCluster\"}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });

    HashMap<String, String> expectedQuery = json.deserialize(
      "{\"X-Algolia-User-ID\":\"userID\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> acutalQuery = req.getQueryParams();
    for (Pair p : acutalQuery) {
      assertEquals(expectedQuery.get(p.getName()), p.getValue());
    }
  }

  @Test
  @DisplayName("batch")
  void batchTest0() {
    String indexName1 = "theIndexName";

    BatchWriteParams batchWriteParams1 = new BatchWriteParams();
    {
      List requests2 = new ArrayList();
      {
        Operation requestsParam03 = new Operation();
        {
          Action action4 = Action.fromValue("delete");

          requestsParam03.setAction(action4);

          HashMap body4 = new HashMap<String, Object>();
          {
            String key5 = "value";

            body4.put("key", key5);
          }
          requestsParam03.setBody(body4);
          String indexName4 = "otherIndexName";

          requestsParam03.setIndexName(indexName4);
        }
        requests2.add(requestsParam03);
      }

      batchWriteParams1.setRequests(requests2);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.batch(indexName1, batchWriteParams1);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/theIndexName/batch");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"requests\":[{\"action\":\"delete\",\"body\":{\"key\":\"value\"},\"indexName\":\"otherIndexName\"}]}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
  }

  @Test
  @DisplayName("batchAssignUserIds")
  void batchAssignUserIdsTest0() {
    String xAlgoliaUserID1 = "userID";

    BatchAssignUserIdsParams batchAssignUserIdsParams1 = new BatchAssignUserIdsParams();
    {
      String cluster2 = "theCluster";

      batchAssignUserIdsParams1.setCluster(cluster2);

      List users2 = new ArrayList();
      {
        String usersParam03 = "user1";

        users2.add(usersParam03);
        String usersParam13 = "user2";

        users2.add(usersParam13);
      }

      batchAssignUserIdsParams1.setUsers(users2);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.batchAssignUserIds(
          xAlgoliaUserID1,
          batchAssignUserIdsParams1
        );
      }
    );

    assertEquals(req.getPath(), "/1/clusters/mapping/batch");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"cluster\":\"theCluster\",\"users\":[\"user1\",\"user2\"]}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });

    HashMap<String, String> expectedQuery = json.deserialize(
      "{\"X-Algolia-User-ID\":\"userID\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> acutalQuery = req.getQueryParams();
    for (Pair p : acutalQuery) {
      assertEquals(expectedQuery.get(p.getName()), p.getValue());
    }
  }

  @Test
  @DisplayName("get batchDictionaryEntries results with minimal parameters")
  void batchDictionaryEntriesTest0() {
    String dictionaryName1 = "compounds";

    BatchDictionaryEntriesParams batchDictionaryEntriesParams1 = new BatchDictionaryEntriesParams();
    {
      List requests2 = new ArrayList();
      {
        BatchDictionaryEntriesRequest requestsParam03 = new BatchDictionaryEntriesRequest();
        {
          DictionaryAction action4 = DictionaryAction.fromValue("addEntry");

          requestsParam03.setAction(action4);

          DictionaryEntry body4 = new DictionaryEntry();
          {
            String objectID5 = "1";

            body4.setObjectID(objectID5);
            String language5 = "en";

            body4.setLanguage(language5);
          }
          requestsParam03.setBody(body4);
        }
        requests2.add(requestsParam03);

        BatchDictionaryEntriesRequest requestsParam13 = new BatchDictionaryEntriesRequest();
        {
          DictionaryAction action4 = DictionaryAction.fromValue("deleteEntry");

          requestsParam13.setAction(action4);

          DictionaryEntry body4 = new DictionaryEntry();
          {
            String objectID5 = "2";

            body4.setObjectID(objectID5);
            String language5 = "fr";

            body4.setLanguage(language5);
          }
          requestsParam13.setBody(body4);
        }
        requests2.add(requestsParam13);
      }

      batchDictionaryEntriesParams1.setRequests(requests2);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.batchDictionaryEntries(
          dictionaryName1,
          batchDictionaryEntriesParams1
        );
      }
    );

    assertEquals(req.getPath(), "/1/dictionaries/compounds/batch");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"requests\":[{\"action\":\"addEntry\",\"body\":{\"objectID\":\"1\",\"language\":\"en\"}},{\"action\":\"deleteEntry\",\"body\":{\"objectID\":\"2\",\"language\":\"fr\"}}]}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
  }

  @Test
  @DisplayName("get batchDictionaryEntries results with all parameters")
  void batchDictionaryEntriesTest1() {
    String dictionaryName1 = "compounds";

    BatchDictionaryEntriesParams batchDictionaryEntriesParams1 = new BatchDictionaryEntriesParams();
    {
      boolean clearExistingDictionaryEntries2 = false;

      batchDictionaryEntriesParams1.setClearExistingDictionaryEntries(
        clearExistingDictionaryEntries2
      );

      List requests2 = new ArrayList();
      {
        BatchDictionaryEntriesRequest requestsParam03 = new BatchDictionaryEntriesRequest();
        {
          DictionaryAction action4 = DictionaryAction.fromValue("addEntry");

          requestsParam03.setAction(action4);

          DictionaryEntry body4 = new DictionaryEntry();
          {
            String objectID5 = "1";

            body4.setObjectID(objectID5);
            String language5 = "en";

            body4.setLanguage(language5);
            String word5 = "yo";

            body4.setWord(word5);

            List words5 = new ArrayList();
            {
              String wordsParam06 = "yo";

              words5.add(wordsParam06);
              String wordsParam16 = "algolia";

              words5.add(wordsParam16);
            }

            body4.setWords(words5);

            List decomposition5 = new ArrayList();
            {
              String decompositionParam06 = "yo";

              decomposition5.add(decompositionParam06);
              String decompositionParam16 = "algolia";

              decomposition5.add(decompositionParam16);
            }

            body4.setDecomposition(decomposition5);

            DictionaryEntryState state5 = DictionaryEntryState.fromValue(
              "enabled"
            );

            body4.setState(state5);
          }
          requestsParam03.setBody(body4);
        }
        requests2.add(requestsParam03);

        BatchDictionaryEntriesRequest requestsParam13 = new BatchDictionaryEntriesRequest();
        {
          DictionaryAction action4 = DictionaryAction.fromValue("deleteEntry");

          requestsParam13.setAction(action4);

          DictionaryEntry body4 = new DictionaryEntry();
          {
            String objectID5 = "2";

            body4.setObjectID(objectID5);
            String language5 = "fr";

            body4.setLanguage(language5);
            String word5 = "salut";

            body4.setWord(word5);

            List words5 = new ArrayList();
            {
              String wordsParam06 = "salut";

              words5.add(wordsParam06);
              String wordsParam16 = "algolia";

              words5.add(wordsParam16);
            }

            body4.setWords(words5);

            List decomposition5 = new ArrayList();
            {
              String decompositionParam06 = "salut";

              decomposition5.add(decompositionParam06);
              String decompositionParam16 = "algolia";

              decomposition5.add(decompositionParam16);
            }

            body4.setDecomposition(decomposition5);

            DictionaryEntryState state5 = DictionaryEntryState.fromValue(
              "enabled"
            );

            body4.setState(state5);
          }
          requestsParam13.setBody(body4);
        }
        requests2.add(requestsParam13);
      }

      batchDictionaryEntriesParams1.setRequests(requests2);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.batchDictionaryEntries(
          dictionaryName1,
          batchDictionaryEntriesParams1
        );
      }
    );

    assertEquals(req.getPath(), "/1/dictionaries/compounds/batch");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"clearExistingDictionaryEntries\":false,\"requests\":[{\"action\":\"addEntry\",\"body\":{\"objectID\":\"1\",\"language\":\"en\",\"word\":\"yo\",\"words\":[\"yo\",\"algolia\"],\"decomposition\":[\"yo\",\"algolia\"],\"state\":\"enabled\"}},{\"action\":\"deleteEntry\",\"body\":{\"objectID\":\"2\",\"language\":\"fr\",\"word\":\"salut\",\"words\":[\"salut\",\"algolia\"],\"decomposition\":[\"salut\",\"algolia\"],\"state\":\"enabled\"}}]}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
  }

  @Test
  @DisplayName("batchRules")
  void batchRulesTest0() {
    String indexName1 = "indexName";

    List rule1 = new ArrayList();
    {
      Rule ruleParam02 = new Rule();
      {
        String objectID3 = "a-rule-id";

        ruleParam02.setObjectID(objectID3);

        List conditions3 = new ArrayList();
        {
          Condition conditionsParam04 = new Condition();
          {
            String pattern5 = "smartphone";

            conditionsParam04.setPattern(pattern5);

            Anchoring anchoring5 = Anchoring.fromValue("contains");

            conditionsParam04.setAnchoring(anchoring5);
          }
          conditions3.add(conditionsParam04);
        }

        ruleParam02.setConditions(conditions3);

        Consequence consequence3 = new Consequence();
        {
          ConsequenceParams params4 = new ConsequenceParams();
          {
            String filters5 = "category:smartphone";

            params4.setFilters(filters5);
          }
          consequence3.setParams(params4);
        }
        ruleParam02.setConsequence(consequence3);
      }
      rule1.add(ruleParam02);

      Rule ruleParam12 = new Rule();
      {
        String objectID3 = "a-second-rule-id";

        ruleParam12.setObjectID(objectID3);

        List conditions3 = new ArrayList();
        {
          Condition conditionsParam04 = new Condition();
          {
            String pattern5 = "apple";

            conditionsParam04.setPattern(pattern5);

            Anchoring anchoring5 = Anchoring.fromValue("contains");

            conditionsParam04.setAnchoring(anchoring5);
          }
          conditions3.add(conditionsParam04);
        }

        ruleParam12.setConditions(conditions3);

        Consequence consequence3 = new Consequence();
        {
          ConsequenceParams params4 = new ConsequenceParams();
          {
            String filters5 = "brand:apple";

            params4.setFilters(filters5);
          }
          consequence3.setParams(params4);
        }
        ruleParam12.setConsequence(consequence3);
      }
      rule1.add(ruleParam12);
    }

    boolean forwardToReplicas1 = true;

    boolean clearExistingRules1 = true;

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.batchRules(
          indexName1,
          rule1,
          forwardToReplicas1,
          clearExistingRules1
        );
      }
    );

    assertEquals(req.getPath(), "/1/indexes/indexName/rules/batch");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "[{\"objectID\":\"a-rule-id\",\"conditions\":[{\"pattern\":\"smartphone\",\"anchoring\":\"contains\"}],\"consequence\":{\"params\":{\"filters\":\"category:smartphone\"}}},{\"objectID\":\"a-second-rule-id\",\"conditions\":[{\"pattern\":\"apple\",\"anchoring\":\"contains\"}],\"consequence\":{\"params\":{\"filters\":\"brand:apple\"}}}]",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });

    HashMap<String, String> expectedQuery = json.deserialize(
      "{\"forwardToReplicas\":\"true\",\"clearExistingRules\":\"true\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> acutalQuery = req.getQueryParams();
    for (Pair p : acutalQuery) {
      assertEquals(expectedQuery.get(p.getName()), p.getValue());
    }
  }

  @Test
  @DisplayName("get browse results with minimal parameters")
  void browseTest0() {
    String indexName1 = "indexName";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.browse(indexName1);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/indexName/browse");
    assertEquals(req.getMethod(), "POST");
  }

  @Test
  @DisplayName("get browse results with all parameters")
  void browseTest1() {
    String indexName1 = "indexName";

    BrowseRequest browseRequest1 = new BrowseRequest();
    {
      String params2 = "query=foo&facetFilters=['bar']";

      browseRequest1.setParams(params2);
      String cursor2 = "cts";

      browseRequest1.setCursor(cursor2);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.browse(indexName1, browseRequest1);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/indexName/browse");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"params\":\"query=foo&facetFilters=['bar']\",\"cursor\":\"cts\"}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
  }

  @Test
  @DisplayName("clearAllSynonyms")
  void clearAllSynonymsTest0() {
    String indexName1 = "indexName";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.clearAllSynonyms(indexName1);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/indexName/synonyms/clear");
    assertEquals(req.getMethod(), "POST");
  }

  @Test
  @DisplayName("clearObjects")
  void clearObjectsTest0() {
    String indexName1 = "theIndexName";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.clearObjects(indexName1);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/theIndexName/clear");
    assertEquals(req.getMethod(), "POST");
  }

  @Test
  @DisplayName("clearRules")
  void clearRulesTest0() {
    String indexName1 = "indexName";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.clearRules(indexName1);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/indexName/rules/clear");
    assertEquals(req.getMethod(), "POST");
  }

  @Test
  @DisplayName("deleteApiKey")
  void deleteApiKeyTest0() {
    String key1 = "myTestApiKey";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.deleteApiKey(key1);
      }
    );

    assertEquals(req.getPath(), "/1/keys/myTestApiKey");
    assertEquals(req.getMethod(), "DELETE");
  }

  @Test
  @DisplayName("deleteBy")
  void deleteByTest0() {
    String indexName1 = "theIndexName";

    SearchParams searchParams1 = new SearchParams();
    {
      String query2 = "testQuery";

      searchParams1.setQuery(query2);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.deleteBy(indexName1, searchParams1);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/theIndexName/deleteByQuery");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"query\":\"testQuery\"}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
  }

  @Test
  @DisplayName("deleteIndex")
  void deleteIndexTest0() {
    String indexName1 = "theIndexName";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.deleteIndex(indexName1);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/theIndexName");
    assertEquals(req.getMethod(), "DELETE");
  }

  @Test
  @DisplayName("deleteObject")
  void deleteObjectTest0() {
    String indexName1 = "theIndexName";

    String objectID1 = "uniqueID";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.deleteObject(indexName1, objectID1);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/theIndexName/uniqueID");
    assertEquals(req.getMethod(), "DELETE");
  }

  @Test
  @DisplayName("deleteRule")
  void deleteRuleTest0() {
    String indexName1 = "indexName";

    String objectID1 = "id1";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.deleteRule(indexName1, objectID1);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/indexName/rules/id1");
    assertEquals(req.getMethod(), "DELETE");
  }

  @Test
  @DisplayName("deleteSource")
  void deleteSourceTest0() {
    String source1 = "theSource";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.deleteSource(source1);
      }
    );

    assertEquals(req.getPath(), "/1/security/sources/theSource");
    assertEquals(req.getMethod(), "DELETE");
  }

  @Test
  @DisplayName("deleteSynonym")
  void deleteSynonymTest0() {
    String indexName1 = "indexName";

    String objectID1 = "id1";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.deleteSynonym(indexName1, objectID1);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/indexName/synonyms/id1");
    assertEquals(req.getMethod(), "DELETE");
  }

  @Test
  @DisplayName("getApiKey")
  void getApiKeyTest0() {
    String key1 = "myTestApiKey";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getApiKey(key1);
      }
    );

    assertEquals(req.getPath(), "/1/keys/myTestApiKey");
    assertEquals(req.getMethod(), "GET");
  }

  @Test
  @DisplayName("get getDictionaryLanguages")
  void getDictionaryLanguagesTest0() {
    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getDictionaryLanguages();
      }
    );

    assertEquals(req.getPath(), "/1/dictionaries/*/languages");
    assertEquals(req.getMethod(), "GET");
  }

  @Test
  @DisplayName("get getDictionarySettings results")
  void getDictionarySettingsTest0() {
    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getDictionarySettings();
      }
    );

    assertEquals(req.getPath(), "/1/dictionaries/*/settings");
    assertEquals(req.getMethod(), "GET");
  }

  @Test
  @DisplayName("getLogs")
  void getLogsTest0() {
    int offset1 = 5;

    int length1 = 10;

    String indexName1 = "theIndexName";

    String type1 = "all";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getLogs(offset1, length1, indexName1, type1);
      }
    );

    assertEquals(req.getPath(), "/1/logs");
    assertEquals(req.getMethod(), "GET");

    HashMap<String, String> expectedQuery = json.deserialize(
      "{\"offset\":\"5\",\"length\":\"10\",\"indexName\":\"theIndexName\",\"type\":\"all\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> acutalQuery = req.getQueryParams();
    for (Pair p : acutalQuery) {
      assertEquals(expectedQuery.get(p.getName()), p.getValue());
    }
  }

  @Test
  @DisplayName("getObject")
  void getObjectTest0() {
    String indexName1 = "theIndexName";

    String objectID1 = "uniqueID";

    List attributesToRetrieve1 = new ArrayList();
    {
      String attributesToRetrieveParam02 = "attr1";

      attributesToRetrieve1.add(attributesToRetrieveParam02);
      String attributesToRetrieveParam12 = "attr2";

      attributesToRetrieve1.add(attributesToRetrieveParam12);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getObject(indexName1, objectID1, attributesToRetrieve1);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/theIndexName/uniqueID");
    assertEquals(req.getMethod(), "GET");

    HashMap<String, String> expectedQuery = json.deserialize(
      "{\"attributesToRetrieve\":\"attr1,attr2\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> acutalQuery = req.getQueryParams();
    for (Pair p : acutalQuery) {
      assertEquals(expectedQuery.get(p.getName()), p.getValue());
    }
  }

  @Test
  @DisplayName("getObjects")
  void getObjectsTest0() {
    GetObjectsParams param0 = new GetObjectsParams();
    {
      List requests1 = new ArrayList();
      {
        MultipleGetObjectsParams requestsParam02 = new MultipleGetObjectsParams();
        {
          List attributesToRetrieve3 = new ArrayList();
          {
            String attributesToRetrieveParam04 = "attr1";

            attributesToRetrieve3.add(attributesToRetrieveParam04);
            String attributesToRetrieveParam14 = "attr2";

            attributesToRetrieve3.add(attributesToRetrieveParam14);
          }

          requestsParam02.setAttributesToRetrieve(attributesToRetrieve3);
          String objectID3 = "uniqueID";

          requestsParam02.setObjectID(objectID3);
          String indexName3 = "theIndexName";

          requestsParam02.setIndexName(indexName3);
        }
        requests1.add(requestsParam02);
      }

      param0.setRequests(requests1);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getObjects(param0);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/*/objects");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"requests\":[{\"attributesToRetrieve\":[\"attr1\",\"attr2\"],\"objectID\":\"uniqueID\",\"indexName\":\"theIndexName\"}]}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
  }

  @Test
  @DisplayName("getRule")
  void getRuleTest0() {
    String indexName1 = "indexName";

    String objectID1 = "id1";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getRule(indexName1, objectID1);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/indexName/rules/id1");
    assertEquals(req.getMethod(), "GET");
  }

  @Test
  @DisplayName("getSettings")
  void getSettingsTest0() {
    String indexName1 = "theIndexName";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getSettings(indexName1);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/theIndexName/settings");
    assertEquals(req.getMethod(), "GET");
  }

  @Test
  @DisplayName("getSources")
  void getSourcesTest0() {
    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getSources();
      }
    );

    assertEquals(req.getPath(), "/1/security/sources");
    assertEquals(req.getMethod(), "GET");
  }

  @Test
  @DisplayName("getSynonym")
  void getSynonymTest0() {
    String indexName1 = "indexName";

    String objectID1 = "id1";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getSynonym(indexName1, objectID1);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/indexName/synonyms/id1");
    assertEquals(req.getMethod(), "GET");
  }

  @Test
  @DisplayName("getTask")
  void getTaskTest0() {
    String indexName1 = "theIndexName";

    int taskID1 = 123;

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getTask(indexName1, taskID1);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/theIndexName/task/123");
    assertEquals(req.getMethod(), "GET");
  }

  @Test
  @DisplayName("getTopUserIds")
  void getTopUserIdsTest0() {
    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getTopUserIds();
      }
    );

    assertEquals(req.getPath(), "/1/clusters/mapping/top");
    assertEquals(req.getMethod(), "GET");
  }

  @Test
  @DisplayName("getUserId")
  void getUserIdTest0() {
    String userID1 = "uniqueID";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getUserId(userID1);
      }
    );

    assertEquals(req.getPath(), "/1/clusters/mapping/uniqueID");
    assertEquals(req.getMethod(), "GET");
  }

  @Test
  @DisplayName("hasPendingMappings")
  void hasPendingMappingsTest0() {
    boolean getClusters1 = true;

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.hasPendingMappings(getClusters1);
      }
    );

    assertEquals(req.getPath(), "/1/clusters/mapping/pending");
    assertEquals(req.getMethod(), "GET");

    HashMap<String, String> expectedQuery = json.deserialize(
      "{\"getClusters\":\"true\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> acutalQuery = req.getQueryParams();
    for (Pair p : acutalQuery) {
      assertEquals(expectedQuery.get(p.getName()), p.getValue());
    }
  }

  @Test
  @DisplayName("listApiKeys")
  void listApiKeysTest0() {
    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.listApiKeys();
      }
    );

    assertEquals(req.getPath(), "/1/keys");
    assertEquals(req.getMethod(), "GET");
  }

  @Test
  @DisplayName("listClusters")
  void listClustersTest0() {
    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.listClusters();
      }
    );

    assertEquals(req.getPath(), "/1/clusters");
    assertEquals(req.getMethod(), "GET");
  }

  @Test
  @DisplayName("listIndices")
  void listIndicesTest0() {
    int page1 = 8;

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.listIndices(page1);
      }
    );

    assertEquals(req.getPath(), "/1/indexes");
    assertEquals(req.getMethod(), "GET");

    HashMap<String, String> expectedQuery = json.deserialize(
      "{\"page\":\"8\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> acutalQuery = req.getQueryParams();
    for (Pair p : acutalQuery) {
      assertEquals(expectedQuery.get(p.getName()), p.getValue());
    }
  }

  @Test
  @DisplayName("listUserIds")
  void listUserIdsTest0() {
    int page1 = 8;

    int hitsPerPage1 = 100;

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.listUserIds(page1, hitsPerPage1);
      }
    );

    assertEquals(req.getPath(), "/1/clusters/mapping");
    assertEquals(req.getMethod(), "GET");

    HashMap<String, String> expectedQuery = json.deserialize(
      "{\"page\":\"8\",\"hitsPerPage\":\"100\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> acutalQuery = req.getQueryParams();
    for (Pair p : acutalQuery) {
      assertEquals(expectedQuery.get(p.getName()), p.getValue());
    }
  }

  @Test
  @DisplayName("multipleBatch")
  void multipleBatchTest0() {
    BatchParams param0 = new BatchParams();
    {
      List requests1 = new ArrayList();
      {
        Operation requestsParam02 = new Operation();
        {
          Action action3 = Action.fromValue("addObject");

          requestsParam02.setAction(action3);

          HashMap body3 = new HashMap<String, Object>();
          {
            String key4 = "value";

            body3.put("key", key4);
          }
          requestsParam02.setBody(body3);
          String indexName3 = "theIndexName";

          requestsParam02.setIndexName(indexName3);
        }
        requests1.add(requestsParam02);
      }

      param0.setRequests(requests1);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.multipleBatch(param0);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/*/batch");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"requests\":[{\"action\":\"addObject\",\"body\":{\"key\":\"value\"},\"indexName\":\"theIndexName\"}]}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
  }

  @Test
  @DisplayName("multipleQueries")
  void multipleQueriesTest0() {
    MultipleQueriesParams param0 = new MultipleQueriesParams();
    {
      List requests1 = new ArrayList();
      {
        MultipleQueries requestsParam02 = new MultipleQueries();
        {
          String indexName3 = "theIndexName";

          requestsParam02.setIndexName(indexName3);
          String query3 = "test";

          requestsParam02.setQuery(query3);

          MultipleQueriesType type3 = MultipleQueriesType.fromValue("facet");

          requestsParam02.setType(type3);
          String facet3 = "theFacet";

          requestsParam02.setFacet(facet3);
          String params3 = "testParam";

          requestsParam02.setParams(params3);
        }
        requests1.add(requestsParam02);
      }

      param0.setRequests(requests1);

      MultipleQueriesStrategy strategy1 = MultipleQueriesStrategy.fromValue(
        "stopIfEnoughMatches"
      );

      param0.setStrategy(strategy1);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.multipleQueries(param0);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/*/queries");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"requests\":[{\"indexName\":\"theIndexName\",\"query\":\"test\",\"type\":\"facet\",\"facet\":\"theFacet\",\"params\":\"testParam\"}],\"strategy\":\"stopIfEnoughMatches\"}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
  }

  @Test
  @DisplayName("operationIndex")
  void operationIndexTest0() {
    String indexName1 = "theIndexName";

    OperationIndexParams operationIndexParams1 = new OperationIndexParams();
    {
      OperationType operation2 = OperationType.fromValue("copy");

      operationIndexParams1.setOperation(operation2);
      String destination2 = "dest";

      operationIndexParams1.setDestination(destination2);

      List scope2 = new ArrayList();
      {
        String scopeParam03 = "rules";

        scope2.add(scopeParam03);
        String scopeParam13 = "settings";

        scope2.add(scopeParam13);
      }

      operationIndexParams1.setScope(scope2);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.operationIndex(indexName1, operationIndexParams1);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/theIndexName/operation");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"operation\":\"copy\",\"destination\":\"dest\",\"scope\":[\"rules\",\"settings\"]}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
  }

  @Test
  @DisplayName("partialUpdateObject")
  void partialUpdateObjectTest0() {
    String indexName1 = "theIndexName";

    String objectID1 = "uniqueID";

    List stringBuiltInOperation1 = new ArrayList();
    {
      HashMap stringBuiltInOperationParam02 = new HashMap<String, Object>();
      {
        String id13 = "test";

        stringBuiltInOperationParam02.put("id1", id13);

        OneOfstringbuiltInOperation id23 = new OneOfstringbuiltInOperation();
        {
          String _operation4 = "AddUnique";

          id23.set_operation(_operation4);
          String value4 = "test2";

          id23.setValue(value4);
        }
        stringBuiltInOperationParam02.put("id2", id23);
      }
      stringBuiltInOperation1.add(stringBuiltInOperationParam02);
    }

    boolean createIfNotExists1 = true;

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.partialUpdateObject(
          indexName1,
          objectID1,
          stringBuiltInOperation1,
          createIfNotExists1
        );
      }
    );

    assertEquals(req.getPath(), "/1/indexes/theIndexName/uniqueID/partial");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "[{\"id1\":\"test\",\"id2\":{\"_operation\":\"AddUnique\",\"value\":\"test2\"}}]",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });

    HashMap<String, String> expectedQuery = json.deserialize(
      "{\"createIfNotExists\":\"true\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> acutalQuery = req.getQueryParams();
    for (Pair p : acutalQuery) {
      assertEquals(expectedQuery.get(p.getName()), p.getValue());
    }
  }

  @Test
  @DisplayName("removeUserId")
  void removeUserIdTest0() {
    String userID1 = "uniqueID";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.removeUserId(userID1);
      }
    );

    assertEquals(req.getPath(), "/1/clusters/mapping/uniqueID");
    assertEquals(req.getMethod(), "DELETE");
  }

  @Test
  @DisplayName("replaceSources")
  void replaceSourcesTest0() {
    List source1 = new ArrayList();
    {
      Source sourceParam02 = new Source();
      {
        String source3 = "theSource";

        sourceParam02.setSource(source3);
        String description3 = "theDescription";

        sourceParam02.setDescription(description3);
      }
      source1.add(sourceParam02);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.replaceSources(source1);
      }
    );

    assertEquals(req.getPath(), "/1/security/sources");
    assertEquals(req.getMethod(), "PUT");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "[{\"source\":\"theSource\",\"description\":\"theDescription\"}]",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
  }

  @Test
  @DisplayName("restoreApiKey")
  void restoreApiKeyTest0() {
    String key1 = "myApiKey";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.restoreApiKey(key1);
      }
    );

    assertEquals(req.getPath(), "/1/keys/myApiKey/restore");
    assertEquals(req.getMethod(), "POST");
  }

  @Test
  @DisplayName("saveObject")
  void saveObjectTest0() {
    String indexName1 = "theIndexName";

    HashMap body1 = new HashMap<String, Object>();
    {
      String objectID2 = "id";

      body1.put("objectID", objectID2);
      String test2 = "val";

      body1.put("test", test2);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.saveObject(indexName1, body1);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/theIndexName");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"objectID\":\"id\",\"test\":\"val\"}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
  }

  @Test
  @DisplayName("saveRule")
  void saveRuleTest0() {
    String indexName1 = "indexName";

    String objectID1 = "id1";

    Rule rule1 = new Rule();
    {
      String objectID2 = "id1";

      rule1.setObjectID(objectID2);

      List conditions2 = new ArrayList();
      {
        Condition conditionsParam03 = new Condition();
        {
          String pattern4 = "apple";

          conditionsParam03.setPattern(pattern4);

          Anchoring anchoring4 = Anchoring.fromValue("contains");

          conditionsParam03.setAnchoring(anchoring4);
        }
        conditions2.add(conditionsParam03);
      }

      rule1.setConditions(conditions2);

      Consequence consequence2 = new Consequence();
      {
        ConsequenceParams params3 = new ConsequenceParams();
        {
          String filters4 = "brand:apple";

          params3.setFilters(filters4);
        }
        consequence2.setParams(params3);
      }
      rule1.setConsequence(consequence2);
    }

    boolean forwardToReplicas1 = true;

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.saveRule(
          indexName1,
          objectID1,
          rule1,
          forwardToReplicas1
        );
      }
    );

    assertEquals(req.getPath(), "/1/indexes/indexName/rules/id1");
    assertEquals(req.getMethod(), "PUT");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"objectID\":\"id1\",\"conditions\":[{\"pattern\":\"apple\",\"anchoring\":\"contains\"}],\"consequence\":{\"params\":{\"filters\":\"brand:apple\"}}}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });

    HashMap<String, String> expectedQuery = json.deserialize(
      "{\"forwardToReplicas\":\"true\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> acutalQuery = req.getQueryParams();
    for (Pair p : acutalQuery) {
      assertEquals(expectedQuery.get(p.getName()), p.getValue());
    }
  }

  @Test
  @DisplayName("saveSynonym")
  void saveSynonymTest0() {
    String indexName1 = "indexName";

    String objectID1 = "id1";

    SynonymHit synonymHit1 = new SynonymHit();
    {
      String objectID2 = "id1";

      synonymHit1.setObjectID(objectID2);

      SynonymType type2 = SynonymType.fromValue("synonym");

      synonymHit1.setType(type2);

      List synonyms2 = new ArrayList();
      {
        String synonymsParam03 = "car";

        synonyms2.add(synonymsParam03);
        String synonymsParam13 = "vehicule";

        synonyms2.add(synonymsParam13);
        String synonymsParam23 = "auto";

        synonyms2.add(synonymsParam23);
      }

      synonymHit1.setSynonyms(synonyms2);
    }

    boolean forwardToReplicas1 = true;

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.saveSynonym(
          indexName1,
          objectID1,
          synonymHit1,
          forwardToReplicas1
        );
      }
    );

    assertEquals(req.getPath(), "/1/indexes/indexName/synonyms/id1");
    assertEquals(req.getMethod(), "PUT");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"objectID\":\"id1\",\"type\":\"synonym\",\"synonyms\":[\"car\",\"vehicule\",\"auto\"]}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });

    HashMap<String, String> expectedQuery = json.deserialize(
      "{\"forwardToReplicas\":\"true\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> acutalQuery = req.getQueryParams();
    for (Pair p : acutalQuery) {
      assertEquals(expectedQuery.get(p.getName()), p.getValue());
    }
  }

  @Test
  @DisplayName("saveSynonyms")
  void saveSynonymsTest0() {
    String indexName1 = "indexName";

    List synonymHit1 = new ArrayList();
    {
      SynonymHit synonymHitParam02 = new SynonymHit();
      {
        String objectID3 = "id1";

        synonymHitParam02.setObjectID(objectID3);

        SynonymType type3 = SynonymType.fromValue("synonym");

        synonymHitParam02.setType(type3);

        List synonyms3 = new ArrayList();
        {
          String synonymsParam04 = "car";

          synonyms3.add(synonymsParam04);
          String synonymsParam14 = "vehicule";

          synonyms3.add(synonymsParam14);
          String synonymsParam24 = "auto";

          synonyms3.add(synonymsParam24);
        }

        synonymHitParam02.setSynonyms(synonyms3);
      }
      synonymHit1.add(synonymHitParam02);

      SynonymHit synonymHitParam12 = new SynonymHit();
      {
        String objectID3 = "id2";

        synonymHitParam12.setObjectID(objectID3);

        SynonymType type3 = SynonymType.fromValue("onewaysynonym");

        synonymHitParam12.setType(type3);
        String input3 = "iphone";

        synonymHitParam12.setInput(input3);

        List synonyms3 = new ArrayList();
        {
          String synonymsParam04 = "ephone";

          synonyms3.add(synonymsParam04);
          String synonymsParam14 = "aphone";

          synonyms3.add(synonymsParam14);
          String synonymsParam24 = "yphone";

          synonyms3.add(synonymsParam24);
        }

        synonymHitParam12.setSynonyms(synonyms3);
      }
      synonymHit1.add(synonymHitParam12);
    }

    boolean forwardToReplicas1 = true;

    boolean replaceExistingSynonyms1 = false;

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.saveSynonyms(
          indexName1,
          synonymHit1,
          forwardToReplicas1,
          replaceExistingSynonyms1
        );
      }
    );

    assertEquals(req.getPath(), "/1/indexes/indexName/synonyms/batch");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "[{\"objectID\":\"id1\",\"type\":\"synonym\",\"synonyms\":[\"car\",\"vehicule\",\"auto\"]},{\"objectID\":\"id2\",\"type\":\"onewaysynonym\",\"input\":\"iphone\",\"synonyms\":[\"ephone\",\"aphone\",\"yphone\"]}]",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });

    HashMap<String, String> expectedQuery = json.deserialize(
      "{\"forwardToReplicas\":\"true\",\"replaceExistingSynonyms\":\"false\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> acutalQuery = req.getQueryParams();
    for (Pair p : acutalQuery) {
      assertEquals(expectedQuery.get(p.getName()), p.getValue());
    }
  }

  @Test
  @DisplayName("search")
  void searchTest0() {
    String indexName1 = "indexName";

    SearchParams searchParams1 = new SearchParams();
    {
      String query2 = "myQuery";

      searchParams1.setQuery(query2);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.search(indexName1, searchParams1);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/indexName/query");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"query\":\"myQuery\"}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
  }

  @Test
  @DisplayName("get searchDictionaryEntries results with minimal parameters")
  void searchDictionaryEntriesTest0() {
    String dictionaryName1 = "compounds";

    SearchDictionaryEntriesParams searchDictionaryEntriesParams1 = new SearchDictionaryEntriesParams();
    {
      String query2 = "foo";

      searchDictionaryEntriesParams1.setQuery(query2);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.searchDictionaryEntries(
          dictionaryName1,
          searchDictionaryEntriesParams1
        );
      }
    );

    assertEquals(req.getPath(), "/1/dictionaries/compounds/search");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"query\":\"foo\"}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
  }

  @Test
  @DisplayName("get searchDictionaryEntries results with all parameters")
  void searchDictionaryEntriesTest1() {
    String dictionaryName1 = "compounds";

    SearchDictionaryEntriesParams searchDictionaryEntriesParams1 = new SearchDictionaryEntriesParams();
    {
      String query2 = "foo";

      searchDictionaryEntriesParams1.setQuery(query2);

      int page2 = 4;

      searchDictionaryEntriesParams1.setPage(page2);

      int hitsPerPage2 = 2;

      searchDictionaryEntriesParams1.setHitsPerPage(hitsPerPage2);
      String language2 = "fr";

      searchDictionaryEntriesParams1.setLanguage(language2);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.searchDictionaryEntries(
          dictionaryName1,
          searchDictionaryEntriesParams1
        );
      }
    );

    assertEquals(req.getPath(), "/1/dictionaries/compounds/search");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"query\":\"foo\",\"page\":4,\"hitsPerPage\":2,\"language\":\"fr\"}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
  }

  @Test
  @DisplayName("get searchForFacetValues results with minimal parameters")
  void searchForFacetValuesTest0() {
    String indexName1 = "indexName";

    String facetName1 = "facetName";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.searchForFacetValues(indexName1, facetName1);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/indexName/facets/facetName/query");
    assertEquals(req.getMethod(), "POST");
  }

  @Test
  @DisplayName("get searchForFacetValues results with all parameters")
  void searchForFacetValuesTest1() {
    String indexName1 = "indexName";

    String facetName1 = "facetName";

    SearchForFacetValuesRequest searchForFacetValuesRequest1 = new SearchForFacetValuesRequest();
    {
      String params2 = "query=foo&facetFilters=['bar']";

      searchForFacetValuesRequest1.setParams(params2);
      String facetQuery2 = "foo";

      searchForFacetValuesRequest1.setFacetQuery(facetQuery2);

      int maxFacetHits2 = 42;

      searchForFacetValuesRequest1.setMaxFacetHits(maxFacetHits2);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.searchForFacetValues(
          indexName1,
          facetName1,
          searchForFacetValuesRequest1
        );
      }
    );

    assertEquals(req.getPath(), "/1/indexes/indexName/facets/facetName/query");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"params\":\"query=foo&facetFilters=['bar']\",\"facetQuery\":\"foo\",\"maxFacetHits\":42}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
  }

  @Test
  @DisplayName("searchRules")
  void searchRulesTest0() {
    String indexName1 = "indexName";

    SearchRulesParams searchRulesParams1 = new SearchRulesParams();
    {
      String query2 = "something";

      searchRulesParams1.setQuery(query2);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.searchRules(indexName1, searchRulesParams1);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/indexName/rules/search");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"query\":\"something\"}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
  }

  @Test
  @DisplayName("searchSynonyms")
  void searchSynonymsTest0() {
    String indexName1 = "indexName";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.searchSynonyms(indexName1);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/indexName/synonyms/search");
    assertEquals(req.getMethod(), "POST");
  }

  @Test
  @DisplayName("searchUserIds")
  void searchUserIdsTest0() {
    SearchUserIdsParams param0 = new SearchUserIdsParams();
    {
      String query1 = "test";

      param0.setQuery(query1);
      String clusterName1 = "theClusterName";

      param0.setClusterName(clusterName1);

      int page1 = 5;

      param0.setPage(page1);

      int hitsPerPage1 = 10;

      param0.setHitsPerPage(hitsPerPage1);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.searchUserIds(param0);
      }
    );

    assertEquals(req.getPath(), "/1/clusters/mapping/search");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"query\":\"test\",\"clusterName\":\"theClusterName\",\"page\":5,\"hitsPerPage\":10}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
  }

  @Test
  @DisplayName("get setDictionarySettings results with minimal parameters")
  void setDictionarySettingsTest0() {
    DictionarySettingsParams param0 = new DictionarySettingsParams();
    {
      StandardEntries disableStandardEntries1 = new StandardEntries();
      {
        HashMap plurals2 = new HashMap<String, Object>();
        {
          boolean fr3 = false;

          plurals2.put("fr", fr3);

          boolean en3 = false;

          plurals2.put("en", en3);

          boolean ru3 = true;

          plurals2.put("ru", ru3);
        }
        disableStandardEntries1.setPlurals(plurals2);
      }
      param0.setDisableStandardEntries(disableStandardEntries1);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.setDictionarySettings(param0);
      }
    );

    assertEquals(req.getPath(), "/1/dictionaries/*/settings");
    assertEquals(req.getMethod(), "PUT");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"disableStandardEntries\":{\"plurals\":{\"fr\":false,\"en\":false,\"ru\":true}}}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
  }

  @Test
  @DisplayName("get setDictionarySettings results with all parameters")
  void setDictionarySettingsTest1() {
    DictionarySettingsParams param0 = new DictionarySettingsParams();
    {
      StandardEntries disableStandardEntries1 = new StandardEntries();
      {
        HashMap plurals2 = new HashMap<String, Object>();
        {
          boolean fr3 = false;

          plurals2.put("fr", fr3);

          boolean en3 = false;

          plurals2.put("en", en3);

          boolean ru3 = true;

          plurals2.put("ru", ru3);
        }
        disableStandardEntries1.setPlurals(plurals2);

        HashMap stopwords2 = new HashMap<String, Object>();
        {
          boolean fr3 = false;

          stopwords2.put("fr", fr3);
        }
        disableStandardEntries1.setStopwords(stopwords2);

        HashMap compounds2 = new HashMap<String, Object>();
        {
          boolean ru3 = true;

          compounds2.put("ru", ru3);
        }
        disableStandardEntries1.setCompounds(compounds2);
      }
      param0.setDisableStandardEntries(disableStandardEntries1);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.setDictionarySettings(param0);
      }
    );

    assertEquals(req.getPath(), "/1/dictionaries/*/settings");
    assertEquals(req.getMethod(), "PUT");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"disableStandardEntries\":{\"plurals\":{\"fr\":false,\"en\":false,\"ru\":true},\"stopwords\":{\"fr\":false},\"compounds\":{\"ru\":true}}}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
  }

  @Test
  @DisplayName("setSettings")
  void setSettingsTest0() {
    String indexName1 = "theIndexName";

    IndexSettings indexSettings1 = new IndexSettings();
    {
      int paginationLimitedTo2 = 10;

      indexSettings1.setPaginationLimitedTo(paginationLimitedTo2);
    }

    boolean forwardToReplicas1 = true;

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.setSettings(
          indexName1,
          indexSettings1,
          forwardToReplicas1
        );
      }
    );

    assertEquals(req.getPath(), "/1/indexes/theIndexName/settings");
    assertEquals(req.getMethod(), "PUT");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"paginationLimitedTo\":10}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });

    HashMap<String, String> expectedQuery = json.deserialize(
      "{\"forwardToReplicas\":\"true\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> acutalQuery = req.getQueryParams();
    for (Pair p : acutalQuery) {
      assertEquals(expectedQuery.get(p.getName()), p.getValue());
    }
  }

  @Test
  @DisplayName("updateApiKey")
  void updateApiKeyTest0() {
    String key1 = "myApiKey";

    ApiKey apiKey1 = new ApiKey();
    {
      List acl2 = new ArrayList();
      {
        String aclParam03 = "search";

        acl2.add(aclParam03);
        String aclParam13 = "addObject";

        acl2.add(aclParam13);
      }

      apiKey1.setAcl(acl2);

      int validity2 = 300;

      apiKey1.setValidity(validity2);

      int maxQueriesPerIPPerHour2 = 100;

      apiKey1.setMaxQueriesPerIPPerHour(maxQueriesPerIPPerHour2);

      int maxHitsPerQuery2 = 20;

      apiKey1.setMaxHitsPerQuery(maxHitsPerQuery2);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.updateApiKey(key1, apiKey1);
      }
    );

    assertEquals(req.getPath(), "/1/keys/myApiKey");
    assertEquals(req.getMethod(), "PUT");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"acl\":[\"search\",\"addObject\"],\"validity\":300,\"maxQueriesPerIPPerHour\":100,\"maxHitsPerQuery\":20}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
  }
}
