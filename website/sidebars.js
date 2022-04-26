// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // Everything related to the API Clients Automation
  automation: [
    'automation/introduction',
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'automation/setupRepository',
        {
          type: 'category',
          label: 'CLI',
          collapsed: false,
          items: [
            'automation/CLI/specsCommands',
            'automation/CLI/clientsCommands',
            'automation/CLI/ctsCommands',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Contributing',
      collapsed: false,
      items: [
        'automation/addNewApiClient',
        'automation/addNewLanguage',
        {
          type: 'category',
          label: 'Testing',
          collapsed: false,
          items: [
            'automation/testing/commonTestSuite',
            'automation/testing/playground',
          ],
        },
        'automation/commitAndPullRequest',
        'automation/releaseProcess',
      ],
    },
  ],
  // Everything related to the generated clients usage
  clients: ['api-clients/introduction', 'api-clients/gettingStarted'],
};

// eslint-disable-next-line import/no-commonjs
module.exports = sidebars;
