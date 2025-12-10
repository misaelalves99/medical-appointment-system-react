// src/shared/layout/Navbar/Navbar.tsx

import type { ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  FiCalendar,
  FiUsers,
  FiUser,
  FiActivity,
  FiMenu,
  FiSearch,
  FiHeart,
} from 'react-icons/fi';

import styles from './Navbar.module.css';
import { useAuth } from '../../../hooks/useAuth';

interface NavbarProps {
  onToggleSidebar?: () => void;
  rightExtra?: ReactNode;
}

export function Navbar({ onToggleSidebar, rightExtra }: NavbarProps) {
  const { user, logout } = useAuth();

  const userInitials =
    user?.displayName
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase() ||
    user?.email?.[0]?.toUpperCase() ||
    'U';

  const handleLogout = () => {
    logout?.();
  };

  const renderNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    [styles.navLink, isActive ? styles.navLinkActive : '']
      .filter(Boolean)
      .join(' ');

  return (
    <header className={styles.navbar}>
      <div className={styles.navbarInner}>
        {/* Botão mobile para abrir sidebar */}
        <button
          type="button"
          className={styles.mobileMenuButton}
          onClick={onToggleSidebar}
          aria-label="Alternar menu lateral"
        >
          <FiMenu />
        </button>

        {/* Brand */}
        <Link to="/dashboard" className={styles.brand}>
          <div className={styles.brandLogo}>
            <span className={styles.brandInitials}>MA</span>
          </div>
          <div className={styles.brandText}>
            <span className={styles.brandTitle}>Medical Admin</span>
            <span className={styles.brandSubtitle}>
              Sistema de Consultas e Pacientes
            </span>
          </div>
        </Link>

        {/* Links principais (desktop) */}
        <nav className={styles.navLinks} aria-label="Navegação principal">
          <NavLink to="/dashboard" className={renderNavLinkClass}>
            <span className={styles.navLinkIcon}>
              <FiActivity />
            </span>
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/patients" className={renderNavLinkClass}>
            <span className={styles.navLinkIcon}>
              <FiUsers />
            </span>
            <span>Pacientes</span>
          </NavLink>

          <NavLink to="/doctors" className={renderNavLinkClass}>
            <span className={styles.navLinkIcon}>
              <FiUser />
            </span>
            <span>Médicos</span>
          </NavLink>

          <NavLink to="/appointments" className={renderNavLinkClass}>
            <span className={styles.navLinkIcon}>
              <FiCalendar />
            </span>
            <span>Consultas</span>
          </NavLink>

          <NavLink to="/specialties" className={renderNavLinkClass}>
            <span className={styles.navLinkIcon}>
              <FiHeart />
            </span>
            <span>Especialidades</span>
          </NavLink>
        </nav>

        {/* Ações à direita */}
        <div className={styles.navActions}>
          {/* Busca “fake” (apenas visual por enquanto) */}
          <button type="button" className={styles.navSearch}>
            <FiSearch className={styles.navSearchIcon} />
            <span className={styles.navSearchText}>Buscar no sistema</span>
            <span className={styles.navSearchHint}>Ctrl K</span>
          </button>

          {rightExtra}

          {/* User / avatar */}
          <div className={styles.userMenu}>
            <div className={styles.userInfo}>
              <div className={styles.userName}>
                {user?.displayName || user?.email || 'Usuário'}
              </div>
              <div className={styles.userRole}>Admin da clínica</div>
            </div>

            <button
              type="button"
              className={styles.avatarButton}
              onClick={handleLogout}
              title="Sair da conta"
            >
              {userInitials}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
