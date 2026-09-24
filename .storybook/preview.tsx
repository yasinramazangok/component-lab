import type { Preview } from '@storybook/react-vite';
import '../src/tokens/tokens.css';

/**
 * Global settings for every story.
 * - `globalTypes` adds the Theme switch to the toolbar.
 * - The decorator wraps each story with the selected theme.
 * - `viewport` defines the screen sizes you can pick in the toolbar.
 */
const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Color theme',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'light' },

  decorators: [
    (Story, context) => (
      <div
        data-theme={context.globals.theme}
        style={{
          fontFamily: 'var(--font-body)',
          color: 'var(--color-text)',
          background: context.parameters.layout === 'fullscreen' ? undefined : 'var(--color-canvas-start)',
          padding: context.parameters.layout === 'fullscreen' ? 0 : 24,
        }}
      >
        <Story />
      </div>
    ),
  ],

  parameters: {
    controls: { expanded: true, sort: 'requiredFirst' },
    a11y: { test: 'error' }, // an accessibility error fails the story test
    backgrounds: { disable: true }, // the theme switch handles backgrounds
    viewport: {
      options: {
        mobile: { name: 'Phone (390)', styles: { width: '390px', height: '844px' } },
        tablet: { name: 'Tablet (820)', styles: { width: '820px', height: '1180px' } },
        desktop: { name: 'Desktop (1440)', styles: { width: '1440px', height: '900px' } },
      },
    },
    options: {
      storySort: { order: ['Foundations', 'Components', 'Screens'] },
    },
  },
};

export default preview;
