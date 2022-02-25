import { run } from '../common';
import { createSpinner } from '../oraLog';

async function runCtsOne(language: string, verbose: boolean): Promise<void> {
  const spinner = createSpinner(
    `running cts for '${language}'`,
    verbose
  ).start();
  switch (language) {
    case 'javascript':
      await run('yarn workspace javascript-tests test', { verbose });
      break;
    case 'java':
      await run('./gradle/gradlew --no-daemon -p tests/output/java test', {
        verbose,
      });
      break;
    /* not working yet
    case 'php': {
      let php = 'php8';
      if (CI) php = 'php';
      await run(
        `${php} ./clients/algoliasearch-client-php/vendor/bin/phpunit tests/output/php`,
        { verbose }
      );
      break;
    }*/
    default:
      spinner.warn(`skipping unknown language '${language}' to run the CTS`);
      return;
  }
  spinner.succeed();
}

export async function runCts(
  languages: string[],
  verbose: boolean
): Promise<void> {
  for (const lang of languages) {
    await runCtsOne(lang, verbose);
  }
}
