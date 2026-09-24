import type { Meta, StoryObj } from '@storybook/react-vite';
import { Divider } from './Divider';

const meta = {
  title: 'Components/Divider',
  component: Divider,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div style={{ width: 470, maxWidth: '100%' }}><Story /></div>],
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Separates social sign-in from the email form. */
export const WithLabel: Story = {
  args: { label: 'Or, continue with email' },
};

/** A longer label, used on the password step. */
export const LongLabel: Story = {
  args: { label: "Or, we'll send you a temporary magic link" },
};

/** A plain line without text. */
export const Plain: Story = {};
