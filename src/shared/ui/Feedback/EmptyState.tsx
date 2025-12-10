// src/shared/ui/Feedback/EmptyState.tsx

import type { ReactElement, ReactNode } from 'react';
import { isValidElement } from 'react';
import styles from './Feedback.module.css';
import { Button } from '../Button/Button';

export interface EmptyStateAction {
  label: string;
  onClick: () => void | Promise<void>;
}

export interface EmptyStateProps {
  /**
   * Ícone grande central (ex: ícone de calendário, paciente, etc.)
   */
  icon?: ReactNode;
  /**
   * Título principal
   */
  title: string;
  /**
   * Descrição curta explicando o estado vazio
   */
  description?: string;
  /**
   * Ações totalmente customizadas (botões, links, etc.)
   * Se fornecida, tem prioridade sobre primaryAction/secondaryAction.
   */
  actions?: ReactNode;
  /**
   * Variante visual (por enquanto só "default", mas já preparado)
   */
  variant?: 'default' | 'subtle';
  /**
   * Ação primária (ex: "Cadastrar médico")
   */
  primaryAction?: ReactNode | EmptyStateAction;
  /**
   * Ação secundária (ex: "Voltar para lista")
   */
  secondaryAction?: ReactNode | EmptyStateAction;
}

function renderAction(
  action: ReactNode | EmptyStateAction | undefined,
  kind: 'primary' | 'ghost' | 'danger' = 'primary',
): ReactNode {
  if (!action) return null;

  // Se já é um elemento React (ou string), só devolve.
  if (isValidElement(action) || typeof action === 'string') {
    return action;
  }

  // Objeto { label, onClick }
  if (typeof action === 'object' && 'label' in action) {
    const { label, onClick } = action;

    const variant = kind === 'ghost' ? 'ghost' : 'solid';
    const tone = kind === 'danger' ? 'danger' : 'primary';

    return (
      <Button
        type="button"
        variant={variant}
        tone={tone}
        size="sm"
        onClick={onClick}
      >
        {label}
      </Button>
    );
  }

  return null;
}

export function EmptyState({
  icon,
  title,
  description,
  actions,
  variant = 'default',
  primaryAction,
  secondaryAction,
}: EmptyStateProps): ReactElement {
  const rootClassName = [
    styles.emptyStateRoot,
    styles[`emptyState_variant_${variant}`],
  ]
    .filter(Boolean)
    .join(' ');

  // Se `actions` vier pronto, usamos ele.
  // Senão, montamos com primary/secondary.
  let actionsContent: ReactNode = actions;

  if (!actionsContent && (primaryAction || secondaryAction)) {
    actionsContent = (
      <>
        {renderAction(secondaryAction, 'ghost')}
        {renderAction(primaryAction, 'primary')}
      </>
    );
  }

  return (
    <div className={rootClassName}>
      {icon && <div className={styles.emptyStateIcon}>{icon}</div>}

      <div className={styles.emptyStateText}>
        <h2 className={styles.emptyStateTitle}>{title}</h2>
        {description && (
          <p className={styles.emptyStateDescription}>{description}</p>
        )}
      </div>

      {actionsContent && (
        <div className={styles.emptyStateActions}>{actionsContent}</div>
      )}
    </div>
  );
}
