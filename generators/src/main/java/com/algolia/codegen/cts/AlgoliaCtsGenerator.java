package com.algolia.codegen.cts;

import com.algolia.codegen.Utils;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.google.common.collect.ImmutableMap.Builder;
import com.samskivert.mustache.Mustache.Lambda;
import io.swagger.v3.core.util.Json;
import java.io.File;
import java.io.IOException;
import java.util.*;
import java.util.Map.Entry;
import org.openapitools.codegen.*;

@SuppressWarnings("unchecked")
public class AlgoliaCtsGenerator extends DefaultCodegen {

  // cache the models
  private final Map<String, CodegenModel> models = new HashMap<>();
  private String language;
  private String client;
  private String packageName;
  private boolean hasRegionalHost;

  /**
   * Configures the type of generator.
   *
   * @return the CodegenType for this generator
   * @see org.openapitools.codegen.CodegenType
   */
  @Override
  public CodegenType getTag() {
    return CodegenType.OTHER;
  }

  /**
   * Configures a friendly name for the generator. This will be used by the generator to select the
   * library with the -g flag.
   *
   * @return the friendly name for the generator
   */
  @Override
  public String getName() {
    return "algolia-cts";
  }

  /**
   * Returns human-friendly help for the generator. Provide the consumer with help tips, parameters
   * here
   *
   * @return A string value for the help message
   */
  @Override
  public String getHelp() {
    return "Generates the CTS";
  }

  @Override
  public void processOpts() {
    super.processOpts();

    language = (String) additionalProperties.get("language");
    client = (String) additionalProperties.get("client");
    packageName = (String) additionalProperties.get("packageName");
    hasRegionalHost =
      additionalProperties.get("hasRegionalHost").equals("true");

    try {
      JsonNode config = Json
        .mapper()
        .readTree(new File("config/clients.config.json"));
      TestConfig testConfig = Json
        .mapper()
        .treeToValue(config.get(language).get("tests"), TestConfig.class);

      setTemplateDir("tests/CTS/methods/requests/templates/" + language);
      setOutputDir("tests/output/" + language);
      supportingFiles.add(
        new SupportingFile(
          "requests.mustache",
          testConfig.outputFolder + "/methods/requests",
          client + testConfig.extension
        )
      );
    } catch (IOException e) {
      e.printStackTrace();
      System.exit(1);
    }
  }

  @Override
  public Map<String, Object> postProcessAllModels(Map<String, Object> objs) {
    Map<String, Object> mod = super.postProcessAllModels(objs);
    for (Entry<String, Object> entry : mod.entrySet()) {
      List<Object> innerModel =
        ((Map<String, List<Object>>) entry.getValue()).get("models");
      if (!innerModel.isEmpty()) {
        models.put(
          entry.getKey(),
          (CodegenModel) ((Map<String, Object>) innerModel.get(0)).get("model")
        );
      }
    }
    return mod;
  }

  @Override
  protected Builder<String, Lambda> addMustacheLambdas() {
    Builder<String, Lambda> lambdas = super.addMustacheLambdas();

    lambdas.put("escapequotes", new EscapeQuotesLambda());
    return lambdas;
  }

  @Override
  public Map<String, Object> postProcessSupportingFileData(
    Map<String, Object> objs
  ) {
    Map<String, Request[]> cts = null;
    try {
      cts = loadCTS();

      Map<String, CodegenOperation> operations = buildOperations(objs);

      // The return value of this function is not used, we need to modify the param
      // itself.
      Object lambda = objs.get("lambda");
      Map<String, Object> bundle = objs;
      bundle.clear();

      // We can put whatever we want in the bundle, and it will be accessible in the
      // template
      bundle.put("client", createClientName());
      bundle.put("import", createImportName());
      bundle.put("hasRegionalHost", hasRegionalHost);
      bundle.put("lambda", lambda);

      List<Object> blocks = new ArrayList<>();
      ParametersWithDataType paramsType = new ParametersWithDataType(models);

      for (Entry<String, Request[]> entry : cts.entrySet()) {
        String operationId = entry.getKey();
        if (!operations.containsKey(operationId)) {
          throw new CTSException(
            "operationId " + operationId + " does not exist in the spec"
          );
        }
        CodegenOperation op = operations.get(operationId);

        List<Object> tests = new ArrayList<>();
        for (int i = 0; i < entry.getValue().length; i++) {
          Map<String, Object> test = paramsType.buildJSONForRequest(
            entry.getValue()[i],
            op,
            i
          );
          tests.add(test);
        }
        Map<String, Object> testObj = new HashMap<>();
        testObj.put("tests", tests);
        testObj.put("operationId", operationId);
        blocks.add(testObj);
      }
      bundle.put("blocks", blocks);

      return bundle;
    } catch (CTSException e) {
      if (e.isSkipable()) {
        System.out.println(e.getMessage());
        System.exit(0);
      }

      System.out.println(e.getMessage());
      System.exit(1);
    } catch (Exception e) {
      e.printStackTrace();
      System.exit(1);
    }
    return null;
  }

  private Map<String, Request[]> loadCTS()
    throws JsonParseException, JsonMappingException, IOException, CTSException {
    TreeMap<String, Request[]> cts = new TreeMap<>();
    File dir = new File("tests/CTS/methods/requests/" + client);
    File commonTestDir = new File("tests/CTS/methods/requests/common");
    if (!dir.exists()) {
      throw new CTSException("CTS not found at " + dir.getAbsolutePath(), true);
    }
    if (!commonTestDir.exists()) {
      throw new CTSException(
        "CTS not found at " + commonTestDir.getAbsolutePath(),
        true
      );
    }
    for (File f : dir.listFiles()) {
      cts.put(
        f.getName().replace(".json", ""),
        Json.mapper().readValue(f, Request[].class)
      );
    }
    for (File f : commonTestDir.listFiles()) {
      cts.put(
        f.getName().replace(".json", ""),
        Json.mapper().readValue(f, Request[].class)
      );
    }
    return cts;
  }

  // operationId -> CodegenOperation
  private HashMap<String, CodegenOperation> buildOperations(
    Map<String, Object> objs
  ) {
    HashMap<String, CodegenOperation> result = new HashMap<>();
    List<Map<String, Object>> apis =
      ((Map<String, List<Map<String, Object>>>) objs.get("apiInfo")).get(
          "apis"
        );
    for (Map<String, Object> api : apis) {
      String apiName = ((String) api.get("baseName")).toLowerCase();
      if (!apiName.equals(client.replace("-", ""))) {
        continue;
      }
      List<CodegenOperation> operations =
        ((Map<String, List<CodegenOperation>>) api.get("operations")).get(
            "operation"
          );
      for (CodegenOperation ope : operations) {
        result.put(ope.operationId, ope);
      }
    }
    return result;
  }

  private String createClientName() {
    String[] clientParts = client.split("-");
    String clientName = "";
    if (language.equals("javascript")) {
      // do not capitalize the first part
      clientName = clientParts[0];
      for (int i = 1; i < clientParts.length; i++) {
        clientName += Utils.capitalize(clientParts[i]);
      }
    } else {
      for (int i = 0; i < clientParts.length; i++) {
        clientName += Utils.capitalize(clientParts[i]);
      }
    }

    return clientName + "Api";
  }

  private String createImportName() {
    if (!language.equals("java")) {
      return this.packageName;
    }
    String[] clientParts = client.split("-");
    // do not capitalize the first part
    String name = clientParts[0];
    for (int i = 1; i < clientParts.length; i++) {
      name += Utils.capitalize(clientParts[i]);
    }

    return name;
  }

  /**
   * override with any special text escaping logic to handle unsafe characters so as to avoid code
   * injection
   *
   * @param input String to be cleaned up
   * @return string with unsafe characters removed or escaped
   */
  @Override
  public String escapeUnsafeCharacters(String input) {
    return input;
  }

  /**
   * Escape single and/or double quote to avoid code injection
   *
   * @param input String to be cleaned up
   * @return string with quotation mark removed or escaped
   */
  public String escapeQuotationMark(String input) {
    return input.replace("\"", "\\\"");
  }
}
