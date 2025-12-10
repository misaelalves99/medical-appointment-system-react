// src/shared/layout/Sidebar/Sidebar.tsx

import type { ReactElement, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

import {
  FiActivity,   // Dashboard
  FiCalendar,   // Consultas
  FiUsers,      // Pacientes
  FiUser,       // Médicos
  FiLayers,     // Especialidades
  FiClock,      // Disponibilidade
} from 'react-icons/fi';

import styles from './Sidebar.module.css';
import { useSidebar } from '../../../hooks/useSidebar';

interface NavItem {
  label: string;
  path: string;
  icon: ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Visão geral', path: '/dashboard', icon: <FiActivity /> },
  { label: 'Consultas', path: '/appointments', icon: <FiCalendar /> },
  { label: 'Pacientes', path: '/patients', icon: <FiUsers /> },
  { label: 'Médicos', path: '/doctors', icon: <FiUser /> },
  { label: 'Especialidades', path: '/specialties', icon: <FiLayers /> },
  { label: 'Disponibilidade', path: '/doctor-availability', icon: <FiClock /> },
];

export function Sidebar(): ReactElement {
  const { isCollapsed, toggleSidebar } = useSidebar();
  const logoSrc = '/logo.svg'; // asset em public/

  return (
    <aside
      className={`${styles.sidebar} ${
        isCollapsed ? styles.sidebarCollapsed : ''
      }`}
      aria-label="Navegação principal"
    >
      <div className={styles.sidebarInner}>
        {/* Header / brand */}
        <div className={styles.header}>
          <button
            type="button"
            className={styles.brand}
            onClick={toggleSidebar}
          >
            <div className={styles.brandMark}>
              <span className={styles.brandPulse} aria-hidden="true" />
              <img src={logoSrc} alt="Medical System" className={styles.logo} />
            </div>

            {!isCollapsed && (
              <div className={styles.brandText}>
                <span className={styles.brandTitle}>
                  <span>Medical</span> System
                </span>
                <span className={styles.brandSubtitle}>
                  Gestão de consultas moderna
                </span>
              </div>
            )}
          </button>

          <button
            type="button"
            className={styles.collapseButton}
            onClick={toggleSidebar}
            aria-label={isCollapsed ? 'Expandir menu lateral' : 'Recolher menu lateral'}
          >
            {isCollapsed ? '›' : '‹'}
          </button>
        </div>

        {/* Navegação principal */}
        <nav className={styles.nav} aria-label="Navegação principal">
          {!isCollapsed && (
            <p className={styles.sectionLabel}>Painel</p>
          )}

          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.path} className={styles.navItem}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    [
                      styles.navLink,
                      isActive ? styles.navLinkActive : '',
                      isCollapsed ? styles.navLinkCollapsed : '',
                    ]
                      .filter(Boolean)
                      .join(' ')
                  }
                >
                  {/* Glow interno quando ativo */}
                  <span className={styles.navActiveGlow} aria-hidden="true" />

                  <span className={styles.navIcon} aria-hidden="true">
                    {item.icon}
                  </span>

                  {!isCollapsed && (
                    <span className={styles.navLabel}>{item.label}</span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Rodapé / infos */}
        <div className={styles.sidebarFooter}>
          {!isCollapsed && (
            <>
              <div className={styles.planCard}>
                <div className={styles.planTag}>
                  <span className={styles.planIcon}>●</span>
                  Produção demo
                </div>
                <p className={styles.planTitle}>Agenda sempre sob controle</p>
                <p className={styles.planSubtitle}>
                  Visualize consultas do dia, próximos horários e histórico de pacientes em um único lugar.
                </p>
                <span className={styles.planBadge}>Painel médico em desenvolvimento</span>
              </div>

              <p className={styles.footerText}>
                © {new Date().getFullYear()} Medical System
              </p>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
