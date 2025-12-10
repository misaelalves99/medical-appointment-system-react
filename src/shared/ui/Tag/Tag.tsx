// src/shared/ui/Tag/Tag.tsx

import type { MouseEvent, ReactElement, ReactNode } from 'react';
import styles from './Tag.module.css';

type TagVariant = 'filled' | 'outline';
type TagColor = 'gray' | 'green' | 'blue' | 'red' | 'yellow' | 'purple';
type TagSize = 'sm' | 'md';

type TagTone = 'neutral' | 'success' | 'danger' | 'warning' | 'info';

export interface TagProps {
  /**
   * Texto principal da tag.
   * Se `children` for fornecido, tem prioridade.
   */
  label?: string;
  /**
   * Estilo visual
   */
  variant?: TagVariant;
  /**
   * Cor semântica.
   * Se não informada, será derivada de `tone` (quando presente).
   */
  color?: TagColor;
  /**
   * Tamanho da tag
   */
  size?: TagSize;
  /**
   * Ícone opcional à esquerda
   */
  leftIcon?: ReactNode;
  /**
   * Se true, exibe botão de remover (x)
   */
  isRemovable?: boolean;
  /**
   * Callback ao clicar para remover
   */
  onRemove?: (event: MouseEvent<HTMLButtonElement>) => void;
  /**
   * Desabilita interações
   */
  disabled?: boolean;
  /**
   * Classe extra para customização
   */
  className?: string;
  /**
   * Acessibilidade: label do botão de remover (ex: "Remover tag Cardiologia")
   */
  removeAriaLabel?: string;
  /**
   * Tom semântico (API nova usada nas telas de médicos).
   * Mapeado internamente para uma cor.
   */
  tone?: TagTone;
  /**
   * Conteúdo customizado. Se presente, substitui `label`.
   */
  children?: ReactNode;
}

function resolveColor(color: TagColor | undefined, tone: TagTone | undefined): TagColor {
  if (color) return color;

  switch (tone) {
    case 'success':
      return 'green';
    case 'danger':
      return 'red';
    case 'warning':
      return 'yellow';
    case 'info':
      return 'blue';
    case 'neutral':
    default:
      return 'gray';
  }
}

export function Tag({
  label,
  variant = 'filled',
  color,
  size = 'md',
  leftIcon,
  isRemovable = false,
  onRemove,
  disabled = false,
  className,
  removeAriaLabel,
  tone,
  children,
}: TagProps): ReactElement {
  const resolvedColor = resolveColor(color, tone);

  const rootClassName = [
    styles.tagRoot,
    styles[`variant_${variant}`],
    styles[`color_${resolvedColor}`],
    styles[`size_${size}`],
    disabled && styles.isDisabled,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  function handleRemove(event: MouseEvent<HTMLButtonElement>): void {
    if (disabled) {
      event.preventDefault();
      return;
    }
    onRemove?.(event);
  }

  const content = children ?? label ?? '';

  const removeLabelBase =
    typeof content === 'string'
      ? content
      : typeof label === 'string'
      ? label
      : 'tag';

  return (
    <span className={rootClassName}>
      {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}

      <span className={styles.label}>{content}</span>

      {isRemovable && (
        <button
          type="button"
          className={styles.removeButton}
          onClick={handleRemove}
          disabled={disabled}
          aria-label={removeAriaLabel ?? `Remover tag ${removeLabelBase}`}
        >
          <span aria-hidden="true">×</span>
        </button>
      )}
    </span>
  );
}
