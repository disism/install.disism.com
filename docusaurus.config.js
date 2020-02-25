module.exports = {
  title: ' How to Install ?',
  tagline: 'DISISM LOVE NEW TECHNOLOGY',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  favicon: 'img/icons8-i.svg',
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'install.disism.com',
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
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Style Guide',
              to: 'docs/welecome',
            },
            {
              label: 'Second Doc',
              to: 'docs/doc2',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
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
              href: 'https://github.com/facebook/docusaurus',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/docusaurus',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
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
