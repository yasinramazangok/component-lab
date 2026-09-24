import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heading, Text } from './Typography';

const meta = {
  title: 'Foundations/Typography',
  component: Heading,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { children: 'Welcome back', level: 1, size: 'display' },
  argTypes: {
    level: { control: 'inline-radio', options: [1, 2, 3] },
    size: { control: 'inline-radio', options: ['display', 'title'] },
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The serif page title. */
export const DisplayHeading: Story = {};

/** Title and subtitle together, as they appear at the top of a screen. */
export const TitleWithSubtitle: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 12, textAlign: 'center' }}>
      <Heading {...args} />
      <Text tone="muted">Log in to your account.</Text>
    </div>
  ),
};

/** The full type scale used in the kit. */
export const Scale: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16, maxWidth: 520 }}>
      <Heading size="display">Display 48 · Serif</Heading>
      <Heading size="title" level={2}>Title 32 · Serif</Heading>
      <Text size="md">Body 16 · The quick brown fox jumps over the lazy dog.</Text>
      <Text size="sm" tone="muted">Label 14 · Email address</Text>
      <Text size="xs" tone="muted">Legal 12 · By continuing, you agree to our terms.</Text>
    </div>
  ),
};
