import { useState } from 'react';
import { Button } from '../../components/Button';
import { IconBadge } from '../../components/IconBadge';
import { Heading, Text } from '../../components/Typography';
import { SparkIcon } from '../../icons';
import { LoginEmailStep } from './LoginEmailStep';
import { LoginPasswordStep } from './LoginPasswordStep';
import styles from './Login.module.css';

/**
 * A fake sign-in service for the demo. Nothing leaves the browser.
 * - Any valid email moves to the password step.
 * - The password "wrong-password" is rejected, every other valid password succeeds.
 */
export const mockAuth = {
  delayMs: 900,
  checkEmail: (email: string) =>
    new Promise<void>((resolve) => setTimeout(resolve, mockAuth.delayMs / 2, email)),
  logIn: (_email: string, password: string) =>
    new Promise<void>((resolve, reject) =>
      setTimeout(() => (password === 'wrong-password' ? reject(new Error('wrong')) : resolve()), mockAuth.delayMs),
    ),
};

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

type Step = 'email' | 'password' | 'done';

export type LoginFlowProps = {
  /** Start the flow on a given step, useful for stories. */
  initialStep?: Step;
  initialEmail?: string;
};

/**
 * The container ("smart" component) for sign-in.
 * It owns the state and talks to the auth service.
 * The two step components only receive props, so each one also works alone in Storybook.
 */
export function LoginFlow({ initialStep = 'email', initialEmail = '' }: LoginFlowProps) {
  const [step, setStep] = useState<Step>(initialStep);
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  async function handleContinue(value: string) {
    if (!isValidEmail(value)) {
      setError('Enter a valid email address.');
      return;
    }
    setError(undefined);
    setIsLoading(true);
    await mockAuth.checkEmail(value);
    setIsLoading(false);
    setStep('password');
  }

  async function handleLogIn(value: string) {
    if (value.length < 8 || value.length > 50) {
      setError('Password must be between 8 and 50 characters.');
      return;
    }
    setError(undefined);
    setIsLoading(true);
    try {
      await mockAuth.logIn(email, value);
      setStep('done');
    } catch {
      setError('That password is not correct. Try again or use a magic link.');
    } finally {
      setIsLoading(false);
    }
  }

  if (step === 'done') {
    return (
      <div className={styles.success}>
        <IconBadge><SparkIcon size={36} /></IconBadge>
        <Heading>You&apos;re in</Heading>
        <Text tone="muted">Signed in as {email}. This is a demo, no real account was used.</Text>
        <div style={{ marginTop: 24, width: '100%' }}>
          <Button variant="secondary" fullWidth onClick={() => { setStep('email'); setPassword(''); }}>
            Start again
          </Button>
        </div>
      </div>
    );
  }

  if (step === 'password') {
    return (
      <LoginPasswordStep
        email={email}
        password={password}
        onPasswordChange={(v) => { setPassword(v); setError(undefined); }}
        onSubmit={handleLogIn}
        onBack={() => { setStep('email'); setError(undefined); }}
        error={error}
        isLoading={isLoading}
      />
    );
  }

  return (
    <LoginEmailStep
      email={email}
      onEmailChange={(v) => { setEmail(v); setError(undefined); }}
      onContinue={handleContinue}
      error={error}
      isLoading={isLoading}
    />
  );
}
