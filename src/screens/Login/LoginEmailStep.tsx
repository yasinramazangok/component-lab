import type { FormEvent, ReactNode } from 'react';
import { Button } from '../../components/Button';
import { Divider } from '../../components/Divider';
import { IconBadge } from '../../components/IconBadge';
import { TextField } from '../../components/TextField';
import { TextLink } from '../../components/TextLink';
import { Heading, Text } from '../../components/Typography';
import { SparkIcon } from '../../icons';
import styles from './Login.module.css';

export type Provider = { id: string; label: string; icon?: ReactNode };

export type LoginEmailStepProps = {
  email: string;
  onEmailChange: (email: string) => void;
  onContinue: (email: string) => void;
  onProvider?: (providerId: string) => void;
  onForgotPassword?: () => void;
  onSignUp?: () => void;
  /** Social sign-in options. Add each provider's official logo through `icon`. */
  providers?: Provider[];
  error?: string;
  isLoading?: boolean;
};

const defaultProviders: Provider[] = [
  { id: 'google', label: 'Log in with Google' },
  { id: 'apple', label: 'Log in with Apple' },
];

/** Step 1 of sign-in: choose a provider or continue with an email address. */
export function LoginEmailStep({
  email,
  onEmailChange,
  onContinue,
  onProvider,
  onForgotPassword,
  onSignUp,
  providers = defaultProviders,
  error,
  isLoading = false,
}: LoginEmailStepProps) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onContinue(email);
  }

  return (
    <div className={styles.step}>
      <div className={styles.intro}>
        <IconBadge><SparkIcon size={36} /></IconBadge>
        <Heading>Welcome back</Heading>
        <Text tone="muted">Log in to your account.</Text>
      </div>

      <div className={styles.stack}>
        {providers.map((p) => (
          <Button key={p.id} variant="secondary" fullWidth iconStart={p.icon} onClick={() => onProvider?.(p.id)}>
            {p.label}
          </Button>
        ))}
      </div>

      <div className={styles.divider}>
        <Divider label="Or, continue with email" />
      </div>

      <form className={styles.stack} onSubmit={handleSubmit} noValidate>
        <TextField
          label="Email address"
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={onEmailChange}
          error={error}
        />
        <Button type="submit" fullWidth isLoading={isLoading} loadingLabel="Checking…">
          Continue with email
        </Button>
      </form>

      <div className={styles.links}>
        <TextLink onClick={onForgotPassword}>Forgot password?</TextLink>
        <Text>
          Don&apos;t have an account? <TextLink tone="strong" onClick={onSignUp}>Sign up</TextLink>
        </Text>
      </div>
    </div>
  );
}
