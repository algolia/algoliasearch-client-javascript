/* eslint-disable no-console, import/no-commonjs*/

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const execa = require('execa');

const targets = fs.readdirSync('packages').filter(f => fs.statSync(`packages/${f}`).isDirectory());
buildDefinitions();

async function buildDefinitions() {
  await Promise.all(targets.map(target => fs.remove(`packages/${target}/dist`)));
  await Promise.all(
    targets.map(target =>
      execa(`rollup`, ['-c', '--environment', [`TARGET:${target}`].join(',')], {
        stdio: 'inherit',
      })
    )
  );
  await Promise.all(
    targets.map(target => buildDefinition(target)).concat(buildDefinition('algoliasearch', 'lite'))
  );

  await Promise.all(
    targets.map(target => fs.remove(path.resolve(`packages/${target}/dist/packages`)))
  );
}

async function buildDefinition(target, config = '') {
  const pkgDir = path.resolve(`packages/${target}`);
  const pkg = require(`${pkgDir}/package.json`);

  console.log();
  console.log(chalk.bold(chalk.yellow(`Rolling up type definitions for ${target}...`)));

  // build types
  const { Extractor, ExtractorConfig } = require('@microsoft/api-extractor');

  const extractorConfigPath = path.resolve(
    pkgDir,
    `api-extractor${config ? `-${config}` : ''}.json`
  );
  const extractorConfig = ExtractorConfig.loadFileAndPrepare(extractorConfigPath);
  const result = Extractor.invoke(extractorConfig, {
    localBuild: true,
    showVerboseMessages: true,
  });

  if (result.succeeded) {
    if (pkg.buildOptions && pkg.buildOptions.dts) {
      const dtsPath = path.resolve(pkgDir, pkg.types);
      const existing = await fs.readFile(dtsPath, 'utf-8');
      const toAdd = await Promise.all(
        pkg.buildOptions.dts.map(file => {
          return fs.readFile(path.resolve(pkgDir, file), 'utf-8');
        })
      );
      await fs.writeFile(dtsPath, `${existing}\n${toAdd.join('\n')}`);
    }
    console.log(chalk.bold(chalk.green(`API Extractor completed successfully.`)));
  } else {
    console.error(
      `API Extractor completed with ${result.errorCount} errors` +
        ` and ${result.warningCount} warnings`
    );
    // eslint-disable-next-line functional/immutable-data
    process.exitCode = 1;
  }
}
