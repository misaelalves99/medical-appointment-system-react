// src/shared/ui/Badge/Badge.tsx

import type { ReactElement, ReactNode, HTMLAttributes } from 'react';
import styles from './Badge.module.css';

type BadgeVariant = 'solid' | 'soft' | 'outline';
type BadgeColor = 'gray' | 'green' | 'blue' | 'red' | 'yellow' | 'purple';
type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Estilo visual do badge:
   * - solid: fundo forte, para status principal
   * - soft: fundo suave, para contexto secundário
   * - outline: borda apenas, discreto
   */
  variant?: BadgeVariant;
  /**
   * Cor semântica do badge (mapeada via CSS vars)
   */
  color?: BadgeColor;
  /**
   * Tamanho do badge
   */
  size?: BadgeSize;
  /**
   * Ícone opcional à esquerda
   */
  leftIcon?: ReactNode;
  /**
   * Mostra um ponto colorido em vez de ícone
   */
  showDot?: boolean;
  /**
   * Texto acessível para o ponto colorido (aria-label do dot)
   */
  dotLabel?: string;
}

export function Badge({
  children,
  variant = 'soft',
  color = 'gray',
  size = 'md',
  leftIcon,
  showDot = false,
  dotLabel,
  className,
  ...rest
}: BadgeProps): ReactElement {
  const rootClassName = [
    styles.badgeRoot,
    styles[`variant_${variant}`],
    styles[`color_${color}`],
    styles[`size_${size}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={rootClassName} {...rest}>
      {(leftIcon || showDot) && (
        <span
          className={showDot ? styles.dot : styles.icon}
          aria-hidden={showDot && !dotLabel ? 'true' : undefined}
          aria-label={showDot && dotLabel ? dotLabel : undefined}
        >
          {!showDot && leftIcon}
        </span>
      )}
      <span className={styles.label}>{children}</span>
    </span>
  );
}
