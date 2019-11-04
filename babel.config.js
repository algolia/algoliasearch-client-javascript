/* eslint-disable import/no-commonjs, functional/immutable-data */

const clean = x => x.filter(Boolean);

module.exports = () => {
  const targets = {
    browsers: ['last 2 versions', 'ie >= 11'],
  };

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
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
