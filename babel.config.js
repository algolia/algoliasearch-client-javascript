/* eslint-disable import/no-commonjs, functional/immutable-data */

const isES = process.env.BABEL_ENV === 'es';
const isRollup = process.env.BABEL_ENV === 'rollup';

const clean = x => x.filter(Boolean);

module.exports = api => {
  const isTest = api.env('test');
  const targets = {};

  if (!isTest) {
    targets.browsers = ['last 2 versions', 'ie >= 11'];
  } else {
    targets.node = true;
  }

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: !isES && !isRollup ? 'commonjs' : false,
          targets,
        },
      ],
    ],
    plugins: clean(['@babel/plugin-proposal-class-properties']),
    overrides: [
      {
        test: 'packages/*',
        presets: ['@babel/preset-typescript'],
        plugins: [],
      },
    ],
  };
};
