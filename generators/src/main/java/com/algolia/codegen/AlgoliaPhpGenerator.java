package com.algolia.codegen;

import io.swagger.v3.oas.models.Operation;
import io.swagger.v3.oas.models.servers.Server;
import java.util.List;
import java.util.Map;
import org.openapitools.codegen.CodegenOperation;
import org.openapitools.codegen.SupportingFile;
import org.openapitools.codegen.languages.PhpClientCodegen;

public class AlgoliaPhpGenerator extends PhpClientCodegen {

  @Override
  public String getName() {
    return "algolia-php";
  }

  @Override
  public CodegenOperation fromOperation(
    String path,
    String httpMethod,
    Operation operation,
    List<Server> servers
  ) {
    return Utils.specifyCustomRequest(
      super.fromOperation(path, httpMethod, operation, servers)
    );
  }

  /** Set default generator options */
  public void setDefaultGeneratorOptions(Map<String, Object> client) {
    String spec = (String) client.get("pathPrefix");

    if (spec.equals("search") || spec.equals("recommend")) {
      additionalProperties.put("useCache", true);
    }

    additionalProperties.put(
      "configClassname",
      Utils.createClientName(spec, "php") + "Config"
    );
  }

  /** Provides an opportunity to inspect and modify operation data before the code is generated. */
  @Override
  public Map<String, Object> postProcessOperationsWithModels(
    Map<String, Object> objs,
    List<Object> allModels
  ) {
    Map<String, Object> results = super.postProcessOperationsWithModels(
      objs,
      allModels
    );
    Map<String, Object> client = (Map<String, Object>) results.get(
      "operations"
    );

    setDefaultGeneratorOptions(client);

    return results;
  }

  @Override
  public void processOpts() {
    super.processOpts();

    // generator specific options
    setParameterNamingConvention("camelCase");

    // Remove base template as we want to change its path
    supportingFiles.removeIf(file ->
      file.getTemplateFile().equals("Configuration.mustache")
    );

    supportingFiles.add(
      new SupportingFile(
        "Configuration.mustache",
        "lib/Configuration",
        "Configuration.php"
      )
    );
  }
}
