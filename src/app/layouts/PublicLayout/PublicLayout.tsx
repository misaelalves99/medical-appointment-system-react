// src/app/layouts/PublicLayout/PublicLayout.tsx

import type { ReactElement, ReactNode } from 'react';
import { Link, Outlet } from 'react-router-dom';
import styles from './PublicLayout.module.css';

export interface PublicLayoutProps {
  /**
   * Opcional: permite usar o layout manualmente em algum lugar,
   * mas nas rotas o conteúdo virá pelo <Outlet />.
   */
  children?: ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps): ReactElement {
  return (
    <div className={styles.root}>
      {/* Header público simples */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link to="/dashboard" className={styles.brand}>
            <div className={styles.brandLogo}>
              <span className={styles.brandInitials}>MS</span>
            </div>
            <div className={styles.brandText}>
              <span className={styles.brandTitle}>Medical System</span>
              <span className={styles.brandSubtitle}>
                Agenda médica unificada
              </span>
            </div>
          </Link>

          <nav className={styles.nav}>
            <Link to="/home" className={styles.navLink}>
              Início
            </Link>
            <Link to="/login" className={styles.navLink}>
              Login
            </Link>
            <Link to="/register" className={styles.navLinkPrimary}>
              Criar conta
            </Link>
          </nav>
        </div>
      </header>

      {/* Conteúdo principal: usa children (caso passado) ou Outlet do router */}
      <main className={styles.main}>
        {children ?? <Outlet />}
      </main>

      {/* Rodapé público */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <span className={styles.footerText}>
            © {new Date().getFullYear()} Medical System. Todos os direitos reservados.
          </span>
          <span className={styles.footerTextMuted}>
            Projeto acadêmico para gestão de consultas, pacientes e médicos.
          </span>
        </div>
      </footer>
    </div>
  );
}

export default PublicLayout;
