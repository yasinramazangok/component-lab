import type { ReactNode } from 'react';
import styles from './Typography.module.css';

export type HeadingProps = {
  children: ReactNode;
  /** The HTML heading level. Pick it for the page outline, not for the look. */
  level?: 1 | 2 | 3;
  /** `display`: the big serif page title. `title`: a smaller section title. */
  size?: 'display' | 'title';
};

/** Serif page titles such as "Welcome back". */
export function Heading({ children, level = 1, size = 'display' }: HeadingProps) {
  const Tag = `h${level}` as const;
  return <Tag className={[styles.heading, styles[size]].join(' ')}>{children}</Tag>;
}

export type TextProps = {
  children: ReactNode;
  /** `xs` 12px, `sm` 14px, `md` 16px. */
  size?: 'xs' | 'sm' | 'md';
  /** `default` for normal text, `muted` for subtitles and helper text. */
  tone?: 'default' | 'muted';
  /** Renders a `<span>` instead of a `<p>` when used inside other text. */
  inline?: boolean;
};

/** Body text in the sans-serif body font. */
export function Text({ children, size = 'md', tone = 'default', inline = false }: TextProps) {
  const Tag = inline ? 'span' : 'p';
  return <Tag className={[styles.text, styles[size], styles[tone]].join(' ')}>{children}</Tag>;
}
