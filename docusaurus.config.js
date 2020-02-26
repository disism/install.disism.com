module.exports = {
  title: ' How to Install xxx ?',
  tagline: '',
  url: 'https://install.disism.com',
  baseUrl: '/',
  favicon: 'img/icons8-i.svg',
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'install', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'INSTALL',
      logo: {
        alt: 'Tuetle',
        src: 'img/icons8-turtle.svg',
      },
      links: [
        {to: 'docs/welecome', label: 'Docs', position: 'left'},
        {to: 'news', label: 'News', position: 'left'},
        {
          href: 'https://disism.com',
          label: 'disism.com',
          position: 'left',
        },
        {
          href: 'https://github.com/disism/install.disism.com',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    algolia: {
      apiKey: '1a546bf00a488cff36ce071111577448',
      indexName: 'install-disism',
      algoliaOptions: {}, // Optional, if provided by Algolia
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Started',
              to: 'docs/welecome',
            }
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Issues',
              href: 'https://github.com/disism/install.disism.com/issues',
            }
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'News',
              to: 'news',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/disism/install.disism.com',
            }
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} disism.com, Inc. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/disism/install.disism.com/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  // ????
  plugins: [
    [
      '@docusaurus/plugin-content-blog',
      {
        path: 'news',
        routeBasePath: 'news',
        include: ['*.md', '*.mdx'],
        // ...
      },
    ],
    '@docusaurus/plugin-content-pages',
  ],
};
