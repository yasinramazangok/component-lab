import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  // Every *.stories.tsx file under src/ appears in the sidebar.
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-docs', // Docs pages and props tables
    '@storybook/addon-a11y', // Accessibility checks
    '@storybook/addon-vitest', // Run stories as tests
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
};

export default config;
