import { ArrowLeftIcon } from '../../icons';
import styles from './BackButton.module.css';

export type BackButtonProps = {
  /** Visible text next to the arrow. */
  label?: string;
  onClick?: () => void;
};

/** Returns the user to the previous step of a flow. */
export function BackButton({ label = 'Back', onClick }: BackButtonProps) {
  return (
    <button type="button" className={styles.back} onClick={onClick}>
      <ArrowLeftIcon size={18} />
      <span>{label}</span>
    </button>
  );
}
