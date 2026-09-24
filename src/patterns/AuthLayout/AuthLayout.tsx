import type { ReactNode } from 'react';
import styles from './AuthLayout.module.css';

export type AuthLayoutProps = {
  /** Screen content: title, form, links. */
  children: ReactNode;
  /** Optional logo or wordmark at the top of the page. */
  logo?: ReactNode;
  /** Optional footer, for example legal text. */
  footer?: ReactNode;
};

/**
 * The page frame for every sign-in screen: a soft background,
 * a logo at the top and a single centered column (max 470px).
 */
export function AuthLayout({ children, logo, footer }: AuthLayoutProps) {
  return (
    <div className={styles.page}>
      {logo && <header className={styles.logo}>{logo}</header>}
      <main className={styles.column}>{children}</main>
      {footer && <footer className={styles.footer}>{footer}</footer>}
    </div>
  );
}

/** A neutral text wordmark used in the stories. Replace it with your own logo. */
export function Wordmark() {
  return <span className={styles.wordmark}>component lab</span>;
}
