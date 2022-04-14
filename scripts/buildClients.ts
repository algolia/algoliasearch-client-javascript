import {
  createGeneratorKey,
  GENERATORS,
  LANGUAGES,
  run,
  toAbsolutePath,
} from './common';
import { getLanguageFolder } from './config';
import { createSpinner } from './oraLog';

/**
 * Build all client for a language at the same time, for those who live in the same folder.
 */
async function buildPerLanguage({
  language,
  client,
  verbose,
}: {
  language: string;
  client: string;
  verbose: boolean;
}): Promise<void> {
  const spinner = createSpinner(`building '${language}'`, verbose).start();
  const cwd = toAbsolutePath(getLanguageFolder(language));
  const generator =
    client === 'all'
      ? null
      : GENERATORS[createGeneratorKey({ language, client })];

  switch (language) {
    case 'javascript':
      await run(`yarn clean`, { cwd, verbose });
      await run(
        `yarn build ${
          client === 'all'
            ? ''
            : generator?.additionalProperties.buildFile ?? client
        }`,
        {
          cwd,
          verbose,
        }
      );
      break;
    case 'java':
      await run(
        `./gradle/gradlew --no-daemon -p ${getLanguageFolder(
          language
        )} assemble`,
        {
          verbose,
        }
      );
      break;
    case 'php':
      break;
    default:
  }
  spinner.succeed();
}

export async function buildClients(
  language: string,
  client: string,
  verbose: boolean
): Promise<void> {
  const languages = language === 'all' ? LANGUAGES : [language];

  await Promise.all(
    languages.map((lang) =>
      buildPerLanguage({
        language: lang,
        client,
        verbose,
      })
    )
  );
}
