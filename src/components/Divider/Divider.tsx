import styles from './Divider.module.css';

export type DividerProps = {
  /** Optional text in the middle of the line, for example "Or, continue with email". */
  label?: string;
};

/** A thin horizontal line that separates two groups of actions. */
export function Divider({ label }: DividerProps) {
  if (!label) return <hr className={styles.line} />;
  return (
    <div className={styles.divider} role="separator" aria-label={label}>
      <span className={styles.rule} aria-hidden="true" />
      <span className={styles.label}>{label}</span>
      <span className={styles.rule} aria-hidden="true" />
    </div>
  );
}
