// src/app/layouts/DashboardLayout/DashboardLayout.tsx

import type { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';

import { Sidebar } from '../../../shared/layout/Sidebar/Sidebar';
import { Topbar } from '../../../shared/layout/Topbar/Topbar';
import { PageContainer } from '../../../shared/layout/PageContainer/PageContainer';

import styles from './DashboardLayout.module.css';

export function DashboardLayout(): ReactElement {
  return (
    <div className={styles.dashboardLayout}>
      {/* Coluna da sidebar */}
      <aside className={styles.sidebarArea}>
        <Sidebar />
      </aside>

      {/* Coluna principal (topbar + conteúdo) */}
      <div className={styles.mainArea}>
        <header className={styles.topbarArea}>
          <Topbar />
        </header>

        <section className={styles.contentArea}>
          {/* PageContainer já garante padding + largura máxima */}
          <PageContainer>
            <Outlet />
          </PageContainer>
        </section>
      </div>
    </div>
  );
}

export default DashboardLayout;
