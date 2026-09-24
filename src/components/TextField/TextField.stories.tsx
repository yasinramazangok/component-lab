import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { TextField } from './TextField';

const meta = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: {
    label: 'Email address',
    type: 'email',
    placeholder: '',
    disabled: false,
    onChange: fn(),
  },
  argTypes: {
    type: { control: 'inline-radio', options: ['text', 'email', 'password'] },
  },
  decorators: [(Story) => <div style={{ width: 470, maxWidth: '100%' }}><Story /></div>],
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

/** An empty email field, as the user first sees it. */
export const Default: Story = {};

/** The field after the user typed an address. */
export const Filled: Story = {
  args: { defaultValue: 'alex@example.com' },
};

/** A password field with a rule in the label and a show / hide button. */
export const Password: Story = {
  args: {
    label: 'Password',
    hint: 'must be between 8-50 characters',
    type: 'password',
    placeholder: 'Enter your password',
    autoComplete: 'current-password',
  },
};

/** The server rejected the password. The message is announced to screen readers. */
export const WithError: Story = {
  args: {
    label: 'Password',
    hint: 'must be between 8-50 characters',
    type: 'password',
    defaultValue: 'short',
    error: 'Password must be at least 8 characters.',
  },
};

/** A field the user cannot edit right now. */
export const Disabled: Story = {
  args: { defaultValue: 'alex@example.com', disabled: true },
};

/** Dark theme. */
export const DarkTheme: Story = {
  args: { defaultValue: 'alex@example.com' },
  globals: { theme: 'dark' },
};

/* ---------- Interaction tests ---------- */

/** Typing in the field sends every change to `onChange`. */
export const TestTyping: Story = {
  tags: ['test'],
  play: async ({ canvasElement, args }) => {
    const input = within(canvasElement).getByLabelText('Email address');
    await userEvent.type(input, 'alex@example.com');
    await expect(input).toHaveValue('alex@example.com');
    await expect(args.onChange).toHaveBeenCalled();
  },
};

/** The eye button switches the password between hidden and visible. */
export const TestPasswordToggle: Story = {
  tags: ['test'],
  args: { ...Password.args, defaultValue: 'my-secret-1' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText(/Password/);
    await expect(input).toHaveAttribute('type', 'password');
    await userEvent.click(canvas.getByRole('button', { name: 'Show password' }));
    await expect(input).toHaveAttribute('type', 'text');
    await userEvent.click(canvas.getByRole('button', { name: 'Hide password' }));
    await expect(input).toHaveAttribute('type', 'password');
  },
};
