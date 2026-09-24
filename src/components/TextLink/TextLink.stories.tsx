import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Text } from '../Typography';
import { TextLink } from './TextLink';

const meta = {
  title: 'Components/TextLink',
  component: TextLink,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { children: 'Forgot password?', tone: 'default', onClick: fn() },
  argTypes: { tone: { control: 'inline-radio', options: ['default', 'strong', 'subtle'] } },
} satisfies Meta<typeof TextLink>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A standalone link under the main button. */
export const Default: Story = {};

/** The key action inside a sentence. */
export const InSentence: Story = {
  render: (args) => (
    <Text>
      Don&apos;t have an account? <TextLink {...args} tone="strong">Sign up</TextLink>
    </Text>
  ),
};

/** Small legal links inside the footer text. */
export const Legal: Story = {
  render: (args) => (
    <Text size="xs" tone="muted">
      By continuing, you agree to our <TextLink {...args} tone="subtle">Terms of Service</TextLink> and{' '}
      <TextLink {...args} tone="subtle">Privacy Policy</TextLink>.
    </Text>
  ),
};
