import type { MouseEventHandler, ReactNode } from 'react';
import styles from './TextLink.module.css';

export type TextLinkProps = {
  children: ReactNode;
  /** Where the link goes. Without `href` the link renders as a button (for in-page actions). */
  href?: string;
  /** `default`: regular underlined link. `strong`: bold, for the key action in a sentence. `subtle`: small legal links. */
  tone?: 'default' | 'strong' | 'subtle';
  onClick?: MouseEventHandler<HTMLElement>;
};

/** An underlined text link: "Forgot password?", "Sign up", "Terms of Service". */
export function TextLink({ children, href, tone = 'default', onClick }: TextLinkProps) {
  const className = [styles.link, styles[tone]].join(' ');
  if (href) {
    return (
      <a className={className} href={href} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  );
}
