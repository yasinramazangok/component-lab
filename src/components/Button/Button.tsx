import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

export type ButtonProps = {
  /** The text inside the button. */
  children: ReactNode;
  /** `primary`: the main action (dark, filled). `secondary`: other actions (white, outlined). */
  variant?: 'primary' | 'secondary';
  /** `md` (48px) is the default. `sm` (40px) is for dense layouts. */
  size?: 'sm' | 'md';
  /** Stretches the button to the full width of its container. */
  fullWidth?: boolean;
  /** Shows a spinner and blocks clicks while a request is running. */
  isLoading?: boolean;
  /** Text read by screen readers while loading. Defaults to the button text. */
  loadingLabel?: string;
  /** Disables the button, for example while a form is invalid. */
  disabled?: boolean;
  /** An icon or logo before the text, for example a provider logo on a social button. */
  iconStart?: ReactNode;
  /** HTML button type. Use `submit` inside forms. */
  type?: 'button' | 'submit';
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
};

/**
 * A pill-shaped button used for every action on the login screens.
 *
 * It is a presentational component: it does not call an API and does not know
 * about the user. It only renders what its props describe. That is why it works
 * in Storybook without a backend.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  loadingLabel,
  disabled = false,
  iconStart,
  type = 'button',
  onClick,
}: ButtonProps) {
  const isBlocked = disabled || isLoading;
  const className = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    isLoading && styles.loading,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={className}
      disabled={disabled}
      // While loading we keep the button focusable and use aria-disabled instead of `disabled`.
      aria-disabled={isBlocked || undefined}
      aria-busy={isLoading || undefined}
      onClick={(event) => {
        if (isBlocked) {
          event.preventDefault();
          return;
        }
        onClick?.(event);
      }}
    >
      {isLoading ? (
        <span className={styles.spinner} aria-hidden="true" />
      ) : (
        iconStart && <span className={styles.icon} aria-hidden="true">{iconStart}</span>
      )}
      <span className={styles.label}>{isLoading && loadingLabel ? loadingLabel : children}</span>
    </button>
  );
}
