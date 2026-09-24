import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { GlobeIcon, KeyIcon, MailIcon } from '../../icons';
import { Button } from './Button';

/**
 * The meta object holds settings shared by every story in this file.
 * - `title` is the path in the Storybook sidebar.
 * - `args` are the default props. Each story only writes what is different.
 * - `tags: ['autodocs']` generates a Docs page from the component's types and comments.
 */
const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: {
    children: 'Log in',
    variant: 'primary',
    size: 'md',
    fullWidth: false,
    isLoading: false,
    disabled: false,
    type: 'button',
    onClick: fn(), // records every click in the Actions panel
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary'] },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    type: { control: 'inline-radio', options: ['button', 'submit'] },
    iconStart: { control: false },
  },
  decorators: [(Story) => <div style={{ width: 470, maxWidth: '100%', display: 'flex', justifyContent: 'center' }}><Story /></div>],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ---------- Variants ---------- */

/** The main action on a screen: "Log in", "Continue with email". */
export const Primary: Story = {
  args: { fullWidth: true },
};

/** Other actions: social sign-in, "Send me a magic link". */
export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Send me a magic link', fullWidth: true },
};

/** A social sign-in button. Pass the provider's official logo as `iconStart` in a real app. */
export const WithIcon: Story = {
  args: { variant: 'secondary', children: 'Continue with a provider', iconStart: <GlobeIcon size={18} />, fullWidth: true },
};

/* ---------- States ---------- */

/** A request is running. The spinner shows and extra clicks are ignored. */
export const Loading: Story = {
  args: { isLoading: true, loadingLabel: 'Logging in…', fullWidth: true },
};

/** The form is not valid yet, so the action is not available. */
export const Disabled: Story = {
  args: { disabled: true, fullWidth: true },
};

/* ---------- Layout and edge cases ---------- */

/** Both variants and both sizes side by side. */
export const Gallery: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 16, width: '100%' }}>
      <Button {...args} fullWidth>Continue with email</Button>
      <Button {...args} fullWidth variant="secondary" iconStart={<MailIcon size={18} />}>Continue with email</Button>
      <Button {...args} fullWidth variant="secondary" iconStart={<KeyIcon size={18} />}>Continue with a passkey</Button>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
        <Button {...args} size="sm">Small</Button>
        <Button {...args} size="sm" variant="secondary">Small</Button>
      </div>
    </div>
  ),
};

/** Long translations must not break the layout. The text is cut with "…". */
export const LongLabel: Story = {
  args: { children: 'Mit Ihrem bestehenden Konto anmelden und fortfahren', fullWidth: true },
  decorators: [(Story) => <div style={{ width: 280 }}><Story /></div>],
};

/** Dark theme: the component code is the same, only token values change. */
export const DarkTheme: Story = {
  args: { fullWidth: true },
  globals: { theme: 'dark' },
};

/* ---------- Interaction tests (run automatically when the story opens and in CI) ---------- */

/** Clicking the button calls `onClick` once. */
export const TestClick: Story = {
  tags: ['test'],
  args: { fullWidth: true },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Log in' }));
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

/** While loading, clicking twice must not send a second request. */
export const TestLoadingBlocksClicks: Story = {
  tags: ['test'],
  args: { isLoading: true, loadingLabel: 'Logging in…', fullWidth: true },
  play: async ({ canvasElement, args }) => {
    const button = within(canvasElement).getByRole('button', { name: 'Logging in…' });
    await userEvent.click(button);
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
    await expect(button).toHaveAttribute('aria-busy', 'true');
  },
};

/** Keyboard users can reach the button with Tab and press it with Enter. */
export const TestKeyboard: Story = {
  tags: ['test'],
  args: { fullWidth: true },
  play: async ({ canvasElement, args }) => {
    const button = within(canvasElement).getByRole('button', { name: 'Log in' });
    await userEvent.tab();
    await expect(button).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};
