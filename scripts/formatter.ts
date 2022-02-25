import { CI, run } from './common';
import { createSpinner } from './oraLog';

export async function formatter(
  language: string,
  folder: string,
  verbose = false
): Promise<void> {
  const spinner = createSpinner(
    { text: `formatting '${language}'`, indent: 4 },
    verbose
  ).start();
  let cmd = '';
  switch (language) {
    case 'javascript':
      cmd = `yarn eslint --ext=ts,js ${folder} --fix || yarn eslint --ext=ts,js ${folder} --fix`;
      break;
    case 'java':
      cmd = `find ${folder} -type f -name "*.java" | xargs java --add-exports jdk.compiler/com.sun.tools.javac.api=ALL-UNNAMED \
        --add-exports jdk.compiler/com.sun.tools.javac.file=ALL-UNNAMED \
        --add-exports jdk.compiler/com.sun.tools.javac.parser=ALL-UNNAMED \
        --add-exports jdk.compiler/com.sun.tools.javac.tree=ALL-UNNAMED \
        --add-exports jdk.compiler/com.sun.tools.javac.util=ALL-UNNAMED \
        -jar /tmp/java-formatter.jar -r \
        && yarn prettier --write ${folder}`;
      break;
    case 'php':
      cmd = `composer update --working-dir=clients/algoliasearch-client-php \
            && composer dump-autoload --working-dir=clients/algoliasearch-client-php \
            && PHP_CS_FIXER_IGNORE_ENV=1 ${
              CI ? 'php' : 'php8'
            } clients/algoliasearch-client-php/vendor/bin/php-cs-fixer fix ${folder} --using-cache=no --allow-risky=yes`;
      break;
    default:
      return;
  }
  await run(cmd, { verbose });
  spinner.succeed();
}
