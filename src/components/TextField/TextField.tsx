import { useId, useState, type ChangeEvent } from 'react';
import { EyeIcon, EyeOffIcon } from '../../icons';
import styles from './TextField.module.css';

export type TextFieldProps = {
  /** The visible label above the input. */
  label: string;
  /** Extra information shown after the label, for example a length rule. */
  hint?: string;
  /** `password` adds a show / hide button. */
  type?: 'text' | 'email' | 'password';
  /** Controlled value. Leave it out to let the field manage its own value. */
  value?: string;
  /** Starting value when the field manages its own value. */
  defaultValue?: string;
  placeholder?: string;
  /** An error message. When set, the border turns red and the message is announced. */
  error?: string;
  disabled?: boolean;
  /** Browser autofill hint, for example `email` or `current-password`. */
  autoComplete?: string;
  name?: string;
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
};

/**
 * A labelled text input with an optional password visibility toggle.
 * The label is always visible, so users never lose context while typing.
 */
export function TextField({
  label,
  hint,
  type = 'text',
  value,
  defaultValue,
  placeholder,
  error,
  disabled = false,
  autoComplete,
  name,
  onChange,
}: TextFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const [isRevealed, setIsRevealed] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && isRevealed ? 'text' : type;

  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {hint && <span className={styles.hint}> ({hint})</span>}
      </label>

      <div className={[styles.control, error && styles.hasError, disabled && styles.isDisabled].filter(Boolean).join(' ')}>
        <input
          id={id}
          name={name}
          type={inputType}
          className={styles.input}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          onChange={(event) => onChange?.(event.target.value, event)}
        />
        {isPassword && (
          <button
            type="button"
            className={styles.toggle}
            onClick={() => setIsRevealed((v) => !v)}
            aria-label={isRevealed ? 'Hide password' : 'Show password'}
            aria-pressed={isRevealed}
            disabled={disabled}
          >
            {isRevealed ? <EyeIcon size={20} /> : <EyeOffIcon size={20} />}
          </button>
        )}
      </div>

      {error && (
        <p id={errorId} className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
