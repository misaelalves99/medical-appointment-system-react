// src/shared/ui/Feedback/LoadingSpinner.tsx

import type { ReactElement } from 'react';
import styles from './Feedback.module.css';

type SpinnerSize = 'sm' | 'md' | 'lg';

export interface LoadingSpinnerProps {
  /**
   * Texto descritivo (usado para acessibilidade)
   */
  label?: string;
  /**
   * Tamanho do spinner
   */
  size?: SpinnerSize;
  /**
   * Se true, ocupa a tela inteira com overlay
   */
  fullScreen?: boolean;
}

export function LoadingSpinner({
  label = 'Carregando...',
  size = 'md',
  fullScreen = false,
}: LoadingSpinnerProps): ReactElement {
  const spinner = (
    <div className={styles.spinnerWrapper} role="status" aria-live="polite">
      <div
        className={[
          styles.spinner,
          styles[`spinner_size_${size}`],
        ]
          .filter(Boolean)
          .join(' ')}
      />
      <span className={styles.spinnerLabel}>{label}</span>
    </div>
  );

  if (fullScreen) {
    return <div className={styles.spinnerOverlay}>{spinner}</div>;
  }

  return spinner;
}
