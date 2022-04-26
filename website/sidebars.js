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
        'automation/setup-repository',
        {
          type: 'category',
          label: 'CLI',
          collapsed: false,
          items: [
            'automation/CLI/specs-commands',
            'automation/CLI/clients-commands',
            'automation/CLI/cts-commands',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Contributing',
      collapsed: false,
      items: [
        'automation/add-new-api-client',
        'automation/add-new-language',
        {
          type: 'category',
          label: 'Testing',
          collapsed: false,
          items: [
            'automation/testing/common-test-suite',
            'automation/testing/playground',
          ],
        },
        'automation/commit-and-pull-request',
        'automation/release-process',
      ],
    },
  ],
  // Everything related to the generated clients usage
  clients: ['api-clients/introduction', 'api-clients/getting-started'],
};

// eslint-disable-next-line import/no-commonjs
module.exports = sidebars;
