// src/shared/components/Breadcrumbs/Breadcrumbs.tsx

import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.css';

export interface BreadcrumbItem {
  label: string;
  /** Compat: pode vir como `to` (React Router) ou `href` */
  to?: string;
  href?: string;
  /** Se não informado, o último item é considerado ativo */
  active?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

/**
 * Breadcrumbs padrão do dashboard
 * - Mostra caminho de navegação
 * - Último item é o "ativo" por padrão (ou item.active === true)
 */
export function Breadcrumbs({ items }: BreadcrumbsProps): ReactElement | null {
  if (!items || items.length === 0) return null;

  const rootClass = (styles as any).breadcrumbsRoot || (styles as any).breadcrumbs || '';

  return (
    <nav className={rootClass} aria-label="Breadcrumb">
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isActive = item.active ?? isLast;
          const path = item.to ?? item.href;

          return (
            <li key={`${item.label}-${index}`} className={styles.item}>
              {!isActive && path ? (
                <>
                  <Link to={path} className={styles.link}>
                    {item.label}
                  </Link>
                  {!isLast && (
                    <span className={styles.separator} aria-hidden="true">
                      /
                    </span>
                  )}
                </>
              ) : (
                <>
                  <span
                    className={styles.current}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </span>
                  {!isLast && (
                    <span className={styles.separator} aria-hidden="true">
                      /
                    </span>
                  )}
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
