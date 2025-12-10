// src/shared/ui/Button/Button.tsx

import type {
  ButtonHTMLAttributes,
  MouseEvent,
  ReactElement,
  ReactNode,
} from 'react';
import styles from './Button.module.css';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'danger'
  // aliases usados nas telas
  | 'solid'
  | 'outline';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

export type ButtonTone = 'primary' | 'danger' | 'neutral';

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /**
   * Tom semântico do botão (aplica classes adicionais)
   */
  tone?: ButtonTone;
  /**
   * Define o tipo do botão explicitamente
   * - default: "button"
   */
  type?: 'button' | 'submit' | 'reset';
  /**
   * Quando true, exibe loading e desabilita o clique
   */
  isLoading?: boolean;
  /**
   * Ícone opcional à esquerda do texto
   */
  leftIcon?: ReactNode;
  /**
   * Ícone opcional à direita do texto
   */
  rightIcon?: ReactNode;
  /**
   * Ocupa 100% da largura do container
   */
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  tone,
  size = 'md',
  type = 'button',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  onClick,
  className,
  ...rest
}: ButtonProps): ReactElement {
  function handleClick(event: MouseEvent<HTMLButtonElement>): void {
    if (isLoading || disabled) {
      event.preventDefault();
      return;
    }

    onClick?.(event);
  }

  // normaliza aliases de variant para classes antigas (se existirem)
  const normalizedVariant: ButtonVariant =
    variant === 'solid'
      ? 'primary'
      : variant === 'outline'
      ? 'secondary'
      : variant;

  const rootClassName = [
    styles.buttonRoot,
    styles[`variant_${normalizedVariant}`],
    styles[`size_${size}`],
    tone && styles[`tone_${tone}`],
    fullWidth && styles.fullWidth,
    (disabled || isLoading) && styles.isDisabled,
    isLoading && styles.isLoading,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={rootClassName}
      onClick={handleClick}
      disabled={disabled || isLoading}
      {...rest}
    >
      <span className={styles.content}>
        {(leftIcon || isLoading) && (
          <span className={styles.iconLeft}>
            {isLoading ? (
              <span className={styles.spinner} aria-hidden="true" />
            ) : (
              leftIcon
            )}
          </span>
        )}

        <span className={styles.label}>{children}</span>

        {rightIcon && !isLoading && (
          <span className={styles.iconRight}>{rightIcon}</span>
        )}
      </span>
    </button>
  );
}
