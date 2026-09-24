import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { TextLink } from '../../components/TextLink';
import { Text } from '../../components/Typography';
import { AuthLayout, Wordmark } from '../../patterns/AuthLayout';
import { LoginEmailStep, type LoginEmailStepProps } from './LoginEmailStep';
import { LoginFlow, mockAuth } from './LoginFlow';
import { LoginPasswordStep, type LoginPasswordStepProps } from './LoginPasswordStep';

/**
 * Full screens built only from the components in this kit.
 * These stories show how small parts come together, and they test the whole flow.
 */
const meta = {
  title: 'Screens/Login',
  component: LoginFlow,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <AuthLayout
        logo={<Wordmark />}
        footer={
          <Text size="xs" tone="muted">
            By continuing, you agree to our <TextLink tone="subtle">Terms of Service</TextLink> and{' '}
            <TextLink tone="subtle">Privacy Policy</TextLink>.
          </Text>
        }
      >
        <Story />
      </AuthLayout>
    ),
  ],
} satisfies Meta<typeof LoginFlow>;

export default meta;
type Story = StoryObj<typeof meta>;

/* Small wrappers so you can type in the single-step stories. */
function EmailStepDemo({ email: initialEmail = '', ...rest }: Partial<LoginEmailStepProps>) {
  const [email, setEmail] = useState(initialEmail);
  return <LoginEmailStep onContinue={fn()} {...rest} email={email} onEmailChange={setEmail} />;
}
function PasswordStepDemo({ password: initialPassword = '', ...rest }: Partial<LoginPasswordStepProps>) {
  const [password, setPassword] = useState(initialPassword);
  return (
    <LoginPasswordStep email="alex@example.com" onSubmit={fn()} {...rest} password={password} onPasswordChange={setPassword} />
  );
}

/* ---------- Step 1: email ---------- */

/** Choose a provider or continue with email. */
export const EmailStep: Story = {
  render: () => <EmailStepDemo />,
};

/** The address is not valid. */
export const EmailStepError: Story = {
  render: () => <EmailStepDemo email="d" error="Enter a valid email address." />,
};

/** Waiting for the server after "Continue with email". */
export const EmailStepLoading: Story = {
  render: () => <EmailStepDemo email="alex@example.com" isLoading />,
};

/* ---------- Step 2: password ---------- */

/** Enter the password, or ask for a magic link. */
export const PasswordStep: Story = {
  render: () => <PasswordStepDemo />,
};

/** The password was rejected. */
export const PasswordStepError: Story = {
  render: () => (
    <PasswordStepDemo password="wrong-password" error="That password is not correct. Try again or use a magic link." />
  ),
};

/** Waiting for the server after "Log in". */
export const PasswordStepLoading: Story = {
  render: () => <PasswordStepDemo password="correct-horse" isLoading />,
};

/* ---------- Whole flow ---------- */

/**
 * The complete, clickable flow with a fake auth service (nothing is sent anywhere).
 * Try any email, then any 8+ character password. Type "wrong-password" to see the error.
 */
export const FullFlow: Story = {};

/** The same flow at phone width (390px). */
export const FullFlowMobile: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
};

/** The same flow in the dark theme. */
export const FullFlowDark: Story = {
  globals: { theme: 'dark' },
};

/* ---------- Interaction tests ---------- */

const fastMock = () => {
  const previous = mockAuth.delayMs;
  mockAuth.delayMs = 50;
  return () => {
    mockAuth.delayMs = previous;
  };
};

/** Happy path: email → password → signed in. */
export const TestHappyPath: Story = {
  tags: ['test'],
  beforeEach: fastMock,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('Enter email', async () => {
      await userEvent.type(canvas.getByLabelText('Email address'), 'alex@example.com');
      await userEvent.click(canvas.getByRole('button', { name: 'Continue with email' }));
    });
    await step('Enter password', async () => {
      await canvas.findByRole('heading', { name: 'Enter your password' });
      await userEvent.type(canvas.getByLabelText(/Password/), 'correct-horse');
      await userEvent.click(canvas.getByRole('button', { name: 'Log in' }));
    });
    await expect(await canvas.findByRole('heading', { name: "You're in" })).toBeInTheDocument();
  },
};

/** An invalid email shows an error and stays on step 1. */
export const TestInvalidEmail: Story = {
  tags: ['test'],
  beforeEach: fastMock,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText('Email address'), 'd');
    await userEvent.click(canvas.getByRole('button', { name: 'Continue with email' }));
    await expect(canvas.getByRole('alert')).toHaveTextContent('Enter a valid email address.');
    await expect(canvas.getByRole('heading', { name: 'Welcome back' })).toBeInTheDocument();
  },
};

/** A wrong password shows an error, and Back returns to step 1. */
export const TestWrongPasswordAndBack: Story = {
  tags: ['test'],
  beforeEach: fastMock,
  args: { initialStep: 'password', initialEmail: 'alex@example.com' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(/Password/), 'wrong-password');
    await userEvent.click(canvas.getByRole('button', { name: 'Log in' }));
    await expect(await canvas.findByRole('alert')).toHaveTextContent('That password is not correct');
    await userEvent.click(canvas.getByRole('button', { name: 'Back' }));
    await expect(canvas.getByRole('heading', { name: 'Welcome back' })).toBeInTheDocument();
  },
};
