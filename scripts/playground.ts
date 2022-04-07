import { run } from './common';
import type { Generator } from './types';

export async function playground({
  language,
  client,
}: Pick<Generator, 'client' | 'language'>): Promise<void> {
  const verbose = true;
  switch (language) {
    case 'javascript':
      await run(`yarn workspace javascript-playground start:${client}`, {
        verbose,
      });
      break;
    case 'java':
      await run(`./gradle/gradlew -p playground/java run`, {
        verbose,
      });
      break;
    case 'php':
      await run(
        `cd playground/php && \
       composer update && \
       composer dump-autoload && \
       cd src && \
       php8 ${client}.php`,
        { verbose }
      );
      break;
    default:
  }
}
