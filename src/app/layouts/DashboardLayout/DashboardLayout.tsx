// src/app/layouts/DashboardLayout/DashboardLayout.tsx

import type { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';

import styles from './DashboardLayout.module.css';

import { Sidebar } from '../../../shared/layout/Sidebar/Sidebar';
import { Topbar } from '../../../shared/layout/Topbar/Topbar';
import { PageContainer } from '../../../shared/layout/PageContainer/PageContainer';

/**
 * Layout principal do dashboard administrativo.
 * - Sidebar fixa à esquerda
 * - Topbar no topo com ações rápidas e usuário
 * - Conteúdo das páginas renderizado via <Outlet />
 */
export function DashboardLayout(): ReactElement {
  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <Sidebar />

      {/* Área principal */}
      <div className={styles.mainArea}>
        {/* Topbar (search, user, ações rápidas) */}
        <Topbar />

        {/* Conteúdo da rota atual */}
        <PageContainer>
          <Outlet />
        </PageContainer>
      </div>
    </div>
  );
}

export default DashboardLayout;
