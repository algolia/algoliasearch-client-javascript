package com.algolia.codegen;

import org.openapitools.codegen.*;
import org.openapitools.codegen.languages.JavaClientCodegen;
import org.openapitools.codegen.utils.ModelUtils;
import org.yaml.snakeyaml.Yaml;

import java.util.*;
import java.util.Map.Entry;
import java.io.FileInputStream;
import java.net.URL;

import io.swagger.v3.oas.models.media.Schema;

@SuppressWarnings("unchecked")
public class AlgoliaJavaGenerator extends JavaClientCodegen {
  /**
   * Configures a friendly name for the generator. This will be used by the
   * generator
   * to select the library with the -g flag.
   *
   * @return the friendly name for the generator
   */
  @Override
  public String getName() {
    return "algolia-java";
  }

  /**
   * Inject server info into the client to generate the right URL
   */
  private void generateServer(Map<String, Object> client) {
    String clientName = (String) client.get("pathPrefix");
    Yaml yaml = new Yaml();
    try {
      Map<String, Object> spec = yaml.load(new FileInputStream("specs/" + clientName + "/spec.yml"));
      List<Map<String, Object>> servers = (List<Map<String, Object>>) spec.get("servers");

      boolean hasRegionalHost = false;
      boolean fallbackToAliasHost = false;

      boolean isEuHost = false;
      boolean isDeHost = false;
      String host = "";
      String topLevelDomain = "";

      for (Map<String, Object> server : servers) {
        if (!server.containsKey("url")) {
          throw new GenerationException("Invalid server, does not contains 'url'");
        }

        if (!server.containsKey("variables")) {
          continue;
        }

        Map<String, Map<String, Object>> variables = (Map<String, Map<String, Object>>) server.get("variables");

        if (!variables.containsKey("region") || !variables.get("region").containsKey("enum")) {
          continue;
        }
        ArrayList<String> enums = (ArrayList<String>) variables.get("region").get("enum");
        hasRegionalHost = true;

        URL url = new URL((String) server.get("url"));

        if (!fallbackToAliasHost) {
          // Determine if the current URL with `region` also have an alias without
          // variables.
          fallbackToAliasHost = true;
        }

        if (enums.contains("eu")) {
          isEuHost = true;
        }

        if (enums.contains("de")) {
          isDeHost = true;
        }

        // This is used for hosts like `insights` that uses `.io`
        String[] hostParts = url.getHost().split("\\.");
        host = hostParts[0];
        topLevelDomain = hostParts[hostParts.length - 1];
      }
      client.put("hasRegionalHost", hasRegionalHost);
      client.put("fallbackToAliasHost", fallbackToAliasHost);
      client.put("isEuHost", isEuHost);
      client.put("isDeHost", isDeHost);
      client.put("host", host);
      client.put("topLevelDomain", topLevelDomain);
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  /**
   * Provides an opportunity to inspect and modify operation data before the code
   * is generated.
   */
  @Override
  public Map<String, Object> postProcessOperationsWithModels(Map<String, Object> objs, List<Object> allModels) {
    Map<String, Object> results = super.postProcessOperationsWithModels(objs, allModels);
    Map<String, Object> client = (Map<String, Object>) results.get("operations");

    generateServer(client);

    return results;
  }

  @Override
  public Map<String, Object> postProcessAllModels(Map<String, Object> objs) {
    Map<String, Object> models = super.postProcessAllModels(objs);

    for (Object modelContainer : models.values()) {
      CodegenModel model = ((Map<String, List<Map<String, CodegenModel>>>) modelContainer).get("models").get(0)
          .get("model");
      if (!model.oneOf.isEmpty()) {
        List<HashMap<String, String>> listOneOf = new ArrayList();

        for (String iterateModel : model.oneOf) {
          HashMap<String, String> hashMapOneOf = new HashMap();

          hashMapOneOf.put("type", iterateModel);
          hashMapOneOf.put("name", iterateModel.replace("<", "").replace(">", ""));

          listOneOf.add(hashMapOneOf);
        }

        model.vendorExtensions.put("x-is-one-of-interface", true);
        model.vendorExtensions.put("x-is-one-of-list", listOneOf);
      }
    }

    return models;
  }

  @Override
  public Map<String, Object> postProcessSupportingFileData(Map<String, Object> objs) {
    Map<String, Object> bundle = super.postProcessSupportingFileData(objs);
    List<Map<String, Object>> apis = ((Map<String, List<Map<String, Object>>>) bundle.get("apiInfo")).get("apis");
    for (Map<String, Object> api : apis) {
      List<CodegenOperation> operations = ((Map<String, List<CodegenOperation>>) api.get("operations"))
          .get("operation");

      for (CodegenOperation ope : operations) {
        ope.returnType = ope.returnType.replace("Map<", "HashMap<").replace("List<", "ArrayList<");
      }
    }
    return bundle;
  }

  /**
   * Returns human-friendly help for the generator. Provide the consumer with help
   * tips, parameters here
   *
   * @return A string value for the help message
   */
  @Override
  public String getHelp() {
    return "Generates an algolia-java client library.";
  }

  @Override
  public void processOpts() {
    super.processOpts();

    supportingFiles.add(new SupportingFile("EchoResponse.mustache",
        "algoliasearch-core/com/algolia/utils/echo",
        "EchoResponse.java"));

    // Prevent all useless file to generate
    apiTestTemplateFiles.clear();
    modelTestTemplateFiles.clear();
    apiDocTemplateFiles.clear();
    modelDocTemplateFiles.clear();
  }

  @Override
  public String toDefaultValue(Schema schema) {
    // Replace the {} from openapi with new Object()
    if (ModelUtils.isObjectSchema(schema) && schema.getDefault() != null) {
      return "new Object()";
    }
    return super.toDefaultValue(schema);
  }
}
