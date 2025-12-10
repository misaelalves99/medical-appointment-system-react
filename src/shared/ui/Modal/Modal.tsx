// src/shared/ui/Modal/Modal.tsx

import type { ReactElement, ReactNode, MouseEvent, KeyboardEvent } from 'react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  /**
   * Título exibido na parte superior do modal
   */
  title?: ReactNode;
  /**
   * Descrição opcional logo abaixo do título
   */
  description?: ReactNode;
  /**
   * Conteúdo principal
   */
  children?: ReactNode;
  /**
   * Ações do rodapé (botões, links, etc.)
   */
  footer?: ReactNode;
  /**
   * Define o tamanho máximo do modal
   */
  size?: ModalSize;
  /**
   * Se true, permite fechar clicando no overlay
   */
  closeOnOverlayClick?: boolean;
  /**
   * Se true, mostra o botão "x" no canto superior direito
   */
  showCloseButton?: boolean;
  /**
   * ID opcional para vincular ao aria-labelledby
   */
  titleId?: string;
  /**
   * ID opcional para vincular ao aria-describedby
   */
  descriptionId?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  closeOnOverlayClick = true,
  showCloseButton = true,
  titleId,
  descriptionId,
}: ModalProps): ReactElement | null {
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent | KeyboardEventInit): void {
      if ('key' in event && event.key === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', handleKeyDown as any);
    return () => {
      window.removeEventListener('keydown', handleKeyDown as any);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function handleOverlayClick(event: MouseEvent<HTMLDivElement>): void {
    if (!closeOnOverlayClick) return;
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  const modalTitleId = titleId ?? 'modal-title';
  const modalDescriptionId = descriptionId ?? 'modal-description';

  return createPortal(
    <div
      className={styles.overlay}
      onClick={handleOverlayClick}
      aria-hidden="false"
    >
      <div
        className={[
          styles.modal,
          styles[`size_${size}`],
        ]
          .filter(Boolean)
          .join(' ')}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? modalTitleId : undefined}
        aria-describedby={description ? modalDescriptionId : undefined}
      >
        {(title || showCloseButton) && (
          <header className={styles.header}>
            {title && (
              <h2 id={modalTitleId} className={styles.title}>
                {title}
              </h2>
            )}

            {showCloseButton && (
              <button
                type="button"
                className={styles.closeButton}
                onClick={onClose}
                aria-label="Fechar"
              >
                ×
              </button>
            )}
          </header>
        )}

        {description && (
          <p id={modalDescriptionId} className={styles.description}>
            {description}
          </p>
        )}

        <div className={styles.body}>{children}</div>

        {footer && <footer className={styles.footer}>{footer}</footer>}
      </div>
    </div>,
    document.body,
  );
}
