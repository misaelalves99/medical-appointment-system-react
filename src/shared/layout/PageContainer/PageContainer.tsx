// src/shared/layout/PageContainer/PageContainer.tsx

import type { ReactElement, ReactNode } from 'react';
import styles from './PageContainer.module.css';

interface PageContainerProps {
  children: ReactNode;
  /**
   * Classe extra para customização local.
   */
  className?: string;
  /**
   * Quando `true`, o conteúdo ocupa 100% da largura disponível
   * (útil para tabelas grandes / calendário).
   * Quando `false` (padrão), usa uma largura máxima centralizada.
   */
  fullWidth?: boolean;
}

/**
 * Wrapper padrão de páginas internas do dashboard
 * - Garante padding consistente
 * - Centraliza conteúdo em telas grandes (exceto quando fullWidth)
 * - Mantém o mesmo background entre módulos
 */
export function PageContainer({
  children,
  className,
  fullWidth = false,
}: PageContainerProps): ReactElement {
  const rootClass = [
    styles.pageContainer,
    fullWidth ? styles.pageContainerFull : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <main className={rootClass}>
      <div className={styles.pageInner}>{children}</div>
    </main>
  );
}

export default PageContainer;
