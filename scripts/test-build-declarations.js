/* eslint-disable import/no-commonjs, no-console, no-process-exit */
const glob = require('glob');
const execa = require('execa');

const NUMBER_OF_DECLARATIONS = 18;

(async () => {
  const declarations = await new Promise(resolve => {
    glob(`${__dirname}/../packages/**/*.d.ts`, {}, (err, files) => {
      if (err || files.length === 0) {
        throw new Error(err || 'No declarations found');
      }

      resolve(files);
    });
  });

  if (declarations.length !== NUMBER_OF_DECLARATIONS) {
    console.log(
      'Unexpected number of declarations. expected:',
      NUMBER_OF_DECLARATIONS,
      'but got:',
      declarations.length
    );
    process.exit(1);
  }

  const check = file => {
    return execa('yarn', ['tsc', file, '--noEmit'], {
      stdio: 'inherit',
    }).catch(err => {
      console.log(err);
      process.exit(1);
    });
  };

  if (process.env.CIRCLE_BUILD_NUM) {
    // eslint-disable-next-line functional/no-loop-statement
    for (const declaration of declarations) {
      await check(declaration);
    }
  } else {
    await Promise.all(declarations.map(check));
  }
})();
