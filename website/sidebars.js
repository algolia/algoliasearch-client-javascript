// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    {
      type: 'category',
      label: 'Getting Started',
      items: ['introduction', 'gettingStarted'],
    },
    {
      type: 'category',
      label: 'Contributing',
      items: [
        {
          type: 'category',
          label: 'Setup and CLI commands',
          items: ['setupRepository', 'specsCommands', 'generationCommands'],
        },
        'addNewClient',
        'addNewLanguage',
        'commitAndPullRequest',
        'releaseProcess',
      ],
    },
    {
      type: 'category',
      label: 'Testing',
      items: ['commonTestSuite', 'playground'],
    },
  ],
};

// eslint-disable-next-line import/no-commonjs
module.exports = sidebars;
