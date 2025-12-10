// src/shared/components/ConfirmDialog/ConfirmDialog.tsx

import type { ReactNode } from 'react';
import styles from './ConfirmDialog.module.css';

export type ConfirmDialogVariant = 'default' | 'danger';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: ConfirmDialogVariant;
  icon?: ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  variant = 'default',
  icon,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null;

  const confirmClass = `${styles.confirmButton} ${
    variant === 'danger' ? styles.confirmButtonDanger : ''
  }`;

  return (
    <div className={styles.backdrop} role="presentation" onClick={onCancel}>
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.header}>
          {icon && <div className={styles.icon}>{icon}</div>}
          <h2 id="confirm-dialog-title" className={styles.title}>
            {title}
          </h2>
        </div>

        {description && (
          <p id="confirm-dialog-description" className={styles.description}>
            {description}
          </p>
        )}

        <div className={styles.actions}>
          <button type="button" className={styles.cancelButton} onClick={onCancel}>
            {cancelLabel}
          </button>
          <button type="button" className={confirmClass} onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
