// src/app/layouts/AuthLayout/AuthLayout.tsx

import type { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';

import styles from './AuthLayout.module.css';

/**
 * Layout das telas de autenticação (Login / Register)
 * - Lado esquerdo: branding, headline, benefícios
 * - Lado direito: card com formulário de autenticação via <Outlet />
 */
export function AuthLayout(): ReactElement {
  return (
    <div className={styles.wrapper}>
      {/* Lado visual / branding */}
      <aside className={styles.heroPanel}>
        <div className={styles.brand}>
          {/* ⚠️ Removido o <img src="/logo.svg" /> que estava gerando o SVG gigante */}
          <div className={styles.brandMark}>MS</div>
          <span className={styles.brandName}>Medical Appointment System</span>
        </div>

        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Gestão de consultas moderna e segura.
          </h1>
          <p className={styles.heroSubtitle}>
            Centralize pacientes, médicos, especialidades e agenda em um
            dashboard profissional, com experiência pensada para o dia a dia da
            clínica.
          </p>

          <ul className={styles.heroHighlights}>
            <li>Autenticação com Firebase</li>
            <li>Agenda visual de consultas</li>
            <li>Histórico completo de pacientes</li>
          </ul>
        </div>

        <footer className={styles.heroFooter}>
          <span>© {new Date().getFullYear()} Medical System</span>
        </footer>
      </aside>

      {/* Lado do formulário (Login / Register) */}
      <main className={styles.formPanel}>
        <div className={styles.formContainer}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AuthLayout;
