import type { FormEvent } from 'react';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Divider } from '../../components/Divider';
import { IconBadge } from '../../components/IconBadge';
import { TextField } from '../../components/TextField';
import { TextLink } from '../../components/TextLink';
import { Heading, Text } from '../../components/Typography';
import { LockIcon } from '../../icons';
import styles from './Login.module.css';

export type LoginPasswordStepProps = {
  email: string;
  password: string;
  onPasswordChange: (password: string) => void;
  onSubmit: (password: string) => void;
  onBack?: () => void;
  onForgotPassword?: () => void;
  onMagicLink?: () => void;
  error?: string;
  isLoading?: boolean;
};

/** Step 2 of sign-in: enter the password, or ask for a one-time magic link. */
export function LoginPasswordStep({
  email,
  password,
  onPasswordChange,
  onSubmit,
  onBack,
  onForgotPassword,
  onMagicLink,
  error,
  isLoading = false,
}: LoginPasswordStepProps) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit(password);
  }

  return (
    <div className={styles.step}>
      <div className={styles.back}>
        <BackButton onClick={onBack} />
      </div>

      <div className={styles.intro}>
        <IconBadge><LockIcon size={40} /></IconBadge>
        <Heading>Enter your password</Heading>
        <Text tone="muted">
          Enter your password for <strong className={styles.email}>{email}</strong>.
        </Text>
      </div>

      <form className={styles.stack} onSubmit={handleSubmit} noValidate>
        <TextField
          label="Password"
          hint="must be between 8-50 characters"
          type="password"
          name="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          value={password}
          onChange={onPasswordChange}
          error={error}
        />
        <Button type="submit" fullWidth isLoading={isLoading} loadingLabel="Logging in…">
          Log in
        </Button>
      </form>

      <div className={styles.links}>
        <TextLink onClick={onForgotPassword}>Forgot password?</TextLink>
      </div>

      <div className={styles.divider}>
        <Divider label="Or, we'll send you a temporary magic link" />
      </div>

      <Button variant="secondary" fullWidth onClick={onMagicLink}>
        Send me a magic link
      </Button>
    </div>
  );
}
