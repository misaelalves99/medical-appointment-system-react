// src/shared/ui/Input/Input.tsx

import type {
  InputHTMLAttributes,
  ReactElement,
  ReactNode,
  ForwardedRef,
} from 'react';
import { forwardRef } from 'react';
import styles from './Input.module.css';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  /** mensagem de erro (para exibição abaixo do campo) */
  error?: string;
  /** flag para apenas estilizar o erro (compatibilidade antiga) */
  hasError?: boolean;
  /**
   * Ícone (ou elemento) à esquerda do input
   */
  leftIcon?: ReactNode;
  /**
   * Ícone (ou elemento) à direita do input
   */
  rightIcon?: ReactNode;
  /**
   * Ocupa 100% da largura do container
   */
  fullWidth?: boolean;
}

function InputBase(
  {
    id,
    label,
    helperText,
    error,
    hasError: hasErrorProp,
    leftIcon,
    rightIcon,
    fullWidth = true,
    className,
    type = 'text',
    ...rest
  }: InputProps,
  ref: ForwardedRef<HTMLInputElement>,
): ReactElement {
  const hasError = Boolean(error) || Boolean(hasErrorProp);

  const rootClassName = [
    styles.inputRoot,
    fullWidth && styles.fullWidth,
    hasError && styles.hasError,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const inputClassName = [
    styles.inputElement,
    leftIcon && styles.hasLeftIcon,
    rightIcon && styles.hasRightIcon,
  ]
    .filter(Boolean)
    .join(' ');

  const helperId = helperText ? `${id}-helper` : undefined;
  const errorId = hasError ? `${id}-error` : undefined;

  return (
    <div className={rootClassName}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}

      <div className={styles.fieldWrapper}>
        {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}

        <input
          ref={ref}
          id={id}
          type={type}
          className={inputClassName}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? errorId : helperId}
          {...rest}
        />

        {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
      </div>

      {hasError && error ? (
        <p id={errorId} className={styles.errorText}>
          {error}
        </p>
      ) : (
        helperText && (
          <p id={helperId} className={styles.helperText}>
            {helperText}
          </p>
        )
      )}
    </div>
  );
}

export const Input = forwardRef<HTMLInputElement, InputProps>(InputBase);
Input.displayName = 'Input';
