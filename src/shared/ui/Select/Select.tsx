// src/shared/ui/Select/Select.tsx

import type {
  ForwardedRef,
  ReactElement,
  ReactNode,
  SelectHTMLAttributes,
} from 'react';
import { forwardRef } from 'react';
import styles from './Select.module.css';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: string;
  /** apenas estiliza o erro (compatibilidade antiga) */
  hasError?: boolean;
  /**
   * Ocupa 100% da largura do container
   */
  fullWidth?: boolean;
  /**
   * Texto do placeholder como primeira opção desabilitada (ex: "Selecione...")
   */
  placeholderOption?: string;
  /**
   * Ícone/elemento à direita (ex: chevron customizado)
   */
  rightIcon?: ReactNode;
  /**
   * Lista de opções. Se quiser algo totalmente custom, pode ignorar e
   * passar <option> manual como children.
   */
  options?: SelectOption[];
}

function SelectBase(
  {
    id,
    label,
    helperText,
    error,
    hasError: hasErrorProp,
    fullWidth = true,
    className,
    placeholderOption,
    rightIcon,
    options,
    children,
    ...rest
  }: SelectProps,
  ref: ForwardedRef<HTMLSelectElement>,
): ReactElement {
  const hasError = Boolean(error) || Boolean(hasErrorProp);

  const rootClassName = [
    styles.selectRoot,
    fullWidth && styles.fullWidth,
    hasError && styles.hasError,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const selectClassName = [
    styles.selectElement,
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
        <select
          ref={ref}
          id={id}
          className={selectClassName}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? errorId : helperId}
          {...rest}
        >
          {placeholderOption && (
            <option value="" disabled>
              {placeholderOption}
            </option>
          )}

          {options
            ? options.map((option) => (
                <option
                  key={String(option.value)}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </option>
              ))
            : children}
        </select>

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

export const Select = forwardRef<HTMLSelectElement, SelectProps>(SelectBase);
Select.displayName = 'Select';
