import type { ReactNode } from 'react';
import styles from './IconBadge.module.css';

export type IconBadgeProps = {
  /** The icon inside the circle. */
  children: ReactNode;
  /** Diameter: `md` 64px, `lg` 80px. */
  size?: 'md' | 'lg';
};

/** A soft round badge that holds a single icon above a page title. */
export function IconBadge({ children, size = 'lg' }: IconBadgeProps) {
  return (
    <span className={[styles.badge, styles[size]].join(' ')} aria-hidden="true">
      {children}
    </span>
  );
}
