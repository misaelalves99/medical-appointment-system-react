// src/shared/components/PageHeader/PageHeader.tsx

import type { ReactElement, ReactNode } from 'react';
import styles from './PageHeader.module.css';
import {
  Breadcrumbs,
  type BreadcrumbItem,
} from '../../../shared/components/Breadcrumbs/Breadcrumbs';

interface PageHeaderProps {
  title: string;

  /**
   * Alias antigos/novos para descrição:
   * - subtitle (versão 1/2)
   * - description (versão 3)
   */
  subtitle?: string;
  description?: string;

  /**
   * Aliases para breadcrumbs:
   * - breadcrumbItems (versão 1/3)
   * - breadcrumbs (versão 2)
   */
  breadcrumbItems?: BreadcrumbItem[];
  breadcrumbs?: BreadcrumbItem[];

  /**
   * Versão mais nova: bloco único de ações.
   */
  actions?: ReactNode;

  /**
   * Versão antiga: ações primárias/secundárias separadas.
   */
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;

  /**
   * Slot extra (ex.: status, filtros rápidos).
   */
  meta?: ReactNode;
}

/**
 * Cabeçalho padrão de página de dashboard:
 * - Título + descrição/subtítulo
 * - Breadcrumbs opcionais
 * - Barra de ações (primárias/secundárias/meta)
 */
export function PageHeader({
  title,
  subtitle,
  description,
  breadcrumbItems,
  breadcrumbs,
  actions,
  primaryAction,
  secondaryAction,
  meta,
}: PageHeaderProps): ReactElement {
  const finalDescription = description ?? subtitle;
  const finalBreadcrumbs = breadcrumbs ?? breadcrumbItems;
  const hasBreadcrumbs = !!finalBreadcrumbs && finalBreadcrumbs.length > 0;

  const hasAnyActions = Boolean(actions || primaryAction || secondaryAction || meta);

  const headerClass =
    (styles as any).header ?? (styles as any).pageHeaderRoot ?? '';
  const breadcrumbsRowClass =
    (styles as any).breadcrumbsRow ??
    (styles as any).breadcrumbRow ??
    (styles as any).breadcrumbsWrapper ??
    '';
  const mainRowClass =
    (styles as any).mainRow ?? (styles as any).headerRow ?? '';
  const textClass =
    (styles as any).text ?? (styles as any).left ?? (styles as any).textBlock ?? '';
  const titleClass = (styles as any).title ?? '';
  const descriptionClass =
    (styles as any).description ?? (styles as any).subtitle ?? '';
  const rightClass =
    (styles as any).right ?? (styles as any).actionsBlock ?? (styles as any).actions ?? '';
  const metaClass = (styles as any).meta ?? '';
  const actionsWrapperClass = (styles as any).actions ?? '';
  const primaryActionClass =
    (styles as any).primaryAction ?? (styles as any).actions ?? '';
  const secondaryActionClass =
    (styles as any).secondaryAction ?? (styles as any).actions ?? '';

  return (
    <header className={headerClass}>
      {hasBreadcrumbs && (
        <div className={breadcrumbsRowClass}>
          <Breadcrumbs items={finalBreadcrumbs!} />
        </div>
      )}

      <div className={mainRowClass}>
        <div className={textClass}>
          <h1 className={titleClass}>{title}</h1>
          {finalDescription && (
            <p className={descriptionClass}>{finalDescription}</p>
          )}
        </div>

        {hasAnyActions && (
          <div className={rightClass}>
            {meta && <div className={metaClass}>{meta}</div>}

            {/* Se `actions` for passado (API nova), ele domina */}
            {actions && <div className={actionsWrapperClass}>{actions}</div>}

            {/* Compat: APIs antigas de primary/secondaryAction */}
            {!actions && (primaryAction || secondaryAction) && (
              <div className={actionsWrapperClass}>
                {secondaryAction && (
                  <div className={secondaryActionClass}>{secondaryAction}</div>
                )}
                {primaryAction && (
                  <div className={primaryActionClass}>{primaryAction}</div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default PageHeader;
