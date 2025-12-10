// src/shared/ui/Card/Card.tsx

import type { ReactElement, ReactNode, HTMLAttributes } from 'react';
import styles from './Card.module.css';

type CardVariant = 'elevated' | 'outlined' | 'ghost';
type CardPadding = 'none' | 'sm' | 'md' | 'lg';

// Removemos 'title' da herança para poder redefinir como ReactNode
export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Título opcional exibido no header
   */
  title?: ReactNode;
  /**
   * Subtítulo/descrição curta no header
   */
  subtitle?: ReactNode;
  /**
   * Ações no header (ex: botões, dropdowns)
   */
  headerActions?: ReactNode;
  /**
   * Conteúdo do rodapé (ex: botão primário, link "Ver detalhes")
   */
  footer?: ReactNode;
  /**
   * Estilo visual do card:
   * - elevated: com sombra (default)
   * - outlined: borda discreta
   * - ghost: sem borda, só padding
   */
  variant?: CardVariant;
  /**
   * Controle de padding interno
   */
  padding?: CardPadding;
  /**
   * Mostra linha de divisão entre header/conteúdo/footer
   */
  withDividers?: boolean;
  /**
   * Torna o card clicável (cursor + hover)
   */
  isClickable?: boolean;
}

export function Card({
  title,
  subtitle,
  headerActions,
  footer,
  variant = 'elevated',
  padding = 'md',
  withDividers = false,
  isClickable = false,
  children,
  className,
  ...rest
}: CardProps): ReactElement {
  const rootClassName = [
    styles.cardRoot,
    styles[`variant_${variant}`],
    styles[`padding_${padding}`],
    withDividers && styles.withDividers,
    isClickable && styles.isClickable,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const hasHeader = Boolean(title || subtitle || headerActions);
  const hasFooter = Boolean(footer);

  return (
    <article className={rootClassName} {...rest}>
      {hasHeader && (
        <header className={styles.header}>
          <div className={styles.headerText}>
            {title && <h3 className={styles.title}>{title}</h3>}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>

          {headerActions && (
            <div className={styles.headerActions}>{headerActions}</div>
          )}
        </header>
      )}

      <div className={styles.content}>{children}</div>

      {hasFooter && <footer className={styles.footer}>{footer}</footer>}
    </article>
  );
}
